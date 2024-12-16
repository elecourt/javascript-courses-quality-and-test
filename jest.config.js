module.exports = {
    testEnvironment: 'node',
    testMatch: ['**/test/jest/*.test.js'],
    collectCoverage: true,
    coverageDirectory: './coverage',
    coverageReporters: ["json-summary"],
};
