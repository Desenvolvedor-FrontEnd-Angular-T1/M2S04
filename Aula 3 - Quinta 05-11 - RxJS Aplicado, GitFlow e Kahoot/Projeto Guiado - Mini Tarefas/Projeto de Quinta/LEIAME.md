# Projeto de Quinta — Mini Tarefas (guiado, ~1h)

Um mini app de tarefas que junta **tudo da semana** em um só projeto. O projeto já vem **pronto e funcionando**: você só completa os trechos marcados com **`👉 TODO`**.

## Como começar (3 comandos)
```bash
npm install
ng serve
```
Abra `http://localhost:4200`. Você verá a tela montada, mas **sem dados** (é normal: falta o service).

> Dica: no VS Code use **Ctrl + Shift + F** e procure por `TODO` para ver todos os pontos de uma vez.

## O que cada tópico da semana vira neste projeto
| Tópico | Onde aparece | TODO |
|---|---|---|
| Provider / `provideHttpClient` | `app.config.ts` | 1 |
| **Gerar e criar um Service** (`ng g s`) | `services/tarefa` | (professor passa o código) |
| **Injeção de dependência** (`inject`) | Service, Resumo, Formulário, Lista, App | 2A, 3A, 6B, 7A |
| **signal** | estado do Service, `busca` | 6C |
| **computed** | `percentual` e os totais do Service | 2B |
| **effect** | `document.title` (App) e localStorage (Service) | 7B |
| **input / output** | `CardTarefa` | 4A, 4B |
| **model** (two-way `[( )]`) | `CampoBusca` ↔ `Lista` | 5A, 5B, 6F |
| **OnPush** | `CardTarefa`, `Lista` | 8 |
| **BehaviorSubject** | filtro de categoria na `Lista` | 6C, 6E |
| **combineLatest / debounceTime / distinctUntilChanged** | busca na `Lista` | 6D |
| **async pipe** | lista de cards | 6G |
| **Subject** (+ `switchMap`) | `NotificacaoService` + `Toast` (já prontos) | — |
| **HttpClient / Observable** (carregando, erro, retry) | Service + App | 7C, 7D |

## Roteiro (siga a ordem!)
| # | Tempo | O que fazer |
|---|---|---|
| 0 | 5 min | `npm install`, `ng serve`, olhar a tela |
| 1 | 5 min | **TODO 1** em `app.config.ts` (habilitar HttpClient) |
| 2 | 10 min | **Gerar o service:** `ng g s services/tarefa-service` e colar o código passado pelo professor |
| 3 | 5 min | **Resumo** (TODO 2A–2D): DI, `computed` e signals no template |
| 4 | 5 min | **Formulário** (TODO 3A–3B): DI e chamar o service |
| 5 | 5 min | **CardTarefa** (TODO 4A–4B) e **OnPush** (TODO 8): `input` / `output` |
| 6 | 5 min | **CampoBusca** (TODO 5A–5B): `model` |
| 7 | 15 min | **Lista** (TODO 6A–6G): BehaviorSubject, combineLatest, debounceTime, async pipe |
| 8 | 5 min | **App** (TODO 7A–7D): `effect`, carregando e erro |
| 9 | 5 min | Testes finais + GitFlow (abaixo) |

> O ponto 2 acontece **antes** de qualquer componente: sem o service nenhum TODO de DI funciona.

## Passo 2 · Gerando o service
```bash
ng g s services/tarefa-service
```
Isso cria `src/app/services/tarefa-service.ts` com uma classe `TarefaService` quase vazia (`@Service() export class TarefaService {}`). Depois, abra o arquivo **`MODELO-tarefa-service.ts`** (na raiz do projeto), copie tudo e cole **no lugar** do conteúdo do arquivo gerado. Nele, o que já vem pronto serve de exemplo e os **`👉 TODO B, D, E, F1–F3, G1–G2`** são seus (cada um explica o que fazer).
> Digite o nome **completo** (`tarefa-service`). Se digitar só `tarefa`, o Angular cria `tarefa.ts` com a classe `Tarefa` e os imports não vão bater.
Depois de colar, a importação nos componentes é:
```ts
import { TarefaService } from '../services/tarefa-service';
```

## Como saber se deu certo
1. A tela mostra **5 tarefas** e o resumo **5 / 4 / 1**.
2. Marque uma tarefa: o resumo e a barra de progresso mudam, e a **aba do navegador** mostra `(N) Mini Tarefas`.
3. Adicione uma tarefa: aparece um **aviso verde** por 3 s.
4. Digite na busca **rápido**: a lista só filtra depois que você para de digitar (300 ms).
5. Escolha a categoria **Estudos** e depois digite `rx`.
6. Recarregue a página (F5): as tarefas **continuam** (localStorage via `effect`).
7. Clique em **Recarregar do servidor**: aparece "Carregando tarefas..." por ~1 s.

## Erros comuns
| Sintoma | Causa |
|---|---|
| `NullInjectorError: No provider for HttpClient` | Faltou o TODO 1 (`provideHttpClient()`) |
| `Cannot find module '../services/tarefa-service'` | Service não foi gerado, ou o caminho está diferente |
| `NG8001: 'app-campo-busca' is not a known element` | Faltou colocar `CampoBusca` no `imports` da `Lista` (TODO 6A) |
| `NG0950: Input is required but no value is available yet` | `tarefa` é `input.required`: use `tarefa()` só no template |
| `Property 'xxx' is protected / private` | Use `protected` nos membros que o template lê |
| `| async` não funciona / pipe não encontrado | Faltou `AsyncPipe` no `imports` da `Lista` |
| Número não muda na tela | Esqueceu os parênteses do signal: `service.total()` e não `service.total` |
| Lista não atualiza ao marcar/remover | Alterou o array direto (`push`) em vez de `update` com um array novo |

## Etapa final · GitFlow (5 min)
```bash
git init
git checkout -b feature/mini-tarefas
git add .
git commit -m "feat: mini projeto de tarefas com service, signals e rxjs"
```
Se tiver repositório no GitHub: `git push -u origin feature/mini-tarefas` e abra um **Pull Request** para `develop`.

## Desafio extra (se sobrar tempo)
Crie um botão **"Limpar concluídas"** que remove todas as tarefas concluídas (método novo no service usando `update` + `filter`).
