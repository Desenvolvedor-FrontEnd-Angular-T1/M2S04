// app.ts - sem subscribe manual: o template assina livros$ com o async pipe.
import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
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
  livros$ = this.livroService.livros$;     // Observable<Livro[]>

  emprestar(id: number): void {
    this.livroService.emprestar(id);
  }

  devolver(id: number): void {
    this.livroService.devolver(id);
  }
}
