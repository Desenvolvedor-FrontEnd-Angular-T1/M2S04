// ✅ PASSO 2-IMPORTS · SOLUÇÃO: computed e inject vêm do '@angular/core'; o service, do arquivo gerado.
import { Component, computed, inject } from '@angular/core';
import { TarefaService } from '../services/tarefa-service';

@Component({
  selector: 'app-resumo',
  templateUrl: './resumo.html',
})
export class Resumo {
  // ✅ PASSO 2A · SOLUÇÃO (DI): inject(TarefaService) pede ao Angular a instância ÚNICA do service.
  // É `protected` para o template poder ler (service.total(), service.pendentes()...).
  protected readonly service = inject(TarefaService);

  // ✅ PASSO 2B · SOLUÇÃO (computed): porcentagem de tarefas concluídas.
  // Lê signals do service (total() e concluidas()), então recalcula sozinho quando eles mudam.
  // Se o total for 0 devolvemos 0 para evitar divisão por zero.
  protected readonly percentual = computed(() => {
    const total = this.service.total();
    return total === 0 ? 0 : Math.round((this.service.concluidas() / total) * 100);
  });
}
