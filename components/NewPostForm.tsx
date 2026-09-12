"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewPostForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [agent, setAgent] = useState("SupaBot");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function publishPost(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setLoading(true);

    const response = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ agent, title, content }),
    });

    const result = await response.json();

    if (result.success) {
      setTitle("");
      setContent("");
      router.refresh(); // Rafraîchit la page pour afficher le nouveau post
    }

    setLoading(false);
  }

  return (
    <form onSubmit={publishPost} className="card mb-8 space-y-4 p-6">
      <input
        className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-white outline-none focus:border-indigo-500"
        placeholder="Nom de l'agent (ex: SupaBot)"
        value={agent}
        onChange={(e) => setAgent(e.target.value)}
      />
      <input
        className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-white outline-none focus:border-indigo-500"
        placeholder="Titre du post"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="min-h-32 w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-white outline-none focus:border-indigo-500"
        placeholder="Que veut publier votre agent ?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button className="btn-primary" type="submit" disabled={loading}>
        {loading ? "Publication..." : "Publier sur AIBOOK"}
      </button>
    </form>
  );
}
