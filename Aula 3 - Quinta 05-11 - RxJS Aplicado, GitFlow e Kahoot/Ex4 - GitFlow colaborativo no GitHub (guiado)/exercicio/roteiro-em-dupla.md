# Roteiro em dupla - GitFlow no GitHub

Papéis: **Pessoa A** (dona do repositório) e **Pessoa B** (colaboradora). Troquem de papel no hotfix.
Cada comando tem o "porquê" ao lado. Use o terminal do VS Code.

## 1. Preparar o repositório (Pessoa A)
```bash
cd biblioteca-web                       # entra na pasta do projeto Angular
git init                                # cria o repositório (pule se já existir .git)
git add . && git commit -m "chore: projeto inicial"   # primeiro commit
git branch -M main                      # garante que a branch principal se chama main
```
No GitHub: **New repository** `biblioteca-web` (sem README) e depois:
```bash
git remote add origin https://github.com/<usuario-A>/biblioteca-web.git   # liga a pasta local ao GitHub
git push -u origin main                 # publica a main
git switch -c develop                   # cria a develop a partir da main
git push -u origin develop              # publica a develop
```
No GitHub: **Settings > Collaborators > Add people** -> convide a Pessoa B. (Opcional: Settings > Branches > proteger `main` e `develop`.)

## 2. Pessoa B entra no projeto
```bash
git clone https://github.com/<usuario-A>/biblioteca-web.git   # baixa tudo
cd biblioteca-web
git switch develop                      # passa a trabalhar a partir da develop
```

## 3. Cada pessoa cria sua feature (a partir da develop)
| Pessoa A | Pessoa B |
|---|---|
| `git switch -c feature/titulo-busca` | `git switch -c feature/titulo-tema` |

Ambas **editam a mesma linha** do `<h1>` em `src/app/app.html` (A: "Listagem de livros - com busca"; B: "Listagem de livros - tema escuro") **para gerar um conflito proposital**.
```bash
git add .
git commit -m "feat(titulo): ..."       # use o padrão Conventional Commits; faça pelo menos 2 commits
git push -u origin feature/titulo-...   # publica a sua branch
```

## 4. Pull Request com revisão
1. No GitHub, aparece **Compare & pull request** (ou use a extensão *GitHub Pull Requests*).
2. Base: **develop** <- compare: sua feature. Preencha o modelo do PR.
3. A pessoa revisora: aba **Files changed** > comente uma linha > **Review changes > Approve**.
4. **Merge pull request** (a Pessoa A primeiro).

## 5. Conflito (Pessoa B)
```bash
git switch feature/titulo-tema
git fetch origin
git merge origin/develop                # vai avisar: CONFLICT
```
No VS Code: arquivo marcado em vermelho > **Resolve in Merge Editor** > escolha *Accept Both* ou edite o resultado > **Complete Merge**.
```bash
git add src/app/app.html
git commit -m "merge: resolve conflito do título"
git push
```
Abra o PR da Pessoa B, peça revisão e faça o merge na `develop`.

## 6. Release e hotfix
Release (Pessoa A):
```bash
git switch develop && git pull
git switch -c release/1.0.0
# ajuste a versão em package.json ("version": "1.0.0") e faça commit: chore(release): versão 1.0.0
git switch main && git pull
git merge --no-ff release/1.0.0         # --no-ff mantém o registro de que houve uma release
git tag -a v1.0.0 -m "Versão 1.0.0"     # etiqueta a versão
git switch develop && git merge --no-ff release/1.0.0   # a develop também recebe os ajustes
git push origin main develop --follow-tags
```
Hotfix (Pessoa B): `git switch main && git pull && git switch -c hotfix/titulo` -> corrija -> `fix(titulo): ...` -> merge na **main** (tag `v1.0.1`) **e** na **develop**.

## 7. Entrega
Abra o painel **Git Graph** (ícone no rodapé do VS Code), tire um print do grafo e anexe no AVA com os links dos 2 PRs.
