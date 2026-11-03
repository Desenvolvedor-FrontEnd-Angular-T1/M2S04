// contador-service.ts - repare: @Service({ autoProvided: false }). Ele NÃO é global.
// Só existe onde alguém declarar "providers: [ContadorService]".
// (Angular anterior ao 22: @Injectable() sem providedIn)
import { Service, signal } from '@angular/core';

@Service({ autoProvided: false })
export class ContadorService {
  // id aleatório: permite VER se dois componentes estão usando a mesma instância ou instâncias diferentes.
  readonly id = Math.random().toString(36).slice(2, 6);
  valor = signal(0);          // signal: o template se atualiza sozinho

  incrementar(): void {
    this.valor.update((v) => v + 1);
  }
}
