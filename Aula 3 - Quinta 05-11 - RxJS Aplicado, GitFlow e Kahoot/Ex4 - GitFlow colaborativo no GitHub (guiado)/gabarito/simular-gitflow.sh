#!/usr/bin/env bash
# simular-gitflow.sh - GABARITO EXECUTÁVEL do Ex4.
# Simula, no SEU computador e sem internet, duas pessoas (Ana e Bruno) trabalhando em equipe com GitFlow.
# O "GitHub" aqui é uma pasta (repositório "bare" = só o histórico, sem arquivos de trabalho).
# Como rodar (Git Bash / Linux / macOS):   bash simular-gitflow.sh
set -e                                   # para o script no primeiro erro
BASE="$(mktemp -d)"                      # pasta temporária só para esta simulação
cd "$BASE"
export GIT_MERGE_AUTOEDIT=no             # não abrir editor ao fazer merge
passo() { printf '\n\033[1;32m>>> %s\033[0m\n' "$1"; }   # imprime títulos coloridos

# ---------- 0. "GitHub" (origin) e dois clones: um para cada pessoa ----------
passo "0. Criando o 'GitHub' (origin) e dois clones: ana/ e bruno/"
git init --bare -q --initial-branch=main origin.git      # repositório central
git clone -q origin.git ana   2>/dev/null; git clone -q origin.git bruno 2>/dev/null
git -C ana   config user.name "Ana";   git -C ana   config user.email "ana@exemplo.com"
git -C bruno config user.name "Bruno"; git -C bruno config user.email "bruno@exemplo.com"

# ---------- 1. main e develop ----------
passo "1. Ana cria a main (primeira versão) e a develop (branch de integração)"
cd ana
git checkout -q -b main
printf '<h1>Biblioteca</h1>\n' > index.html
git add . && git commit -q -m "chore: projeto inicial"
git push -q -u origin main                              # publica a main no 'GitHub'
git checkout -q -b develop && git push -q -u origin develop   # develop nasce da main
cd ..

# ---------- 2. Bruno entra no projeto ----------
passo "2. Bruno baixa o projeto e passa a acompanhar a develop"
cd bruno
git fetch -q origin
git checkout -q develop                                  # cria develop local ligada à origin/develop
cd ..

# ---------- 3. Duas features em paralelo (nasce SEMPRE da develop) ----------
passo "3. Ana: feature/busca  |  Bruno: feature/tema  (as duas editam a MESMA linha do index.html)"
( cd ana   && git checkout -q -b feature/busca && printf '<h1>Biblioteca - com busca</h1>\n' > index.html && git commit -qam "feat(busca): adiciona campo de busca no título" && git push -q -u origin feature/busca )
( cd bruno && git checkout -q -b feature/tema  && printf '<h1>Biblioteca - tema escuro</h1>\n' > index.html && git commit -qam "feat(tema): aplica tema escuro no título" && git push -q -u origin feature/tema )

# ---------- 4. Pull Request da Ana (no GitHub seria clicar em 'Merge') ----------
passo "4. PR #1 aprovado: feature/busca entra na develop (merge --no-ff mantém o registro da feature)"
cd ana
git checkout -q develop && git merge -q --no-ff feature/busca -m "Merge pull request #1 from feature/busca"
git push -q origin develop
cd ..

# ---------- 5. Bruno atualiza a develop e ENCONTRA O CONFLITO ----------
passo "5. Bruno atualiza a feature com a develop nova -> CONFLITO (as duas mexeram na mesma linha)"
cd bruno
git fetch -q origin
git checkout -q feature/tema
git merge origin/develop || true                          # falha de propósito: conflito
echo "--- arquivo com marcadores de conflito ---"; cat index.html
passo "5b. Bruno resolve (escolhe o resultado final que une as duas ideias) e conclui o merge"
printf '<h1>Biblioteca - busca e tema escuro</h1>\n' > index.html
git add index.html && git commit -q -m "merge: resolve conflito do título entre busca e tema"
git push -q origin feature/tema
git checkout -q develop && git pull -q origin develop
git merge -q --no-ff feature/tema -m "Merge pull request #2 from feature/tema"
git push -q origin develop
cd ..

# ---------- 6. Release ----------
passo "6. release/1.0.0 sai da develop; main recebe a release e ganha a tag v1.0.0"
cd ana
git fetch -q origin && git checkout -q develop && git pull -q origin develop
git checkout -q -b release/1.0.0
printf '1.0.0\n' > VERSION && git add . && git commit -q -m "chore(release): versão 1.0.0"
git checkout -q main && git pull -q origin main
git merge -q --no-ff release/1.0.0 -m "Merge release/1.0.0 into main"
git tag -a v1.0.0 -m "Versão 1.0.0"
git checkout -q develop && git merge -q --no-ff release/1.0.0 -m "Merge release/1.0.0 back into develop"
git push -q origin main develop --follow-tags
cd ..

# ---------- 7. Hotfix ----------
passo "7. hotfix/titulo sai da MAIN, volta para main e develop, e vira a tag v1.0.1"
cd bruno
git fetch -q origin && git checkout -q main && git pull -q origin main
git checkout -q -b hotfix/titulo
printf '<h1>Biblioteca SENAI - busca e tema escuro</h1>\n' > index.html
printf '1.0.1\n' > VERSION
git commit -qam "fix(titulo): corrige nome da instituição no título"
git checkout -q main && git merge -q --no-ff hotfix/titulo -m "Merge hotfix/titulo into main"
git tag -a v1.0.1 -m "Versão 1.0.1"
git checkout -q develop && git pull -q origin develop && git merge -q --no-ff hotfix/titulo -m "Merge hotfix/titulo into develop" || true
git push -q origin main develop --follow-tags
cd ..

passo "RESULTADO: histórico da main e da develop"
git -C ana fetch -q origin
git -C ana log --graph --oneline --decorate --all | head -40
echo; echo "Pasta da simulação (apague quando quiser): $BASE"
