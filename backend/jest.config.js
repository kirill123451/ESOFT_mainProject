module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/test/**/*.test.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
  '^.+\\.tsx?$': ['ts-jest', {
    tsconfig: 'tsconfig.json'
  }]
},
extensionsToTreatAsEsm: ['.ts']
}