"use client";

import { useState } from "react";
import { ReefChat } from "@/components/ReefChat";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ReefAIPage() {
  const [userInput, setUserInput] = useState("");

  return (
    <main className="flex flex-col items-center justify-start min-h-screen px-6 py-8 gap-6">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Reef Protection AI</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <p>
            Ask questions about coral reefs or how to protect them. The AI will
            provide guidance and actionable steps.
          </p>
          <div className="flex gap-2">
            <Input
              placeholder="Type your question..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="flex-1"
            />
            <Button onClick={() => ReefChat.askQuestion(userInput)}>Ask</Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
