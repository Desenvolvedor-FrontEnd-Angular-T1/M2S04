// livro.service.ts - o SERVICE: classe responsável pelos DADOS e pelas REGRAS dos livros.
// Gerado com: ng g s services/livro
import { Injectable, signal } from '@angular/core';   // Injectable = decorator | signal = valor reativo
import { Livro } from '../models/livro';      // o contrato (interface) de um livro

// @Injectable({ providedIn: 'root' }) = "esta classe é um service: o Angular sabe criá-la e entregá-la a quem pedir".
// providedIn: 'root' => SINGLETON: UMA instância para a aplicação inteira.
// (NO ANGULAR 22, o curso usa o atalho @Service() - veja o LEIAME desta pasta.)
@Injectable({ providedIn: 'root' })
export class LivroService {
  // signal<T>(inicial) = "caixinha" que guarda um valor e AVISA a tela quando ele muda.
  //   ler    -> this._livros()            (chamar como função)
  //   trocar -> this._livros.update(...)  (amanhã aprofundamos signals)
  // private + "_" = só o service altera a lista (encapsulamento).
  private _livros = signal<Livro[]>([
    { id: 1, titulo: 'JavaScript para Iniciantes', autor: 'Ana Souza', categoria: 'Programação', paginas: 280, disponivel: true, imagem: 'https://picsum.photos/seed/livro1/300/180' },
    { id: 2, titulo: 'CSS Moderno', autor: 'Carlos Lima', categoria: 'Design', paginas: 190, disponivel: true, imagem: 'https://picsum.photos/seed/livro2/300/180' },
    { id: 3, titulo: 'HTML Semântico', autor: 'Fernanda Rocha', categoria: 'Programação', paginas: 150, disponivel: false, imagem: 'https://picsum.photos/seed/livro3/300/180' },
    { id: 4, titulo: 'Lógica de Programação', autor: 'Marcos Silva', categoria: 'Programação', paginas: 320, disponivel: true, imagem: 'https://picsum.photos/seed/livro4/300/180' },
    { id: 5, titulo: 'Banco de Dados na Prática', autor: 'Juliana Costa', categoria: 'Banco de Dados', paginas: 410, disponivel: true, imagem: 'https://picsum.photos/seed/livro5/300/180' },
    { id: 6, titulo: 'UX para Devs', autor: 'Lucas Pereira', categoria: 'Design', paginas: 230, disponivel: false, imagem: 'https://picsum.photos/seed/livro6/300/180' },
    { id: 7, titulo: 'Node.js na Prática', autor: 'Eduardo Martins', categoria: 'Programação', paginas: 360, disponivel: true, imagem: 'https://picsum.photos/seed/livro7/300/180' },
    { id: 8, titulo: 'Angular Completo', autor: 'Roberta Santos', categoria: 'Programação', paginas: 480, disponivel: true, imagem: 'https://picsum.photos/seed/livro8/300/180' },
  ]);

  // Versão SOMENTE LEITURA para o resto do app: quem está fora lê livros(), mas não consegue dar set/update.
  readonly livros = this._livros.asReadonly();

  constructor() {
    // Este log aparece UMA vez no console, mesmo com vários componentes usando o service = prova do singleton.
    console.log('LivroService criado');
  }

  // Regra de negócio: emprestar = marcar como indisponível.
  emprestar(id: number): void {
    this.alterarDisponibilidade(id, false);
  }

  // Regra de negócio: devolver = marcar como disponível.
  devolver(id: number): void {
    this.alterarDisponibilidade(id, true);
  }

  // --- NOVO no Ex2: contadores usados pelo componente de resumo ---
  // Ao ler this._livros() DENTRO destes métodos, o template que os chama passa a ser avisado das mudanças.
  total(): number {
    return this._livros().length;                              // quantidade total de livros
  }

  totalDisponiveis(): number {
    return this._livros().filter((l) => l.disponivel).length;  // filter cria uma lista só com os disponíveis
  }

  totalEmprestados(): number {
    return this.total() - this.totalDisponiveis();             // o que não está disponível está emprestado
  }

  // Método auxiliar privado: evita repetir a busca nos dois métodos acima (DRY).
  private alterarDisponibilidade(id: number, disponivel: boolean): void {
    // update recebe a lista ATUAL e devolve uma lista NOVA (imutabilidade).
    // {...l, disponivel} copia o livro trocando só um campo; assim o Angular percebe que "mudou".
    this._livros.update((lista) => lista.map((l) => (l.id === id ? { ...l, disponivel } : l)));
  }
}
