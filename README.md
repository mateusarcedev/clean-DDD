# Clean DDD

[![CI](https://github.com/mateusarcedev/clean-ddd/actions/workflows/ci.yml/badge.svg)](https://github.com/mateusarcedev/clean-ddd/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

> **Study project.** Built while following the [Rocketseat](https://www.rocketseat.com.br/) Node.js course, in the Domain-Driven Design and Clean Architecture module. It follows the course's structure and exercises; it is a learning record, not a production library.

A Q&A forum domain (questions, answers, comments, attachments and notifications) modeled in TypeScript. There is no HTTP layer or database: the domain and application layers are exercised only through unit tests with in-memory repositories.

## What it practices

| Concept | Where |
|---|---|
| Entities and unique identity | `src/core/entities/entity.ts`, `unique-entity-id.ts` |
| Aggregate roots (`Question`, `Answer`) | `src/core/entities/aggregate-root.ts`, `src/domain/forum/enterprise/entities/` |
| Value objects | `Slug` in `src/domain/forum/enterprise/entities/value-objects/` |
| Domain events and subscribers | `src/core/events/`, `src/domain/forum/enterprise/events/`, `src/domain/notification/application/subscribers/` |
| Functional error handling with `Either` | `src/core/either.ts`; use cases return `Either<Error, Result>` instead of throwing |
| `WatchedList` for tracking attachment changes | `src/core/entities/watched-list.ts` |
| Use cases and repository interfaces (dependency inversion) | `src/domain/*/application/` |
| Test doubles: factories and in-memory repositories | `test/` |

## Architecture

Each bounded context is split in two layers, and dependencies point inward:

```text
src/
├── core/                      # Generic building blocks shared by all contexts
│   ├── entities/              # Entity, AggregateRoot, UniqueEntityID, WatchedList
│   ├── events/                # DomainEvent, DomainEvents (dispatcher), EventHandler
│   ├── errors/                # UseCaseError and shared errors
│   ├── either.ts              # Left / Right
│   └── repositories/          # Pagination params
└── domain/
    ├── forum/
    │   ├── enterprise/        # Domain layer: entities, value objects, domain events
    │   └── application/       # Use cases and repository interfaces (contracts)
    └── notification/
        ├── enterprise/        # Notification entity
        └── application/       # Use cases, repository interface and event subscribers

test/
├── factories/                 # make-question, make-answer, ... (faker-based)
├── repositories/              # In-memory implementations of the repository interfaces
└── utils/                     # wait-for helper for async event handlers
```

- **`enterprise`** holds business rules and knows nothing about repositories, frameworks or I/O.
- **`application`** orchestrates use cases and declares the repository contracts it needs; implementations live outside the domain (here, in `test/`).
- **Domain events** are raised inside aggregates (`AnswerCreatedEvent`, `QuestionBestAnswerChosenEvent`) and dispatched after persistence. The `notification` context reacts to them without the `forum` context depending on it.

## Use cases

- **Questions**: create, edit, delete, get by slug, list recent, choose best answer
- **Answers**: answer a question, edit, delete, list a question's answers
- **Comments**: comment on a question or an answer, delete, list
- **Notifications**: send, read, and subscribers for new answers and best-answer events

## Getting started

Requires Node.js 22 (the version used in CI).

```bash
npm install
npm test            # 24 test files, 42 tests (Vitest)
npm run typecheck   # tsc --noEmit
```

## Known limitations

- `npm run lint` currently reports 14 errors (`no-explicit-any`, `{}` types and `no-new` in spec files from the course's code). They are intentionally left as they were written in the course, so CI runs type checking and tests only.
- Remaining `npm audit` findings are in development tooling (Vitest, ESLint config, faker) and would need major version upgrades. There are no runtime dependency findings.
- No persistence or presentation layer; use cases are only reachable through tests.

## License

[MIT](LICENSE) © Mateus Arce. Course content and exercises belong to Rocketseat.
