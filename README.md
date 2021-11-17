# NaRegua Back end (API)
[![Node CI](https://github.com/UFAPE-Projetao20202/naregua_back/actions/workflows/main.yml/badge.svg?branch=main)](https://github.com/UFAPE-Projetao20202/naregua_back/actions/workflows/main.yml)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/79c611f232a94724a82a85ca63f066f1)](https://www.codacy.com/gh/UFAPE-Projetao20202/naregua_back/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=UFAPE-Projetao20202/naregua_back&amp;utm_campaign=Badge_Grade)
## Instruções para inicializar a aplicação localmente

Crie um arquivo .env na raiz do projeto, copie as variaveis do arquivo .env.example e preencha com as suas configurações de banco.

Instale as dependencias:

```
yarn install
```

Inicialize com o comando:

```
yarn dev
```

## Instruções para utilizar o sequelize

Para criar uma migration:

```
yarn sequelize migration:create --name=CreateUser
```

Para rodar as migrations e atualizar o banco de dados local:

```
yarn sequelize db:migrate
```

Para reverter uma migration:

```
yarn sequelize db:migrate:undo
```

## Testes

Para rodar os testes da aplicação:

```
yarn test
```

## Instruções para inicializar a aplicação com o Docker

Crie um arquivo .env na raiz do projeto, copie as variaveis do arquivo .env.example e preencha com as suas configurações de banco.

*OBS.: Utilizando o docker, atribua o DB_HOST=db_naregua

Instale as dependencias:

```
yarn install
```

Rode o comando para subir a aplicação no docker:

```
docker-compose up -d
```

Para acompanhar os logs da API:

```
docker logs naregua -f
```

Para atualizar o banco com as migrations utilize os comandos abaixo:

```
// entre na bash
docker exec -it naregua /bin/bash

// rode o comando das migrations
yarn sequelize db:migrate
```
