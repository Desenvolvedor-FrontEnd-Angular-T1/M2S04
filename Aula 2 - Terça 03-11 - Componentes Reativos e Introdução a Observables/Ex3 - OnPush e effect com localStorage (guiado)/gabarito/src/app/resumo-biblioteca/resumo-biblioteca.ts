// resumo-biblioteca.ts - um SEGUNDO componente que lê o MESMO service.
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LivroService } from '../services/livro-service';

@Component({
  selector: 'app-resumo-biblioteca',
  templateUrl: './resumo-biblioteca.html',
  changeDetection: ChangeDetectionStrategy.OnPush,   // no Angular 22 já é o padrão; explícito aqui para o código funcionar igual em versões anteriores
  styleUrl: './resumo-biblioteca.css',
})
export class ResumoBiblioteca {
  // O Angular entrega a MESMA instância que o App recebeu (singleton). Ninguém passou nada por @Input!
  // "protected" permite usar no template, mas não de fora da classe.
  protected service = inject(LivroService);
}
