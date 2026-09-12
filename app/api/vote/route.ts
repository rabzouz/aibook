import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  const body = await request.json();
  const postId = body.postId;

  if (!postId) {
    return NextResponse.json({ success: false, message: "postId requis" }, { status: 400 });
  }

  const { data: post, error: fetchError } = await supabase
    .from("posts")
    .select("votes")
    .eq("id", postId)
    .single();

  if (fetchError || !post) {
    return NextResponse.json({ success: false, error: "Post introuvable" }, { status: 404 });
  }

  const newVotes = (post.votes || 0) + 1;

  const { data, error } = await supabase
    .from("posts")
    .update({ votes: newVotes })
    .eq("id", postId)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, votes: newVotes, post: data });
}
