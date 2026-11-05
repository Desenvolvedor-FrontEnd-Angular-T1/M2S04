// ══════════════════════════════════════════════════════════════════════════
//  MODELO DO TarefaService  ·  NÃO fica dentro de src (é só para copiar e colar)
// ══════════════════════════════════════════════════════════════════════════
//  COMO USAR
//   1) No terminal:        ng g s services/tarefa-service
//      (digite o nome COMPLETO. Isso cria  src/app/services/tarefa-service.ts)
//   2) Abra esse arquivo gerado, APAGUE tudo que está nele.
//   3) Copie TODO este arquivo (Ctrl + A, Ctrl + C) e cole lá (Ctrl + V).
//   4) Complete cada  👉 TODO  daqui (A..G). Cada um explica o que fazer.
//
//  O que já vem pronto  = exemplo para você copiar o jeito de fazer.
//  O que tem 👉 TODO    = é você quem escreve.
//
//  Ele compila mesmo incompleto, então o app abre. Mas cada TODO não feito
//  deixa uma parte da tela "sem vida" (o comentário diz qual).
// ══════════════════════════════════════════════════════════════════════════
import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Service, signal } from '@angular/core';
import { catchError, delay, EMPTY, finalize, retry } from 'rxjs';
import { Categoria, Tarefa } from '../models/tarefa';
import { NotificacaoService } from './notificacao-service';

const CHAVE = 'mini-tarefas'; // nome da "gaveta" do localStorage

// ── BLOCO A · Decorator ─────────────────────────────────────────────────
// ✅ PRONTO. @Service() diz ao Angular: "crie UMA instância desta classe e
//    compartilhe com o app inteiro" (singleton). É por isso que o Resumo, a
//    Lista e o Formulário enxergam os MESMOS dados.
@Service()
export class TarefaService {
  // ── BLOCO B · Injeção de dependência (inject) ─────────────────────────
  // ✅ PRONTO (exemplo): em vez de `new HttpClient()`, PEDIMOS ao Angular.
  private readonly http = inject(HttpClient);

  // 👉 TODO B: troque a linha abaixo para pedir o NotificacaoService ao Angular.
  //    Modelo:   private readonly http = inject(HttpClient);
  //    Você escreve:  private readonly notificacao = inject(NotificacaoService);
  //    (isso é DI entre services: um service usando outro)
  private readonly notificacao = { avisar: (_texto: string): void => {} }; // ← APAGUE esta linha de teste

  // ── BLOCO C · Estado com signals ──────────────────────────────────────
  // ✅ PRONTO. signal = caixinha de valor que AVISA a tela quando muda.
  //    Ler: this.tarefas()      Trocar: this.tarefas.set(...) / .update(...)
  readonly tarefas = signal<Tarefa[]>([]);
  readonly carregando = signal(false);
  readonly erro = signal('');

  // ── BLOCO D · Valores derivados com computed ──────────────────────────
  // 👉 TODO D: troque cada  signal(0)  por um  computed(() => ...)  que CALCULA o valor.
  //    computed = valor derivado: recalcula sozinho quando os signals usados nele mudam.
  //    • total       → quantidade de tarefas                      this.tarefas().length
  //    • concluidas  → quantas têm  concluida === true             this.tarefas().filter(t => t.concluida).length
  //    • pendentes   → total menos concluídas                      this.total() - this.concluidas()
  //    Exemplo de formato:   readonly dobro = computed(() => this.numero() * 2);
  //    Sem isso: o Resumo mostra sempre 0.
  readonly total = signal(0); // ← troque por computed
  readonly concluidas = signal(0); // ← troque por computed
  readonly pendentes = signal(0); // ← troque por computed

  // ── BLOCO E · constructor: carrega dados + effect ─────────────────────
  constructor() {
    // ✅ PRONTO. Se já existe algo salvo no navegador, usa; senão busca no servidor.
    const salvo = localStorage.getItem(CHAVE);
    if (salvo) {
      this.tarefas.set(JSON.parse(salvo) as Tarefa[]);
    } else {
      this.carregar();
    }

    // 👉 TODO E: crie um effect que SALVA as tarefas no localStorage sempre que mudarem.
    //    effect = "efeito colateral": roda sozinho quando os signals lidos dentro dele mudam.
    //    Modelo:
    //      effect(() => {
    //        localStorage.setItem(CHAVE, JSON.stringify(this.tarefas()));
    //      });
    //    Sem isso: ao dar F5 as tarefas voltam ao estado original.
  }

  // ── BLOCO F · HttpClient + Observable ─────────────────────────────────
  carregar(): void {
    this.carregando.set(true);
    this.erro.set('');

    this.http
      .get<Tarefa[]>('tarefas.json') // ✅ PRONTO: pede o arquivo public/tarefas.json
      .pipe(
        delay(800), // ✅ PRONTO: atraso de mentira só para ver o "Carregando..."

        // 👉 TODO F1: acrescente aqui  retry(2)
        //    tenta de novo até 2 vezes se der erro (veja na aba Network do navegador).

        // 👉 TODO F2: acrescente aqui um catchError que, quando der erro:
        //      1) escreve a mensagem:  this.erro.set('Não foi possível carregar as tarefas.');
        //      2) devolve  EMPTY  (um Observable que termina sem emitir nada)
        //    Modelo:  catchError(() => { ...; return EMPTY; }),

        // 👉 TODO F3: acrescente aqui  finalize(() => this.carregando.set(false))
        //    roda no fim (com sucesso OU erro) e desliga o "Carregando...".
        //    Sem isso o "Carregando tarefas..." nunca some.
      )
      .subscribe((lista) => this.tarefas.set(lista)); // ✅ PRONTO: guarda o resultado no signal
  }

  // ── BLOCO G · Ações (sempre IMUTÁVEIS) ────────────────────────────────
  // Regra de ouro: nunca altere o array direto (nada de push). Crie um array NOVO
  // com  update(lista => novaLista).  Só assim a tela percebe a mudança.

  // ✅ PRONTO (exemplo): adiciona uma tarefa nova no fim da lista.
  adicionar(titulo: string, categoria: Categoria): void {
    const nova: Tarefa = { id: Date.now(), titulo, categoria, concluida: false };
    this.tarefas.update((lista) => [...lista, nova]);
    this.notificacao.avisar(`Tarefa "${titulo}" adicionada!`);
  }

  // 👉 TODO G1: alternar o campo `concluida` da tarefa com o id recebido.
  //    Use update + map: percorre a lista e, para a tarefa certa, devolve uma CÓPIA invertida.
  //    Modelo:
  //      this.tarefas.update((lista) =>
  //        lista.map((t) => (t.id === id ? { ...t, concluida: !t.concluida } : t)),
  //      );
  alternar(id: number): void {
    // escreva aqui
  }

  // 👉 TODO G2: remover a tarefa com o id recebido.
  //    Use update + filter: mantém só as tarefas com id DIFERENTE.
  //      this.tarefas.update((lista) => lista.filter((t) => t.id !== id));
  //    Depois avise o usuário:  this.notificacao.avisar('Tarefa removida.');
  remover(id: number): void {
    // escreva aqui
  }
}
