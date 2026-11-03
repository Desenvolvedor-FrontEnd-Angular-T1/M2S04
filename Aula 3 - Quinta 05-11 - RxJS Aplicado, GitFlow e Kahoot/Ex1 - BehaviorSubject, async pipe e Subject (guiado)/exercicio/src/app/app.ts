// app.ts - o componente só LÊ o signal do service e delega as ações.
import { Component, inject } from '@angular/core';
import { CardLivro } from './card-livro/card-livro';
import { ResumoBiblioteca } from './resumo-biblioteca/resumo-biblioteca';
import { LivroService } from './services/livro-service';

@Component({
  selector: 'app-root',
  imports: [CardLivro, ResumoBiblioteca],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  titulo = 'Listagem de livros';
  private livroService = inject(LivroService);

  // Não é mais um getter: guardamos a referência do signal e o TEMPLATE o lê com livros().
  livros = this.livroService.livros;

  emprestar(id: number): void {
    this.livroService.emprestar(id);
  }

  devolver(id: number): void {
    this.livroService.devolver(id);
  }
}
