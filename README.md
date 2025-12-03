# 🏎️ Classic Parts Brasil — E-commerce de Peças Automotivas

Este projeto é uma aplicação completa de e-commerce focada em peças de carros clássicos.
Possui sistema de autenticação, carrinho de compras, gestão de pedidos e acompanhamento de entrega.

---

## 🚀 Tecnologias Utilizadas

### **Frontend**
- HTML5, CSS3 e JavaScript (Vanilla)
- **Fetch API** para integração com o backend
- **LocalStorage** e **SessionStorage** para persistência de dados no cliente

### **Backend**
- **Node.js** + **Express**
- **Sequelize ORM**
- **MySQL** (Banco de Dados)
- **JWT** (JSON Web Token) para autenticação segura

---

## 📂 Estrutura da Aplicação

- **Usuários:** Cadastro, Login (JWT), Edição de perfil e Exclusão de conta.
- **Produtos:** Catálogo de peças com controle de estoque (relação 1:1).
- **Carrinho:** Armazenamento local e validação de estoque em tempo real.
- **Pedidos:** Histórico de compras (relação 1:N com produtos).
- **Entrega:** Integração automática de CEP via API **ViaCEP**.

---

## 🔐 Segurança

Rotas sensíveis utilizam **Bearer Token**. Se não houver token válido, o usuário é redirecionado ao login.

- `/usuario/me` (Dados do perfil)
- `/pedido` (Criação e listagem)
- `/entrega` (Vinculada ao pedido)

---

## 📌 Como executar o projeto

### Configuração do Backend

Acesse a pasta do servidor e instale as dependências:

```bash
- cd backend
- npm install
```

### Crie o arquivo .env na raiz da pasta backend

```bash
- DB_NAME=db_ecom
- DB_USER=root
- DB_PASS=sua_senha_aqui
- DB_HOST=localhost
- DB_PORT=3306

- PORT=3000

- JWT_SECRET=minha_chave_super_secreta
- JWT_EXPIRES_IN=3h
- BCRYPT_SALT_ROUNDS=10

- NODE_ENV=development
```

### Sincronizar tabelas com o banco de dados:

```bash
- node sync.js
```

### Iniciar o servidor:

```bash
- node index.js
```