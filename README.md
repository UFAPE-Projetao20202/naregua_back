# NaRegua Back end (API)

## Instruções para inicializar a aplicação localmente.

Crie um arquivo .env na raiz do projeto, copie as variaveis do arquivo .env.example e preencha com as suas configurações de banco.

Instale as dependencias:

```
npm install
```

Inicialize com o comando:

```
npm run start

// ou para desenvolvimento com reload automatico
npm run dev
```

## Instruções para utilizar o sequelize

Para criar uma migration:

```
npx sequelize migration:create --name=CreateUser
```

Para rodar as migrations e atualizar o banco de dados local:

```
npx sequelize db:migrate
```

Para reverter uma migration:

```
npx sequelize db:migrate:undo
```
