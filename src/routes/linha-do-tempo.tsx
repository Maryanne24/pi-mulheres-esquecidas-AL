import { createFileRoute, Link } from "@tanstack/react-router";
import { Voltar } from "@/components/Voltar";
import { seculos } from "@/lib/mulheres";

export const Route = createFileRoute("/linha-do-tempo")({
  head: () => ({ meta: [
    { title: "Linha do tempo — Mulheres Esquecidas" },
    { name: "description", content: "Conheça mulheres latino-americanas dos séculos XX e XXI." },
    { property: "og:title", content: "Linha do tempo — Mulheres Esquecidas" },
    { property: "og:description", content: "Conheça mulheres latino-americanas dos séculos XX e XXI." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ] }),
  component: Linha,
});

function Ponto({ s }: { s: string }) {
  return (
    <Link to="/pesquisar" search={{ seculo: s }} className="flex flex-col items-center hover:text-accent">
      <span className="h-6 w-0.5 bg-primary" /><span className="h-4 w-4 rounded-full bg-primary" />
      <span className="mt-3 tracking-wider">SÉCULO {s}</span>
    </Link>
  );
}

function Linha() {
  return (
    <main className="paper min-h-screen">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <Voltar />
        <h1 className="mt-6 text-center text-3xl font-bold">Mulheres em todos os tempos</h1>
        <div className="relative mt-10 text-primary">
          <div className="flex justify-around border-t-4 border-primary pb-16">
            {seculos.map((s) => <div key={s} className="-mt-1"><Ponto s={s} /></div>)}
          </div>
        </div>
      </div>
    </main>
  );
}
