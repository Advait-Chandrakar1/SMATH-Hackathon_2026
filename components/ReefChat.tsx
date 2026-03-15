"use client";

export const ReefChat = {
  // In-memory history for now
  history: [] as { question: string; answer: string }[],

  askQuestion: async (question: string): Promise<string> => {
    if (!question) return "Please enter a question.";
    try {
      const res = await fetch("/api/reef-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const message =
          data?.error ||
          data?.answer ||
          `AI request failed (${res.status}).`;
        throw new Error(message);
      }
      const answer = data?.answer || "Sorry, I couldn't find an answer.";

      ReefChat.history.push({ question, answer });
      return answer;
    } catch (err) {
      console.error("Error querying MITRAL:", err);
      throw err;
    }
  },
};
