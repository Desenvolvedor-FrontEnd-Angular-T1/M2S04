// card-livro.ts - versão com a API baseada em SIGNALS: input(), output() e computed().
import { Component, computed, input, output } from '@angular/core';
import { Livro } from '../models/livro';

@Component({
  selector: 'app-card-livro',
  templateUrl: './card-livro.html',
  styleUrl: './card-livro.css',
})
export class CardLivro {
  // input.required<T>(): substitui @Input({required:true}). O valor chega como SIGNAL somente leitura.
  livro = input.required<Livro>();

  // output<T>(): substitui @Output() + EventEmitter. Emitimos com .emit(valor).
  emprestar = output<number>();
  devolver = output<number>();

  // Como livro é signal, podemos DERIVAR valores com computed (recalcula quando o pai enviar outro livro).
  protected status = computed(() => (this.livro().disponivel ? 'Disponível' : 'Emprestado'));
}
