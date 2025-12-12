/**
 * Commitlint configuration
 * Enforces Conventional Commits specification
 *
 * Format: <type>(<scope>): <subject>
 *
 * Types:
 * - feat: A new feature
 * - fix: A bug fix
 * - docs: Documentation only changes
 * - style: Changes that don't affect code meaning (formatting, etc)
 * - refactor: Code change that neither fixes a bug nor adds a feature
 * - perf: Performance improvements
 * - test: Adding or updating tests
 * - chore: Changes to build process or auxiliary tools
 * - ci: Changes to CI configuration files and scripts
 * - revert: Reverts a previous commit
 */

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Type enum
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'docs', 'style', 'refactor', 'perf', 'test', 'chore', 'ci', 'revert'],
    ],
    // Subject case
    'subject-case': [2, 'never', ['upper-case', 'pascal-case', 'start-case']],
    // Max length
    'header-max-length': [2, 'always', 100],
    // Body max line length
    'body-max-line-length': [2, 'always', 100],
  },
};
