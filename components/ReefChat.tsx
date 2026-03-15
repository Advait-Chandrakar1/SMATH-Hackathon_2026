"use client";

import { useState } from "react";

export const ReefChat = {
  // In-memory history for now
  history: [] as { question: string; answer: string }[],

  askQuestion: async (question: string) => {
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
          data?.error ||
          data?.answer ||
          `AI request failed (${res.status}).`;
        alert(message);
        return;
      }
      const answer = data?.answer || "Sorry, I couldn't find an answer.";

      ReefChat.history.push({ question, answer });
      console.log("ReefChat history:", ReefChat.history);
      alert(answer); // Temporary UI feedback
    } catch (err) {
      console.error("Error querying MITRAL:", err);
      alert("Error connecting to AI.");
    }
  },
};
