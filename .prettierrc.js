module.exports = {
    trailingComma: 'none',
    tabWidth: 4,
    semi: false,
    singleQuote: true,
    bracketSpacing: true,
    bracketSameLine: false,
    arrowParens: 'always',
    printWidth: 100,
    jsxSingleQuote: true,
    singleAttributePerLine: true,
    overrides: [
        {
            files: ['*.yml', '*.json'],
            options: {
                tabWidth: 2,
                singleQuote: false
            }
        }
    ]
}
