# Ex1 - BehaviorSubject, async pipe e Subject (guiado, ~25 min)

## Objetivo
Usar **Observables como fonte de estado e de eventos** no Angular, sem `subscribe` manual na tela.

## Dois "tipos" de Subject que você usará todo dia
| Tipo | Guarda valor? | Quem se inscreve depois recebe... | Uso típico |
|---|---|---|---|
| `Subject<T>` | Não | Só o que vier **a partir de agora** | Eventos: "toast", "clicou", "usuário saiu" |
| `BehaviorSubject<T>` | Sim (o último) | **O valor atual** imediatamente | Estado: lista de livros, usuário logado, tema |

**Analogia:** `Subject` = **rádio ao vivo** (perdeu, perdeu). `BehaviorSubject` = **placar do jogo** (quem chega olha e já vê o resultado atual).

## Ponto de partida
Copie `exercicio/src/app` (versão com signals da terça, sem a busca - ela volta no Ex2).

## Passo a passo
1. Converta o `LivroService` para `BehaviorSubject` + `livros$` + `totais$` (TODOs 1-4).
2. Crie o `NotificacaoService` com `Subject` (TODOs A-D).
3. Crie o componente `Toast` (TODOs E-G) - repare no `switchMap`: uma nova mensagem **cancela** o timer da anterior.
4. Ajuste `app.html` e `ResumoBiblioteca` para usar `| async` (TODO 6).
5. Empreste um livro: aparece o aviso verde por 3 s. Empreste vários rápido: o timer reinicia (efeito do `switchMap`).

## Por que `async` pipe?
Ele **assina e cancela** a assinatura sozinho. É a forma mais segura de evitar **vazamento de memória** (esquecer o `unsubscribe`).

## Erros comuns
| Sintoma | Causa |
|---|---|
| `NG02100: InvalidPipeArgument` / pipe `async` não encontrado | Faltou `AsyncPipe` em `imports` |
| Lista não aparece | Esqueceu de usar `| async` ou usou `livros$` como se fosse array |
| Toast nunca some | Faltou o `switchMap(() => timer(3000))` ou o `subscribe` final |
| Atualiza, mas só na 2ª tentativa | Estava mutando a lista em vez de `next(novaLista)` |
