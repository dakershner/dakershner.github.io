module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  roots: ['<rootDir>/tina'],
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
}; 