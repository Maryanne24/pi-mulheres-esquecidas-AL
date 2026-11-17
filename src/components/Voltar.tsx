import { Link } from "@tanstack/react-router";
import { ArrowLeft, UserRound } from "lucide-react";
import type { Mulher } from "@/lib/mulheres";

export function Voltar() {
  return (
    <Link to="/" className="inline-flex items-center gap-2 rounded bg-primary px-5 py-1.5 text-sm text-primary-foreground">
      <ArrowLeft className="h-4 w-4" /> Voltar
    </Link>
  );
}

export function Retrato({ m, className = "" }: { m: Mulher; className?: string }) {
  return m.img ? (
    <img src={m.img} alt={m.nome} className={`object-cover ${className}`} />
  ) : (
    <div className={`flex items-center justify-center bg-muted ${className}`}><UserRound className="h-1/2 w-1/2 text-muted-foreground" /></div>
  );
}
