# Ex4 - DESAFIO: escopo de providers e InjectionToken (opcional, ~30 min)

## Objetivo
Entender **onde** o Angular cria cada instância (hierarquia de injetores) e como injetar valores que **não são classes**.

## Analogia
Pense em uma empresa: o **extintor de incêndio do prédio** é compartilhado por todos os andares (root). O **bloco de notas na mesa**
de cada funcionário é só dele (provider no componente). Se você pedir o extintor e ele não estiver cadastrado, o prédio responde:
`NullInjectorError`.

## Escopos que você vai ver
| Onde o provider é declarado | Quantas instâncias | Quem enxerga |
|---|---|---|
| `@Service()` (ou `@Injectable({ providedIn: 'root' })`) | 1 para o app | Todos |
| `providers: [X]` no componente **pai** | 1 para o pai e seus filhos | O pai e os filhos |
| `providers: [X]` no componente **filho** | 1 por uso do componente | Só aquele componente |

> Para o service **não** ser global, use `@Service({ autoProvided: false })` e declare-o em `providers`. (Antes do Angular 22: `@Injectable()` sem `providedIn`.)

## Passo a passo
1. Em `config.ts`, crie o `InjectionToken<string>` (TODO 1).
2. Em `app.ts`, declare os `providers` (TODO 3).
3. Em `contador-isolado.ts`, declare o provider **no próprio componente** (TODO 4).
4. Rode e clique nos botões `+1`. Compare os **ids** das instâncias.

## Resultado esperado
- Os dois contadores **Compartilhados** mostram o **mesmo id** e o valor sobe nos dois ao clicar em qualquer um.
- Os dois **Isolados** mostram ids **diferentes** e valores independentes.
- O título da página mostra `Biblioteca do Bloco B` (token sobrescrito). Apague o provider do token e veja voltar `Biblioteca Central SENAI`.

## Experimentos extras
- Remova `ContadorService` dos `providers` do `App`: leia o `NullInjectorError` inteiro.
- Troque `useValue` por `useFactory: () => 'texto calculado'`.

## Gabarito
`gabarito/src/app` - comentado linha a linha.
