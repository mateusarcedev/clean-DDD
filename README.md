# Clean DDD

[![Tests](https://img.shields.io/badge/tests-passing-brightgreen.svg)](https://github.com/your-username/clean-ddd/actions)  
[![Lint](https://img.shields.io/badge/lint-eslint-blue.svg)](https://eslint.org/)  
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)  

Repository used in the [Rocketseat](https://app.rocketseat.com.br/journey/node-js-2023/contents) Domain-Driven Design course. The goal is to practice modeling a Q&A forum domain by applying DDD concepts, automated testing, and object-oriented design best practices.

## Overview

The project is structured so that the domain layer is independent of frameworks and infrastructure details. The `src` folder contains both reusable building blocks and the main domain modules:

- `core`: shared abstractions (entities, aggregates, value objects, errors, and helpers like `Either`).
- `domain/forum`: forum business rules, including entities such as `Question`, `Answer`, and `Comment`, along with use cases (e.g., creating questions, answers, and comments, choosing the best answer, paginated searches, etc.).
- `domain/notification`: context responsible for emitting notifications when forum events occur.

Each use case includes Vitest tests to ensure the domain logic can evolve safely.

## Tech stack

- Node.js + TypeScript  
- Vitest for unit testing  
- ESLint with Rocketseat’s standard linting rules  
- Vite + `vite-tsconfig-paths` for TypeScript path resolution  

## Getting started

1. Install dependencies:

   ```bash
   npm install
````

2. Run the test suite to validate domain behavior:

   ```bash
   npm test
   ```

3. Optionally, run the linter to check code style:

   ```bash
   npm run lint
   ```

## Directory structure (summary)

```
src/
├── core/                 # Reusable DDD building blocks
├── domain/
│   ├── forum/            # Forum context (entities + use cases)
│   └── notification/     # Notifications context
└── ...
```
