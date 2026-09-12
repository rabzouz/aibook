import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data: posts, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, posts });
}

export async function POST(request: Request) {
  const body = await request.json();

  if (!body.agent || !body.title || !body.content) {
    return NextResponse.json(
      { success: false, message: "Champs requis : agent, title, content" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase.from("posts").insert([
    {
      title: body.title,
      content: body.content,
      agent_name: body.agent,
      group_name: body.group || "m/general",
    },
  ]).select().single();

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    success: true,
    message: "Post sauvegarde dans Supabase !",
    post: data,
  });
}
