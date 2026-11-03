// app.ts - BUSCA REATIVA: combina TRÊS fontes de dados (lista, texto digitado e categoria) em um único Observable.
import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject, Subject, combineLatest, debounceTime, distinctUntilChanged, map, startWith } from 'rxjs';
import { CardLivro } from './card-livro/card-livro';
import { ResumoBiblioteca } from './resumo-biblioteca/resumo-biblioteca';
import { Toast } from './toast/toast';
import { LivroService } from './services/livro-service';

@Component({
  selector: 'app-root',
  imports: [CardLivro, ResumoBiblioteca, Toast, AsyncPipe],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  titulo = 'Listagem de livros';
  private livroService = inject(LivroService);

  // Fonte 1: todos os livros (vem do service).
  private livros$ = this.livroService.livros$;

  // Fonte 2: o texto digitado. Subject = "evento": cada tecla vira um next().
  private termoDigitado$ = new Subject<string>();

  // Fonte 3: categoria escolhida. BehaviorSubject = "estado": sempre tem um valor atual ('Todas').
  private categoriaEscolhida$ = new BehaviorSubject<string>('Todas');

  // Tratamento do texto digitado: espera o usuário parar de digitar e ignora repetições.
  // TODO 1: crie termo$ = this.termoDigitado$.pipe(debounceTime(300), distinctUntilChanged(), map(t => t.trim().toLowerCase()), startWith(''))
  private termo$ = this.termoDigitado$;   // <- versão SEM tratamento (filtra a cada tecla); troque pela do TODO 1

  // Lista de categorias para o <select>, derivada dos próprios livros (sem repetir).
  categorias$ = this.livros$.pipe(
    // TODO 3: devolva ['Todas', ...categorias sem repetição] (dica: new Set(lista.map(l => l.categoria)))
    map((lista) => ['Todas', ...lista.map((l) => l.categoria)]),   // <- repete categorias! corrija com Set
  );

  // combineLatest: sempre que QUALQUER uma das fontes emitir, recalcula usando o ÚLTIMO valor de cada uma.
  // TODO 2: combineLatest([this.livros$, this.termo$, this.categoriaEscolhida$]).pipe(map(([livros, termo, categoria]) => livros.filter(...)))
  //         Regra: o título inclui o termo E (categoria é 'Todas' OU igual à do livro).
  livrosFiltrados$ = this.livros$;

  // toSignal: ponte Observable -> Signal. Útil para valores simples no template (sem async pipe).
  quantidade = toSignal(this.livrosFiltrados$.pipe(map((l) => l.length)), { initialValue: 0 });

  aoDigitar(evento: Event): void {
    this.termoDigitado$.next((evento.target as HTMLInputElement).value);   // publica o texto no Subject
  }

  aoEscolherCategoria(evento: Event): void {
    this.categoriaEscolhida$.next((evento.target as HTMLSelectElement).value);
  }

  emprestar(id: number): void {
    this.livroService.emprestar(id);
  }

  devolver(id: number): void {
    this.livroService.devolver(id);
  }
}
