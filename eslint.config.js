export default [
    {
        files: ["**/*.js"],
        languageOptions: {
            globals: {
                document: "readonly",
                window: "readonly",
                localStorage: "readonly",
                FormData: "readonly",
                location: "readonly",
                history: "readonly",
                IntersectionObserver: "readonly",
                setTimeout: "readonly",
                URL: "readonly"
            }
        },
        rules: {
            "no-unused-vars": "warn",
            "no-undef": "error",
            "prefer-const": "error"
        }
    }
];