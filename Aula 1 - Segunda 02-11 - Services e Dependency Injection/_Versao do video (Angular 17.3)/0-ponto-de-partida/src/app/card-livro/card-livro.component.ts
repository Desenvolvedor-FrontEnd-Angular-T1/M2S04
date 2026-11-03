// Componente "burro" (de apresentação): só recebe um livro e avisa quando o usuário clica.
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Livro } from '../models/livro';

@Component({
  selector: 'app-card-livro',        // nome da tag HTML: <app-card-livro />
  standalone: true,
  templateUrl: './card-livro.component.html',  // arquivo do template
  styleUrl: './card-livro.component.css',      // estilos isolados deste componente
})
export class CardLivroComponent {
  // @Input = valor que o PAI envia para o filho (semana 3). required: o pai é obrigado a enviar.
  @Input({ required: true }) livro!: Livro;
  // @Output = evento que o FILHO envia para o pai. O EventEmitter<number> leva o id do livro.
  @Output() emprestar = new EventEmitter<number>();
  @Output() devolver = new EventEmitter<number>();
}
