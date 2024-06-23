# Project Balance

## Descrição

Este projeto consiste em um servidor Node.js que envia dados de peso aleatórios para um frontend usando Socket.IO.

## Estrutura do Projeto

- `src/`
  - `server.mjs`: Arquivo para execução do servidor.
  - `app.mjs`: Configurações principais do servidor.
  - `services/serial-service.mjs`: Configuração do serviço SerialPort.
  - `config/database.mjs`: Configuração da conexão com o banco de dados.
  - `routes/weight-routes.mjs`: Rotas da API.
  - `middlewares/middlewares.mjs`: Middlewares do servidor.

- `front-end/`
  - `index.html`: Página principal do frontend.
  - `script.js`: Script do frontend para receber dados do servidor.
  - `styles.css`: Estilos do frontend.

## Dependências para execução do servidor

- Node.js
- Cors
- Express
- Socket.IO
- Sequelize
- websocket
- serialport
- Route
- Docker
- Dotenv

## Dependências para Organização do Codigo

- Eslint
- Prettier

## Instalação

1. Clone o repositório:
   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd project-balance

2. Intale as Dependência:
   
   *yarn install ou yarn i*

4. Configure o banco de dados no arquivo .env:
    DB_HOST=127.0.0.1
    DB_USER=postgres
    DB_PASS=postgres
    DB_NAME=postgres
    DB_PORT=5432
    DB_DIALECT=postgres

5. Realize o Seguinte comando para subir as migrations:

   *yarn sequelize db:migrate*

6. Realizar o dowload do docker para utilizar o comando:

   *docker start sql-project-balance*

7. Para ter acesso ao front-end execute o index.html presente na pasta dentro dos arquivos:
8. Para comando iniciar o servidor:

   *yarn dev*

9. Esta pronto para o uso, é possivel olhar tudo que esta sendo armazenado no banco pelo programa do postgres.

Software feito para cunhos de teste de conhecimento
