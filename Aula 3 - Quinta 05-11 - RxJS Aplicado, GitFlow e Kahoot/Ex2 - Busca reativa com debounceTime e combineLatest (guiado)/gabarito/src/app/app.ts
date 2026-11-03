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
  private termo$ = this.termoDigitado$.pipe(
    debounceTime(300),                        // só segue 300 ms DEPOIS da última tecla (evita filtrar a cada letra)
    distinctUntilChanged(),                   // se o texto final for igual ao anterior, ignora
    map((t) => t.trim().toLowerCase()),       // normaliza
    startWith(''),                            // valor inicial: combineLatest só emite quando TODAS as fontes já emitiram
  );

  // Lista de categorias para o <select>, derivada dos próprios livros (sem repetir).
  categorias$ = this.livros$.pipe(
    map((lista) => ['Todas', ...new Set(lista.map((l) => l.categoria))]),   // Set remove duplicados
  );

  // combineLatest: sempre que QUALQUER uma das fontes emitir, recalcula usando o ÚLTIMO valor de cada uma.
  livrosFiltrados$ = combineLatest([this.livros$, this.termo$, this.categoriaEscolhida$]).pipe(
    map(([livros, termo, categoria]) =>
      livros.filter(
        (l) =>
          l.titulo.toLowerCase().includes(termo) &&                // filtro por texto
          (categoria === 'Todas' || l.categoria === categoria),    // filtro por categoria
      ),
    ),
  );

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
