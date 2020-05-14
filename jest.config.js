module.exports = {
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  moduleFileExtensions: [
    'js',
    'ts'
  ],
  "setupFiles": [
    "jest-webextension-mock"
  ],
  testMatch: [
    '**/*.spec.(ts|js)'
  ],
  testEnvironment: 'node'
}
