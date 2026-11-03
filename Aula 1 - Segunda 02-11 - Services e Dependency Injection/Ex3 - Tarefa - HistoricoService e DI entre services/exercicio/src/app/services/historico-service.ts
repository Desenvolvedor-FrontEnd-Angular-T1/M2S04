// historico-service.ts - COMPLETE (TAREFA)
import { Service, signal } from '@angular/core';
import { Registro } from '../models/registro';

// TODO 1: adicione @Service() acima da classe
export class HistoricoService {
  // TODO 2: crie "private _registros = signal<Registro[]>([]);" e "readonly registros = this._registros.asReadonly();"
  // TODO 3: crie registrar(acao: Registro['acao'], titulo: string): void -> use update para colocar { acao, titulo, data: new Date() } NO INÍCIO: [novo, ...lista]
  // TODO 4: (já incluído no TODO 2) leitura via registros()
  // TODO 5: crie limpar(): void -> this._registros.set([])
}
