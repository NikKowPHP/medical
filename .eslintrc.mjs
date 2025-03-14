// .eslintrc.js
module.exports = {
  root: true, // Stop looking for ESLint configs in parent directories
  env: {
    browser: true, // Enables browser global variables (e.g., window, document)
    es2021: true,  // Enables ES2021 features (and earlier)
    node: true,    // Enables Node.js global variables and scoping
  },
  extends: [
    'eslint:recommended',             // Use ESLint's recommended rules
    'plugin:react/recommended',       // Use recommended rules for React
    'plugin:react/jsx-runtime',      // Enables the newer JSX transform (no need to import React)
    'plugin:@typescript-eslint/recommended', // Use recommended rules for TypeScript
    'plugin:tailwindcss/recommended', // Use recommended rules for Tailwind CSS
    'prettier',  // Turns off rules that conflict with Prettier (MUST BE LAST)
  ],
  parser: '@typescript-eslint/parser', // Use the TypeScript parser
  parserOptions: {
    ecmaFeatures: {
      jsx: true,  // Allows parsing of JSX
    },
    ecmaVersion: 'latest', // Use the latest ECMAScript version
    sourceType: 'module', // Allows the use of imports/exports
    project: './tsconfig.json', // Important: Point to your tsconfig.json
  },
  plugins: [
    'react',       // React plugin
    '@typescript-eslint', // TypeScript plugin
    'tailwindcss',    // Tailwind CSS plugin
  ],
  rules: {
    // --- General Code Style ---
    'no-unused-vars': 'warn',          // Warn about unused variables (good for development)
    'no-console': 'warn',             // Warn about console.log statements (remove in production)
    'semi': ['error', 'always'],     // Require semicolons
    'quotes': ['error', 'single'],    // Enforce single quotes
    'indent': ['error', 2, { SwitchCase: 1 }],  // Enforce 2-space indentation, with indent for switch cases
    'object-curly-spacing': ['error', 'always'],// Spaces inside curly braces
    'array-bracket-spacing': ['error', 'never'], // No spaces inside array brackets

    // --- React Specific Rules ---
    'react/prop-types': 'off',        // Disable prop-types (since we're using TypeScript)
    'react/jsx-uses-react': 'off',  // No need to import React with new JSX transform
     'react/react-in-jsx-scope': 'off', // Not needed as of React 17.

    // --- TypeScript Specific Rules ---
    '@typescript-eslint/explicit-function-return-type': 'off', // Allow implicit return types
    '@typescript-eslint/no-explicit-any': 'warn',           // Warn about using `any` (try to avoid)
    '@typescript-eslint/no-unused-vars': 'warn',          // Warn about unused variables (TypeScript specific)
    '@typescript-eslint/explicit-module-boundary-types': 'off', //Allow implicit types in exported module functions.

    // --- Tailwind CSS Specific Rules ---
    'tailwindcss/no-custom-classname': 'warn',  // Warn about custom class names (consider disabling)
    // 'tailwindcss/classnames-order': 'warn', // Enforce class order (use Prettier for this instead)

  },
  settings: {
    react: {
      version: 'detect', // Automatically detect the React version
    },
    tailwindcss: {
      callees: ['cn', 'cva'], // Important: Specify custom class name functions (if you use any)
      config: 'tailwind.config.js', // Specify your Tailwind config file (adjust if needed)
      removeDuplicates: true,
    },
  },
  // Handle different file types (important for mixed projects)
  overrides: [
    {
      files: ['*.js', '*.jsx'], // For JavaScript and JSX files
      parser: 'espree', // Use the default Espree parser (instead of @typescript-eslint/parser)
      rules: {
         '@typescript-eslint/no-var-requires': 'off' // To allow require() in js files.
      }
    },
    {
      files: ['*.ts', '*.tsx'], // For TypeScript and TSX files
      // (parser is already set to @typescript-eslint/parser globally above)
    },
      {
        files: ['*.html', '*.blade.php'], //For HTML, blade files.
        parser: '@angular-eslint/template-parser',
      },
      {
        files: ['*.vue'], // For Vue files
        parser: 'vue-eslint-parser',
      }
  ],
};
