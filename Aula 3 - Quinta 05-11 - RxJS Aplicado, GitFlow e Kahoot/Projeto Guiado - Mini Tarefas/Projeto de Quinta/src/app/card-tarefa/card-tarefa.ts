// ✅ PASSO 4-IMPORTS · SOLUÇÃO: input/output vêm do core; ChangeDetectionStrategy é do PASSO 8.
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Tarefa } from '../models/tarefa';

@Component({
  selector: 'app-card-tarefa',
  templateUrl: './card-tarefa.html',
  // ✅ PASSO 8 · SOLUÇÃO (OnPush): o Angular só verifica este componente quando o input muda
  // (nova referência), quando ocorre um evento do template, quando um signal lido nele muda ou
  // quando o async pipe emite. No Angular 22 já é o padrão; escrevemos para fixar o conceito.
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardTarefa {
  // ✅ PASSO 4A · SOLUÇÃO (input/output): este card NÃO conhece o service (componente "burro").
  // Ele só recebe um dado e avisa o pai quando algo acontece.
  // 1) input.required: o pai É OBRIGADO a passar a tarefa. Lemos com tarefa() (é um signal).
  readonly tarefa = input.required<Tarefa>();
  // 2) e 3) output: eventos que sobem para o pai, emitindo o id da tarefa.
  readonly alternar = output<number>();
  readonly remover = output<number>();
}
