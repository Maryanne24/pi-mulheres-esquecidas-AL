import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Search } from "lucide-react";
import { Voltar, Retrato } from "@/components/Voltar";
import { mulheres, paises, categorias, seculos } from "@/lib/mulheres";

type S = { pais?: string | undefined; categoria?: string | undefined; seculo?: string | undefined };

export const Route = createFileRoute("/pesquisar")({
  validateSearch: (s: Record<string, unknown>): S => ({
    pais: typeof s["pais"] === "string" ? s["pais"] : undefined,
    categoria: typeof s["categoria"] === "string" ? s["categoria"] : undefined,
    seculo: typeof s["seculo"] === "string" ? s["seculo"] : undefined,
  }),
  head: () => ({ meta: [
    { title: "Pesquisar Mulheres — Mulheres Esquecidas" },
    { name: "description", content: "Pesquise mulheres latino-americanas por nome, país, categoria e período histórico." },
    { property: "og:title", content: "Pesquisar Mulheres — Mulheres Esquecidas" },
    { property: "og:description", content: "Pesquise mulheres latino-americanas por nome, país, categoria e período." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ] }),
  component: Pesquisar,
});

function Filtro({ label, value, onChange, opts, todos }: { label: string; value: string; onChange: (v: string) => void; opts: string[]; todos: string }) {
  return (
    <label className="flex items-center gap-4 text-lg">{label}:
      <select value={value} onChange={(e) => onChange(e.target.value)} className="rounded-lg bg-card px-4 py-1.5">
        <option value="">{todos}</option>
        {opts.map((o) => <option key={o} value={o}>{label.startsWith("Per") ? `Século ${o}` : o}</option>)}
      </select>
    </label>
  );
}

function Pesquisar() {
  const s = Route.useSearch();
  const [q, setQ] = useState("");
  const [pais, setPais] = useState(s["pais"] ?? "");
  const [cat, setCat] = useState(s["categoria"] ?? "");
  const [sec, setSec] = useState(s["seculo"] ?? "");
  const r = mulheres.filter((m) =>
    m.nome.toLowerCase().includes(q.toLowerCase()) && (!pais || m.pais === pais) && (!cat || m.categorias.includes(cat)) && (!sec || m.seculo === sec));
  return (
    <main className="paper min-h-screen">
      <div className="mx-auto max-w-4xl px-6 py-10">
        <Voltar />
        <h1 className="mt-4 text-center text-3xl">Pesquisar Mulheres</h1>
        <div className="mt-6 flex max-w-xl items-center gap-3 rounded-xl bg-card px-4 py-3">
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Digite aqui o nome da mulher que procura" className="flex-1 bg-transparent text-lg outline-none placeholder:text-muted-foreground" />
          <Search className="h-6 w-6" />
        </div>
        <div className="mt-6 space-y-4">
          <Filtro label="País" value={pais} onChange={setPais} opts={paises} todos="Todos" />
          <Filtro label="Categoria" value={cat} onChange={setCat} opts={categorias} todos="Todas" />
          <Filtro label="Período Histórico" value={sec} onChange={setSec} opts={seculos} todos="Todos" />
        </div>
        <h2 className="mt-12 text-4xl">Resultados da pesquisa</h2>
        <p className="text-sm">Foram encontrados {r.length} resultados</p>
        <div className="mt-5 max-w-2xl space-y-5">
          {r.map((m) => (
            <div key={m.slug} className="flex items-center gap-6 rounded-xl bg-card px-8 py-4">
              <Retrato m={m} className="h-20 w-14 rounded" />
              <div className="flex-1 font-display text-2xl leading-tight"><p className="font-bold">{m.nome}</p><p>{m.pais} | {m.categorias.join(", ")}</p></div>
              <Link to="/mulher/$slug" params={{ slug: m.slug }} className="rounded-full bg-primary px-4 py-1 text-primary-foreground">Ver perfil</Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}