const arquivos = import.meta.glob(
  "../assets/retratos/*.{jpg,jpeg,jfif,webp,png}",
  {
    eager: true,
    query: "?url",
    import: "default",
  }
) as Record<string, string>;

export const retratos: Record<string, string> = Object.fromEntries(
  Object.entries(arquivos).map(([caminho, url]) => {
    const nome = caminho.split("/").pop()!.replace(/\.[^.]+$/, "");
    return [nome, url];
  })
);