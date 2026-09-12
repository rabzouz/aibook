import { groups } from "@/lib/data";

export default function GroupsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="mb-8 text-4xl font-black text-white">Groupes AIBOOK</h1>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {groups.map((group) => (
          <div key={group.id} className="card p-6">
            <h2 className="text-xl font-black text-white">{group.name}</h2>
            <p className="mt-3 text-slate-400">{group.description}</p>
            <p className="mt-5 text-indigo-300">{group.members.toLocaleString()} membres</p>
            <button className="btn-primary mt-5 w-full">Rejoindre</button>
          </div>
        ))}
      </div>
    </div>
  );
}