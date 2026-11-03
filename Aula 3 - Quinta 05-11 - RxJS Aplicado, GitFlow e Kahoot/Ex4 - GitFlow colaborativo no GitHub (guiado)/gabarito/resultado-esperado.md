# Resultado esperado da simulação

Saída final de `bash simular-gitflow.sh` (os códigos hexadecimais mudam a cada execução; o **formato** do grafo é o que importa):

```text
*   4e4a590 (origin/develop) Merge hotfix/titulo into develop
|\
* \   ed2516a (HEAD -> develop) Merge release/1.0.0 back into develop
|\ \
| | | *   0969d56 (tag: v1.0.1, origin/main, origin/HEAD) Merge hotfix/titulo into main
| | | |\
| | | |/
| | |/|
| | * | a2986c0 fix(titulo): corrige nome da instituição no título
| | |/
| | *   a29f137 (tag: v1.0.0, main) Merge release/1.0.0 into main
| | |\
| | |/
| |/|
| * | b65b582 (release/1.0.0) chore(release): versão 1.0.0
|/ /
* |   35f3fc0 Merge pull request #2 from feature/tema
|\ \
| * \   5ecd339 (origin/feature/tema) merge: resolve conflito do título entre busca e tema
| |\ \
| |/ /
|/| |
* | |   3c25e35 Merge pull request #1 from feature/busca
|\ \ \
| |_|/
|/| |
| * | 4d8dd34 (origin/feature/busca, feature/busca) feat(busca): adiciona campo de busca no título
|/ /
| * deca302 feat(tema): aplica tema escuro no título
|/
* 91c8455 chore: projeto inicial
```

## Como ler o grafo
- `*` = um commit. `|\` e `|/` = branches que se separam e se encontram (merges).
- `Merge pull request #1/#2`: as duas features entraram na `develop` por **PR**.
- `merge: resolve conflito ...`: o commit que a Pessoa B fez ao **resolver o conflito**.
- `tag: v1.0.0` e `tag: v1.0.1`: as versões em produção (na `main`).
- O hotfix aparece **duas vezes**: entrou na `main` **e** na `develop` (para não perder a correção na próxima release).

## Observação sobre o terminal
No Windows, o Git pode exibir avisos `LF will be replaced by CRLF`. São normais e não afetam o resultado.
