// ===== TODO (leia o LEIAME.md) =====
// 1. Crie const CHAVE = 'biblioteca:livros' e const LIVROS_INICIAIS: Livro[] = [...] FORA da classe.
// 2. Crie o método private carregar(): Livro[] (localStorage.getItem + JSON.parse, ou LIVROS_INICIAIS se for null).
// 3. Inicialize: private _livros = signal<Livro[]>(this.carregar());
// 4. No constructor crie effect(() => localStorage.setItem(CHAVE, JSON.stringify(this._livros())));
// 5. Crie restaurar(): void -> this._livros.set(LIVROS_INICIAIS); e um botão "Restaurar acervo" no app.html.
// 6. Adicione changeDetection: ChangeDetectionStrategy.OnPush em CardLivro, ResumoBiblioteca e BuscaLivro.
// livro-service.ts - o MESMO service de segunda, agora com valores DERIVADOS (computed) e um EFEITO (effect).
import { Service, computed, effect, signal } from '@angular/core';
import { Livro } from '../models/livro';

@Service()   // Angular 22 (antes: @Injectable({ providedIn: 'root' }))
export class LivroService {
  // signal<T>(valorInicial) cria um valor REATIVO (já usamos na segunda). Ler = chamar como função: this._livros().
  // Escrever = .set(novoValor) ou .update(fn). Quem lê dentro do template é avisado automaticamente.
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

  // Versão SOMENTE LEITURA para o resto do app: quem está fora não consegue chamar set/update.
  readonly livros = this._livros.asReadonly();

  // computed = valor DERIVADO. Recalcula sozinho quando um signal lido dentro dele muda
  // e fica em cache (memoizado) quando nada mudou. Não é possível escrever em um computed.
  readonly total = computed(() => this._livros().length);
  readonly totalDisponiveis = computed(() => this._livros().filter((l) => l.disponivel).length);
  readonly totalEmprestados = computed(() => this.total() - this.totalDisponiveis());  // computed lendo outros computed

  constructor() {
    // effect = EFEITO COLATERAL (log, localStorage, analytics). Roda uma vez no início e
    // de novo sempre que algum signal lido dentro dele mudar (aqui: totalDisponiveis e total).
    effect(() => {
      console.log(`[effect] ${this.totalDisponiveis()} disponíveis de ${this.total()}`);
    });
  }

  emprestar(id: number): void {
    this.alterarDisponibilidade(id, false);
  }

  devolver(id: number): void {
    this.alterarDisponibilidade(id, true);
  }

  private alterarDisponibilidade(id: number, disponivel: boolean): void {
    // update(fn): recebe a lista ATUAL e devolve uma lista NOVA. Não alteramos o objeto antigo (imutabilidade),
    // por isso o Angular consegue comparar "antes x depois" e saber que mudou.
    this._livros.update((lista) =>
      lista.map((l) => (l.id === id ? { ...l, disponivel } : l))   // {...l, disponivel} copia o livro trocando só um campo
    );
  }
}
