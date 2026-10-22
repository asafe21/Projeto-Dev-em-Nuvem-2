# Projeto Cloud - Node.js + Express

Aplicação web (request-response) com rotas que respondem em HTML.

## Rotas
| Rota | Resposta |
|---|---|
| `/` | Página inicial |
| `/sobre` | Sobre |
| `/produtos` | Lista de produtos |
| `/contato` | Contato |
| `/cadastro/:nome?` | Parâmetro de rota opcional |
| `/consulta?cpf=123` | Query param |

## Rodar localmente
```
npm install
npm run dev     # com nodemon
# ou
npm start
```
Abra http://localhost:4000

A porta vem de `process.env.PORT` (definida pela nuvem) ou 4000 por padrão.
