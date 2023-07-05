module.exports = {
    verbose: true,
    moduleFileExtensions: ['js', 'json', 'ts', 'tsx'],
    rootDir: '.',
    transform: {
        '\\.[jt]sx?$': ['ts-jest', {tsconfig: './tsconfig.test.json'}],
    },
    transformIgnorePatterns: ['node_modules/(?!(@gravity-ui|tinygesture))'],
    coverageDirectory: './coverage',
    collectCoverageFrom: ['src/**/*.{ts,tsx}', '!**/__stories__/**/*', '!**/*/*.stories.{ts,tsx}'],
    testEnvironment: 'jsdom',
    setupFiles: ['<rootDir>/test-utils/setup-tests.ts'],
    setupFilesAfterEnv: ['<rootDir>/test-utils/setup-tests-after.ts'],
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'jest-transform-css',
    },
    testMatch: ['**/*.test.[jt]s?(x)'],
};
