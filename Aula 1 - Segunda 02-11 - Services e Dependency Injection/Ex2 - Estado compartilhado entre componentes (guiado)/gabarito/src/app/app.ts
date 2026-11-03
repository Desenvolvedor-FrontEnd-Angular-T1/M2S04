// app.ts - agora o componente só cuida da TELA. Dados e regras vieram do LivroService.
import { Component, inject } from '@angular/core';   // inject = função que pede uma dependência ao Angular
import { CardLivro } from './card-livro/card-livro';
import { ResumoBiblioteca } from './resumo-biblioteca/resumo-biblioteca';
import { LivroService } from './services/livro-service';

@Component({
  selector: 'app-root',
  imports: [CardLivro, ResumoBiblioteca],   // NOVO: o componente de resumo também precisa ser importado
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  titulo = 'Listagem de livros';

  // inject(LivroService): o Angular procura o provider, cria (ou reaproveita) a instância e entrega aqui.
  // Repare: NÃO usamos "new LivroService()". Quem controla a criação é o Angular (Inversão de Controle).
  private livroService = inject(LivroService);

  // Guardamos a referência do SIGNAL; o template o lê com livros().
  livros = this.livroService.livros;

  // O componente apenas DELEGA a ação para o service (sem regra de negócio aqui).
  emprestar(id: number): void {
    this.livroService.emprestar(id);
  }

  devolver(id: number): void {
    this.livroService.devolver(id);
  }
}
