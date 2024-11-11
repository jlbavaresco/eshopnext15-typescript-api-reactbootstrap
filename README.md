
## Para usar o projeto

## Instalando as dependências:

Para forcar a instalação das dependências em razão de algumas bibliotecas não reconhecerem o React 19 digite o seguinte comando após baixar o projeto:

```bash
npm i --force
```

Ajuste as variáveis do .env e .env.local para apontar para o seu banco de dados

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/eshop"
NEXT_PUBLIC_API_URL='http://localhost:3000/api'
```

Depois, para rodar o projeto:

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) para usar a aplicação.

