# Versões do Angular nesta semana (leia antes de aplicar)

| Onde | Versão / padrão |
|---|---|
| **Slides, exercícios, `gabarito`, Kahoot, Atividade Avaliativa** | **Angular 22** (`@Service()`, componentes OnPush por padrão, zoneless, `app.ts`, `livro-service.ts`) |
| **Vídeo de segunda (gravação)** | Angular **17.3** (`app.component.ts`, `@Injectable({ providedIn: 'root' })`); explicado verbalmente. Arquivos exatos em `Aula 1 .../_Versao do video (Angular 17.3)/` (somente para o professor) |

## Requisitos do Angular 22 (fonte: angular.dev/reference/versions, conferida em 30/10/2026)
- **Node.js:** ^22.22.3, ^24.15.0 ou ^26.0.0
- **TypeScript:** 6.0
- **RxJS:** ^7.4 (os exercícios usam 7.8)

## O que o Angular 22 muda e aparece na semana
1. **`@Service()`** é o jeito padrão de criar um service singleton (atalho de `@Injectable({ providedIn: 'root' })`, que continua válido). Service **não global**: `@Service({ autoProvided: false })`.
2. **OnPush é o padrão** dos componentes (o antigo padrão chama-se `ChangeDetectionStrategy.Eager`).
3. **Zoneless é o padrão** (desde o Angular 21).
4. Por isso, **estado em `signal`** (ou Observable com `async`) e **dados imutáveis** são o caminho que mantém a tela atualizada.

## Se o aluno estiver em outra versão
- Angular **anterior ao 22**: troque `@Service()` por `@Injectable({ providedIn: 'root' })` (e importe `Injectable`); `@Service({ autoProvided: false })` por `@Injectable()` sem `providedIn`. Em versões anteriores ao 20, os arquivos gerados terminam em `.component.ts` / `.service.ts`.
- Os exercícios foram validados por compilação no Angular 22.2.4 (TypeScript 6.0). Em versões muito antigas (< 17) as APIs `@for`, `signal` e `inject()` podem não existir.

## Itens que dependem de conferência no seu ambiente 22
- O nome exato do arquivo/classe gerado por `ng g s services/livro-service` (a documentação diz que o arquivo se chama como você digitar; confira a classe).
- Se o `HttpClient` precisa de `provideHttpClient()` no `app.config.ts` (nos exercícios de quinta pedimos para acrescentá-lo; se já vier habilitado, ignore).
