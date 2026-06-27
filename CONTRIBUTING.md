# Contributing to OpenGym

Thanks for your interest in contributing. This is a community-driven project and all contributions are welcome.

## Ways to contribute

- **Bug reports** — open an issue with steps to reproduce and expected vs actual behavior
- **Feature requests** — open an issue describing the use case and why it fits the project
- **Documentation** — improve or add pages under `docs/docs/`
- **Code** — fix bugs or implement approved features (see below)

## Before you start coding

1. Check existing issues and PRs to avoid duplicate work.
2. For anything beyond a trivial fix, open an issue first to align on approach.
3. One feature or fix per PR — keep diffs reviewable.

## Development setup

### Documentation site

```bash
cd docs
npm install
npm start        # live-reloads at http://localhost:3000
npm run build    # production build
```

Diagrams are maintained as draw.io files in `docs/static/diagrams/`. Open them with [draw.io](https://app.diagrams.net/) or the VS Code extension (`hediet.vscode-drawio`). Export updated diagrams as PNG alongside the source file.

### Android app

> The Android source lives in a separate repository. Link TBD.

## Code standards

- **Kotlin** — follow the [Kotlin coding conventions](https://kotlinlang.org/docs/coding-conventions.html)
- **Architecture** — MVVM + Clean Architecture; keep data / domain / presentation layers separate
- **Tests** — unit tests for domain logic, integration tests for Room DAOs
- **No third-party analytics** — user data stays on device

## Commit messages

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(session): add resume token to persist mid-session state
fix(db): enforce foreign key pragma on connection open
docs(schema): add gym map tables to ERD
```

## Pull request checklist

- [ ] Lint and tests pass locally
- [ ] New public API or behavior is documented
- [ ] DB schema changes include a Room migration
- [ ] No hardcoded strings — use resource files

## License

By contributing you agree that your changes will be licensed under the project's license.
