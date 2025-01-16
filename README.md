# React E-Commerce TT

Um projeto de e-commerce desenvolvido como teste tecnico com React, Vite e TypeScript, com funcionalidades de gerenciamento de categorias, produtos e autenticação.

---

## Estrutura do Projeto

```
📦react-ecommerce-tt
 ┣ 📂public/            # Arquivos públicos
 ┣ 📂src/               # Código-fonte principal
 ┃ ┣ 📂assets           # Recursos estáticos
 ┃ ┣ 📂components       # Componentes reutilizáveis
 ┃ ┣ 📂config           # Configurações (ex.: Firebase)
 ┃ ┣ 📂contexts         # Gerenciamento de estado global
 ┃ ┣ 📂models           # Modelos TypeScript (Cart, User, etc.)
 ┃ ┣ 📂pages            # Páginas (Home, Login, Registro)
 ┃ ┣ 📂routes           # Rotas (Privadas e Públicas)
 ┃ ┣ 📂services         # Serviços de API
 ┃ ┣ 📂utils            # Utilitários e helpers
 ┃ ┗ 📜App.tsx          # Entrada principal
 ┣ 📜package.json       # Dependências
 ┣ 📜vite.config.ts     # Configurações do Vite
 ┣ 📜tailwind.config.js # Configurações do Tailwind
 ┗ 📜tsconfig.json      # Configurações do TypeScript
```

---

## Principais Funcionalidades

- **Categorias**: CRUD de categorias com ícones representativos.
- **Produtos**: CRUD de produtos e busca por categorias.
- **Autenticação**: Login, registro e modal responsivo.
- **Carrinho**: Adicionar/remover produtos com listagem dinâmica.
- **Estilização**: Interface responsiva com Tailwind CSS.

---

## Tecnologias

- **Frontend**: React, Tailwind CSS, TypeScript.
- **Build Tool**: Vite.
- **Backend**: Integração com Spring, Mysql para ambiente de desenvolvimento, PostgreSql para o deploy e Firebase Storage para armazenamento de imagens.
  Verifique o backend em [Spring-ecommerce-tt](https://github.com/growthfolio/spring-ecommerce-tt)

---

## Como Rodar

1. Clone o repositório:

   ```bash
   git clone https://github.com/growthfolio/react-ecommerce-tt.git
   cd react-ecommerce-tt
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Inicie o servidor:

   ```bash
   npm run dev
   ```

4. Acesse em: `http://localhost:5173`.

---

## Contribuição

1. Faça um fork.
2. Crie uma branch: `git checkout -b minha-feature`.
3. Faça commit: `git commit -m "Descrição da feature"`.
4. Envie: `git push origin minha-feature`.

---

## Licença

Este projeto está sob a licença MIT. Consulte [LICENSE](LICENSE) para mais detalhes.
