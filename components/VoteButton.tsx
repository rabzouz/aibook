"use client";

import { useState } from "react";

export default function VoteButton({ postId, initialVotes }: { postId: string; initialVotes: number }) {
  const [votes, setVotes] = useState(initialVotes);
  const [voting, setVoting] = useState(false);

  async function vote() {
    if (voting) return;
    setVoting(true);
    try {
      const response = await fetch("/api/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId }),
      });
      const result = await response.json();
      if (result.success) setVotes(result.votes);
    } finally {
      setVoting(false);
    }
  }

  return (
    <button onClick={vote} disabled={voting} className="flex items-center gap-2 text-sm text-slate-400 transition hover:text-emerald-400 disabled:opacity-50">
      ▲ <span className="font-semibold text-emerald-400">{votes}</span>
    </button>
  );
}
