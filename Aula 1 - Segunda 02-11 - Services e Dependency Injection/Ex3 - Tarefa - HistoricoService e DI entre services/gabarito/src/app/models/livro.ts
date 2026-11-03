// Uma interface é um "contrato": descreve o FORMATO que todo livro precisa ter.
// Ela só existe em tempo de compilação (o TypeScript a apaga no JavaScript final).
export interface Livro {
  id: number;            // identificador único do livro
  titulo: string;        // nome do livro
  autor: string;         // quem escreveu
  categoria: string;     // usada nos filtros e no @switch da semana 3
  paginas: number;       // quantidade de páginas
  disponivel: boolean;   // true = na estante | false = emprestado
  imagem: string;        // URL da capa
}
