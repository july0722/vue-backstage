module.exports = {
  types: [
    {
      value: 'feat',
      name: 'feat:     A new feature'
    },
    {
      value: 'fix',
      name: 'fix:      A bug fix'
    },
    {
      value: 'docs',
      name: 'docs:     Documentation only changes'
    },
    {
      value: 'refactor',
      name: 'refactor: A code change that neither fixes a bug nor adds a feature'
    },
    {
      value: 'perf',
      name: 'perf:     A code change that improves performance'
    },
    {
      value: 'test',
      name: 'test:     Add missing tests or correcting existing tests'
    },
    {
      value: 'build',
      name: 'build:    Add missing tests or correcting existing tests'
    },
    {
      value: 'revert',
      name: 'revert:   Revert to a commit'
    }
  ],
  messages: {
    type: '选择类型提交：\n',
    scope: '选择系统:\n',
    // customScope: "customScope:\n",
    subject: '提交信息：\n',
    // body: 'body:\n',
    // breaking: "breaking:\n",
    // footer: 'footer:\n',
    confirmCommit: '是否确认提交?'
  },
  scopes: [{ name: 'gz-zfcg' }, { name: 'gz-jsgc' }],
  //   allowBreakingChanges: ["feat", "fix", "refactor", "perf", "build", "revert"],
  skipQuestions: ['body', 'footer'],
  allowCustomScopes: true
}
