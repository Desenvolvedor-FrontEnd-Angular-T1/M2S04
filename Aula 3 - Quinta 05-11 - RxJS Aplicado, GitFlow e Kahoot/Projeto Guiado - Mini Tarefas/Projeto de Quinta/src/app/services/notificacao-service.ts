import { Service } from '@angular/core';
import { Subject } from 'rxjs';

// ✅ PRONTO (não precisa mexer). Service de avisos (toast) usando Subject.
@Service()
export class NotificacaoService {
  // Subject = "rádio ao vivo": não guarda valor, só avisa quem está ouvindo agora
  private readonly mensagemSubject = new Subject<string>();
  readonly mensagem$ = this.mensagemSubject.asObservable();

  avisar(texto: string): void {
    this.mensagemSubject.next(texto);
  }
}
