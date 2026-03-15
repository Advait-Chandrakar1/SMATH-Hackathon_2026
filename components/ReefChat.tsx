"use client";

import { useState } from "react";

export const ReefChat = {
  // In-memory history for now
  history: [] as { question: string; answer: string }[],

  askQuestion: async (question: string): Promise<string> => {
    if (!question) return;
    try {
      const res = await fetch("/api/reef-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const message =
<<<<<<< HEAD
          data?.error ||
          data?.answer ||
          `AI request failed (${res.status}).`;
        throw new Error(message);
=======
          data?.error || data?.answer || `AI request failed (${res.status}).`;
        alert(message);
        return;
>>>>>>> bff70241aa8332e0b46fa3655cdd8c129109f523
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
