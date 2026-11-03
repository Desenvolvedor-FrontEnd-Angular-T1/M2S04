// livro-service.ts - estado em signal + PERSISTÊNCIA automática no localStorage com effect().
import { Service, computed, effect, signal } from '@angular/core';
import { Livro } from '../models/livro';

// Chave única para não colidir com outras aplicações do mesmo domínio.
const CHAVE = 'biblioteca:livros';

// Dados originais fora da classe: usamos para a primeira visita e para o botão "Restaurar".
const LIVROS_INICIAIS: Livro[] = [
    { id: 1, titulo: 'JavaScript para Iniciantes', autor: 'Ana Souza', categoria: 'Programação', paginas: 280, disponivel: true, imagem: 'https://picsum.photos/seed/livro1/300/180' },
    { id: 2, titulo: 'CSS Moderno', autor: 'Carlos Lima', categoria: 'Design', paginas: 190, disponivel: true, imagem: 'https://picsum.photos/seed/livro2/300/180' },
    { id: 3, titulo: 'HTML Semântico', autor: 'Fernanda Rocha', categoria: 'Programação', paginas: 150, disponivel: false, imagem: 'https://picsum.photos/seed/livro3/300/180' },
    { id: 4, titulo: 'Lógica de Programação', autor: 'Marcos Silva', categoria: 'Programação', paginas: 320, disponivel: true, imagem: 'https://picsum.photos/seed/livro4/300/180' },
    { id: 5, titulo: 'Banco de Dados na Prática', autor: 'Juliana Costa', categoria: 'Banco de Dados', paginas: 410, disponivel: true, imagem: 'https://picsum.photos/seed/livro5/300/180' },
    { id: 6, titulo: 'UX para Devs', autor: 'Lucas Pereira', categoria: 'Design', paginas: 230, disponivel: false, imagem: 'https://picsum.photos/seed/livro6/300/180' },
    { id: 7, titulo: 'Node.js na Prática', autor: 'Eduardo Martins', categoria: 'Programação', paginas: 360, disponivel: true, imagem: 'https://picsum.photos/seed/livro7/300/180' },
    { id: 8, titulo: 'Angular Completo', autor: 'Roberta Santos', categoria: 'Programação', paginas: 480, disponivel: true, imagem: 'https://picsum.photos/seed/livro8/300/180' },
];

@Service()   // Angular 22 (antes: @Injectable({ providedIn: 'root' }))
export class LivroService {
  // O valor inicial vem do localStorage (se existir) ou da lista original. Chamamos carregar() uma vez.
  private _livros = signal<Livro[]>(this.carregar());
  readonly livros = this._livros.asReadonly();
  readonly total = computed(() => this._livros().length);
  readonly totalDisponiveis = computed(() => this._livros().filter((l) => l.disponivel).length);
  readonly totalEmprestados = computed(() => this.total() - this.totalDisponiveis());

  constructor() {
    // EFFECT de persistência: sempre que _livros mudar, salva. É o uso "clássico" de effect:
    // sincronizar o estado com algo FORA do Angular (localStorage, título da aba, analytics...).
    effect(() => {
      localStorage.setItem(CHAVE, JSON.stringify(this._livros()));  // localStorage só guarda TEXTO => JSON.stringify
    });
  }

  emprestar(id: number): void {
    this.alterarDisponibilidade(id, false);
  }

  devolver(id: number): void {
    this.alterarDisponibilidade(id, true);
  }

  // Volta ao acervo original (e o effect grava o resultado sozinho).
  restaurar(): void {
    this._livros.set(LIVROS_INICIAIS);
  }

  private alterarDisponibilidade(id: number, disponivel: boolean): void {
    this._livros.update((lista) => lista.map((l) => (l.id === id ? { ...l, disponivel } : l)));
  }

  // Lê do localStorage. Na primeira visita a chave não existe e getItem devolve null (lembra da S11?).
  private carregar(): Livro[] {
    const salvo = localStorage.getItem(CHAVE);
    return salvo ? (JSON.parse(salvo) as Livro[]) : LIVROS_INICIAIS;   // JSON.parse converte texto => objeto
  }
}
