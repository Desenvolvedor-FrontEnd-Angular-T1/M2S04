// Criado com:  ng g s services/tarefa-service   (Angular 22)
// Este service é o "cérebro" do app: guarda o estado das tarefas e as ações que o alteram.
import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Service, signal } from '@angular/core';
import { catchError, delay, EMPTY, finalize, retry } from 'rxjs';
import { Categoria, Tarefa } from '../models/tarefa';
import { NotificacaoService } from './notificacao-service';

const CHAVE = 'mini-tarefas'; // nome da "gaveta" do localStorage

// ── BLOCO A · Decorator ─────────────────────────────────────────────────
// @Service() diz ao Angular: "crie UMA instância desta classe e compartilhe com o app inteiro"
// (singleton). Por isso Resumo, Lista e Formulário enxergam os MESMOS dados.
@Service()
export class TarefaService {
  // ── BLOCO B · Injeção de dependência (inject) ─────────────────────────
  // Em vez de `new HttpClient()`, PEDIMOS ao Angular, que entrega a instância pronta.
  private readonly http = inject(HttpClient);

  // ✅ TODO B · SOLUÇÃO: pedimos o NotificacaoService do mesmo jeito.
  // Isso é DI entre services (um service usando outro), usada em adicionar() e remover().
  private readonly notificacao = inject(NotificacaoService);

  // ── BLOCO C · Estado com signals ──────────────────────────────────────
  // signal = caixinha de valor que AVISA a tela quando muda. Ler: tarefas()  ·  Trocar: set/update
  readonly tarefas = signal<Tarefa[]>([]);
  readonly carregando = signal(false);
  readonly erro = signal('');

  // ── BLOCO D · Valores derivados com computed ──────────────────────────
  // ✅ TODO D · SOLUÇÃO: computed CALCULA o valor a partir de outros signals e guarda o resultado
  // (cache). Quando `tarefas` muda, ele recalcula sozinho. É só leitura: ninguém dá .set() nele.
  readonly total = computed(() => this.tarefas().length);
  readonly concluidas = computed(() => this.tarefas().filter((t) => t.concluida).length);
  // pendentes depende de outros dois computed: o Angular monta a cadeia de dependências sozinho.
  readonly pendentes = computed(() => this.total() - this.concluidas());

  // ── BLOCO E · constructor: carrega dados + effect ─────────────────────
  constructor() {
    // Se já existe algo salvo no navegador, usa; senão busca no servidor.
    const salvo = localStorage.getItem(CHAVE);
    if (salvo) {
      this.tarefas.set(JSON.parse(salvo) as Tarefa[]);
    } else {
      this.carregar();
    }

    // ✅ TODO E · SOLUÇÃO: effect = "efeito colateral". Roda sempre que um signal lido DENTRO dele
    // muda. Aqui lemos `this.tarefas()`, então a cada mudança as tarefas são salvas no localStorage.
    // Resultado: ao dar F5 os dados continuam. (effect não calcula valor: para isso use computed.)
    effect(() => {
      localStorage.setItem(CHAVE, JSON.stringify(this.tarefas()));
    });
  }

  // ── BLOCO F · HttpClient + Observable ─────────────────────────────────
  carregar(): void {
    this.carregando.set(true);
    this.erro.set('');

    this.http
      .get<Tarefa[]>('tarefas.json') // pede public/tarefas.json (o Observable ainda não executou)
      .pipe(
        delay(800), // atraso de mentira só para ver o "Carregando..."

        // ✅ TODO F1 · SOLUÇÃO: se a requisição falhar, tenta de novo até 2 vezes
        // (veja as 3 chamadas na aba Network do navegador).
        retry(2),

        // ✅ TODO F2 · SOLUÇÃO: se, mesmo após as tentativas, ainda der erro, o catchError
        // "captura": escreve a mensagem no signal `erro` e devolve EMPTY (Observable que termina
        // sem emitir nada), assim o subscribe abaixo não roda e a tela mostra o aviso vermelho.
        catchError(() => {
          this.erro.set('Não foi possível carregar as tarefas.');
          return EMPTY;
        }),

        // ✅ TODO F3 · SOLUÇÃO: finalize roda no FIM, com sucesso OU com erro, e desliga o
        // "Carregando...". Sem ele o aviso de carregando ficaria na tela para sempre.
        finalize(() => this.carregando.set(false)),
      )
      .subscribe((lista) => this.tarefas.set(lista)); // sucesso: guarda o resultado no signal
  }

  // ── BLOCO G · Ações (sempre IMUTÁVEIS) ────────────────────────────────
  // Regra de ouro: nunca altere o array direto (nada de push). Crie um array NOVO com
  // update(lista => novaLista). Só assim signals e OnPush percebem a mudança.

  // Exemplo: adiciona uma tarefa nova no fim da lista.
  adicionar(titulo: string, categoria: Categoria): void {
    const nova: Tarefa = { id: Date.now(), titulo, categoria, concluida: false };
    this.tarefas.update((lista) => [...lista, nova]); // array novo = lista antiga + nova
    this.notificacao.avisar(`Tarefa "${titulo}" adicionada!`);
  }

  // ✅ TODO G1 · SOLUÇÃO: map percorre a lista e devolve outra lista. Para a tarefa com o id certo
  // devolvemos uma CÓPIA com `concluida` invertida ({ ...t, concluida: !t.concluida }); as demais
  // ficam como estão. Nada é alterado no objeto original.
  alternar(id: number): void {
    this.tarefas.update((lista) =>
      lista.map((t) => (t.id === id ? { ...t, concluida: !t.concluida } : t)),
    );
  }

  // ✅ TODO G2 · SOLUÇÃO: filter mantém só as tarefas com id DIFERENTE do removido (cria array
  // novo). Depois avisamos o usuário pelo NotificacaoService (aparece o toast verde).
  remover(id: number): void {
    this.tarefas.update((lista) => lista.filter((t) => t.id !== id));
    this.notificacao.avisar('Tarefa removida.');
  }
}
