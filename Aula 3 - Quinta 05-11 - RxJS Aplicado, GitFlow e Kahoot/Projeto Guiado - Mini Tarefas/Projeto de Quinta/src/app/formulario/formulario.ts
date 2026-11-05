import { Component, signal } from '@angular/core';
import { Categoria } from '../models/tarefa';
// 👉 TODO 3-IMPORTS: acrescente `inject` no import de cima e importe o TarefaService
//    (de '../services/tarefa-service')

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.html',
})
export class Formulario {
  // 👉 TODO 3A (DI): injete o TarefaService numa propriedade `private readonly service`

  protected readonly categorias: Categoria[] = ['Estudos', 'Casa', 'Trabalho'];
  protected readonly titulo = signal('');
  protected readonly categoria = signal<Categoria>('Estudos');

  protected salvar(evento: Event): void {
    evento.preventDefault();

    // 👉 TODO 3B: complete o método, nesta ordem:
    //    1) pegue o texto:  this.titulo().trim()
    //    2) se estiver vazio, pare (return)
    //    3) chame  this.service.adicionar(texto, this.categoria())
    //    4) limpe o campo:  this.titulo.set('')
  }
}
