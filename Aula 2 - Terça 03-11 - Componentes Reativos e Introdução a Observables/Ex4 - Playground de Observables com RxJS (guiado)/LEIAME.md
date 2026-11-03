# Ex4 - Playground de Observables com RxJS (guiado, ~20 min)

## Objetivo
Entender **na prática** o que é um Observable **antes** de usá-lo no Angular, rodando tudo no terminal com Node (como na semana 12 do Módulo 1).

## Analogia do dia a dia
- **Promise** = **encomenda única**: você pede, recebe **uma** caixa e acabou.
- **Observable** = **assinatura de streaming/canal do YouTube**: só passa a receber se você **se inscrever**, pode chegar **vários** vídeos ao longo do tempo e você pode **cancelar** quando quiser.

## Como rodar
```bash
cd exercicio
npm install        # baixa o rxjs (lembra do package.json da semana 12?)
npm start          # executa node playground.mjs
```

## Passo a passo
Complete os **10 TODOs** do `playground.mjs`, na ordem. Depois de cada um rode `npm start` e compare com o `gabarito`.

## Perguntas para responder no final
1. O que acontece se você criar um Observable e **não** chamar `subscribe`? (nada - é *lazy*)
2. Por que usamos `take(4)` com `interval`? (para ele completar; senão corre para sempre)
3. Qual a vantagem de `unsubscribe`? (evita vazamento de memória/ticks fantasmas)
4. Em que um Observable é **diferente** de uma Promise? (vários valores, preguiçoso, cancelável)

## Erros comuns
| Sintoma | Causa |
|---|---|
| `Cannot find package 'rxjs'` | Esqueceu `npm install` ou está na pasta errada |
| `Cannot use import statement outside a module` | Falta `"type": "module"` no `package.json` |
| O script nunca termina | Um `interval` sem `take`/`unsubscribe` |
