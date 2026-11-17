import { createFileRoute, notFound } from "@tanstack/react-router";
import { MapPin, Star, Clock } from "lucide-react";
import { Voltar, Retrato } from "@/components/Voltar";
import { mulheres } from "@/lib/mulheres";

export const Route = createFileRoute("/mulher/$slug")({
  loader: ({ params }) => {
    const m = mulheres.find((x) => x.slug === params.slug);
    if (!m) throw notFound();
    return m;
  },
  head: ({ loaderData }) => ({ meta: [
    { title: `${loaderData?.nome ?? "Perfil"} — Mulheres Esquecidas` },
    { name: "description", content: loaderData?.resumo ?? "" },
    { property: "og:title", content: `${loaderData?.nome ?? "Perfil"} — Mulheres Esquecidas` },
    { property: "og:description", content: loaderData?.resumo ?? "" },
    { property: "og:type", content: "article" }, { name: "twitter:card", content: "summary" },
  ] }),
  notFoundComponent: () => <main className="p-10"><Voltar /><p className="mt-4">Mulher não encontrada.</p></main>,
  component: Perfil,
});

function Perfil() {
  const m = Route.useLoaderData();
  return (
    <main className="min-h-screen bg-card">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-10 md:grid-cols-2">
        <div>
          <Voltar />
          <div className="mt-8 flex flex-wrap items-center gap-8">
            <Retrato m={m} className="h-44 w-32 rounded" />
            <div className="space-y-3 text-xl">
              <h1 className="text-4xl font-bold">{m.nome}</h1>
              <p className="flex items-center gap-3"><MapPin className="h-5 w-5" />{m.bandeira} {m.pais}</p>
              <p className="flex items-center gap-3"><Star className="h-5 w-5" />{m.categorias.join(", ")}</p>
              <p className="flex items-center gap-3"><Clock className="h-5 w-5" />Século {m.seculo}</p>
            </div>
          </div>
          <h2 className="mt-10 text-xl font-bold">Contribuições:</h2>
          <ol className="list-decimal pl-6">{m.contribuicoes.map((c) => <li key={c}>{c}</li>)}</ol>
          {m.fontes.length > 0 && <>
            <h2 className="mt-6 text-xl font-bold">Fontes:</h2>
            <ol className="list-decimal pl-6">{m.fontes.map((c) => <li key={c}>{c}</li>)}</ol>
          </>}
        </div>
        <div>
          <h2 className="text-center text-2xl font-bold">Biografia:</h2>
          <p className="mt-3 whitespace-pre-line text-lg leading-relaxed">{m.biografia}</p>
        </div>
      </div>
    </main>
  );
}