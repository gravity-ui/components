module.exports = {
    verbose: true,
    moduleFileExtensions: ['js', 'json', 'ts', 'tsx'],
    rootDir: '.',
    transform: {
        '\\.tsx?$': ['ts-jest', {tsconfig: './tsconfig.test.json'}],
        '\\.jsx?$': ['babel-jest', {presets: ['@babel/preset-env']}],
    },
    transformIgnorePatterns: ['node_modules/(?!colors-named(?:-hex)?/)'],
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
