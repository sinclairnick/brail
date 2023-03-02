module.exports = {
  rules: {
    'align-items': require('./rules/align-items'),
  },
  configs: {
    recommended: {
      plugins: ['@brail'],
      rules: {
        'align-items': 'warn',
      },
    },
  },
};
