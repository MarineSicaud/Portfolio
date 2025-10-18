module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true, // si tu utilises Node.js
  },
  extends: [
    'eslint:recommended',
    // Tu peux ajouter ici d'autres configs comme Airbnb, Prettier, React, etc.
    // Exemple : 'plugin:react/recommended'
  ],
  parserOptions: {
    ecmaVersion: 12, // ou 2021
    sourceType: 'module',
  },
  rules: {
    // Désactive l'erreur que tu as mentionnée
    'prefer-const': 'off',

    // Exemple d'autres règles personnalisées
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    'no-console': 'off',
    'semi': ['error', 'always'],
    'quotes': ['error', 'single'],

    // Ajoute ou modifie les règles ici selon ton style
  },
};

