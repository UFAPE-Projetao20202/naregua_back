# NaRegua Back end (API)

## Instruções para inicializar a aplicação localmente.

Crie um arquivo .env na raiz do projeto, copie as variaveis do arquivo .env.example e preencha com as suas configurações de banco.

Instale as dependencias:

```
yarn install
```

Inicialize com o comando:

```
yarn start

// ou para desenvolvimento com reload automatico
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
