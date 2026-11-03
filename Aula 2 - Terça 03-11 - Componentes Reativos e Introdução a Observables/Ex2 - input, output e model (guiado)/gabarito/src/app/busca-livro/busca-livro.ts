// busca-livro.ts - componente de busca com model(): ENTRADA + SAÍDA em um só signal (two-way binding).
import { Component, model } from '@angular/core';

@Component({
  selector: 'app-busca-livro',
  templateUrl: './busca-livro.html',
  styleUrl: './busca-livro.css',
})
export class BuscaLivro {
  // model<string>(''): o pai pode enviar um valor E receber de volta quando o filho o altera.
  // No pai usamos a "banana na caixa": [(termo)]="signalDoPai".
  termo = model<string>('');

  // Chamado a cada tecla digitada.
  atualizar(evento: Event): void {
    const campo = evento.target as HTMLInputElement;  // o <input> que disparou o evento
    this.termo.set(campo.value);                       // set() avisa o pai automaticamente
  }
}
