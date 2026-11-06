import { Component, effect, inject } from '@angular/core';
import { Formulario } from './formulario/formulario';
import { Lista } from './lista/lista';
import { Resumo } from './resumo/resumo';
import { Toast } from './toast/toast';
// ✅ PASSO 7-IMPORTS · SOLUÇÃO: `effect` e `inject` do core, e o service gerado.
import { TarefaService } from './services/tarefa-service';

@Component({
  selector: 'app-root',
  imports: [Resumo, Formulario, Lista, Toast],
  templateUrl: './app.html',
})
export class App {
  // ✅ PASSO 7A · SOLUÇÃO (DI): `protected` para o app.html ler carregando(), erro() e carregar().
  protected readonly service = inject(TarefaService);

  constructor() {
    // ✅ PASSO 7B · SOLUÇÃO (effect): efeito colateral FORA da tela. Lemos pendentes() dentro dele,
    // então ele roda de novo sempre que esse valor mudar e atualiza o título da aba do navegador.
    // Fica no constructor porque o effect precisa ser criado num "contexto de injeção".
    effect(() => {
      document.title = `(${this.service.pendentes()}) Mini Tarefas`;
    });
  }
}
