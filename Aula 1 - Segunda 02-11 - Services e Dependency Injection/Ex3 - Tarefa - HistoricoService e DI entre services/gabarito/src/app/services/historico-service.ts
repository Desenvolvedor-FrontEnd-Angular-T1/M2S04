// historico-service.ts - guarda o histórico de ações. Quem quiser registrar algo injeta este service.
import { Service, signal } from '@angular/core';
import { Registro } from '../models/registro';

@Service()
export class HistoricoService {
  private _registros = signal<Registro[]>([]);       // lista interna (signal), começa vazia
  readonly registros = this._registros.asReadonly(); // leitura para quem está fora

  // Adiciona o registro NO INÍCIO da lista nova ([novo, ...lista]) para o mais recente aparecer primeiro.
  registrar(acao: Registro['acao'], titulo: string): void {
    this._registros.update((lista) => [{ acao, titulo, data: new Date() }, ...lista]);
  }

  limpar(): void {
    this._registros.set([]);                         // troca por uma lista nova e vazia
  }
}
