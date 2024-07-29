module.exports = {
  root: true,
  env: {
    node: true,
    'vue/setup-compiler-macros': true
  },
  ignorePatterns: ['package.json'],
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard',
    '@vue/typescript/recommended',
    'eslint-config-prettier'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    '@typescript-eslint/no-explicit-any': ['off'],
    'vue/multi-word-component-names': [
      'off',
      {
        ignores: ['index', 'main', 'Pagination'] // 需要忽略的组件名
      }
    ],
    '@typescript-eslint/no-non-null-assertion': 'off',
    "no-template-curly-in-string": "warn",
    "@typescript-eslint/ban-ts-comment": "off",
    "no-new-func": "off",
    "@typescript-eslint/no-var-requires": "off",
    "vue/no-mutating-props": "warn",
    "eqeqeq": "warn"
  }
}
