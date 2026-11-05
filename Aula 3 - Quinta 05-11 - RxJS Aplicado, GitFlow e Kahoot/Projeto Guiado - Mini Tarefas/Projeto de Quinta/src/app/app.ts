import { Component } from '@angular/core';
import { Formulario } from './formulario/formulario';
import { Lista } from './lista/lista';
import { Resumo } from './resumo/resumo';
import { Toast } from './toast/toast';
// 👉 TODO 7-IMPORTS: acrescente `effect` e `inject` no import do '@angular/core'
//    e importe o TarefaService (de './services/tarefa-service')

@Component({
  selector: 'app-root',
  imports: [Resumo, Formulario, Lista, Toast],
  templateUrl: './app.html',
})
export class App {
  // 👉 TODO 7A (DI): injete o TarefaService numa propriedade `protected readonly service`

  constructor() {
    // 👉 TODO 7B (effect): crie um effect que roda sempre que as pendentes mudarem e atualiza a ABA do navegador:
    //    effect(() => { document.title = `(${this.service.pendentes()}) Mini Tarefas`; });
  }
}
