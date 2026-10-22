# Guia da apresentação (roteiro de comandos)

## 0. ANTES (pode ser feito antes do dia)
1. No GitHub: New repository -> **Public** -> em ".gitignore" escolha o template **Node**.
2. Clone, copie `index.js`, `package.json` e `README.md` para dentro, depois:
   ```
   git add .
   git commit -m "Primeira versão da aplicação"
   git push
   ```
3. Teste local: `npm install` e `npm start`, abra http://localhost:4000
4. Deixe prontos: login do GitHub, da AWS e do Railway.

## ITEM 2 - Git/GitHub (ao vivo)
```
git clone https://github.com/SEU-USUARIO/SEU-REPO.git
cd SEU-REPO
```
Altere o código (ex.: mude o texto da rota `/sobre` ou crie uma rota `/equipe`), depois:
```
git status
git add .
git commit -m "Altera página sobre"
git push
```
Se pedir identificação no commit (computador novo):
```
git config --global user.name "Seu Nome"
git config --global user.email "seu-email@exemplo.com"
```
No push, o GitHub não aceita senha: use o login pelo navegador (Git Credential Manager)
ou um Personal Access Token (Settings > Developer settings > Tokens).

## ITEM 3 - AWS (EC2)
1. Console AWS > EC2 > Launch instance. Imagem: **Ubuntu** (ou Amazon Linux). Tipo: t2.micro / t3.micro.
2. Em Network settings, crie/edite o Security Group com regras de entrada:
   - SSH (22) para acessar
   - Custom TCP **3000**, origem 0.0.0.0/0 (porta da aplicação)
3. Conecte: botão **Connect > EC2 Instance Connect** (terminal no navegador).
4. No terminal da instância (Ubuntu):
   ```
   sudo apt update
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt install -y nodejs git
   git clone https://github.com/SEU-USUARIO/SEU-REPO.git
   cd SEU-REPO
   npm install
   PORT=3000 npm start
   ```
   (Amazon Linux: `sudo dnf install -y nodejs git` no lugar das 3 primeiras linhas.)
5. No navegador: `http://IP-PUBLICO-DA-INSTANCIA:3000` (IPv4 público, na página da instância).
   Use **http**, não https.
6. Para manter rodando sem o terminal aberto:
   ```
   PORT=3000 nohup npm start > app.log 2>&1 &
   ```

## ITEM 4 - Railway
1. railway.com > New Project > **Deploy from GitHub repo** > escolha o repositório.
2. Aguarde o build. O Railway executa `npm install` e `npm start` sozinho.
3. Na aba do serviço: **Settings > Networking > Generate Domain**.
4. Abra a URL gerada e teste as rotas.

## Prints para o AVA (tire durante a apresentação)
- Item 1: código + app rodando local
- Item 2: clone, commit e push no terminal + commit no GitHub
- Item 3: instância EC2 + site abrindo pela URL da AWS
- Item 4: deploy no Railway + site abrindo pela URL gerada
