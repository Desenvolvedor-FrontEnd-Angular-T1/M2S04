import { Component } from '@angular/core';
// 👉 TODO 2-IMPORTS: acrescente aqui o que for usar: `computed` e `inject` (de '@angular/core')
//    e o TarefaService (de '../services/tarefa-service')

@Component({
  selector: 'app-resumo',
  templateUrl: './resumo.html',
})
export class Resumo {
  // 👉 TODO 2A (DI): injete o TarefaService numa propriedade `protected readonly service`
  //    Modelo:  protected readonly nome = inject(Classe);

  // 👉 TODO 2B (computed): crie `protected readonly percentual = computed(() => ...)`
  //    Regra: se o total for 0 devolva 0; senão  Math.round(concluidas / total * 100)
  //    Use os signals do service: this.service.total() e this.service.concluidas()
}
