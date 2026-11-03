# Ex3 - TAREFA: HistoricoService e injeção entre services (~40 min, autônomo)

## Objetivo
Criar um segundo service e **injetá-lo dentro do primeiro**. Em projetos reais, services chamam outros services o tempo todo
(`AuthService` usa `HttpService`, `CarrinhoService` usa `NotificacaoService`...).

## Cenário do dia a dia
A biblioteca precisa de uma **auditoria**: toda vez que alguém empresta ou devolve um livro, o sistema registra *o quê* e *quando*.

## Ponto de partida
Copie `exercicio/src/app` (Ex2 pronto + esqueletos com **10 TODOs**).

## O que entregar
1. `HistoricoService` completo (`registrar`, `registros`, `limpar`), guardando a lista em um **signal**.
2. `LivroService` chamando `historico.registrar(...)` ao emprestar/devolver.
3. Componente `Historico` listando as ações com **hora formatada** e botão **Limpar**.

## Critérios de aceite
- [ ] Empréstimo e devolução aparecem no histórico, **mais recente primeiro**.
- [ ] Com histórico vazio aparece "Nenhuma ação registrada ainda." (`@empty`).
- [ ] Botão **Limpar** esvazia a lista.
- [ ] O `app.ts` **não** conhece o `HistoricoService` (só o `LivroService` e o componente `Historico` o conhecem).

## Dicas
- `inject()` em campo de classe funciona também dentro de services.
- Em signals, **nunca altere a lista por dentro** (`push`): crie uma nova (`[novo, ...lista]`).
- Pipes (como `date`) precisam ser colocados em `imports` do componente.

## Gabarito
Só abra depois de tentar: `gabarito/src/app`.
