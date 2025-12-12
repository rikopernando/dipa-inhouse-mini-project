# Git Hooks

This directory contains Git hooks managed by Husky v9+.

## Hooks

- **pre-commit**: Runs `lint-staged` to lint and format staged files
- **commit-msg**: Runs `commitlint` to validate commit messages

## Hook Format (Husky v9+)

Husky v9+ uses a simplified hook format without the shebang and sourcing script:

```bash
# ✅ Correct format (v9+)
npx lint-staged

# ❌ Deprecated format (will fail in v10)
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"
npx lint-staged
```

## Commit Message Format

This project uses [Conventional Commits](https://www.conventionalcommits.org/).

Format: `<type>(<scope>): <subject>`

### Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Code style changes (formatting, missing semi colons, etc)
- **refactor**: Code refactoring
- **perf**: Performance improvements
- **test**: Adding or updating tests
- **chore**: Changes to build process or auxiliary tools
- **ci**: Changes to CI configuration
- **revert**: Reverts a previous commit

### Examples

```bash
feat: add movie search functionality
fix: resolve image loading issue on mobile
docs: update README with setup instructions
style: format code with prettier
refactor: extract movie card to separate component
perf: optimize image loading with lazy loading
test: add unit tests for movie card component
chore: update dependencies
```

### Scope (Optional)

```bash
feat(search): add debouncing to search input
fix(api): handle empty response from TMDB
docs(readme): add commitlint documentation
```
