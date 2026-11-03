# Ex5 - TAREFA: Contador regressivo de empréstimo (~40 min, autônomo)

## Objetivo
Juntar o que você viu hoje: **Observable** (`interval` + operadores), **signal** (`restante`) e **limpeza de inscrição** (`takeUntilDestroyed`).

## Cenário do dia a dia
É o **cronômetro do delivery** ("seu pedido chega em 8... 7... 6...") ou o aviso de **tempo limite** de uma sessão bancária.

## O que construir
Um componente `<app-contador-emprestimo [segundos]="10" />` que:
1. Mostra `Devolver em: 10s`, `9s`, `8s`... atualizando a cada segundo.
2. Ao chegar em **0**, mostra **"Prazo vencido! Devolva o livro."** (estilo vermelho).
3. **Não deixa o `interval` rodando** se o componente for removido da tela.

## Como testar a limpeza (importante!)
Coloque o componente dentro de um `@if (mostrar())` com um botão que alterna `mostrar`. Remova e reinsira: a contagem deve reiniciar, sem "contagens fantasmas" no console.

## Ponto de partida
Copie `exercicio/src/app/contador-emprestimo` para o seu projeto e adicione `<app-contador-emprestimo />` ao seu `app.html` (e `ContadorEmprestimo` em `imports` do `App`).

## Critérios de aceite
- [ ] Contagem regressiva correta (10 → 0).
- [ ] Mensagem de prazo vencido ao zerar.
- [ ] `segundos` configurável via `input`.
- [ ] Sem `subscribe` "solto": cancelamento automático com `takeUntilDestroyed`.

## ⭐ Extra
Adicione um botão **Reiniciar** (dica: guarde a `Subscription` e use `unsubscribe()` antes de criar outra).
