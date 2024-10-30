# 📘 SAAC ULBRA 
Este é um projeto **Next.js** para o **gerenciamento e organização das avaliações de artigos científicos da Jornada Ulbra Palmas**.

## 🚀 Tecnologias Utilizadas

- [Next.js](https://nextjs.org) - Framework React para renderização no servidor e otimização de desempenho.
- [Node.js](https://nodejs.org/) - Ambiente de execução para o backend.
- [PostgreSQL](https://www.postgresql.org/) - Banco de dados relacional robusto e escalável.
- [Prisma](https://www.prisma.io/) - ORM para manipulação de dados no PostgreSQL.
- [Bcrypt](https://www.npmjs.com/package/bcrypt) - Biblioteca para criptografia de senhas.
- [NextAuth](https://next-auth.js.org/) - Autenticação e gerenciamento de sessão.
- [TailwindCSS](https://tailwindcss.com/) e [Flowbite](https://flowbite.com/) - Estilização moderna e componentes prontos.

## ⚙️ Configuração Inicial

Siga o passo a passo abaixo para configurar o ambiente localmente.

### 1. Criação do Banco de Dados

Abra seu PostgreSQL e crie um banco de dados com o nome `saac_ulbra`.
Credenciais do banco de dados:
```bash
Usuário: postgres
Senha: admin
```

### 2. Instalação das Dependências

Após clonar o projeto, instale as dependências:
```bash
npm install
```

### 3. Criação das Tabelas

Aplique as migrações para criar as tabelas no banco de dados:
```bash
npx prisma migrate dev
```

### 4. Iniciando o Servidor de Desenvolvimento

Inicie o servidor de desenvolvimento:
```bash
npm run dev
```
Abra http://localhost:3000 no navegador para ver o resultado.
