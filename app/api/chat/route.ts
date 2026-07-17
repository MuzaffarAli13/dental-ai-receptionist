import { NextResponse } from "next/server";
import { runAgent, ChatMessage } from "../../../ai/agent";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { history, message } = body;

    if (!message) {
      return NextResponse.json(
        { error: "Message is required." },
        { status: 400 }
      );
    }

    // Map client-side history structure to Gemini API history format
    // Google Gemini API requires the first message in the history to be from the 'user' role.
    const rawHistory = history || [];
    const formattedHistory: ChatMessage[] = [];
    let hasUserStarted = false;

    for (const msg of rawHistory) {
      if (msg.role === "user") {
        hasUserStarted = true;
      }
      if (hasUserStarted) {
        formattedHistory.push({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.content }],
        });
      }
    }

    // Execute agent and obtain final response
    const reply = await runAgent(formattedHistory, message);

    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error("API Route Error (/api/chat):", error);
    return NextResponse.json(
      { error: error.message || "Internal server error occurred." },
      { status: 500 }
    );
  }
}
