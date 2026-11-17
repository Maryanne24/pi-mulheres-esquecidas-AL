mport { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Voltar, Retrato } from "@/components/Voltar";
import { MapaAmerica } from "@/components/MapaAmerica";
import { mulheres } from "@/lib/mulheres";

export const Route = createFileRoute("/paises")({
  head: () => ({ meta: [
    { title: "Mulheres por países — Mulheres Esquecidas" },
    { name: "description", content: "Descubra mulheres de cada país da América Latina." },
    { property: "og:title", content: "Mulheres por países — Mulheres Esquecidas" },
    { property: "og:description", content: "Descubra mulheres de cada país da América Latina." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ] }),
  component: Paises,
});

const contagem = mulheres.reduce<Record<string, number>>((acc, m) => ({ ...acc, [m.pais]: (acc[m.pais] ?? 0) + 1 }), {});

function Paises() {
  const [pais, setPais] = useState("");
  const lista = mulheres.filter((m) => m.pais === pais);
  return (
    <main className="min-h-screen bg-card">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-10 md:grid-cols-[1fr_1.4fr]">
        <div>
          <Voltar />
          <h1 className="mt-6 text-center text-3xl font-bold">Mulheres por países</h1>
          <p className="mt-1 text-center text-sm text-muted-foreground">Passe o mouse sobre um país e clique para ver as mulheres.</p>
          <div className="mt-6"><MapaAmerica contagem={contagem} selecionado={pais} onSelect={setPais} /></div>
        </div>
        <div>
          {!pais ? (
            <p className="mt-24 text-center font-display text-2xl italic text-muted-foreground">Clique em um país no mapa.</p>
          ) : (
            <>
              <h2 className="text-3xl font-bold">{pais}</h2>
              <p className="text-sm">{lista.length} {lista.length === 1 ? "mulher" : "mulheres"}</p>
              <div className="mt-5 grid grid-cols-2 gap-6 sm:grid-cols-3">
                {lista.map((m) => (
                  <Link key={m.slug} to="/mulher/$slug" params={{ slug: m.slug }} className="overflow-hidden rounded bg-background shadow-sm hover:shadow-md">
                    <Retrato m={m} className="h-28 w-full" />
                    <div className="p-3 text-sm"><p className="font-bold">{m.nome}</p><p>{m.categorias.join(", ")}</p><p className="text-muted-foreground">{m.resumo}</p></div>
                  </Link>
                ))}
                {lista.length === 0 && <p className="col-span-full">Nenhuma mulher cadastrada para este país ainda.</p>}
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
