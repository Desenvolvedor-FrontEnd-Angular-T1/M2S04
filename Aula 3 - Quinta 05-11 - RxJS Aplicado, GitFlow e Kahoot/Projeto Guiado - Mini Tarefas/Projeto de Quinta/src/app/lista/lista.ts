import { Component } from '@angular/core';
// 👉 TODO 6-IMPORTS (vá completando conforme os TODOs abaixo):
//    • de '@angular/core'             → ChangeDetectionStrategy, inject, signal
//    • de '@angular/common'           → AsyncPipe
//    • de '@angular/core/rxjs-interop'→ toObservable
//    • de 'rxjs'                      → BehaviorSubject, combineLatest, debounceTime, distinctUntilChanged, map, startWith
//    • componentes                    → CampoBusca ('../campo-busca/campo-busca') e CardTarefa ('../card-tarefa/card-tarefa')
//    • service                        → TarefaService ('../services/tarefa-service')

@Component({
  selector: 'app-lista',
  // 👉 TODO 6A: preencha o imports com tudo que o TEMPLATE vai usar: AsyncPipe, CampoBusca, CardTarefa
  imports: [],
  templateUrl: './lista.html',
  // 👉 TODO 8 (OnPush): acrescente  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Lista {
  // 👉 TODO 6B (DI): injete o TarefaService numa propriedade `private readonly service`

  protected readonly categorias = ['Todas', 'Estudos', 'Casa', 'Trabalho'];

  // 👉 TODO 6C (duas fontes de filtro):
  //    • `busca`      → signal de texto, começa com ''                      (protected readonly)
  //    • `categoria$` → BehaviorSubject<string>, começa com 'Todas'         (private readonly)

  // 👉 TODO 6D (combineLatest): crie  protected readonly tarefasFiltradas$ = combineLatest([ ... ]).pipe(map(...))
  //    Fontes do combineLatest (nesta ordem):
  //      1) toObservable(this.service.tarefas)
  //      2) toObservable(this.busca).pipe(
  //           debounceTime(300), distinctUntilChanged(), map(t => t.trim().toLowerCase()), startWith('') )
  //      3) this.categoria$
  //    No map final: receba [tarefas, texto, categoria] e devolva  tarefas.filter(...)
  //      - categoria === 'Todas' OU t.categoria === categoria
  //      - E  t.titulo.toLowerCase().includes(texto)

  protected escolherCategoria(valor: string): void {
    // 👉 TODO 6E-1: emita o valor no BehaviorSubject →  this.categoria$.next(valor)
  }

  protected alternar(id: number): void {
    // 👉 TODO 6E-2: chame  this.service.alternar(id)
  }

  protected remover(id: number): void {
    // 👉 TODO 6E-3: chame  this.service.remover(id)
  }
}
