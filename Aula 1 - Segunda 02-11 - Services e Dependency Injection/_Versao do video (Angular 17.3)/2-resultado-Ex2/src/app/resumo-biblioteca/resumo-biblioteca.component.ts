// resumo-biblioteca.ts - um SEGUNDO componente que lê o MESMO service.
import { Component, inject } from '@angular/core';
import { LivroService } from '../services/livro.service';

@Component({
  selector: 'app-resumo-biblioteca',
  standalone: true,
  templateUrl: './resumo-biblioteca.component.html',
  styleUrl: './resumo-biblioteca.component.css',
})
export class ResumoBibliotecaComponent {
  // O Angular entrega a MESMA instância que o App recebeu (singleton). Ninguém passou nada por @Input!
  // "protected" permite usar no template, mas não de fora da classe.
  protected service = inject(LivroService);
}
