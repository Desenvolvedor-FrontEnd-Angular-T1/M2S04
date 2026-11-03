# Ex1 - Extraindo os livros para um LivroService (guiado, ~20 min)

## Objetivo
Tirar os **dados** e as **regras** de dentro do `app.ts` e colocá-los em um **Service**, usando **Injeção de Dependência** (`inject`).

## Conceitos de hoje
| Conceito | Em uma frase |
|---|---|
| Service | Classe que guarda dados e regras de negócio fora da tela |
| `@Service()` | Marca a classe como service: o Angular a cria e entrega a quem pedir, em **uma única instância** (singleton). Em versões anteriores ao Angular 22 o equivalente é `@Injectable({ providedIn: 'root' })` |
| `inject()` | Pede ao Angular uma dependência (em vez de usar `new`) |
| `signal()` | "Caixinha" que guarda um valor e **avisa a tela** quando ele muda (amanhã aprofundamos) |

## Ponto de partida
Copie `exercicio/src/app` por cima de `src/app` do `biblioteca-web`. (Se preferir, use o seu projeto da S03.)

## Passo a passo
1. Gere o service: `ng g s services/livro-service` (o arquivo `exercicio/.../livro-service.ts` já traz o esqueleto).
2. Coloque `@Service()` na classe.
3. **Recorte** a lista `livros` do `app.ts` e **cole** no service como `private _livros = signal<Livro[]>([...])`; exponha `readonly livros = this._livros.asReadonly()`.
4. Crie `emprestar(id)` e `devolver(id)` no service (com `update` + `map`).
5. No `app.ts`: apague a lista e a regra; use `private livroService = inject(LivroService)` e `livros = this.livroService.livros`.
6. No `app.html` troque `livros` por `livros()` (parênteses = ler o signal).
7. Rode `ng serve`. O comportamento visual deve ser **idêntico** ao da S03.

## Como saber se deu certo
- A tela funciona como antes (cards, emprestar, devolver).
- O `app.ts` ficou **menor** e sem nenhuma lista de livros.
- Console do navegador mostra `LivroService criado` **uma vez** (acrescente o `console.log` no `constructor` para ver).

## Por que um signal já hoje?
Nos projetos Angular 22 os componentes nascem **OnPush** e a aplicação é **zoneless**: o Angular só redesenha quando um **signal lido no template** muda (ou quando um evento ocorre). Guardar o estado em um signal é o que faz o `ResumoBiblioteca` (Ex2) atualizar sozinho.

## Erros comuns
| Mensagem / sintoma | Causa provável |
|---|---|
| `NullInjectorError: No provider for LivroService` | Faltou o `@Service()` (ou `@Injectable({ providedIn: 'root' })`) |
| `inject() must be called from an injection context` | Chamou `inject()` dentro de um método; use no campo da classe ou no `constructor` |
| Lista vazia / mostra `[Function]` | No template falta o parêntese: `livros()` |
| Clique não atualiza a tela | Alterou o objeto direto (`l.disponivel = false`) em vez de criar um novo com `update` |

## Seu projeto está em outra versão?
Se o seu `ng version` mostrar Angular **anterior ao 22**, troque `@Service()` por `@Injectable({ providedIn: 'root' })` (e importe `Injectable`). O restante é igual.

## Gabarito
`gabarito/src/app` - comentado linha a linha.
