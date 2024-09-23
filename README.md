<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="https://i.imgur.com/6wj0hh6.jpg" alt="Project logo"></a>
</p>

<h3 align="center">Projeto API de Clientes e Integração ChatGPT</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center"> Este projeto é uma API RESTful para gerenciar clientes e integração com ChatGPT para interação, desenvolvida com Node.js, Express e MongoDB. Inclui operações de CRUD e testes automatizados.
    <br> 
</p>

## 📝 Table of Contents

- [Sobre](#sobre)
- [Como Começar](#comecar)
- [Testes](#testes)
- [Uso](#uso)
- [Deploy](#Deploy)
- [Construído Com](#construido_com)
- [Autor](#autor)

## 🧐 Sobre <a name = "sobre"></a>

Este projeto é uma API que permite <b>gerenciar clientes</b> por meio de operações de <b>CRUD (Create, Read, Update e Delete)</b> e <b>integração com ChatGPT</b> para interação. 

Ele usa Node.js com Express como framework de servidor e MongoDB como banco de dados em containers(Docker). A API suporta a listagem de todos os clientes, busca por ID, criação, atualização, exclusão de clientes e interação com o ChatGPT. 

Além disso, inclui testes automatizados para garantir a integridade da API, utilizei o Jest e Supertest para a criação dos testes. 


E para fim de documentação, foi utilizado o Swagger para documentação da API e seus Enpoints.


## 🏁 Como Começar <a name = "comecar"></a>

Essas instruções ajudarão você a obter uma cópia do projeto e configurá-lo em sua máquina local para fins de desenvolvimento e testes.

### Prérequisitos

Você precisará ter as seguintes ferramentas instaladas:

```
npm ou yarn
Docker
docker-compose
SGDB com suporte a NoSQL (Ex.:  MongoDB Compass)
API Client (Ex.: Postman)
```

### Instalação

Siga os passos abaixo para configurar o ambiente de desenvolvimento:

1. Clone o repositório:

```bash
git clone https://github.com/AguiarDG/projeto-api-node-clientes.git
cd projeto-api-node-clientes
```

2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente:

Clone o  arquivo `.env.example` e renomeie para `.env` e adicione suas credenciais

4.  Inicie os containers do Docker(Node.js, MongoDB) via Docker Compose:

```bash
docker-compose up -d
```

5. Agora a aplicação já esta rodando em http://localhost:3000.

## 🔧 Testes <a name = "testes"></a>

Para rodar os testes automatizados:

```bash
npm test
```

### Testes de integração

Esses testes verificam o comportamento dos endpoints da API e validam o fluxo de dados entre o cliente e o servidor.

Exemplo de teste de integração:

```javascript
it("deve retornar um cliente pelo ID", async () => {
  const response = await request(app).get("/api/clients/1").expect(200);
  expect(response.body).toHaveProperty("success", true);
  expect(response.body.client.nome).toBe("Cliente 1");
});
```

### Testes Unitários

Testes isolados dos serviços de cliente.

```javascript
it("deve retornar todos os clientes", async () => {
  const clients = await clientService.getAllClients();
  expect(clients).toEqual(mockClients);
});
```

## 🎈 Uso <a name="uso"></a>

### Endpoints
  - Documentação da API (Swagger UI)
    - /api-docs
    - Acessivel via browser

  - Listar todos os clientes
    - GET /api/clients
    - Retorna todos os clientes cadastrados.

  - Buscar cliente por ID
    - GET /api/clients/:id
    - Busca um cliente pelo ID fornecido.

  - Criar novo cliente
    - POST /api/clients
    - Exemplo de body:
    ```json
    {
      "nome": "Novo Cliente",
      "telefone": "11999999999",
      "email": "novocliente@example.com"
    }
    ```

  - Atualizar cliente
    - PUT /api/clients/:id
    - Atualiza os dados de um cliente pelo ID.

  - Deletar cliente
    - DELETE /api/clients/:id
    - Remove um cliente do sistema.
  
  - Integração com ChatGPT
    - POST /api/clients/chatgpt
    - Realiza uma interação com o ChatGPT

## 🚀 Deploy <a name = "deploy"></a>

Para fazer o deploy desta aplicação em um ambiente de produção, você pode utilizar Docker ou uma plataforma como Heroku ou AWS. Certifique-se de configurar corretamente as variáveis de ambiente para o MongoDB e ajustar a porta do servidor, se necessário.

## ⛏️ Construído Com <a name = "construido_com"></a>

- [MongoDB](https://www.mongodb.com/) - Database
- [Express](https://expressjs.com/) - Server Framework
- [NodeJs](https://nodejs.org/en/) - Server Environment
- [ChatGPT](https://chat.openai.com/) - Integração com IA
- [Docker](https://www.docker.com/) - Containerization
- [Jest](https://jestjs.io/pt-BR/) - Tests Framework
- [Swagger](https://swagger.io) - API Documentation
- [Nodemon](https://nodemon.io/) - Development Server

## ✍️ Autor <a name = "autor"></a>

- [@AguiarDG](https://github.com/AguiarDG)
