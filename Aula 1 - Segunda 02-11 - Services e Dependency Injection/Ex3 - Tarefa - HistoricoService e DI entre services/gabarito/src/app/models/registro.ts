// registro.ts - o contrato de uma linha do histórico.
export interface Registro {
  acao: 'emprestimo' | 'devolucao';   // "union type": só aceita um destes dois textos (evita erro de digitação)
  titulo: string;                     // título do livro afetado
  data: Date;                         // quando aconteceu
}
