module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  overrides: [
    {
      files: ["server/**/*.js"],
      env: { node: true },
    },
    {
      files: ["tests/**/*.js"],
      env: { jest: true, node: true },
    },
  ],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    // Personnalise ici tes règles si besoin
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
