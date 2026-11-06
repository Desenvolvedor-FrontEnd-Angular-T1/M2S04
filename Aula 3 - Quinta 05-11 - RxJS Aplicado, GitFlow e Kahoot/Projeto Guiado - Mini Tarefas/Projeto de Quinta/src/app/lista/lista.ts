// ✅ PASSO 6-IMPORTS · SOLUÇÃO: tudo que usamos neste arquivo, agrupado por origem.
import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { BehaviorSubject, combineLatest, debounceTime, distinctUntilChanged, map, startWith } from 'rxjs';
import { CampoBusca } from '../campo-busca/campo-busca';
import { CardTarefa } from '../card-tarefa/card-tarefa';
import { TarefaService } from '../services/tarefa-service';

@Component({
  selector: 'app-lista',
  // ✅ PASSO 6A · SOLUÇÃO: componente standalone só enxerga no template o que está em `imports`.
  // O template usa | async, <app-campo-busca> e <app-card-tarefa>, então os três entram aqui.
  imports: [AsyncPipe, CampoBusca, CardTarefa],
  templateUrl: './lista.html',
  // ✅ PASSO 8 · SOLUÇÃO (OnPush): verifica o componente só quando algo "avisa" (input, evento,
  // signal lido ou async pipe). Funciona porque trabalhamos com signals e dados imutáveis.
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Lista {
  // ✅ PASSO 6B · SOLUÇÃO (DI): a Lista lê as tarefas e chama as ações do mesmo service singleton.
  private readonly service = inject(TarefaService);

  protected readonly categorias = ['Todas', 'Estudos', 'Casa', 'Trabalho'];

  // ✅ PASSO 6C · SOLUÇÃO (duas fontes de filtro):
  // • busca: signal de texto. Está ligado ao <app-campo-busca> por [(texto)] (veja lista.html).
  protected readonly busca = signal('');
  // • categoria$: BehaviorSubject = "placar": guarda o ÚLTIMO valor e entrega na hora a quem assina.
  //   Por isso começa com 'Todas' e o combineLatest já tem um valor para usar na abertura da tela.
  private readonly categoria$ = new BehaviorSubject<string>('Todas');

  // ✅ PASSO 6D · SOLUÇÃO (combineLatest): junta o ÚLTIMO valor de cada fonte e emite de novo
  // sempre que QUALQUER uma delas mudar. Resultado: lista filtrada por texto E categoria.
  protected readonly tarefasFiltradas$ = combineLatest([
    // fonte 1: signal do service convertido em Observable (toObservable faz a ponte)
    toObservable(this.service.tarefas),
    // fonte 2: o texto da busca, tratado por operadores
    toObservable(this.busca).pipe(
      debounceTime(300), // espera 300 ms sem digitar (evita filtrar a cada tecla)
      distinctUntilChanged(), // ignora se o texto for igual ao anterior
      map((texto) => texto.trim().toLowerCase()), // padroniza para comparar sem maiúsculas
      startWith(''), // emite '' de cara: sem isso o combineLatest esperaria o 1º texto e a lista abriria vazia
    ),
    // fonte 3: a categoria escolhida
    this.categoria$,
  ]).pipe(
    // recebe o último valor das 3 fontes e devolve só as tarefas que passam nos dois filtros
    map(([tarefas, texto, categoria]) =>
      tarefas.filter(
        (t) =>
          (categoria === 'Todas' || t.categoria === categoria) && // categoria bate?
          t.titulo.toLowerCase().includes(texto), // título contém o texto?
      ),
    ),
  );

  // ✅ PASSO 6E · SOLUÇÃO (handlers): o filho avisa e o pai decide o que fazer.
  protected escolherCategoria(valor: string): void {
    this.categoria$.next(valor); // emite o novo valor: o combineLatest refaz o filtro
  }

  protected alternar(id: number): void {
    this.service.alternar(id); // o service atualiza o signal e a tela reage
  }

  protected remover(id: number): void {
    this.service.remover(id);
  }
}
