### API Desafio de Desenvolvedor Full Stack

#### Descrição
Este projeto é uma API para um desafio de desenvolvedor full-stack. Ele utiliza **Node.js**, **TypeScript**, **Prisma ORM**, **Express.js** e outras bibliotecas para fornecer uma base robusta e escalável para a aplicação. Além disso, a API conta com uma documentação interativa utilizando o **Swagger**.

---

### Pré-requisitos
Antes de começar, certifique-se de ter o seguinte instalado:
- **Node.js** (versão 18 ou superior)
- **npm** ou **yarn**
- **PostgreSQL** (instância local ou um serviço de nuvem como o PostgreSQL do Heroku)

---

### Configuração do Ambiente

#### 1. Clone o Repositório
```bash
git clone https://github.com/soaresrodrigo/challenge-full-stack-web-developer.git
cd challenge-full-stack-web-developer/api
```

#### 2. Instale as Dependências
Use `npm` ou `yarn` para instalar as dependências do projeto:
```bash
npm ci
# ou
yarn install
```

#### 3. Configure as Variáveis de Ambiente
Copie o arquivo `.env.example` para um novo arquivo `.env`:
```bash
cp .env.example .env
```
Edite o arquivo `.env` para incluir a URL do seu **banco de dados PostgreSQL** e outras configurações necessárias:
```
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco"
PORT=3000
```

---

### Configuração do Banco de Dados

#### 4. Execute as Migrations do Banco de Dados
Use o Prisma para criar o esquema necessário no banco de dados:
```bash
npm run migrate
# ou
yarn migrate
```

#### 5. Popular o Banco de Dados
Popule o banco de dados com dados iniciais:
```bash
npm run seed
# ou
yarn seed
```

---

### Executando o Projeto

#### Modo de Desenvolvimento
Para iniciar o servidor no modo de desenvolvimento (com recarregamento automático ao fazer alterações), use:
```bash
npm run dev
# ou
yarn dev
```

#### Modo de Produção
1. Compile o projeto:
   ```bash
   npm run build
   # ou
   yarn build
   ```
2. Inicie o servidor:
   ```bash
   npm start
   # ou
   yarn start
   ```

O servidor estará disponível em `http://localhost:3000` (porta padrão).

---

### Documentação da API (Swagger)
A API inclui uma documentação interativa gerada pelo **Swagger**. Para acessá-la, inicie o servidor e abra o seguinte link no seu navegador:
```
http://localhost:3000/api-docs
```

Na documentação, você encontrará todas as rotas disponíveis, os métodos suportados, os parâmetros esperados, e exemplos de requisições e respostas.

---

### Testes
Execute os testes com:
```bash
npm test
# ou
yarn test
```

---

### Tecnologias Utilizadas
- **Node.js**
- **TypeScript**
- **Express.js**
- **Prisma ORM**
- **Swagger**
- **Jest**
- **Zod**
- **PostgreSQL**
