// ✅ PASSO 3-IMPORTS · SOLUÇÃO: acrescentamos `inject` e importamos o TarefaService.
import { Component, inject, signal } from '@angular/core';
import { Categoria } from '../models/tarefa';
import { TarefaService } from '../services/tarefa-service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.html',
})
export class Formulario {
  // ✅ PASSO 3A · SOLUÇÃO (DI): o mesmo service (mesma instância) usado pelo Resumo e pela Lista.
  // `private` porque só este arquivo .ts usa; o template não precisa dele.
  private readonly service = inject(TarefaService);

  protected readonly categorias: Categoria[] = ['Estudos', 'Casa', 'Trabalho'];
  protected readonly titulo = signal('');
  protected readonly categoria = signal<Categoria>('Estudos');

  protected salvar(evento: Event): void {
    evento.preventDefault(); // evita recarregar a página no submit do formulário

    // ✅ PASSO 3B · SOLUÇÃO:
    // 1) pega o texto digitado, sem espaços nas pontas
    const texto = this.titulo().trim();
    // 2) se estiver vazio, não faz nada
    if (!texto) return;

    // 3) pede ao service para adicionar (ele atualiza o signal e dispara o aviso verde)
    this.service.adicionar(texto, this.categoria());
    // 4) limpa o campo
    this.titulo.set('');
  }
}
