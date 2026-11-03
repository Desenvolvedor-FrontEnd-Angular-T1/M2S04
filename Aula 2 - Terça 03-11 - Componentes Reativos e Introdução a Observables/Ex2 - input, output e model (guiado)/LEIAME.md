# Ex2 - input(), output() e model() (guiado, ~25 min)

## Objetivo
Migrar a comunicação **pai ↔ filho** dos decorators (`@Input`/`@Output`, semana 3) para a **API de signals**, e criar uma busca com **two-way binding** via `model()`.

## Comparação direta
| Semana 3 (decorators) | Hoje (signals) |
|---|---|
| `@Input() livro!: Livro;` | `livro = input.required<Livro>();` |
| `@Output() emprestar = new EventEmitter<number>();` | `emprestar = output<number>();` |
| `livro.titulo` no template | `livro().titulo` no template |
| `[(ngModel)]` / dois bindings manuais | `termo = model<string>('')` + `[(termo)]="sinalDoPai"` |

## Ponto de partida
Copie `exercicio/src/app` (Ex1 pronto, com o card ainda no estilo antigo).

## Passo a passo
1. Siga os TODOs 1-4 no `CardLivro` (e no `card-livro.html`).
2. Complete o `BuscaLivro` (TODOs 5-7).
3. No `app.ts`, complete o `computed` de filtragem (TODO 9) e ligue o `[(termo)]` no `app.html` (TODO 10).
4. Digite "ang" na busca: só **Angular Completo** deve permanecer. Apague: todos voltam.

## Cenário do dia a dia
É a **barra de pesquisa** de qualquer loja virtual: o campo vive em um componente, a lista em outro, e o texto precisa trafegar entre eles.

## Erros comuns
| Sintoma | Causa |
|---|---|
| `Property 'titulo' does not exist on type 'InputSignal<Livro>'` | Faltaram os parênteses: `livro().titulo` |
| Filtro não reage | Usou `this.termoBusca` sem `()` dentro do `computed` |
| `NG8002 Can't bind to 'termo'` | `BuscaLivro` não está em `imports` do `App` |
