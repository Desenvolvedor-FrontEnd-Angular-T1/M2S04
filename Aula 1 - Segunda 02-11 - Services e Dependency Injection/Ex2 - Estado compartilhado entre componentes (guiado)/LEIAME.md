# Ex2 - Estado compartilhado entre componentes (guiado, ~15 min)

## Objetivo
Provar que **um service é compartilhado**: dois componentes diferentes enxergam e alteram o **mesmo** dado, **sem `@Input`/`@Output` entre eles**.

## Cenário do dia a dia
Pense no **carrinho de compras** de um e-commerce: o ícone no topo (contador) e a página do carrinho são componentes
diferentes, mas mostram o mesmo dado. Em Angular, esse "dado do meio" mora em um service.

## Ponto de partida
Copie `exercicio/src/app` (traz o Ex1 pronto + um componente `resumo-biblioteca` com TODOs).

## Passo a passo
1. No `LivroService`: crie `total()`, `totalDisponiveis()` e `totalEmprestados()` (TODO 1-3). Eles **leem o signal** `_livros()`.
2. No `ResumoBiblioteca`: injete o service (TODO 4) e use os métodos no template (TODO 5).
3. Rode `ng serve`, clique em **Emprestar** em um card e **observe o resumo mudar**.
4. Abra o console: `LivroService criado` aparece **uma única vez** (se você acrescentou o log) - os dois componentes usam a mesma instância.

## Pergunta para pensar
Quem avisou o `ResumoBiblioteca` que o livro foi emprestado? (Resposta: ninguém - ele lê o mesmo signal que o `App` alterou; o Angular sabe que o template depende dele.)

> **Por que funciona?** O template do resumo chama métodos que **leem um signal**. Quando o signal muda, o Angular redesenha só o que depende dele - é a base dos **componentes reativos** de amanhã.

## Erros comuns
| Sintoma | Causa provável |
|---|---|
| `NG8001: 'app-resumo-biblioteca' is not a known element` | Faltou colocar `ResumoBiblioteca` em `imports` do `App` |
| Números não mudam | O service **mutou** o objeto em vez de criar um novo via `update` |
| Tela mostra `?` | Esqueceu de trocar o `?` pela interpolação no TODO 5 |
