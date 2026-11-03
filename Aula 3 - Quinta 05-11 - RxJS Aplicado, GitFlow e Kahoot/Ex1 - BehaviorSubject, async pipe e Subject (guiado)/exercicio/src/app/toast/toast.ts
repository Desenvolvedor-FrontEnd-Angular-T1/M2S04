// toast.ts - COMPLETE
import { Component } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.html',
  styleUrl: './toast.css',
})
export class Toast {
  // TODO E: protected mensagem = signal<string | null>(null);
  // TODO F: no constructor: inject(NotificacaoService).mensagens$.pipe(tap(set), switchMap(() => timer(3000)), takeUntilDestroyed()).subscribe(() => set(null))
}
