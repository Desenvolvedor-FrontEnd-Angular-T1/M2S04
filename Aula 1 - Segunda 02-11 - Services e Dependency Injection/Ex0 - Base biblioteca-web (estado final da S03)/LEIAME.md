# Ex0 - Base: biblioteca-web (estado final da Semana 3)

**Use esta pasta somente se o seu projeto `biblioteca-web` da Semana 3 não estiver completo.**
Se o seu projeto já lista os livros em cards com `@for`, botões Emprestar/Devolver e `@Input/@Output`, **pule este exercício**.

## Como usar
1. No terminal: `ng new biblioteca-web` (aceite as opções padrão) e `cd biblioteca-web`.
2. Copie a pasta `gabarito/src/app` por cima de `src/app` do seu projeto.
3. `ng serve` e abra `http://localhost:4200`.

## O que você deve ver
Uma grade com 8 cards de livros. Clique em **Emprestar**: o card fica cinza e o botão vira **Devolver**.

## Por que este é o ponto de partida?
Os dados (`livros`) e as regras (`emprestar`/`devolver`) estão **dentro do `app.ts`**. Na aula de hoje
vamos mover tudo isso para um **Service** e deixar o componente apenas com a parte visual.

> Os próximos exercícios já trazem os arquivos necessários - cada `Ex` é independente, você pode copiar
> `exercicio/src/app` (ponto de partida) ou `gabarito/src/app` (resposta) por cima do projeto.
