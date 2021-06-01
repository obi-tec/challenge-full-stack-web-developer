<p align="center">
 <a href="#bd">Banco de Dados</a>  
 <a href="#tecnologias">Tecnologias</a>  
 <a href="#estrutura">Estrutura e Padrões </a> 
</p>

---

<h1 id='bd'> 🤖 Banco de Dados </h1>

Configurando e rodando a base de dados:

**Documentação completa para instalação do Docker.**
Docker: Facilita a criação de ambientes isolados que não interferem em outras operações do sistema operacional.

- [Docker e Docker-Compose](https://www.notion.so/Docker-e-Docker-Compose-16771f2ceefe4a05a8c29df4ca49e97a#9e90bc8e2e4a4672a3a5d3baa7138f91)

- ormconfig: É o arquivo responsável pela configuração e conexão do TypeORM com nossa aplicação.

```bash
{
  "type": "postgres",
  "port": 5432,
  "host": "localhost",
  "username": "docker",
  "password": "docker",
  "database": "fullStack",
  "entities": [
    "./src/modules/users/entities/*.ts"
  ],
  "migrations": [
    "./src/database/migrations/*.ts"
  ],
  "cli": {
    "migrationsDir": "./src/database/migrations"
  }
}

```

- docker-compose: É o arquivo responsável por criar nosso container com o **postgres**.
Apos você configurar o docker e docker-compose  este arquivo vai fazer com que nosso banco se inicie automaticamente.

```bash
version: "3.7"

services: 
  database_fullStack:
    image: postgres
    container_name: database_fullStack
    restart: always
    ports: 
      - 5432:5432
    environment:
      - POSTGRES_USER=docker
      - POSTGRES_PASSWORD=docker
      - POSTGRES_DB=fullStack
    volumes:
      - pgdata:/data/postgres

volumes: 
  pgdata:
    driver: local
```

---

<h1 id='tecnologias'> 🤖 Tecnologias e Libs </h1>

**Node.js**
**Vue.js**
**BootsTrapVue**

**Express**: Uma biblioteca que facilita a criação do nosso servidor.
**UUID**: É responsável pela criação de id's unicos e comparação se uma string do tipo UUID.
**TypeORM**: ORM que intermedializa nossa comunicação com o PostgreSQL (ou qualquer outro banco).
**Typescript**: Superset de javascript. Trás como sua principal feature o uso de tipagems de variáveis.
**PostgreSQL**: Banco de Dados escolhido para persistir nossos dados.

---

<h1 id='estrutura'> 🤖 Estrutura e Padrões </h1>

<p align="center">
Neste projeto foi escolhido o padrão DDD(Domain-Driven Development). Nesta arquitetura os arquivos são organizados
por domínio de conhecimento. Nesse caso, estamos trabalhando apenas com o modúlo de usuário, mas caso houve-se 
outra "entidade", trabalhariamos em outro modulo seus arquivos.
</p>

<p>
  Programação Orientada a Objetos: Fica muito simples trabalhar com conceitos de S.O.L.I.D, Repositories, Services e Decorators usando classes.
</p>
	
## Design Patters

Dividir as rotas por cada entidade;

Conceito de Model/Entidade: É a forma de como os dados devem ser gravados.

## Repositories

Repositório: Conexão entre a persistência dos dados e a rota. É altamente recomendado que apenas o repositório trabalhe em cima dos métodos de persistência.

## Services

O Service é um conceito introduzido no Service Pattern. Ele tem como objetivo abstrair regras de negócio das rotas, além de tornar nosso código mais reutilizável.

No contexto da nossa jornada, essa implementação visa reduzir a complexidade das rotas da nossa aplicação e deixá-las responsáveis apenas pelo que realmente devem fazer: receber uma requisição, repassar os dados da requisição a outro arquivo e devolver uma resposta.

O Service deve ter um nome descritivo (ex.: updateDeliveryManProfileService) e **sempre** possuir apenas **um** método (ex.: execute()). Além disso, caso outra rota ou arquivo precise executar essa  mesma ação, basta chamar e executar esse Service, obedecedo assim a outro importante princípio: DRY (Don't Repeat Yourself).

Os services não tem acesso a requisição e resposta da rota, sempre que houver um erro ou excessão será feito um throw Error.

## SOLID

### Single Responsability Principle

- Uma classe deve ter exclusivamente uma responsabilidade;
- Alterar um código nessa classe não deve influenciar o funcionamento de outros códigos;
- Classes com uma única responsabilidade são mais legíveis e testáveis;

### Dependency Inversion Principle

Classes de nível superior não devem depender diretamente de outras classes de nível inferior e sim de interfaces.

### Liskov Substitution Principle

Esse princípio defende o uso de polimorfismo, assim como usamos no princípio anterior, para estabelecer que um objeto pode ser substituído por qualquer outro do mesmo tipo sem danificar o comportamento da aplicação.

Já que estamos utilizando TypeScript com suporte às interfaces, o mesmo já vai nos avisar de qualquer erro ferindo esse princípio.
