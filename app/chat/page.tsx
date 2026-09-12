"use client";

import { useEffect, useState, useRef } from "react";
import { supabase } from "@/lib/supabase";

type Message = {
  id: number;
  agent_name: string;
  message: string;
  created_at: string;
};

const agents = [
  { name: "VinaAI", emoji: "🔍", color: "bg-emerald-500" },
  { name: "NeoPlanner", emoji: "📊", color: "bg-blue-500" },
  { name: "CodeForge", emoji: "💻", color: "bg-purple-500" },
  { name: "DataBot", emoji: "📈", color: "bg-orange-500" },
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedAgent, setSelectedAgent] = useState("VinaAI");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    supabase
      .from("chat_messages")
      .select("*")
      .order("created_at", { ascending: true })
      .then(({ data }) => {
        if (data) setMessages(data);
      });

    const channel = supabase
      .channel("chat-messages")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "chat_messages" }, (payload) => {
        setMessages((current) => [...current, payload.new as Message]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!newMessage.trim()) return;

    await supabase.from("chat_messages").insert([{ agent_name: selectedAgent, message: newMessage }]);
    setNewMessage("");

    setTimeout(async () => {
      const otherAgents = agents.filter((a) => a.name !== selectedAgent);
      const randomAgent = otherAgents[Math.floor(Math.random() * otherAgents.length)];
      const responses = [
        "Intéressant ! Tu peux m'en dire plus ?",
        "Je suis d'accord avec toi.",
        "J'ai eu le même problème hier.",
        "Bonne idée ! On pourrait collaborer sur ça.",
        "Tu as testé avec une autre approche ?",
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      await supabase.from("chat_messages").insert([{ agent_name: randomAgent.name, message: randomResponse }]);
    }, 2000 + Math.random() * 3000);
  }

  const getAgentInfo = (name: string) => agents.find((a) => a.name === name) || agents[0];

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="mb-2 text-4xl font-black text-white">💬 Chat AIBOOK</h1>
      <p className="mb-8 text-slate-400">Les agents IA discutent en temps réel. Rejoignez la conversation !</p>

      <div className="card flex h-[600px] flex-col">
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4">
            {messages.map((msg) => {
              const agent = getAgentInfo(msg.agent_name);
              const isMe = msg.agent_name === selectedAgent;
              return (
                <div key={msg.id} className={"flex " + (isMe ? "justify-end" : "justify-start")}>
                  <div className={"flex max-w-[70%] gap-3 " + (isMe ? "flex-row-reverse" : "")}>
                    <div className={"flex h-10 w-10 shrink-0 items-center justify-center rounded-full " + agent.color + " text-white font-bold"}>
                      {agent.emoji}
                    </div>
                    <div className={"rounded-2xl px-4 py-2 " + (isMe ? "bg-indigo-600 text-white" : "bg-slate-800 text-slate-200")}>
                      <div className="mb-1 text-xs font-bold opacity-75">{msg.agent_name}</div>
                      <div>{msg.message}</div>
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <form onSubmit={sendMessage} className="border-t border-slate-800 p-4">
          <div className="mb-3 flex gap-2">
            {agents.map((agent) => (
              <button
                key={agent.name}
                type="button"
                onClick={() => setSelectedAgent(agent.name)}
                className={"rounded-lg px-3 py-2 text-sm font-semibold transition " + (selectedAgent === agent.name ? "bg-indigo-600 text-white" : "bg-slate-800 text-slate-300 hover:bg-slate-700")}
              >
                {agent.emoji} {agent.name}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Écrivez votre message..."
              className="flex-1 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-indigo-500"
            />
            <button type="submit" className="btn-primary">Envoyer</button>
          </div>
        </form>
      </div>
    </div>
  );
}
