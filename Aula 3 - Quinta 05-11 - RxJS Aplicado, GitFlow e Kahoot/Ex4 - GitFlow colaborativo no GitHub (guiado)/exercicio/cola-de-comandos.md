# Cola de comandos Git (GitFlow)

| Situação | Comando |
|---|---|
| Ver em qual branch estou e o que mudou | `git status` |
| Criar e entrar em uma branch | `git switch -c feature/nome` |
| Trocar de branch | `git switch develop` |
| Guardar o que fiz e commitar | `git add .` -> `git commit -m "feat(x): ..."` |
| Enviar branch nova para o GitHub | `git push -u origin feature/nome` |
| Trazer novidades do GitHub (sem misturar) | `git fetch origin` |
| Trazer e misturar na branch atual | `git pull` (= fetch + merge) |
| Misturar outra branch na atual | `git merge origin/develop` |
| Merge com registro da feature | `git merge --no-ff feature/nome` |
| Marcar uma versão | `git tag -a v1.0.0 -m "Versão 1.0.0"` e `git push --follow-tags` |
| Ver o grafo no terminal | `git log --graph --oneline --decorate --all` |
| Guardar alterações sem commitar | `git stash` / `git stash pop` |
| Desfazer o último commit mantendo os arquivos | `git reset --soft HEAD~1` |
| Abortar um merge com conflito | `git merge --abort` |

## Conventional Commits - tipos
`feat` função nova · `fix` correção · `docs` documentação · `style` formatação · `refactor` reorganização · `test` testes · `chore` rotina/config
