# Documentação do Projeto - Node.js com Express

## Descrição
Este é um projeto **Node.js** utilizando **Express** e **Sequelize** para gerenciamento de um sistema de cursos, estudantes, tarefas e atividades. O projeto também inclui **migrations** para criar as tabelas no banco de dados, além de **testes automatizados** com **Jest**.

## Pré-requisitos

Antes de começar, você precisará ter as seguintes ferramentas instaladas em sua máquina:

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [NPM](https://www.npmjs.com/) (geralmente instalado junto com o Node.js)
- [PostgreSQL](https://www.postgresql.org/) ou outro banco de dados suportado pelo Sequelize

## Instruções de Configuração

### 1. Clonando o Repositório

Clone o repositório do projeto para sua máquina local:

```bash
git clone https://github.com/JamersonCarlos/challenge-node-adasi
cd challenge-node-adasi
```

### 2. Instalando as dependências

Após clonar o repositório, instale as dependências necessárias para o projeto:

```bash
npm install
```
### 3. Configurando banco de dados
#### 1. Crie um banco de dados local no PostgreSQL (ou em outro banco de dados compatível com Sequelize):
```bash
CREATE DATABASE nome_do_banco;
```
#### 2. Na raiz do projeto, crie um arquivo .env e adicione as seguintes variáveis de ambiente, substituindo os valores com suas configurações locais: 
```bash
DB_HOST=localhost
DB_PORT=5432
DB_NAME=nome_do_banco
DB_USER=seu_usuario
DB_PWD=sua_senha
DB_DIALECT=postgres
```
Certifique-se de que o nome do banco e as credenciais estão corretos.
### 4. Rodar as migrations
O Sequelize será usado para criar as tabelas no banco de dados. Para rodar as migrations, execute o seguinte comando:
```bash
npx sequelize-cli db:migrate
```

### 5. Executar o projeto 
Agora, com o banco de dados configurado e as migrations executadas, você pode iniciar o servidor com o comando:
```bash
node index.js
```
O servidor estará rodando na porta 3000 por padrão. Para acessá-lo, navegue até http://localhost:3000.

### 6. Executar testes automatizados 
Este projeto utiliza o Jest para rodar testes automatizados. Para executar os testes, use o seguinte comando:
```bash
npm test
```

Os testes abrangem funcionalidades como criação, listagem, atualização e exclusão de cursos, estudantes, tarefas e atividades. Se os testes criarem registros no banco de dados, eles serão excluídos ao final, garantindo que o banco se mantenha limpo.

### 7. Estrutura do Projeto
Aqui está a estrutura básica do projeto:
- api/ - Contém os routers e controladores para as rotas de cursos, estudantes, tarefas e atividades.
- models/ - Contém os modelos Sequelize para as entidades do sistema.
- migrations/ - Arquivos de migrations que criam as tabelas no banco de dados.
- tests/ - Contém os testes automatizados para cada funcionalidade do sistema.
- .env - Arquivo de configuração de variáveis de ambiente, com informações do banco de dados.

