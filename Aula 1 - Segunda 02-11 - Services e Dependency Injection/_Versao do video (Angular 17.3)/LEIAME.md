# Versão do vídeo - Angular 17.3 (somente para o professor gravar)

> **Não publique esta pasta para os alunos.** Os alunos recebem as pastas `Ex0` a `Ex4` (padrão **Angular 22**).

## Por que esta pasta existe
O computador de gravação tem **Node 20.18.0** e **Angular CLI 17.3.10**. O curso usa o **Angular 22**. Aqui estão os mesmos Ex0, Ex1 e Ex2 da Aula 1 **com os nomes e decorators do Angular 17.3**, para você gravar sem improvisar e para o vídeo ficar coerente com o que o aluno verá no próprio projeto (traduzido).

| Pasta | O que é |
|---|---|
| `0-ponto-de-partida/` | Estado final da Semana 3 (copie `src/app` sobre o projeto novo) |
| `1-resultado-Ex1/` | Como o projeto deve ficar **depois do Ex1** (LivroService) |
| `2-resultado-Ex2/` | Como o projeto deve ficar **depois do Ex2** (Resumo + service compartilhado) |

## Como montar o projeto do vídeo
```bash
ng new biblioteca-web --style=css --routing=false --ssr=false
cd biblioteca-web
# copie 0-ponto-de-partida/src/app por cima de src/app e apague src/app/app.component.spec.ts
ng serve
```

## Verificações já feitas
- `0`, `1` e `2` compilam com o **compilador do Angular 17.3.12** (`strictTemplates`).
- O `2-resultado-Ex2` foi compilado com **`ng build` do CLI 17.3.10 sob Node 20.18.0** e carregado em navegador headless: renderizou **8 cards** e o resumo **8 / 6 / 2** (total / disponíveis / emprestados).

## Tabela de equivalência (mostre na tela)
| | Seu vídeo (Angular 17.3) | Curso e alunos (Angular 22) |
|---|---|---|
| Arquivos do componente raiz | `app.component.ts / .html / .css` | `app.ts / app.html / app.css` |
| Classe raiz | `AppComponent` | `App` |
| Componentes gerados | `resumo-biblioteca.component.ts`, `ResumoBibliotecaComponent` | `resumo-biblioteca.ts`, `ResumoBiblioteca` |
| Service gerado | `ng g s services/livro` → `livro.service.ts` | `ng g s services/livro-service` → `livro-service.ts` |
| Decorator do service | `@Injectable({ providedIn: 'root' })` | `@Service()` |
| Service não global | `@Injectable()` sem `providedIn` | `@Service({ autoProvided: false })` |
| `standalone: true` | Escrito no `@Component` | Padrão (não aparece) |
| Detecção de mudanças | zone.js, componentes `Default` | zoneless, componentes **OnPush** por padrão |
| `inject()`, `@for`, `@if`, `signal` | Iguais | Iguais |

## O que **não** muda (diga isto ao aluno)
O corpo do service, o `inject()`, o `@for`/`@if`, os `signals` e a ideia de DI/singleton. Só mudam **nomes de arquivos e de classes** e o **decorator**.

## Mapa dos nomes (para o aluno que assistir ao vídeo e abrir o gabarito)
- `app.component.ts` ↔ `app.ts` · `AppComponent` ↔ `App`
- `card-livro.component.ts` ↔ `card-livro.ts` · `CardLivroComponent` ↔ `CardLivro`
- `resumo-biblioteca.component.ts` ↔ `resumo-biblioteca.ts` · `ResumoBibliotecaComponent` ↔ `ResumoBiblioteca`
- `services/livro.service.ts` ↔ `services/livro-service.ts`
