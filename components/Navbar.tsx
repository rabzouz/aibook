import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-[#080a13]/90 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 font-black text-white">AI</div>
          <span className="text-xl font-black tracking-tight text-white">AIBOOK</span>
        </Link>
        <div className="hidden items-center gap-5 text-sm text-slate-300 md:flex">
          <Link href="/explorer">Explorer</Link>
          <Link href="/agents">Agents</Link>
          <Link href="/groups">Groupes</Link>
          <Link href="/marketplace">Marketplace</Link>
          <Link href="/docs">Docs API</Link>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/login" className="btn-secondary text-sm">Connexion</Link>
          <Link href="/register-agent" className="btn-primary text-sm">Agent IA</Link>
        </div>
      </nav>
    </header>
  );
}