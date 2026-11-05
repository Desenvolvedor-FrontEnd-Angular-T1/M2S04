import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { map, startWith, switchMap, timer } from 'rxjs';
import { NotificacaoService } from '../services/notificacao-service';

// ✅ PRONTO (não precisa mexer). Aviso verde que some sozinho após 3 s.
@Component({
  selector: 'app-toast',
  imports: [AsyncPipe],
  templateUrl: './toast.html',
})
export class Toast {
  private readonly notificacao = inject(NotificacaoService);

  // Cada mensagem nova CANCELA o timer da anterior (switchMap) e some após 3 s.
  readonly mensagem$ = this.notificacao.mensagem$.pipe(
    switchMap((texto) => timer(3000).pipe(map(() => ''), startWith(texto))),
  );
}
