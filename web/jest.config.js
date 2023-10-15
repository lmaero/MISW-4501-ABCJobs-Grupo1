const nextJest = require('next/jest')

// Providing the path to your Next.js app which will enable loading
// next.config.js and .env files
const createJestConfig = nextJest({ dir: './' })

// Any custom config you want to pass to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jest-environment-jsdom',
  collectCoverageFrom: [
    "**/**/*tests*/*.js",
    "**/**/*tests*/*.ts",
  ],
  coverageThreshold: {
    global: {
      lines: 80,
      "branches": 50,
      "functions": 40,
      "statements": 50
    },
  },
}

// createJestConfig is exported in this way to ensure that next/jest can load
// the Next.js configuration, which is async
module.exports = createJestConfig(customJestConfig)
