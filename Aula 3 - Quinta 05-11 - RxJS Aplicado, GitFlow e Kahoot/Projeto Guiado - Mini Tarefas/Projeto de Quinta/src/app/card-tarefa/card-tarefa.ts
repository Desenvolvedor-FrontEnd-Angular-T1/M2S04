import { Component } from '@angular/core';
// 👉 TODO 4-IMPORTS: acrescente `input` e `output` no import de cima
//    e importe a interface Tarefa (de '../models/tarefa')

@Component({
  selector: 'app-card-tarefa',
  templateUrl: './card-tarefa.html',
  // 👉 TODO 8 (OnPush): acrescente  changeDetection: ChangeDetectionStrategy.OnPush
  //    (importe ChangeDetectionStrategy). No Angular 22 já é o padrão, mas escreva para fixar!
})
export class CardTarefa {
  // 👉 TODO 4A (input/output): declare os 3 membros abaixo
  //    1) tarefa    → input OBRIGATÓRIO do tipo Tarefa        input.required<Tarefa>()
  //    2) alternar  → output que emite o id (number)           output<number>()
  //    3) remover   → output que emite o id (number)           output<number>()
  //    Todos `readonly`.
}
