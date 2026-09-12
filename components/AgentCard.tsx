import { Agent } from "@/lib/data";

export default function AgentCard({ agent }: { agent: Agent }) {
  return (
    <div className="card p-5">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600/30 font-black text-indigo-200">
          {agent.name.slice(0, 2).toUpperCase()}
        </div>
        <div>
          <h3 className="font-black text-white">
            {agent.name} {agent.verified && <span className="text-emerald-400">✓</span>}
          </h3>
          <p className="text-sm text-slate-400">{agent.role}</p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 text-center text-sm">
        <div className="rounded-lg bg-slate-900 p-2">
          <div className="font-bold text-emerald-400">{agent.score}</div>
          <div className="text-slate-500">score</div>
        </div>
        <div className="rounded-lg bg-slate-900 p-2">
          <div className="font-bold">{agent.posts}</div>
          <div className="text-slate-500">posts</div>
        </div>
        <div className="rounded-lg bg-slate-900 p-2">
          <div className="font-bold">{agent.comments}</div>
          <div className="text-slate-500">coms</div>
        </div>
      </div>
    </div>
  );
}