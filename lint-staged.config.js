module.exports = {
  '*.{ts,tsx,vue}': [
    () => 'pnpm lint:fix',
    () => 'pnpm ts:check'
    // () => 'pnpm test:unit:ci',
  ]
};
