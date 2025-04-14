# Node Todo API

Este é um projeto de API para gerenciamento de tarefas (To-Do) desenvolvido com Node.js. Ele permite criar, listar, atualizar e excluir tarefas, fornecendo uma interface RESTful para interação.

## Funcionalidades

- Criar novas tarefas.
- Listar todas as tarefas.
- Atualizar tarefas existentes.
- Excluir tarefas.

## Tecnologias Utilizadas

- Node.js
- Express
- MongoDB (ou outro banco de dados, dependendo da configuração)
- Mongoose (ODM para MongoDB)

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/FellipeMiguel/node-todo.git
cd node-todo
```

2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente no arquivo `.env` (exemplo incluído no repositório).

4. Inicie o servidor:

```bash
npm run dev
```

## Endpoints

### Criar Tarefa

- **POST** `/tasks`
- **Body**:
  ```json
  {
    "title": "Título da tarefa",
    "description": "descrição",
    "priority": "high/medium/low",
    "completed": false
  }
  ```

### Listar Tarefas

- **GET** `/tasks`

### Atualizar Tarefa

- **PATCH** `/tasks/:id`
- **Body**:
  ```json
  {
    "title": "Novo título",
    "description": "descrição",
    "priority": "high/medium/low",
    "completed": true
  }
  ```

### Excluir Tarefa

- **DELETE** `/tasks/:id`
