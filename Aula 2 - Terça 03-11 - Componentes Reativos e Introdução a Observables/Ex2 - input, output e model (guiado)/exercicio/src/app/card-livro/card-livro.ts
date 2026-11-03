// card-livro.ts - ESTADO ATUAL: decorators @Input/@Output (semana 3). Migre para a API de signals.
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Livro } from '../models/livro';

@Component({
  selector: 'app-card-livro',
  templateUrl: './card-livro.html',
  styleUrl: './card-livro.css',
})
export class CardLivro {
  // TODO 1: troque por: livro = input.required<Livro>();
  @Input({ required: true }) livro!: Livro;
  // TODO 2: troque por: emprestar = output<number>(); e devolver = output<number>();
  @Output() emprestar = new EventEmitter<number>();
  @Output() devolver = new EventEmitter<number>();
  // TODO 3: crie "protected status = computed(() => ...)" que devolve 'Disponível' ou 'Emprestado'.
  // TODO 4: no card-livro.html troque livro.xxx por livro().xxx e use {{ status() }}.
}
