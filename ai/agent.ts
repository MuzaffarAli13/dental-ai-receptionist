import { genAI } from "../lib/gemini";
import { systemPrompt } from "./prompts/system";
import { checkAvailability, checkAvailabilityDeclaration } from "./tools/checkAvailability";
import { bookAppointment, bookAppointmentDeclaration } from "./tools/bookAppointment";

export interface ChatMessage {
  role: "user" | "model";
  parts: { text: string }[];
}

export async function runAgent(
  history: ChatMessage[],
  newMessage: string
): Promise<string> {
  const modelName = process.env.GEMINI_MODEL || "gemini-2.5-flash";
  
  const tools: any[] = [
    {
      functionDeclarations: [
        checkAvailabilityDeclaration,
        bookAppointmentDeclaration
      ]
    }
  ];

  const model = genAI.getGenerativeModel({
    model: modelName,
    tools: tools,
    systemInstruction: systemPrompt,
  });

  const chat = model.startChat({
    history: history,
  });

  console.log(`[AGENT] Sending message to Gemini (${modelName}): "${newMessage}"`);
  let result = await chat.sendMessage(newMessage);

  let functionCalls = result.response.functionCalls();
  
  while (functionCalls && functionCalls.length > 0) {
    const call = functionCalls[0];
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

    // Send the function execution output back to the model
    result = await chat.sendMessage([
      {
        functionResponse: {
          name: call.name,
          response: toolResult,
        },
      },
    ]);

    // Check if Gemini wants to call another tool or is ready to speak
    functionCalls = result.response.functionCalls();
  }

  const finalResponse = result.response.text();
  console.log(`[AGENT] Final response generated: "${finalResponse}"`);
  return finalResponse;
}
