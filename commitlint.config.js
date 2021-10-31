module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', ['feature', 'fix', 'revert', 'perf', 'refactor', 'optimize', 'style', 'docs', 'test', 'build']],
    'type-empty': [2, 'never'],
    'scope-empty': [2, 'never'],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [0, 'never'],
    'header-max-length': [0, 'always', 100]
  }
}
