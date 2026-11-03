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
    this.http
      .get<Livro[]>('livros.json')                     // GET relativo: o servidor de dev serve a pasta public/
      .pipe(
        delay(800),                                    // SIMULA uma rede lenta para você ver o "Carregando..."
        retry(2),                                      // se falhar, tenta mais 2 vezes antes de desistir
        catchError(() => {                             // se ainda assim falhar, não deixa o app quebrar
          this.erro.set('Não foi possível carregar o acervo.');
          return of([] as Livro[]);                    // devolve lista vazia no lugar do erro
        }),
        finalize(() => this.carregando.set(false)),    // roda no FIM (sucesso ou erro): desliga o "carregando"
      )
      .subscribe((lista) => this.livrosSubject.next(lista));   // aqui sim assinamos: é uma chamada "dispare e esqueça" que completa sozinha
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
