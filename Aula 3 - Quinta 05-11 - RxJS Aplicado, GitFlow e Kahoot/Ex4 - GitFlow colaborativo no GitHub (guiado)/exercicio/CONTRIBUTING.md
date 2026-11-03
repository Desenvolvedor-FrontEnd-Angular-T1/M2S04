# Como contribuir com a biblioteca-web

## Fluxo de trabalho (GitFlow)
1. Atualize a `develop`: `git switch develop && git pull`.
2. Crie sua branch: `git switch -c feature/<o-que-faz>`.
3. Faça commits pequenos no padrão **Conventional Commits** (`feat(busca): ...`).
4. Envie a branch e abra um **Pull Request** para a `develop`.
5. Peça revisão de **pelo menos 1 pessoa**. Só faça merge com aprovação.

## Regras
- **Nunca** faça push direto na `main` ou na `develop`.
- Um PR = uma função/ajuste. PR gigante é difícil de revisar.
- Rode `ng build` antes de abrir o PR (TODO: o que mais a equipe deve verificar? Complete esta lista).

## Nomes de branch
`feature/…` · `release/x.y.z` · `hotfix/…`
