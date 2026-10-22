const express = require("express"); // importa o módulo express
const app = express(); // inicia o express

// Porta: a nuvem (AWS/Railway) define a porta pela variável PORT.
// Localmente, usa 4000.
const PORT = process.env.PORT || 4000;

// Evita que texto digitado na URL seja interpretado como HTML
function escapar(texto) {
  return String(texto)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Monta a página HTML completa (menu + conteúdo)
function pagina(titulo, conteudo) {
  return `<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${titulo} - Minha Loja</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 720px; margin: 0 auto; padding: 16px; color: #222; }
    nav a { margin-right: 12px; color: #1a4fa0; text-decoration: none; font-weight: bold; }
    h1 { color: #1a4fa0; }
    footer { margin-top: 32px; font-size: 12px; color: #777; }
  </style>
</head>
<body>
  <nav>
    <a href="/">Início</a>
    <a href="/sobre">Sobre</a>
    <a href="/produtos">Produtos</a>
    <a href="/contato">Contato</a>
  </nav>
  ${conteudo}
  <footer>Projeto de Desenvolvimento de Software em Nuvem</footer>
</body>
</html>`;
}

// Rota 1: página inicial
app.get("/", function (req, res) {
  res.send(
    pagina("Início", "<h1>Bem-vindo à Minha Loja!</h1><p>Aplicação Node.js + Express no ar.</p>")
  );
});

// Rota 2: sobre
app.get("/sobre", function (req, res) {
  res.send(
    pagina("Sobre", "<h1>Sobre nós</h1><p>Somos uma equipe de estudantes de ADS aprendendo a publicar aplicações na nuvem.</p>")
  );
});

// Rota 3: lista de produtos
app.get("/produtos", function (req, res) {
  res.send(
    pagina(
      "Produtos",
      `<h1>Lista de Produtos</h1>
       <ul>
         <li>Camiseta</li>
         <li>Caneca</li>
         <li>Boné</li>
       </ul>`
    )
  );
});

// Rota 4: contato
app.get("/contato", function (req, res) {
  res.send(
    pagina("Contato", "<h1>Contato</h1><p>E-mail: contato@minhaloja.com.br</p>")
  );
});

// Rota 5: parâmetro de rota opcional. Ex: /cadastro/camiseta
app.get("/cadastro/:nome?", function (req, res) {
  const nome = req.params.nome;
  if (nome) {
    res.send(pagina("Cadastro", `<h1>Produto ${escapar(nome)} criado!</h1>`));
  } else {
    res.send(pagina("Cadastro", "<h1>Produto criado!</h1><p>Nenhum nome informado.</p>"));
  }
});

// Rota 6: query params. Ex: /consulta?cpf=12345678
app.get("/consulta", function (req, res) {
  const cpf = req.query["cpf"];
  if (cpf) {
    res.send(pagina("Consulta", `<h1>Retorno da consulta</h1><p>CPF = ${escapar(cpf)}</p>`));
  } else {
    res.send(pagina("Consulta", "<h1>CPF NÃO FOI FORNECIDO</h1>"));
  }
});

// Rota não encontrada (404) em HTML
app.use(function (req, res) {
  res.status(404).send(pagina("404", "<h1>Página não encontrada</h1><p>Confira o endereço digitado.</p>"));
});

app.listen(PORT, function (erro) {
  if (erro) {
    console.log("Erro ao Iniciar.");
  } else {
    console.log("Servidor Iniciado na porta " + PORT);
  }
});
