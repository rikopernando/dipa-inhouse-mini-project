# Commit Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/) specification.

## Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Required Fields

- **type**: The type of change (required)
- **subject**: A brief description (required, lowercase)

### Optional Fields

- **scope**: The area of the codebase affected (optional)
- **body**: Detailed explanation (optional)
- **footer**: Breaking changes, issue references (optional)

## Types

| Type       | Description                                             | Example                                |
| ---------- | ------------------------------------------------------- | -------------------------------------- |
| `feat`     | A new feature                                           | `feat: add movie search functionality` |
| `fix`      | A bug fix                                               | `fix: resolve image loading issue`     |
| `docs`     | Documentation only changes                              | `docs: update README`                  |
| `style`    | Code style changes (formatting, missing semi colons)    | `style: format with prettier`          |
| `refactor` | Code change that neither fixes a bug nor adds a feature | `refactor: extract movie card`         |
| `perf`     | Performance improvements                                | `perf: optimize image loading`         |
| `test`     | Adding or updating tests                                | `test: add movie card tests`           |
| `chore`    | Changes to build process or auxiliary tools             | `chore: update dependencies`           |
| `ci`       | Changes to CI configuration files and scripts           | `ci: add GitHub Actions workflow`      |
| `revert`   | Reverts a previous commit                               | `revert: revert feat: add search`      |

## Scopes

Scopes are optional but recommended for clarity:

- `api`: API layer changes
- `ui`: UI component changes
- `hooks`: Custom hooks
- `types`: TypeScript types
- `config`: Configuration files
- `deps`: Dependencies

## Examples

### Simple commits

```bash
feat: add movie detail page
fix: resolve skeleton loader flickering
docs: add commitlint documentation
style: format components with prettier
```

### With scope

```bash
feat(search): add debouncing to search input
fix(api): handle empty response from TMDB
refactor(card): extract MovieCard to separate component
perf(images): implement lazy loading for posters
```

### With body

```bash
feat(pagination): add pagination to movie list

Implement pagination controls using TMDB API page parameter.
Shows 20 movies per page with next/previous buttons.

Closes #123
```

### Breaking changes

```bash
feat(api)!: change API authentication to bearer token

BREAKING CHANGE: API now requires bearer token instead of API key.
Update environment variables from NEXT_PUBLIC_TMDB_API_KEY to
NEXT_PUBLIC_TMDB_KEY with bearer token value.
```

## What Gets Rejected

❌ **Bad Examples:**

```bash
# Missing type
"Add movie search"
⚠️ subject may not be empty [subject-empty]

# Uppercase subject
"Feat: Add Movie Search"
⚠️ subject must not be sentence-case, start-case, pascal-case, upper-case

# Invalid type
"feature: add movie search"
⚠️ type must be one of [feat, fix, docs, ...]

# Too long (>100 chars)
"feat: add a really long commit message that exceeds the maximum allowed length of one hundred characters"
⚠️ header must not be longer than 100 characters
```

✅ **Good Examples:**

```bash
"feat: add movie search"
"fix(api): resolve timeout issue"
"docs: update setup instructions"
"refactor(card): simplify props interface"
```

## Testing Locally

Before committing, you can test your commit message:

```bash
# Test a commit message
echo "feat: add new feature" | npx commitlint

# Or after staging files, try to commit
git add .
git commit -m "feat: add new feature"
```

## Bypassing Hooks (Emergency Only)

```bash
# Skip pre-commit hook (not recommended)
git commit --no-verify -m "feat: emergency fix"

# Skip commit-msg validation (not recommended)
git commit -n -m "emergency fix"
```

⚠️ **Note:** Only bypass hooks in emergencies. Fixing the commit message is preferred.

## Benefits

1. **Automatic Changelog**: Generate changelogs from commit history
2. **Semantic Versioning**: Automatically determine version bumps
3. **Better History**: Clear, searchable commit history
4. **Team Consistency**: Everyone follows the same format
5. **CI/CD Integration**: Automate releases based on commit types
