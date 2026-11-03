// toast.ts - mostra a mensagem por 3 segundos usando operadores de RxJS.
import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { switchMap, tap, timer } from 'rxjs';
import { NotificacaoService } from '../services/notificacao-service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.html',
  styleUrl: './toast.css',
})
export class Toast {
  protected mensagem = signal<string | null>(null);   // null = nada para mostrar

  constructor() {
    // Dentro do constructor estamos em "contexto de injeção": inject() e takeUntilDestroyed() funcionam sem argumentos.
    inject(NotificacaoService)
      .mensagens$
      .pipe(
        tap((texto) => this.mensagem.set(texto)),   // 1) mostra a mensagem recebida
        switchMap(() => timer(3000)),               // 2) espera 3s; se chegar OUTRA mensagem, descarta o timer antigo
        takeUntilDestroyed(),                       // 3) cancela tudo quando o componente for destruído
      )
      .subscribe(() => this.mensagem.set(null));    // 4) passou o tempo: esconde o aviso
  }
}
