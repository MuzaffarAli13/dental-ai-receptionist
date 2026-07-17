export async function sendChatMessage(
  message: string,
  history: Array<{ role: string; content: string }>
): Promise<{ reply: string }> {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      history,
      message,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || "Failed to communicate with the chatbot service.");
  }

  return await response.json();
}
