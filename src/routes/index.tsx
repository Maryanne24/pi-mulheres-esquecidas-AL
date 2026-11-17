import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ChevronLeft, ChevronRight, Search, Sprout, Globe, BookOpen, FlaskConical, Landmark, Palette, Users, GraduationCap, Flower2, Flower } from "lucide-react";
import capa from "@/assets/capa-inicial.jpg";
const hero = capa;
import { Retrato } from "@/components/Voltar";
import { mulheres, destaquesSlugs } from "@/lib/mulheres";
import mapa from "@/assets/mapa.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mulheres Esquecidas da América Latina" },
      { name: "description", content: "Conheça mulheres latino-americanas que transformaram a história, mesmo quando tentaram apagá-las." },
      { property: "og:title", content: "Mulheres Esquecidas da América Latina" },
      { property: "og:description", content: "Conheça mulheres latino-americanas que transformaram a história, mesmo quando tentaram apagá-las." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,700;1,500&family=EB+Garamond:wght@400;500&family=Caveat&display=swap" },
    ],
  }),
  component: Index,
});

const destaques = destaquesSlugs.flatMap((slug) => mulheres.filter((m) => m.slug === slug));
const areas = [
  [Palette, "Arte"], [Landmark, "Política"], [FlaskConical, "Ciência"],
  [GraduationCap, "Educação"], [Users, "Movimentos sociais"], [BookOpen, "Literatura"],
] as const;
const seculos = ["XX", "XXI"];
const nav = [["Início","/"],["Mulheres","/pesquisar"],["Países","/paises"],["Categorias","/pesquisar"],["Linha do tempo","/linha-do-tempo"]] as const;

function Index() {
  return (
    <main className="paper">
      <header className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <div className="flex items-center gap-2 text-primary">
          <Flower className="h-9 w-9" />
          <div className="leading-none">
            <p className="font-display text-xl font-bold uppercase">Mulheres<br />Esquecidas</p>
            <p className="text-[0.6rem] uppercase tracking-[0.3em]">da América Latina</p>
          </div>
        </div>
        <nav className="hidden gap-6 text-sm md:flex">
          {nav.map(([n, to], i) => (
            <Link key={n} to={to} className={i === 0 ? "border-b-2 border-primary" : "hover:text-primary"}>{n}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <Link to="/pesquisar" aria-label="Pesquisar"><Search className="h-5 w-5" /></Link>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-6 py-12 md:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.2em]">Histórias reais. Legados vivos.</p>
            <h1 className="mt-4 text-5xl leading-[0.95] font-bold md:text-6xl">Elas fizeram história.</h1>
            <p className="font-display text-4xl italic text-primary md:text-5xl">Mas quem contou a história?</p>
            <p className="mt-4 max-w-md">Conheça mulheres latino-americanas que desafiaram seu tempo, transformaram suas comunidades e marcaram a história, mesmo quando tentaram apagá-las.</p>
            <a href="#destaques" className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-primary-foreground">Conhecer essas mulheres <ArrowRight className="h-4 w-4" /></a>
          </div>
          <img src={hero} alt="Colagem de retratos de mulheres latino-americanas" className="w-full rounded-lg" />
        </div>
      </section>

      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 py-8 md:grid-cols-4">
          {[[Sprout, "60+", "mulheres pesquisadas"], [Globe, "20", "países representados"], [BookOpen, "6", "áreas de atuação"]].map(([I, n, t]) => {
            const Icon = I as typeof Sprout;
            return (
              <div key={t as string} className="flex items-center gap-4 md:border-r md:border-primary-foreground/20">
                <Icon className="h-10 w-10 opacity-80" />
                <div><p className="font-display text-4xl">{n as string}</p><p className="text-sm opacity-80">{t as string}</p></div>
              </div>
            );
          })}
          <p className="font-display text-lg italic opacity-90">"Existem muitas histórias que ainda precisam ser contadas."</p>
        </div>
      </section>

      <section id="destaques" className="mx-auto max-w-6xl px-6 py-16">
        <p className="text-xs uppercase tracking-[0.2em]">Mulheres em destaque</p>
        <div className="flex items-end justify-between">
          <h2 className="text-4xl font-bold md:text-5xl">Vozes que atravessam o tempo.</h2>
          <Link to="/pesquisar" className="hidden items-center gap-1 border-b border-foreground text-sm md:flex">Ver todas as mulheres <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="relative mt-8">
          <button aria-label="Anterior" className="absolute -left-4 top-1/3 z-10 rounded-full bg-card p-2 shadow"><ChevronLeft /></button>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {destaques.map((m) => (
              <article key={m.slug} className="overflow-hidden rounded-lg bg-card shadow-sm">
                <Retrato m={m} className="h-48 w-full" />
                <div className="p-5">
                  <h3 className="text-xl font-bold">{m.nome}</h3>
                  <p className="text-sm">{m.bandeira} {m.pais}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{m.resumo}</p>
                  <Link to="/mulher/$slug" params={{ slug: m.slug }} className="mt-4 inline-flex items-center gap-1 text-sm font-medium">Conhecer história <ArrowRight className="h-4 w-4" /></Link>
                </div>
              </article>
            ))}
          </div>
          <button aria-label="Próximo" className="absolute -right-4 top-1/3 z-10 rounded-full bg-card p-2 shadow"><ChevronRight /></button>
        </div>
      </section>

      <section className="bg-muted">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-6 py-12 md:grid-cols-[1fr_1.4fr_auto]">
          <img src={mapa} alt="Mapa da América Latina" className="w-full rounded-lg" />
          <div>
            <p className="text-xs uppercase tracking-[0.2em]">Explorar por país</p>
            <h2 className="mt-2 text-4xl font-bold">Toda a América Latina tem suas protagonistas.</h2>
            <p className="mt-2">Descubra mulheres de diferentes países e conheça suas histórias, lutas e contribuições.</p>
            <Link to="/paises" className="mt-5 inline-block rounded-full bg-primary px-5 py-2 text-primary-foreground">Ver mulheres por país</Link>
          </div>
          <p className="font-hand text-3xl text-primary">"Nossos passos<br />vêm de longe."</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <p className="text-xs uppercase tracking-[0.2em]">Explorar por área</p>
        <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
          {areas.map(([Icon, n]) => (
            <Link key={n} to="/pesquisar" search={{ categoria: n }} className="flex flex-col items-center gap-2 rounded-lg bg-card p-5 text-center text-sm hover:bg-muted">
              <Icon className="h-9 w-9 text-primary" strokeWidth={1.3} />{n}
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="flex justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] opacity-80">Linha do tempo</p>
              <h2 className="mt-2 text-4xl">Mulheres em todos os tempos.</h2>
              <p className="opacity-80">Explore histórias por período histórico e veja como elas transformaram o presente.</p>
            </div>
            <p className="hidden font-hand text-3xl opacity-70 md:block">"A história também<br />nos pertence."</p>
          </div>
          <div className="relative mt-10">
            <div className="absolute left-0 right-0 top-2 h-px bg-primary-foreground/40" />
            <div className="relative flex justify-around">
              {seculos.map((s, i) => (
                <div key={s} className="flex flex-col items-center gap-3">
                  <span className={`h-4 w-4 rounded-full ${i === 0 ? "bg-accent" : "bg-primary-foreground"}`} />
                  <Link to="/pesquisar" search={{ seculo: s }} className="text-sm hover:underline">Século {s}</Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="flex items-center justify-center gap-2 py-6 text-sm text-muted-foreground">
        <Flower2 className="h-4 w-4" /> Mulheres Esquecidas da América Latina
      </footer>
    </main>
  );
}