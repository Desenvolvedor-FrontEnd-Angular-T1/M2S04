// app.ts - o pai combina SIGNALS: termoBusca (escrita) + livros do service => livrosFiltrados (computed).
import { Component, computed, inject, signal } from '@angular/core';
import { BuscaLivro } from './busca-livro/busca-livro';
import { CardLivro } from './card-livro/card-livro';
import { ResumoBiblioteca } from './resumo-biblioteca/resumo-biblioteca';
import { LivroService } from './services/livro-service';

@Component({
  selector: 'app-root',
  imports: [CardLivro, ResumoBiblioteca, BuscaLivro],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  titulo = 'Listagem de livros';
  private livroService = inject(LivroService);

  // Signal de ESCRITA que está ligado ao input do filho por [(termo)].
  termoBusca = signal('');

  // computed depende de DOIS signals: a lista do service e o termo digitado.
  // Mudou qualquer um => recalcula. Nada mudou => devolve o valor em cache.
  livrosFiltrados = computed(() => {
    const termo = this.termoBusca().trim().toLowerCase();                   // normaliza o texto
    return this.livroService.livros().filter((l) => l.titulo.toLowerCase().includes(termo));
  });

  emprestar(id: number): void {
    this.livroService.emprestar(id);
  }

  devolver(id: number): void {
    this.livroService.devolver(id);
  }
}
