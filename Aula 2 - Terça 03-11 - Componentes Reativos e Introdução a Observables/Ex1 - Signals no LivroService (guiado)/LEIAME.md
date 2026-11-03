# Ex1 - computed e effect no LivroService (guiado, ~25 min)

## Objetivo
Partir do service de segunda (que já guarda o estado em um **signal**) e aprender a **derivar** valores com `computed` e **reagir** a mudanças com `effect`.

## Conceitos de hoje
| Primitiva | Para quê | Exemplo do dia a dia |
|---|---|---|
| `signal()` | Guardar um valor reativo (já usamos ontem) | Célula **A1** de uma planilha |
| `computed()` | Valor calculado a partir de outros | Célula `=A1+A2` (recalcula sozinha) |
| `effect()` | Reagir a mudança com efeito colateral | Notificação "saldo baixo" quando o saldo muda |

## Ponto de partida
Copie `exercicio/src/app` (é o resultado do Ex2 de segunda). Siga os 3 TODOs do cabeçalho de `livro-service.ts`.

## Passo a passo
1. Transforme os métodos `total`, `totalDisponiveis` e `totalEmprestados` em `computed`.
2. Crie um `effect` no `constructor` que mostre no console quantos livros estão disponíveis.
3. Rode `ng serve`, abra o console (F12) e clique em Emprestar/Devolver: a linha `[effect] ...` surge **só quando algo muda**.

## Regras de ouro
- **Ler** um signal = chamar como função: `livros()`.
- **Nunca** altere o objeto dentro do signal (`l.disponivel = false`); crie um **novo** (`{ ...l, disponivel }`).
- Para valores calculados use `computed`, **não** `effect` + variável.
- Evite escrever em signals dentro de `effect`.

## Erros comuns
| Sintoma | Causa |
|---|---|
| `total is not a function` / `total()` com erro | Misturou método e propriedade: um `computed` é uma propriedade, lida com `()` |
| Resumo não atualiza | Mutou o objeto em vez de criar um novo com `update` |
| `Cannot assign to 'livros' because it is a read-only property` | Tentou usar `set` no signal `readonly`; use o método do service |
