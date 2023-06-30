module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'react'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
  ],
  rules: {
    // Add any specific ESLint rules or overrides here
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  overrides: [
    {
      files: ['webpack.config.js'], // Add other webpack configuration files if needed
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
  env: {
    node: true, // Add this line to enable Node.js environment
  },
  globals: {
    require: 'readonly', // Add this line to define 'require' as a global variable
  },
};
