import vueEslintParser from "vue-eslint-parser";
import typescriptParser from "@typescript-eslint/parser";
import typescript from "@typescript-eslint/eslint-plugin";
import vue from "eslint-plugin-vue";

export default [
    {
        files: ["**/*.vue"],
        languageOptions: {
            parser: vueEslintParser,
            parserOptions: {
                parser: typescriptParser,
                ecmaVersion: "latest",
                sourceType: "module"
            }
        },
        plugins: {
            vue: vue
        },
        rules: {
            ...vue.configs.recommended.rules,
            "quotes": ["error", "double"],
            "semi": ["error", "always"],
            "no-unused-vars": "error",
            "vue/html-indent": ["error", 4],
            "vue/script-indent": ["error", 4, { "baseIndent": 1 }]
        }
    },
    {
       files: ["**/*.{js,ts}"],
        languageOptions: {
            parser: typescriptParser,
            ecmaVersion: "latest",
            sourceType: "module"
        },
        plugins: {
            "@typescript-eslint": typescript
        },
        rules: {
            ...typescript.configs.recommended.rules,
            "indent": ["error", 4, {
                "VariableDeclarator": 4,
                "ImportDeclaration": 4
            }],
            "quotes": ["error", "double"],
            "semi": ["error", "always"],
            "no-unused-vars": "error"
        } 
    }
]