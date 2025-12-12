/**
 * Lint-staged configuration
 * Runs linters on git staged files before commit
 */

module.exports = {
  // Run ESLint on TypeScript/JavaScript files
  '**/*.{ts,tsx,js,jsx}': ['eslint --fix'],

  // Run Prettier on all supported files
  '**/*.{ts,tsx,js,jsx,json,css,md}': ['prettier --write'],
};
