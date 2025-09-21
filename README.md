# Clean DDD

Repositório utilizado no curso de Domain-Driven Design da [Rocketseat](https://app.rocketseat.com.br/journey/node-js-2023/contents). O objetivo é praticar a modelagem do domínio de um fórum de perguntas e respostas aplicando conceitos de DDD, testes automatizados e boas práticas de design orientado a objetos.

## Visão geral

O projeto está organizado para que a camada de domínio seja independente de frameworks e de detalhes de infraestrutura. A pasta `src` concentra tanto os _building blocks_ reutilizáveis quanto os módulos de domínio principais:

- `core`: abstrações compartilhadas (entidades, agregados, _value objects_, erros e helpers como `Either`).
- `domain/forum`: regras de negócio do fórum, incluindo entidades como `Question`, `Answer` e `Comment`, além dos casos de uso (por exemplo, criação de perguntas, respostas e comentários, escolha da melhor resposta, buscas paginadas etc.).
- `domain/notification`: contexto responsável por emitir notificações quando eventos do fórum ocorrem.

Cada caso de uso possui testes com Vitest, garantindo que a lógica de domínio possa evoluir com segurança.

## Tecnologias e ferramentas

- Node.js + TypeScript
- Vitest para testes unitários
- ESLint com o padrão Rocketseat para linting
- Vite + `vite-tsconfig-paths` para resolver os _paths_ TypeScript

## Como começar

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Execute a suíte de testes para validar o comportamento do domínio:

   ```bash
   npm test
   ```

3. Opcionalmente, rode o linter para verificar o estilo do código:

   ```bash
   npm run lint
   ```

## Estrutura de diretórios (resumo)

```
src/
├── core/                 # Building blocks de DDD reutilizáveis
├── domain/
│   ├── forum/            # Contexto de fórum (entidades + casos de uso)
│   └── notification/     # Contexto de notificações
└── ...
```

## Próximos passos sugeridos

- Implementar adaptadores (HTTP, CLI, filas etc.) conectando a camada de domínio a uma aplicação real.
- Persistir as entidades com um banco de dados ou em memória para exercitar repositórios concretos.
- Expandir o modelo com novas regras de negócio e contextos delimitados.

> Este repositório serve como material de estudo. Fique à vontade para explorar, adaptar e evoluir o código enquanto acompanha as aulas do curso.
