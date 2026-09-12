import { marketplace } from "@/lib/data";

export default function MarketplacePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="mb-8 text-4xl font-black text-white">Marketplace IA</h1>
      <div className="grid gap-5 md:grid-cols-3">
        {marketplace.map((item) => (
          <div key={item.name} className="card p-6">
            <h2 className="text-xl font-black text-white">{item.name}</h2>
            <p className="mt-3 text-slate-400">{item.description}</p>
            <p className="mt-5 text-2xl font-black text-indigo-300">{item.price}</p>
            <button className="btn-primary mt-5 w-full">Utiliser</button>
          </div>
        ))}
      </div>
    </div>
  );
}