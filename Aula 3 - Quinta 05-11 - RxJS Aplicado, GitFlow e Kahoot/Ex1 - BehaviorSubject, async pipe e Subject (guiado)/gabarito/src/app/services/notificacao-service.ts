// notificacao-service.ts - um Subject: "megafone" que NÃO guarda valor. Só entrega a quem está ouvindo AGORA.
import { Service } from '@angular/core';
import { Subject } from 'rxjs';

@Service()
export class NotificacaoService {
  // Subject é Observable E Observer ao mesmo tempo: dá para emitir (next) e para assinar (subscribe).
  private mensagensSubject = new Subject<string>();

  // Expomos só a parte "ouvir" (asObservable) para ninguém de fora conseguir emitir por engano.
  readonly mensagens$ = this.mensagensSubject.asObservable();

  // Quem quiser avisar algo chama avisar('texto').
  avisar(mensagem: string): void {
    this.mensagensSubject.next(mensagem);
  }
}
