# Ex3 - HttpClient e Observables (guiado, ~25 min)

## Objetivo
Buscar dados por **HTTP** e tratar os três estados de qualquer tela real: **carregando**, **sucesso** e **erro**.

## Conexão com o que você já viu
Na semana 11 (Módulo 1) você usou `fetch` + `await`. O `HttpClient` do Angular faz o mesmo trabalho, mas devolve um **Observable** - e isso nos dá `retry`, `catchError`, `delay`, `finalize` e cancelamento "de graça".

| `fetch` (Módulo 1) | `HttpClient` (Angular) |
|---|---|
| `await fetch(url)` + `response.json()` | `this.http.get<Livro[]>(url)` |
| `try/catch` | `catchError(...)` |
| Repetir manualmente | `retry(2)` |
| Cancelar: `AbortController` | Cancelar: `unsubscribe` (ou `switchMap`) |

## Ponto de partida
1. Copie `exercicio/src/app` por cima de `src/app`.
2. Copie `exercicio/public/livros.json` para a pasta `public/` do projeto.
3. Abra `app.config.EXEMPLO.ts` e **acrescente** `provideHttpClient()` ao `providers` do **seu** `app.config.ts`.

## Passo a passo
1. No `LivroService`, siga os TODOs (injetar `HttpClient` e completar `carregar()`).
2. Rode: aparece **"Carregando acervo..."** por ~1 s e depois os cards.
3. **Quebre de propósito:** troque `livros.json` por `livros-x.json`. O app deve mostrar o aviso vermelho e o botão **Tentar novamente** (veja 3 tentativas na aba **Network** do DevTools: o `retry`).
4. Volte o nome correto e clique em **Tentar novamente**.

## Erros comuns
| Sintoma | Causa |
|---|---|
| `NullInjectorError: No provider for HttpClient` | Faltou `provideHttpClient()` no `app.config.ts` |
| 404 em `livros.json` | O arquivo não está em `public/` (precisa reiniciar o `ng serve`) |
| "Carregando" nunca some | Faltou o `finalize` |
| Lista vazia sem aviso | `catchError` devolveu `of([])` e a mensagem de erro não foi definida |
