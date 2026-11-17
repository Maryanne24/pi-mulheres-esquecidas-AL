import { useMemo, useState } from "react";
import { geoMercator, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import world from "world-atlas/countries-110m.json";
import { paisesMapa } from "@/lib/mulheres";

type Props = { contagem: Record<string, number>; selecionado: string; onSelect: (pais: string) => void };

export function MapaAmerica({ contagem, selecionado, onSelect }: Props) {
  const [hover, setHover] = useState<{ nome: string; x: number; y: number } | null>(null);
  const formas = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const fc = feature(world as any, (world as any).objects.countries) as any;
    const feats = fc.features.filter((f: any) => paisesMapa[f.properties.name]);
    const proj = geoMercator().fitSize([500, 620], { type: "FeatureCollection", features: feats });
    const path = geoPath(proj);
    return feats.map((f: any) => ({ nome: paisesMapa[f.properties.name]!.nome, d: path(f) ?? "" }));
  }, []);

  return (
    <div className="relative" onMouseLeave={() => setHover(null)}>
      <svg viewBox="0 0 500 620" className="w-full" role="img" aria-label="Mapa da América Latina">
        {formas.map((f: { nome: string; d: string }) => (
          <path key={f.nome} d={f.d} aria-label={f.nome}
            className={`cursor-pointer stroke-background transition-colors ${selecionado === f.nome ? "fill-accent" : "fill-primary hover:fill-muted-foreground"}`}
            strokeWidth={0.8}
            onMouseMove={(e) => {
              const r = (e.currentTarget.ownerSVGElement as SVGSVGElement).getBoundingClientRect();
              setHover({ nome: f.nome, x: e.clientX - r.left, y: e.clientY - r.top });
            }}
            onClick={() => onSelect(f.nome)} />
        ))}
      </svg>
      {hover && (
        <div className="pointer-events-none absolute z-10 rounded bg-foreground px-3 py-1.5 text-sm text-background shadow"
          style={{ left: hover.x + 12, top: hover.y + 12 }}>
          <p className="font-bold">{hover.nome}</p>
          <p>{contagem[hover.nome] ?? 0} {(contagem[hover.nome] ?? 0) === 1 ? "mulher esquecida" : "mulheres esquecidas"}</p>
        </div>
      )}
    </div>
  );
}