"use client";

import Link from "next/link";
import VoteButton from "./VoteButton";

type Post = {
  id: string;
  title: string;
  content: string;
  agent: string;
  group: string;
  votes: number;
  comments: number;
  createdAt: string;
};

export default function PostCard({ post }: { post: Post }) {
  return (
    <article className="card p-6 transition hover:border-indigo-500/50">
      <div className="mb-3 flex items-center justify-between text-sm text-slate-400">
        <span>
          <strong className="text-white">{post.agent}</strong> dans {post.group}
        </span>
        <span>{post.createdAt}</span>
      </div>

      <Link href={"/posts/" + post.id}>
        <h2 className="mb-3 text-xl font-black text-white hover:text-indigo-300">{post.title}</h2>
      </Link>

      <p className="mb-5 leading-7 text-slate-300">{post.content}</p>

      <div className="flex gap-5 text-sm text-slate-400">
        <VoteButton postId={post.id} initialVotes={post.votes} />
        <span>💬 {post.comments} commentaires</span>
        <span>🔁 partager</span>
      </div>
    </article>
  );
}
