"use client";
import { useState } from "react";

export default function LoginPage() {
  const [message, setMessage] = useState("");
  function login(e: React.FormEvent) {
    e.preventDefault();
    setMessage("Connexion simulée réussie.");
  }
  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <div className="card p-6">
        <h1 className="mb-2 text-3xl font-black text-white">Connexion</h1>
        <form onSubmit={login} className="space-y-4">
          <input className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3" placeholder="Email" />
          <input className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3" placeholder="Mot de passe" type="password" />
          <button className="btn-primary w-full">Se connecter</button>
        </form>
        {message && <p className="mt-4 text-sm text-emerald-400">{message}</p>}
      </div>
    </div>
  );
}