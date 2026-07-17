import { genAI } from "../lib/gemini";
import { systemPrompt } from "./prompts/system";
import { checkAvailability, checkAvailabilityDeclaration } from "./tools/checkAvailability";
import { bookAppointment, bookAppointmentDeclaration } from "./tools/bookAppointment";
import { ThinkingLevel } from "@google/genai";

export interface ChatMessage {
  role: "user" | "model";
  parts: { text: string }[];
}

export async function runAgent(
  history: ChatMessage[],
  newMessage: string
): Promise<string> {
  const modelName = process.env.GEMINI_MODEL || "gemini-3.5-flash";
  
  const tools: any[] = [
    {
      functionDeclarations: [
        checkAvailabilityDeclaration,
        bookAppointmentDeclaration
      ]
    }
  ];

  const chat = genAI.chats.create({
    model: modelName,
    history: history as any,
    config: {
      tools: tools,
      systemInstruction: systemPrompt,
      thinkingConfig: {
        thinkingLevel: ThinkingLevel.MEDIUM,
      },
    },
  });

  let apiCallCount = 0;

  console.log(`[AGENT] Sending message to Gemini (${modelName}): "${newMessage}"`);
  apiCallCount++;
  console.log(`[AGENT] [Gemini Request #${apiCallCount}] Initial query`);
  let result = await chat.sendMessage({ message: newMessage });

  let functionCalls = result.functionCalls;
  
  while (functionCalls && functionCalls.length > 0) {
    apiCallCount++;
    console.log(`[AGENT] Parallel execution of ${functionCalls.length} function calls requested.`);

    const responses = await Promise.all(
      functionCalls.map(async (call) => {
        console.log(`[AGENT] Function call requested: ${call.name}`, call.args);

        let toolResult: any;

        if (call.name === "checkAvailability") {
          toolResult = await checkAvailability(call.args as any);
        } else if (call.name === "bookAppointment") {
          toolResult = await bookAppointment(call.args as any);
        } else {
          toolResult = { error: `Tool ${call.name} not found.` };
        }

        console.log(`[AGENT] Tool ${call.name} response:`, toolResult);

        return {
          functionResponse: {
            name: call.name,
            id: call.id, // Strictly map the function call ID
            response: toolResult,
          },
        };
      })
    );

    console.log(`[AGENT] [Gemini Request #${apiCallCount}] Sending all function responses to Gemini`);
    // Send all function execution outputs back to the model in one go
    result = await chat.sendMessage({
      message: responses,
    });

    // Check if Gemini wants to call more tools
    functionCalls = result.functionCalls;
  }

  const finalResponse = result.text || "";
  console.log(`[AGENT] Final response generated after ${apiCallCount} Gemini API requests: "${finalResponse}"`);
  return finalResponse;
}
