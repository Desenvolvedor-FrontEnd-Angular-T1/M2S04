// ===== TODO (leia o LEIAME.md) =====
// 0. Copie public/livros.json para a pasta public/ do seu projeto e acrescente provideHttpClient() ao seu app.config.ts.
// 1. Injete o HttpClient (inject) neste service.  2. Complete o método carregar() (TODO 2).
// 3. Teste o ERRO: renomeie 'livros.json' para 'livros-x.json' no get() e veja o aviso + botão "Tentar novamente".
// livro-service.ts - agora os livros vêm de um ARQUIVO via HTTP (como viriam de uma API real).
import { Service, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, delay, finalize, map, of, retry } from 'rxjs';
import { Livro } from '../models/livro';
import { NotificacaoService } from './notificacao-service';

@Service()
export class LivroService {
  private http = inject(HttpClient);                   // cliente HTTP do Angular (devolve Observables)
  private notificacao = inject(NotificacaoService);

  // Começa vazio: os dados chegam DEPOIS da resposta HTTP.
  private livrosSubject = new BehaviorSubject<Livro[]>([]);
  readonly livros$ = this.livrosSubject.asObservable();
  readonly totais$ = this.livros$.pipe(
    map((lista) => ({
      total: lista.length,
      disponiveis: lista.filter((l) => l.disponivel).length,
      emprestados: lista.filter((l) => !l.disponivel).length,
    })),
  );

  // Estados de tela como signals: carregando e erro.
  readonly carregando = signal(false);
  readonly erro = signal<string | null>(null);

  constructor() {
    this.carregar();   // dispara a primeira busca assim que o service é criado
  }

  carregar(): void {
    this.carregando.set(true);
    this.erro.set(null);
    // TODO 2: this.http.get<Livro[]>('livros.json').pipe(
    //           delay(800),                      // simula rede lenta
    //           retry(2),                        // tenta de novo em caso de falha
    //           catchError(() => { this.erro.set('Não foi possível carregar o acervo.'); return of([] as Livro[]); }),
    //           finalize(() => this.carregando.set(false)),
    //         ).subscribe(lista => this.livrosSubject.next(lista));
    this.carregando.set(false);
  }

  emprestar(id: number): void {
    this.alterarDisponibilidade(id, false);
  }

  devolver(id: number): void {
    this.alterarDisponibilidade(id, true);
  }

  private alterarDisponibilidade(id: number, disponivel: boolean): void {
    const nova = this.livrosSubject.getValue().map((l) => (l.id === id ? { ...l, disponivel } : l));
    this.livrosSubject.next(nova);
    const livro = nova.find((l) => l.id === id);
    if (livro) {
      this.notificacao.avisar(`"${livro.titulo}" foi ${disponivel ? 'devolvido' : 'emprestado'}.`);
    }
  }
}
