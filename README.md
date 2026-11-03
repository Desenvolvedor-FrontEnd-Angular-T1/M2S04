# Angular T1 - Módulo 2 - Semana 4 (M2S04)

**Ementa:** Services e Dependency Injection · Componentes Reativos · Introdução aos Observables e RxJS · GitHub colaborativo (plugins e GitFlow)

**Versão do curso: Angular 22** (slides, exercícios, Kahoot e AVA). O vídeo de segunda é gravado em **Angular 17.3** (ambiente do professor) e explicado no padrão 22. Veja `LEIAME-VERSOES.md`.

| Dia | Formato | Tema | Pasta |
|---|---|---|---|
| Seg 02/11 | **Gravada** (vídeo 1h20 + laboratório) | Services e DI | `Aula 1 - Segunda 02-11 - ...` |
| Ter 03/11 | Ao vivo (3h) | Signals / componentes reativos + Intro a Observables | `Aula 2 - Terça 03-11 - ...` |
| Qui 05/11 | Ao vivo (3h) | RxJS aplicado + GitFlow + **Kahoot (últimos 20 min)** | `Aula 3 - Quinta 05-11 - ...` |

## Comece por aqui
1. `Plano_de_Aula_M2S04_...` - estratégia, divisão por dia, cronograma e **riscos** (leia a seção 5).
2. `LEIAME-VERSOES.md` - o que muda do Angular 17.3 (vídeo) para o 22 (curso).
3. `Roteiro_de_Gravacao_M2S04_Aula1_Segunda_02-11` - roteiro da aula gravada, com **tabela de equivalência** e falas prontas.
4. `Drive - Slides e Atividade Avaliativa S04/` - **PPTX (121 slides, padrão Angular 22)** e **DOCX (10 questões)** para subir no Drive/AVA.

## Guia do Professor
- `Guia_Professor_M2S04_Services_Signals_RxJS_GitFlow` (HTML + PDF): roteiro dos 3 encontros alinhado aos slides, com falas, códigos, perguntas, erros comuns e checklists.

## Material complementar (HTML + PDF)
- `Ponte_Semana3_para_Semana4`
- `Ferramentas_de_Apoio_M2S04`
- `Perguntas_Kahoot_M2S04_...` (18 perguntas) e `Perguntas_Kahoot_M2S04.xlsx` (planilha para importar)

## Estrutura dos exercícios (padrão Angular 22, para os alunos)
```
Aula N - .../
  ExK - Nome/
    LEIAME.md        objetivo, conceitos, passo a passo, erros comuns
    exercicio/       ponto de partida com TODOs  (copie src/app por cima do seu projeto)
    gabarito/        resposta comentada linha a linha
  _Versao do video (Angular 17.3)/    (somente Aula 1, SÓ PARA O PROFESSOR)
```
Projeto de trabalho: `biblioteca-web` (o da Semana 3). Se faltar, use `Aula 1/Ex0 - Base`.

## Repositório público
- Nada nesta pasta aponta para registro, feed ou caminho local de empresa; o `.gitignore` já exclui `node_modules/`, `.angular/`, `dist/` e `*.log`.
- O playground RxJS (`Aula 2/Ex4`) traz um `.npmrc` que fixa o registro público do npm (`https://registry.npmjs.org/`). Ao gerar um `package-lock.json` nele, confira que os endereços `resolved` são `registry.npmjs.org` antes de commitar.

## Pendências suas
- Colar o **QR Code da avaliação docente** nos slides **36, 81 e 120**.
- Confirmar o horário real (premissa: 19h00-22h00, intervalo 20h30) e o feriado de 02/11.
- Fazer um `ng build` / `ng serve` da pasta `_Versao do video/2-resultado-Ex2` no seu computador antes de gravar (já passou no meu teste com o mesmo Node/CLI).
- Conferir em um ambiente Angular 22 o nome da classe gerada por `ng g s services/livro-service` e rodar `ng serve` nos Ex1 e Ex3 de quinta.
- Curar vídeos de apoio (nenhum link de vídeo foi inventado).
