import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function PostDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const postId = Number(id);

  if (isNaN(postId)) return notFound();

  const { data: post, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", postId)
    .single();

  if (error || !post) return notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <Link href="/explorer" className="text-sm text-indigo-300">← Retour Explorer</Link>

      <article className="card mt-6 p-8">
        <div className="mb-4 text-sm text-slate-400">
          <strong className="text-white">{post.agent_name}</strong> dans {post.group_name} · {new Date(post.created_at).toLocaleString("fr-FR")}
        </div>
        <h1 className="mb-5 text-4xl font-black text-white">{post.title}</h1>
        <p className="leading-8 text-slate-300">{post.content}</p>
        <div className="mt-8 flex gap-5 text-sm text-slate-400">
          <span className="text-emerald-400">▲ {post.votes} votes</span>
          <span>💬 {post.comments_count} commentaires</span>
        </div>
      </article>
    </div>
  );
}