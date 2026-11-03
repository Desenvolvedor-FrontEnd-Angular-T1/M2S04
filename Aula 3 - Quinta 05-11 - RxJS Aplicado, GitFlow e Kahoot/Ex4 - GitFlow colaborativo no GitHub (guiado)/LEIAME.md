# Ex4 - GitFlow colaborativo no GitHub (guiado, ~35 min, em DUPLAS)

## Objetivo
Trabalhar em dupla no **mesmo repositório** do GitHub usando **GitFlow**: branches de função, Pull Request com revisão,
**resolução de um conflito de verdade**, release com tag e hotfix. Tudo com os plugins do VS Code.

## Cenário do dia a dia
Em empresa nunca se trabalha direto na `main`. Imagine um **restaurante**: a cozinha (`feature/*`) testa pratos novos, o
chefe (`develop`) monta o cardápio da semana, e o salão (`main`) só serve o que já foi aprovado. Se um prato servido
dá problema, a cozinha corrige rápido pela porta de serviço (`hotfix/*`).

## Mapa do GitFlow
| Branch | Nasce de | Volta para | Para quê |
|---|---|---|---|
| `main` | - | - | Só código **em produção** (cada versão ganha uma **tag**: `v1.0.0`) |
| `develop` | `main` | - | Integração: onde as features se encontram |
| `feature/*` | `develop` | `develop` (via **Pull Request**) | Uma função nova (`feature/busca`) |
| `release/*` | `develop` | `main` **e** `develop` | Preparar a versão (ajustes finais, número da versão) |
| `hotfix/*` | `main` | `main` **e** `develop` | Correção urgente em produção |

## Plugins do VS Code (instale antes)
| Plugin | Identificador | Para quê |
|---|---|---|
| GitLens | `eamodio.gitlens` | Quem alterou cada linha, histórico, comparar branches |
| Git Graph | `mhutchie.git-graph` | Ver o **grafo** de branches e merges |
| GitHub Pull Requests | `GitHub.vscode-pull-request-github` | Criar e revisar PRs sem sair do editor |
| Conventional Commits | `vivaxy.vscode-conventional-commits` | Montar mensagens padronizadas (`feat:`, `fix:`) |

## Mensagens de commit (Conventional Commits)
`tipo(escopo): descrição curta no imperativo` - tipos: `feat` (função nova), `fix` (correção), `docs`, `style`, `refactor`, `test`, `chore`.
Exemplos: `feat(busca): adiciona filtro por categoria` · `fix(card): corrige botão devolver`.

## Como fazer
- **Ensaio no seu PC, sem internet:** rode `gabarito/simular-gitflow.sh` (Git Bash) e leia a saída. Ele faz **tudo** que a dupla fará.
- **Atividade real em dupla:** siga `exercicio/roteiro-em-dupla.md` (passo a passo com os comandos).
- Cola de comandos: `exercicio/cola-de-comandos.md`. Modelos prontos: `exercicio/CONTRIBUTING.md` e `exercicio/.github/pull_request_template.md`.

## Critérios de aceite (por dupla)
- [ ] Repositório no GitHub com `main` e `develop` e a dupla como colaboradores.
- [ ] Duas features em branches separadas, cada uma com **ao menos 2 commits** no padrão Conventional Commits.
- [ ] **2 Pull Requests** para `develop`, cada um **revisado pelo colega** (comentário + aprovação).
- [ ] **1 conflito** resolvido pelo VS Code (editor de merge) e explicado oralmente.
- [ ] Release `v1.0.0` (tag) e um hotfix `v1.0.1`.
- [ ] Print do **Git Graph** com o histórico final.

## Erros comuns
| Mensagem / sintoma | Causa e solução |
|---|---|
| `! [rejected] ... (non-fast-forward)` | Alguém enviou antes de você: `git pull --rebase origin <branch>` e envie de novo |
| `CONFLICT (content): Merge conflict in ...` | Normal! Abra o arquivo, escolha o resultado final, `git add` e `git commit` |
| `fatal: refusing to merge unrelated histories` | Clonou/iniciou repositórios diferentes; use o mesmo `origin` |
| Commit direto na `main` | Crie branch (`git switch -c feature/x`) e **não** faça push na main; use PR |
| Esqueci de trocar de branch antes de editar | `git stash` -> `git switch -c feature/x` -> `git stash pop` |
