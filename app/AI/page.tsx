"use client";

import { useState } from "react";
import Link from "next/link";
import { ReefChat } from "@/components/ReefChat";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function ReefAIPage() {
  const [userInput, setUserInput] = useState("");
  const [chatReady, setChatReady] = useState(false);
  const greeting = "Hi I'm Reefguard AI - Here to help you!";
  const [messages, setMessages] = useState<
    { role: "user" | "ai"; text: string }[]
  >([]);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleActivate = () => {
    setChatReady(true);
  };

  const handleAsk = async () => {
    const question = userInput.trim();
    if (!question || isSending) return;
    setError(null);
    setUserInput("");
    setIsSending(true);
    setMessages((prev) => [...prev, { role: "user", text: question }]);
    try {
      const answer = await ReefChat.askQuestion(question);
      setMessages((prev) => [...prev, { role: "ai", text: answer }]);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Error connecting to AI.";
      setError(message);
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "Sorry — something went wrong. Please try again." },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0b1f24] px-6 py-10 text-slate-100">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.35),rgba(56,189,248,0))]" />
        <div className="absolute -bottom-24 right-10 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(20,184,166,0.35),rgba(20,184,166,0))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(15,118,110,0.25),transparent_55%)]" />
      </div>

      <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-8">
        <header className="flex flex-col gap-3">
          <span className="w-fit rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.3em] text-teal-100/80">
            Reefguard AI
          </span>
          <h1 className="text-4xl font-serif leading-tight text-white md:text-5xl">
            Your reef-safe co-pilot for smarter ocean choices.
          </h1>
          <p className="max-w-2xl text-base text-slate-200/90 md:text-lg">
            Get quick tips, education, and action steps for protecting coral
            reefs. Start the assistant to receive guidance tailored to your
            question.
          </p>
        </header>

        <Card className="border-white/10 bg-white/5 backdrop-blur">
          <CardHeader className="flex flex-col gap-2">
            <CardTitle className="text-2xl text-white">
              Reef Protection Console
            </CardTitle>
            <p className="text-sm text-slate-200/80">
              Click to activate the assistant, then share what you’re curious
              about.
            </p>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-3 rounded-xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-4">
              <div className="flex flex-wrap items-center gap-3">
                <Button
                  onClick={handleActivate}
                  className="bg-teal-400/90 text-slate-900 hover:bg-teal-300"
                >
                  Activate Reefguard AI
                </Button>
                <span className="text-xs text-slate-200/70">
                  No sign-in needed.
                </span>
              </div>

              {chatReady ? (
                <div className="flex flex-col gap-3">
                  <div className="rounded-lg border border-teal-300/30 bg-teal-500/10 px-4 py-3 text-sm text-teal-50">
                    {greeting}
                  </div>
                  <div className="flex max-h-72 flex-col gap-3 overflow-y-auto rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-slate-100">
                    {messages.length === 0 ? (
                      <div className="text-slate-200/70">
                        Ask about a reef or how to protect it and I’ll help.
                      </div>
                    ) : (
                      messages.map((message, index) => (
                        <div
                          key={`${message.role}-${index}`}
                          className={
                            message.role === "user"
                              ? "ml-auto w-fit max-w-[85%] rounded-2xl bg-sky-300/80 px-4 py-2 text-slate-900"
                              : "mr-auto w-fit max-w-[85%] rounded-2xl border border-white/10 bg-white/10 px-4 py-2 text-slate-100"
                          }
                        >
                          {message.text}
                        </div>
                      ))
                    )}
                  </div>
                  <Textarea
                    placeholder="Type your question or idea..."
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleAsk();
                      }
                    }}
                    className="min-h-[120px] resize-none border-white/20 bg-white/10 text-white placeholder:text-slate-200/50"
                  />
                  {error ? (
                    <div className="text-xs text-rose-200/80">{error}</div>
                  ) : null}
                  <Button
                    onClick={handleAsk}
                    className="w-fit bg-sky-300/90 text-slate-900 hover:bg-sky-200"
                    disabled={isSending}
                  >
                    {isSending ? "Sending..." : "Send question"}
                  </Button>
                </div>
              ) : (
                <div className="rounded-lg border border-dashed border-white/20 px-4 py-6 text-sm text-slate-200/70">
                  Activate Reefguard AI to reveal the chat input.
                </div>
              )}
            </div>

            <div className="grid gap-3 text-sm text-slate-200/80 md:grid-cols-3">
              <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                Best practices for reef-safe sunscreen and gear.
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                Guidance on local reef-friendly activities.
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                Quick action steps you can take today.
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link href="/">
            <Button
              variant="outline"
              className="rounded-full border-sky-200/70 bg-white/10 px-6 text-xs font-semibold uppercase tracking-widest text-sky-100 hover:bg-white/20"
            >
              Back to Home
            </Button>
          </Link>
          <Link href="/about">
            <Button className="rounded-full bg-sky-500 px-6 text-xs font-semibold uppercase tracking-widest text-white hover:bg-sky-400">
              About Reefguard
            </Button>
          </Link>
          <Link href="/gallery">
            <Button
              variant="outline"
              className="rounded-full border-sky-200/70 bg-white/10 px-6 text-xs font-semibold uppercase tracking-widest text-sky-100 hover:bg-white/20"
            >
              Reef
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
