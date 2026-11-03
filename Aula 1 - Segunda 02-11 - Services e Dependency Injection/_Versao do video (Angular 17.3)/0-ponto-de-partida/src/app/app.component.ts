// app.component.ts - ESTADO FINAL DA SEMANA 3: os dados e as regras ainda moram DENTRO do componente.
// Hoje vamos descobrir por que isso vira problema e como o SERVICE resolve.
import { Component } from '@angular/core';
import { CardLivroComponent } from './card-livro/card-livro.component';
import { Livro } from './models/livro';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CardLivroComponent],            // componentes standalone usados no template precisam ser importados aqui
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  titulo = 'Listagem de livros';

  // PROBLEMA 1: os dados estão presos neste componente. Nenhum outro componente consegue enxergá-los.
  livros: Livro[] = [
    { id: 1, titulo: 'JavaScript para Iniciantes', autor: 'Ana Souza', categoria: 'Programação', paginas: 280, disponivel: true, imagem: 'https://picsum.photos/seed/livro1/300/180' },
    { id: 2, titulo: 'CSS Moderno', autor: 'Carlos Lima', categoria: 'Design', paginas: 190, disponivel: true, imagem: 'https://picsum.photos/seed/livro2/300/180' },
    { id: 3, titulo: 'HTML Semântico', autor: 'Fernanda Rocha', categoria: 'Programação', paginas: 150, disponivel: false, imagem: 'https://picsum.photos/seed/livro3/300/180' },
    { id: 4, titulo: 'Lógica de Programação', autor: 'Marcos Silva', categoria: 'Programação', paginas: 320, disponivel: true, imagem: 'https://picsum.photos/seed/livro4/300/180' },
    { id: 5, titulo: 'Banco de Dados na Prática', autor: 'Juliana Costa', categoria: 'Banco de Dados', paginas: 410, disponivel: true, imagem: 'https://picsum.photos/seed/livro5/300/180' },
    { id: 6, titulo: 'UX para Devs', autor: 'Lucas Pereira', categoria: 'Design', paginas: 230, disponivel: false, imagem: 'https://picsum.photos/seed/livro6/300/180' },
    { id: 7, titulo: 'Node.js na Prática', autor: 'Eduardo Martins', categoria: 'Programação', paginas: 360, disponivel: true, imagem: 'https://picsum.photos/seed/livro7/300/180' },
    { id: 8, titulo: 'Angular Completo', autor: 'Roberta Santos', categoria: 'Programação', paginas: 480, disponivel: true, imagem: 'https://picsum.photos/seed/livro8/300/180' },
  ];

  // PROBLEMA 2: a regra "emprestar/devolver" também está aqui. Se outro componente precisar dela, teria que copiar.
  emprestar(id: number): void {
    this.alterarDisponibilidade(id, false);
  }

  devolver(id: number): void {
    this.alterarDisponibilidade(id, true);
  }

  private alterarDisponibilidade(id: number, disponivel: boolean): void {
    // Criamos uma lista NOVA trocando só o livro alterado ({ ...l, disponivel } copia o livro e muda um campo).
    // Nos projetos novos (OnPush) o Angular só percebe a mudança quando a REFERÊNCIA muda.
    this.livros = this.livros.map((l) => (l.id === id ? { ...l, disponivel } : l));
  }
}
