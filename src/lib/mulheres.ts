import biografias from "./biografias.json";
import { retratos } from "./retratos";

export type Mulher = {
  slug: string; nome: string; pais: string; bandeira: string; categorias: string[]; seculo: string;
  resumo: string; img?: string | undefined; biografia: string; contribuicoes: string[]; fontes: string[];
};

export const paisesMapa: Record<string, { nome: string; bandeira: string }> = {
  Mexico: { nome: "México", bandeira: "🇲🇽" }, "Costa Rica": { nome: "Costa Rica", bandeira: "🇨🇷" },
  Cuba: { nome: "Cuba", bandeira: "🇨🇺" }, "El Salvador": { nome: "El Salvador", bandeira: "🇸🇻" },
  Guatemala: { nome: "Guatemala", bandeira: "🇬🇹" }, Haiti: { nome: "Haiti", bandeira: "🇭🇹" },
  Honduras: { nome: "Honduras", bandeira: "🇭🇳" }, Nicaragua: { nome: "Nicarágua", bandeira: "🇳🇮" },
  Panama: { nome: "Panamá", bandeira: "🇵🇦" }, "Dominican Rep.": { nome: "República Dominicana", bandeira: "🇩🇴" },
  Argentina: { nome: "Argentina", bandeira: "🇦🇷" }, Bolivia: { nome: "Bolívia", bandeira: "🇧🇴" },
  Brazil: { nome: "Brasil", bandeira: "🇧🇷" }, Chile: { nome: "Chile", bandeira: "🇨🇱" },
  Colombia: { nome: "Colômbia", bandeira: "🇨🇴" }, Ecuador: { nome: "Equador", bandeira: "🇪🇨" },
  Paraguay: { nome: "Paraguai", bandeira: "🇵🇾" }, Peru: { nome: "Peru", bandeira: "🇵🇪" },
  Uruguay: { nome: "Uruguai", bandeira: "🇺🇾" }, Venezuela: { nome: "Venezuela", bandeira: "🇻🇪" },
};

const outrasBandeiras: Record<string, string> = {
  Itália: "🇮🇹", Portugal: "🇵🇹", "Porto Rico": "🇵🇷", Espanha: "🇪🇸", França: "🇫🇷", Israel: "🇮🇱", Tchecoslováquia: "🇨🇿",
};
const bandeiraDe = (p: string) => Object.values(paisesMapa).find((x) => x.nome === p)?.bandeira ?? outrasBandeiras[p] ?? "🌎";

const slugify = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

type Linha = [nome: string, pais: string, categorias: string[], seculo: "XX" | "XXI", resumo: string];

const A = "Arte", P = "Política", E = "Educação", L = "Literatura", C = "Ciência", M = "Movimentos sociais";

const dados: Linha[] = [
  // Arte
  ["Feliza Bursztyn", "Colômbia", [A], "XX", "Escultora que criou obras com sucata e materiais industriais, inovando na arte moderna colombiana."],
  ["Mónica Mayer", "México", [A], "XXI", "Artista pioneira da arte feminista; usou performances e instalações para discutir a experiência das mulheres."],
  ["Letícia Parente", "Brasil", [A], "XX", "Artista multimídia que explorou o corpo, a identidade e a crítica social em vídeos e fotografias."],
  ["Teresinha Soares", "Brasil", [A], "XX", "Artista visual que abordou temas como o corpo feminino, a sexualidade e a liberdade."],
  ["Margarita Azurdia", "Guatemala", [A], "XX", "Pintora e escultora que experimentou diferentes estilos e contribuiu para a arte contemporânea guatemalteca."],
  ["Teresa Burga", "Peru", [A], "XX", "Artista conceitual que trabalhou com instalações, desenhos e tecnologias para questionar a sociedade."],
  ["Victoria Santa Cruz", "Peru", [A], "XX", "Artista, coreógrafa e pesquisadora que valorizou a cultura afro-peruana por meio da dança e da música."],
  ["Lygia Pape", "Brasil", [A], "XX", "Artista do movimento neoconcreto, conhecida por obras que exploravam formas geométricas e a participação do público."],
  ["Ana Mendieta", "Cuba", [A], "XX", "Artista que combinou performance, fotografia e natureza para explorar identidade, corpo e pertencimento."],
  ["Cecilia Vicuña", "Chile", [A], "XXI", "Artista e poeta que aborda memória, cultura indígena, meio ambiente e linguagem."],
  // Política
  ["Prudencia Ayala", "El Salvador", [P], "XX", "Escritora e ativista que se candidatou à presidência em 1930, defendendo os direitos das mulheres."],
  ["Elvia Carrillo Puerto", "México", [P], "XX", "Política e feminista que lutou pelo voto feminino e pelos direitos das mulheres trabalhadoras."],
  ["Bertha Lutz", "Brasil", [P, C], "XX", "Bióloga e especialista em anfíbios que teve papel importante na conquista do voto feminino e na defesa dos direitos das mulheres."],
  ["Julieta Lanteri", "Itália", [P], "XX", "Médica e política que se destacou na Argentina pela luta pelo sufrágio feminino."],
  ["Paulina Luisi", "Argentina", [P], "XX", "Médica e feminista que atuou no Uruguai em defesa dos direitos das mulheres e da educação sexual."],
  ["Clara González", "Panamá", [P], "XX", "Advogada e política, foi uma das principais lideranças na luta pelos direitos políticos das mulheres panamenhas."],
  ["Ofelia Domínguez Navarro", "Cuba", [P], "XX", "Advogada, escritora e feminista que defendeu a igualdade de direitos e o sufrágio feminino."],
  ["Celina Guimarães Viana", "Brasil", [P], "XX", "Professora que se tornou a primeira mulher a votar no Brasil, em 1928."],
  ["Alzira Soriano", "Brasil", [P], "XX", "Primeira mulher eleita prefeita no Brasil, em 1928, no município de Lajes, no Rio Grande do Norte."],
  ["María Remedios del Valle", "Argentina", [P], "XX", "Afro-argentina que participou das guerras de independência e ficou conhecida como “Mãe da Pátria”."],
  ["Marielle Franco", "Brasil", [P], "XXI", "Socióloga e vereadora do Rio de Janeiro que defendeu os direitos humanos e das populações marginalizadas."],
  ["Maria da Conceição Tavares", "Portugal", [P], "XX", "Economista e professora que se tornou uma importante referência no debate sobre desenvolvimento econômico no Brasil; também foi deputada federal."],
  // Educação
  ["Olga Cossettini", "Argentina", [E], "XX", "Professora que promoveu métodos de ensino inovadores, valorizando a criatividade e a participação dos alunos."],
  ["Gabriela Mistral", "Chile", [E], "XX", "Poeta e educadora que defendeu a educação pública e se tornou a primeira latino-americana a ganhar o Nobel de Literatura."],
  ["Nísia Floresta", "Brasil", [E], "XX", "Educadora e escritora que defendeu a educação das mulheres e a igualdade de direitos."],
  ["Ana Roqué de Duprey", "Porto Rico", [E], "XX", "Educadora, escritora e cientista que fundou escolas e lutou pelos direitos das mulheres."],
  ["Enriqueta Compte y Riqué", "Espanha", [E], "XX", "Educadora que fundou o primeiro jardim de infância público do Uruguai."],
  ["Salomé Ureña", "República Dominicana", [E], "XX", "Poeta e educadora que fundou uma instituição dedicada à formação de professoras."],
  ["Carmen Lyra", "Costa Rica", [E], "XX", "Professora e escritora que contribuiu para a educação pública e a literatura infantil."],
  ["Olga Blinder", "Paraguai", [E], "XX", "Artista e educadora que ajudou a renovar o ensino de artes no Paraguai."],
  ["Hermelinda Urbina", "Equador", [E], "XX", "Pioneira da aviação, foi a primeira mulher equatoriana a obter licença de piloto."],
  ["Ida Holz", "Uruguai", [E], "XXI", "Engenheira e pioneira da informática, contribuiu para o desenvolvimento da computação e da internet no Uruguai."],
  ["Josefa Toledo de Aguerri", "Nicarágua", [E], "XX", "Educadora e feminista que modernizou o ensino e defendeu a educação das meninas."],
  // Literatura
  ["María Luisa Bombal", "Chile", [L], "XX", "Escritora conhecida por romances que exploram a vida interior das mulheres e questionam papéis de gênero."],
  ["Elena Garro", "México", [L], "XX", "Romancista e dramaturga que abordou memória, injustiça e desigualdade em suas obras."],
  ["Albalucía Ángel", "Colômbia", [L], "XXI", "Escritora que inovou na literatura colombiana ao explorar a experiência feminina e a experimentação narrativa."],
  ["Inés Arredondo", "México", [L], "XX", "Contista que escreveu sobre relações humanas, desejo e conflitos morais."],
  ["Rosario Castellanos", "México", [L], "XX", "Escritora e intelectual que discutiu a desigualdade de gênero e a situação dos povos indígenas."],
  ["Teresa de la Parra", "Venezuela", [L], "XX", "Escritora venezuelana nascida em Paris, conhecida por obras que analisam a condição das mulheres."],
  ["Rosario Ferré", "Porto Rico", [L], "XX", "Escritora que abordou identidade, classe social e gênero em contos e romances."],
  ["María Enriqueta Camarillo", "México", [L], "XX", "Poetisa e romancista que também escreveu literatura infantil."],
  ["Mercedes Cabello de Carbonera", "Peru", [L], "XX", "Escritora que criticou as desigualdades sociais e a situação das mulheres no século XIX."],
  ["Lindaura Anzoátegui Campero", "Bolívia", [L], "XX", "Escritora e poeta que também participou da vida política boliviana."],
  ["Edwidge Danticat", "Haiti", [L], "XXI", "Escritora cujos livros abordam a história, a família e a experiência da diáspora haitiana."],
  ["Yolanda Bedregal", "Bolívia", [L], "XX", "Poeta e romancista reconhecida por sua contribuição à literatura boliviana."],
  // Ciência
  ["Idelisa Bonnelly", "República Dominicana", [C], "XX", "Bióloga marinha conhecida como pioneira na conservação de baleias e mamíferos marinhos no Caribe."],
  ["Cecilia Grierson", "Argentina", [C], "XX", "Primeira médica da Argentina; também promoveu a enfermagem e a educação em saúde."],
  ["Sonia Guimarães", "Brasil", [C], "XXI", "Física, primeira mulher negra brasileira a obter doutorado em Física."],
  ["Mayana Zatz", "Israel", [C], "XXI", "Geneticista que se mudou para o Brasil na infância e se destacou na pesquisa de doenças genéticas e células-tronco."],
  ["Johanna Döbereiner", "Tchecoslováquia", [C], "XX", "Agrônoma que viveu e trabalhou no Brasil; suas pesquisas sobre bactérias fixadoras de nitrogênio contribuíram para a agricultura."],
  ["Rebeca Gerschman", "Argentina", [C], "XX", "Fisiologista que pesquisou os efeitos do oxigênio e dos radicais livres no organismo."],
  ["Evangelina Villegas", "México", [C], "XX", "Química agrícola que contribuiu para o desenvolvimento de variedades de milho com maior valor nutricional."],
  ["Ana María Cetto", "México", [C], "XXI", "Física que trabalhou em mecânica quântica e na promoção da ciência e da paz."],
  ["Amalia Dutra", "Brasil", [C], "XX", "Matemática e educadora que contribuiu para o ensino e a divulgação da matemática no Brasil."],
  ["María Elena Bottazzi", "Honduras", [C], "XXI", "Microbiologista e pesquisadora que contribuiu para o desenvolvimento de vacinas e para a saúde global."],
  // Movimentos sociais
  ["María Elena Moyano", "Peru", [M], "XX", "Liderança comunitária que lutou contra a pobreza e a violência política."],
  ["Rigoberta Menchú", "Guatemala", [M], "XXI", "Ativista indígena que defendeu os direitos dos povos indígenas e recebeu o Nobel da Paz em 1992."],
  ["Lohana Berkins", "Argentina", [M], "XXI", "Ativista trans que lutou pelos direitos das pessoas trans e pela igualdade."],
  ["Laudelina de Campos Melo", "Brasil", [M], "XX", "Ativista que organizou trabalhadoras domésticas e lutou por seus direitos."],
  ["Bartolina Sisa", "Bolívia", [M], "XX", "Líder indígena aimará que participou da resistência contra o domínio colonial espanhol."],
  ["Carolina Contreras", "República Dominicana", [M], "XXI", "Empreendedora e ativista que promove a valorização da identidade e da beleza afro-latina."],
  ["Rebeca Lane", "Guatemala", [M], "XXI", "Artista e ativista feminista que usa a música e a poesia para abordar desigualdade e violência de gênero."],
  ["Marta Guarani Kaiowá", "Brasil", [M], "XXI", "Liderança indígena que defende os direitos territoriais e a cultura do povo Guarani Kaiowá."],
];

export const mulheres: Mulher[] = dados.map(([nome, pais, categorias, seculo, resumo]) => {
  const slug = slugify(nome);
  const textos: Record<string, string> = biografias;
  return {
    slug, nome, pais, bandeira: bandeiraDe(pais), categorias, seculo, resumo,
    img: retratos[slug], biografia: textos[slug] ?? resumo,
    contribuicoes: [resumo], fontes: [],
  };
});

export const paises = [...new Set(mulheres.map((m) => m.pais))].sort((a, b) => a.localeCompare(b));
export const categorias = ["Arte", "Política", "Ciência", "Educação", "Movimentos sociais", "Literatura"];
export const seculos = ["XX", "XXI"];
export const destaquesSlugs = ["bertha-lutz", "ana-mendieta", "rosario-castellanos", "rigoberta-menchu"];