# Ex3 - OnPush e effect com localStorage (guiado, ~20 min)

## Objetivo
1. Usar `effect()` para **persistir** o acervo no `localStorage` automaticamente.
2. Aplicar `ChangeDetectionStrategy.OnPush` nos componentes de apresentação e entender por que ele combina com signals.

## Ideia central
- `effect` = "toda vez que isto mudar, **faça algo fora do Angular**" (salvar, logar, mudar o título da aba).
- `OnPush` = "só **reverifique** este componente se um `input` mudou, um evento dele disparou ou um signal lido por ele mudou".
  Resultado: menos trabalho para o Angular a cada ciclo; telas grandes ficam mais rápidas.

## Ponto de partida
Copie `exercicio/src/app` (Ex2 pronto). Siga os 6 TODOs do cabeçalho de `livro-service.ts`.

## Teste de aceite (2 minutos)
1. Empreste dois livros.
2. Recarregue a página (**F5**): os livros continuam emprestados.
3. DevTools › Application › Local Storage › `biblioteca:livros`: veja o JSON salvo.
4. Clique em **Restaurar acervo**: tudo volta ao original e o Local Storage é sobrescrito.

## Erros comuns
| Sintoma | Causa |
|---|---|
| `JSON.parse` quebra com `undefined` | Salvou algo que não é JSON válido; limpe a chave no DevTools |
| Carrega sempre o acervo original | Esqueceu de chamar `carregar()` no `signal(...)` inicial |
| Card não atualiza com `OnPush` | Mutou o objeto em vez de criar um novo (`{ ...l, disponivel }`) |
