export type Categoria = 'Estudos' | 'Casa' | 'Trabalho';

export interface Tarefa {
  id: number;
  titulo: string;
  categoria: Categoria;
  concluida: boolean;
}
