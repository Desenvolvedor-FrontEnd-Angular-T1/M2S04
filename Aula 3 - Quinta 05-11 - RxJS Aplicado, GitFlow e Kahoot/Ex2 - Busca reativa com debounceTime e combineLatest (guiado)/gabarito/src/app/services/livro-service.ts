// livro-service.ts - o estado agora vive em um BehaviorSubject (RxJS) em vez de um signal.
import { Service, inject } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Livro } from '../models/livro';
import { NotificacaoService } from './notificacao-service';

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

@Service()
export class LivroService {
  private notificacao = inject(NotificacaoService);   // DI entre services (segunda-feira!)

  // BehaviorSubject<T>(inicial): SEMPRE tem um valor atual e o entrega a quem se inscreve (mesmo depois).
  private livrosSubject = new BehaviorSubject<Livro[]>(LIVROS_INICIAIS);

  // Observable somente-leitura para o resto do app. Convenção: nomes de Observable terminam com $.
  readonly livros$ = this.livrosSubject.asObservable();

  // Observable DERIVADO: transforma a lista em um resumo. Recalcula a cada nova lista emitida.
  readonly totais$ = this.livros$.pipe(
    map((lista) => ({
      total: lista.length,
      disponiveis: lista.filter((l) => l.disponivel).length,
      emprestados: lista.filter((l) => !l.disponivel).length,
    })),
  );

  emprestar(id: number): void {
    this.alterarDisponibilidade(id, false);
  }

  devolver(id: number): void {
    this.alterarDisponibilidade(id, true);
  }

  private alterarDisponibilidade(id: number, disponivel: boolean): void {
    const atual = this.livrosSubject.getValue();   // getValue() lê o valor atual do BehaviorSubject
    const nova = atual.map((l) => (l.id === id ? { ...l, disponivel } : l));   // lista NOVA (imutável)
    this.livrosSubject.next(nova);                 // next() publica a nova lista para TODOS os assinantes
    const livro = nova.find((l) => l.id === id);
    if (livro) {
      this.notificacao.avisar(`"${livro.titulo}" foi ${disponivel ? 'devolvido' : 'emprestado'}.`);
    }
  }
}
