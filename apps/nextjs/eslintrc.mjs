import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    ignores: ["!**/*", ".next/**/*"],
}, ...compat.extends(
    "plugin:@nx/react-typescript",
    "next",
    "next/core-web-vitals",
    "../../.eslintrc.json",
), {
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],

    rules: {
        "@next/next/no-html-link-for-pages": ["error", "apps/admin/pages"],
    },
}, {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {},
}, {
    files: ["**/*.js", "**/*.jsx"],
    rules: {},
}, {
    files: ["**/*.spec.ts", "**/*.spec.tsx", "**/*.spec.js", "**/*.spec.jsx"],

    languageOptions: {
        globals: {
            ...globals.jest,
        },
    },
}];