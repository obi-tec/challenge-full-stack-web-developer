Obi Tec - Full Stack Web Developer
===================
O objetivo deste desafio é principalmente conhecermos um pouco mais de você que se candidatou para a nossa vaga de desenvolvedor Full Stack Web.

É importante ressaltar que solução do desafio não tem um gabarito. Vamos verificar as técnicas que utilizaram para a criação do serviço, como vocês encaram este desafio e também, claro, a entrega da solução.   

As regras e os requisitos técnicos estão detalhadas abaixo, boa sorte!

_Time Obi.Tec_
# Especificações Técnicas
- **Front End:** [Vue.js](https://vuejs.org)
- **UI Framework**:  [Vuetifyjs](https://vuetifyjs.com/en), ou [Bootstrap](https://bootstrap-vue.org), ou [Primevue](https://primevue.org)
- **API:** NodeJS
- **Banco de Dados:** PostgreSQL, MySQL ou MongoDB
- **Idioma de escrita do código:** Inglês

# Requisitos
## Contextualização
Considere que para o módulo de autenticação da **Plataforma Obi Tec oAuth** será desenvolvido um **serviço** para o gerenciamento do **cadastro de usuário**. O desafio consiste em criar uma aplicação para o cadastro de usuários que atenda (mas não se detenha) aos critérios mínimos de aceitação.

## Histórias do Usuário
- **Sendo** um usuário administrativo da Plataforma Obi Tec oAuth
- **Quero** gerenciar os usuários da Plataforma
- **Para** que seja possível configurar acessos aos sistemas dos clientes

### Critérios mínimos de aceite: 
#### Cenário: listar usuários cadastrados 
- **Dado** que estou na Plataforma Obi Tec oAuth
- **Quando** clico no menu Usuários
- **Então** abre a tela de Consulta de Usuários
- **E** exibe opção Cadastrar ao topo
- **E** exibe lista dos usuários
- **E** para cada registro exibe o UUID (identificador único do usuário), Name e E-mail
- **E** exibe a opção Editar
- **E** exibe a opção Excluir

#### Cenário: cadastrar novo usuário
- **Dado** que estou na tela de Consulta de Usuários
- **Quando** clico em Cadastrar
- **Então** abre a tela de Cadastro do Usuário
- **E** exibe os campos obrigatórios, UUID, Name e E-mail
####
- **Dado** que inseri dados válidos nos campos
- **Quando** clico em Salvar
- **Então** cria o novo usuário na base
- **E** retorna mensagem de sucesso
####
- **Dado** que insiro um UUID já cadastrado
- **Quando** clico em Salvar
- **Então** é realizado uma validação que o UUID já existe
- **E** retorna mensagem de erro "UUID já cadastrado"
####
- **Dado** que insiro um E-mail já cadastrado
- **Quando** clico em Salvar
- **Então** é realizado uma validação que o e-mail já existe
- **E** retorna mensagem de erro "E-mail já cadastrado"
####
- **Dado** que não desejo cadastrar mais o Usuário
- **Quando** clico em Cancelar
- **Então** retorna para tela Consulta de Usuários
- **E** não persiste a gravação dos dados no banco 

#### Cenário editar cadastro de usuário
- **Dado** que estou na tela de Consulta de Usuários
- **Quando** clico em Editar Usuários
- **Então** abre a tela de Edição
- **E** exibe os campos do cadastro preenchidos
- **E** habilita alteração dos campos editáveis
####
- **Dado** que altero os dados do Usuário
- **Quando** clica em Salvar
- **Então** grava os dados editáveis na base
####
- **Dado** que estou na tela de Edição
- **Quando** clica em Cancelar
- **Então** retorna para a tela de Consulta de Usuários
- **E** não persiste a gravação dos dados

#### Cenário: excluir cadastro de usuário
- **Dado** que estou na tela de Consulta de Usuários
- **Quando** clico em Excluir 
- **Então** exibe a modal de confirmação de exclusão
####
- **Dado** que estou na modal de confirmação de exclusão 
- **Quando** clico em Confirmar
- **Então** então exclui o registro do Usuário
####
- **Dado** que estou na modal de confirmação de exclusão
- **Quando** clico em Cancelar
- **Então** então fecha a modal e não persiste a exclusão

## Campos obrigatórios:
- **UUID** (não editável)
- **Nome** (editável)
- **E-mail** (editável)

# Desejável
- Testes unitários
- Documentação da arquitetura de solução

# Critérios de avaliação
- Qualidade de escrita do código
- Organização do projeto
- Qualidade da API
- Lógica da solução implementada
- Qualidade da camada de persistência
- Utilização do Git (quantidade e descrição dos commits, Git Flow, ...)
- Funcionalidades extras

# Instruções de entrega
1. Crie um fork do repositório no seu GitHub
2. Faça o push do código desenvolvido no seu Github
3. Inclua um README.md explicando como rodar o projeto
4. Inclua um arquivo chamado COMMENTS.md explicando
  - Decisão da arquitetura utilizada
  - Lista de bibliotecas de terceiros utilizadas
  - O que você melhoraria se tivesse mais tempo
  - Quais requisitos obrigatórios que não foram entregues (se houver)
5. Informe ao recrutador quando concluir o desafio junto com o link do repositório
6. Após revisão do projeto junto com a equipe de desenvolvimento deixe seu repositório privado
