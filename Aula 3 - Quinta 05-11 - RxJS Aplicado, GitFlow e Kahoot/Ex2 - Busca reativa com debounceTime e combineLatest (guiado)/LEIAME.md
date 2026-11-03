# Ex2 - Busca reativa com debounceTime e combineLatest (guiado, ~25 min)

## Objetivo
Construir o filtro de busca **como um fluxo de dados**: eventos do usuário entram, passam por operadores e a lista filtrada sai.

## Cenário do dia a dia
É a **busca da Amazon / iFood**: você digita, o app espera você parar de digitar e só então consulta. Sem `debounceTime`,
cada tecla dispararia uma consulta (em API real, centenas de requisições desnecessárias).

## Operadores do dia
| Operador | O que faz | Analogia |
|---|---|---|
| `debounceTime(300)` | Espera 300 ms de silêncio | Garçom que só anota quando você termina de falar |
| `distinctUntilChanged()` | Ignora valor igual ao anterior | Não repetir o mesmo pedido |
| `map()` | Transforma o valor | Padronizar texto (minúsculas) |
| `startWith('')` | Emite um valor inicial | Tela já abre com "tudo" |
| `combineLatest([a$, b$, c$])` | Junta o **último** valor de cada fonte | Painel que mostra o último dado de 3 sensores |

## Ponto de partida
Copie `exercicio/src/app` (Ex1 pronto + filtros ainda **sem tratamento**: filtra a cada tecla e repete categorias).

## Passo a passo
1. TODO 1: aplique `debounceTime`, `distinctUntilChanged`, `map` e `startWith` ao texto digitado.
2. TODO 2: monte `livrosFiltrados$` com `combineLatest` (texto **e** categoria).
3. TODO 3: elimine categorias repetidas com `Set`.
4. Teste: digite rápido "angular" - o contador de resultados só muda **depois** de parar. Escolha **Design** e depois digite "css".

## Para pensar
- O que acontece se você remover o `startWith('')`? (a lista fica vazia até digitar - `combineLatest` espera **todas** as fontes emitirem)
- `toSignal` converte o Observable em signal. Quando preferir `async` pipe e quando preferir `toSignal`?

## Erros comuns
| Sintoma | Causa |
|---|---|
| Tela vazia ao abrir | Faltou `startWith('')` no texto |
| Filtro só reage ao texto | `categoriaEscolhida$` ficou fora do `combineLatest` |
| `Type 'Event' ... 'value'` | Faltou `(evento.target as HTMLInputElement).value` |
