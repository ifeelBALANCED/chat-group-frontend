import typescriptEslint from '@typescript-eslint/eslint-plugin';
import solid from 'eslint-plugin-solid';
import react from 'eslint-plugin-react';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default [
  {
    ignores: [
      '**/node_modules/*',
      '**/dist',
      '.dependency-cruiser.cjs',
      'eslint.config.js',
      '.commitlintrc.ts',
      'tailwind.config.js',
      'postcss.config.js',
      'vite.config.ts',
      'env.d.ts'
    ]
  },
  ...compat.extends(
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking'
  ),
  {
    plugins: {
      '@typescript-eslint': typescriptEslint,
      solid,
      react
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...Object.fromEntries(Object.entries(globals.amd).map(([key]) => [key, 'off'])),
        ...Object.fromEntries(Object.entries(globals.mocha).map(([key]) => [key, 'off'])),
        ...Object.fromEntries(Object.entries(globals.jasmine).map(([key]) => [key, 'off']))
      },

      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',

      parserOptions: {
        project: ['./tsconfig.json'],

        ecmaFeatures: {
          jsx: true
        }
      }
    },

    rules: {
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      'react/jsx-indent': ['error', 2],
      '@typescript-eslint/no-explicit-any': 'off',
      'array-callback-return': [
        'error',
        {
          allowImplicit: true
        }
      ],

      'constructor-super': 'off',
      'for-direction': 'error',

      'getter-return': [
        'error',
        {
          allowImplicit: true
        }
      ],

      'no-async-promise-executor': 'error',
      'no-await-in-loop': 'error',
      'no-class-assign': 'error',
      'no-compare-neg-zero': 'error',
      'no-cond-assign': ['error', 'always'],
      'no-const-assign': 'error',
      'no-constant-binary-expression': 'off',
      'no-constant-condition': 'error',
      'no-constructor-return': 'error',
      'no-control-regex': 'error',
      'no-debugger': 'error',
      'no-dupe-args': 'error',
      'no-dupe-class-members': 'error',
      'no-dupe-else-if': 'error',
      'no-dupe-keys': 'error',
      'no-duplicate-case': 'error',
      'no-duplicate-imports': 'error',
      'no-empty-character-class': 'error',
      'no-empty-pattern': 'error',
      'no-ex-assign': 'error',
      'no-fallthrough': 'error',
      'no-func-assign': 'error',
      'no-import-assign': 'error',
      'no-inner-declarations': 'error',
      'no-invalid-regexp': 'error',
      'no-irregular-whitespace': 'error',
      'no-loss-of-precision': 'error',
      'no-misleading-character-class': 'error',
      'no-new-native-nonconstructor': 'off',
      'no-new-symbol': 'error',
      'no-obj-calls': 'error',
      'no-promise-executor-return': 'error',
      'no-prototype-builtins': 'error',
      'no-self-assign': 'error',
      'no-self-compare': 'error',
      'no-setter-return': 'error',
      'no-sparse-arrays': 'error',
      'no-template-curly-in-string': 'error',
      'no-this-before-super': 'error',
      'no-undef': 'error',
      'no-unexpected-multiline': 'error',
      'no-unmodified-loop-condition': 'off',
      'no-unreachable': 'error',

      'no-unreachable-loop': [
        'error',
        {
          ignore: []
        }
      ],

      'no-unsafe-finally': 'error',
      'no-unsafe-negation': 'error',

      'no-unsafe-optional-chaining': [
        'error',
        {
          disallowArithmeticOperators: true
        }
      ],

      'no-unused-private-class-members': 'error',

      'no-unused-vars': [
        'off',
        {
          vars: 'all',
          args: 'all'
        }
      ],

      'no-use-before-define': [
        'error',
        {
          functions: true,
          classes: true,
          variables: true
        }
      ],

      'no-useless-backreference': 'error',
      'require-atomic-updates': 'off',
      'use-isnan': 'error',

      'valid-typeof': [
        'error',
        {
          requireStringLiterals: true
        }
      ],

      'accessor-pairs': 'error',

      'arrow-body-style': [
        'error',
        'as-needed',
        {
          requireReturnForObjectLiteral: false
        }
      ],

      'block-scoped-var': 'error',

      camelcase: [
        'warn',
        {
          properties: 'never',
          ignoreDestructuring: false
        }
      ],

      'capitalized-comments': [
        'off',
        'never',
        {
          line: {
            ignorePattern: '.*',
            ignoreInlineComments: true,
            ignoreConsecutiveComments: true
          },

          block: {
            ignorePattern: '.*',
            ignoreInlineComments: true,
            ignoreConsecutiveComments: true
          }
        }
      ],

      'class-methods-use-this': [
        'error',
        {
          exceptMethods: [
            'render',
            'getInitialState',
            'getDefaultProps',
            'getChildContext',
            'componentWillMount',
            'UNSAFE_componentWillMount',
            'componentDidMount',
            'componentWillReceiveProps',
            'UNSAFE_componentWillReceiveProps',
            'shouldComponentUpdate',
            'componentWillUpdate',
            'UNSAFE_componentWillUpdate',
            'componentDidUpdate',
            'componentWillUnmount',
            'componentDidCatch',
            'getSnapshotBeforeUpdate'
          ]
        }
      ],

      complexity: ['error', 20],
      'consistent-return': 'error',
      'consistent-this': 'off',
      curly: 'error',
      'default-case': 'error',
      'default-case-last': 'error',
      'default-param-last': 'error',
      'dot-notation': 'error',
      eqeqeq: ['error', 'always'],

      'func-name-matching': [
        'off',
        'always',
        {
          includeCommonJSModuleExports: false,
          considerPropertyDescriptor: true
        }
      ],

      'func-style': ['error', 'expression'],
      'grouped-accessor-pairs': 'error',
      'guard-for-in': 'error',
      'id-denylist': 'off',
      'id-length': 'off',
      'id-match': 'off',
      'init-declarations': 'off',

      'logical-assignment-operators': [
        'error',
        'always',
        {
          enforceForIfStatements: true
        }
      ],

      'max-classes-per-file': ['error', 1],
      'max-depth': ['error', 4],

      'max-lines': [
        'off',
        {
          max: 300,
          skipBlankLines: true,
          skipComments: true
        }
      ],

      'max-lines-per-function': [
        'off',
        {
          max: 50,
          skipBlankLines: true,
          skipComments: true,
          IIFEs: true
        }
      ],

      'max-nested-callbacks': 'off',
      'max-params': ['off', 3],
      'max-statements': ['off', 10],
      'multiline-comment-style': ['error', 'starred-block'],

      'new-cap': [
        'error',
        {
          newIsCap: true,
          newIsCapExceptions: [],
          capIsNew: false,
          capIsNewExceptions: ['Immutable.Map', 'Immutable.Set', 'Immutable.List']
        }
      ],

      'no-alert': 'error',
      'no-array-constructor': 'error',
      'no-bitwise': 'error',
      'no-caller': 'error',
      'no-case-declarations': 'error',

      'no-confusing-arrow': [
        'error',
        {
          allowParens: true
        }
      ],

      'no-console': 'warn',
      'no-continue': 'error',
      'no-delete-var': 'error',
      'no-div-regex': 'error',

      'no-else-return': [
        'error',
        {
          allowElseIf: false
        }
      ],
      '@typescript-eslint/no-unsafe-return': 'off',

      'no-empty': 'error',
      'no-empty-function': 'error',
      'no-empty-static-block': 'off',
      'no-eq-null': 'off',
      'no-eval': 'error',
      'no-extend-native': 'error',
      'no-extra-bind': 'error',
      'no-extra-boolean-cast': 'error',
      'no-extra-label': 'error',
      'no-extra-semi': 'error',
      'no-floating-decimal': 'error',
      'no-global-assign': 'error',
      'no-implicit-coercion': 'error',
      'no-implicit-globals': 'off',
      'no-implied-eval': 'error',
      'no-inline-comments': 'error',
      'no-invalid-this': 'off',
      'no-iterator': 'error',
      'no-label-var': 'error',
      'no-labels': 'error',
      'no-lone-blocks': 'error',
      'no-lonely-if': 'error',
      'no-loop-func': 'error',

      'no-magic-numbers': [
        'off',
        {
          ignore: [],
          ignoreArrayIndexes: true,
          enforceConst: true,
          detectObjects: false
        }
      ],

      'no-mixed-operators': [
        'error',
        {
          groups: [
            ['%', '**'],
            ['%', '+'],
            ['%', '-'],
            ['%', '*'],
            ['%', '/'],
            ['/', '*'],
            ['&', '|', '<<', '>>', '>>>'],
            ['==', '!=', '===', '!=='],
            ['&&', '||']
          ],

          allowSamePrecedence: false
        }
      ],

      'no-multi-assign': 'error',
      'no-multi-str': 'error',
      'no-negated-condition': 'off',
      'no-nested-ternary': 'error',
      'no-new': 'error',
      'no-new-func': 'error',
      'no-new-object': 'error',
      'no-new-wrappers': 'error',
      'no-nonoctal-decimal-escape': 'error',
      'no-octal': 'error',
      'no-octal-escape': 'error',

      'no-param-reassign': [
        'error',
        {
          props: true,

          ignorePropertyModificationsFor: [
            'acc',
            'accumulator',
            'e',
            'ctx',
            'context',
            'req',
            'request',
            'res',
            'response',
            '$scope',
            'staticContext'
          ]
        }
      ],

      'no-plusplus': 'error',
      'no-proto': 'error',
      'no-redeclare': 'error',
      'no-regex-spaces': 'error',
      'no-restricted-exports': 'error',

      'no-restricted-globals': [
        'error',
        {
          name: 'isFinite',
          message: 'Use Number.isFinite instead'
        },
        {
          name: 'isNaN',
          message: 'Use Number.isNaN instead'
        }
      ],

      'no-restricted-imports': 'off',

      'no-restricted-properties': [
        'error',
        {
          object: 'arguments',
          property: 'callee',
          message: 'arguments.callee is deprecated'
        },
        {
          object: 'global',
          property: 'isFinite',
          message: 'Please use Number.isFinite instead'
        },
        {
          object: 'self',
          property: 'isFinite',
          message: 'Please use Number.isFinite instead'
        },
        {
          object: 'window',
          property: 'isFinite',
          message: 'Please use Number.isFinite instead'
        },
        {
          object: 'global',
          property: 'isNaN',
          message: 'Please use Number.isNaN instead'
        },
        {
          object: 'self',
          property: 'isNaN',
          message: 'Please use Number.isNaN instead'
        },
        {
          object: 'window',
          property: 'isNaN',
          message: 'Please use Number.isNaN instead'
        },
        {
          property: '__defineGetter__',
          message: 'Please use Object.defineProperty instead.'
        },
        {
          property: '__defineSetter__',
          message: 'Please use Object.defineProperty instead.'
        },
        {
          object: 'Math',
          property: 'pow',
          message: 'Use the exponentiation operator (**) instead.'
        }
      ],

      'no-restricted-syntax': [
        'error',
        {
          selector: 'ForInStatement',
          message:
            'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.'
        },
        {
          selector: 'ForOfStatement',
          message:
            'iterators/generators require regenerator-runtime, which is too heavyweight for this guide to allow them. Separately, loops should be avoided in favor of array iterations.'
        },
        {
          selector: 'LabeledStatement',
          message:
            'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.'
        },
        {
          selector: 'WithStatement',
          message:
            '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.'
        }
      ],

      'no-return-assign': ['error', 'always'],
      'no-return-await': 'error',
      'no-script-url': 'error',
      'no-sequences': 'error',
      'no-shadow': 'error',
      'no-shadow-restricted-names': 'error',
      'no-ternary': 'off',
      'no-throw-literal': 'error',
      'no-undef-init': 'error',
      'no-undefined': 'error',

      'no-underscore-dangle': [
        'error',
        {
          allow: [],
          allowAfterThis: false,
          allowAfterSuper: false,
          enforceInMethodNames: true
        }
      ],

      'no-unneeded-ternary': [
        'error',
        {
          defaultAssignment: false
        }
      ],

      'no-unused-expressions': [
        'error',
        {
          allowShortCircuit: false,
          allowTernary: false,
          allowTaggedTemplates: false
        }
      ],

      'no-unused-labels': 'error',
      'no-useless-call': 'error',
      'no-useless-catch': 'error',
      'no-useless-computed-key': 'error',
      'no-useless-concat': 'error',
      'no-useless-constructor': 'error',
      'no-useless-escape': 'error',

      'no-useless-rename': [
        'error',
        {
          ignoreDestructuring: false,
          ignoreImport: false,
          ignoreExport: false
        }
      ],

      'no-useless-return': 'error',
      'no-var': 'error',
      'no-void': 'error',
      'no-warning-comments': 'error',
      'no-with': 'error',

      'object-shorthand': [
        'error',
        'always',
        {
          ignoreConstructors: false,
          avoidQuotes: true
        }
      ],

      'one-var': ['error', 'never'],
      'one-var-declaration-per-line': ['error', 'initializations'],
      'operator-assignment': ['error', 'always'],

      'prefer-arrow-callback': [
        'error',
        {
          allowNamedFunctions: false,
          allowUnboundThis: true
        }
      ],

      'prefer-const': [
        'error',
        {
          destructuring: 'any',
          ignoreReadBeforeAssign: true
        }
      ],

      'prefer-destructuring': [
        'error',
        {
          VariableDeclarator: {
            array: false,
            object: true
          },

          AssignmentExpression: {
            array: true,
            object: false
          }
        },
        {
          enforceForRenamedProperties: false
        }
      ],

      'prefer-exponentiation-operator': 'error',
      'prefer-named-capture-group': 'off',
      'prefer-numeric-literals': 'error',
      'prefer-object-has-own': 'error',
      'prefer-object-spread': 'error',

      'prefer-promise-reject-errors': [
        'error',
        {
          allowEmptyReject: true
        }
      ],

      'prefer-regex-literals': [
        'error',
        {
          disallowRedundantWrapping: true
        }
      ],

      'prefer-rest-params': 'error',
      'prefer-spread': 'error',
      'prefer-template': 'error',

      'quote-props': [
        'error',
        'as-needed',
        {
          keywords: false,
          unnecessary: true,
          numbers: false
        }
      ],

      radix: 'error',
      'require-await': 'warn',
      'require-unicode-regexp': 'off',
      'require-yield': 'error',
      'sort-imports': 'off',

      'sort-keys': [
        'off',
        'asc',
        {
          caseSensitive: false,
          natural: true
        }
      ],

      'sort-vars': 'off',
      'spaced-comment': ['error', 'always'],
      strict: ['error', 'never'],
      'symbol-description': 'error',
      'vars-on-top': 'error',
      yoda: 'error',
      'array-bracket-newline': ['off', 'consistent'],
      'array-bracket-spacing': ['error', 'never'],

      'array-element-newline': [
        'off',
        {
          multiline: true,
          minItems: 3
        }
      ],

      'arrow-parens': ['error', 'always'],

      'arrow-spacing': [
        'error',
        {
          before: true,
          after: true
        }
      ],

      'block-spacing': ['error', 'always'],
      'brace-style': ['error', 'allman'],
      'comma-dangle': ['error', 'never'],

      'comma-spacing': [
        'error',
        {
          before: false,
          after: true
        }
      ],

      'comma-style': ['error', 'last'],
      'computed-property-spacing': ['error', 'never'],
      'dot-location': ['error', 'property'],
      'eol-last': ['error', 'never'],
      'func-call-spacing': ['error', 'never'],
      'function-call-argument-newline': ['error', 'never'],
      'function-paren-newline': ['error', 'never'],

      'generator-star-spacing': [
        'error',
        {
          before: false,
          after: true
        }
      ],

      'implicit-arrow-linebreak': ['error', 'beside'],

      indent: [
        'error',
        2,
        {
          SwitchCase: 1,

          ignoredNodes: [
            'JSXElement',
            'JSXElement > *',
            'JSXAttribute',
            'JSXIdentifier',
            'JSXNamespacedName',
            'JSXMemberExpression',
            'JSXSpreadAttribute',
            'JSXExpressionContainer',
            'JSXOpeningElement',
            'JSXClosingElement',
            'JSXFragment',
            'JSXOpeningFragment',
            'JSXClosingFragment',
            'JSXText',
            'JSXEmptyExpression',
            'JSXSpreadChild'
          ]
        }
      ],

      'jsx-quotes': ['error', 'prefer-single'],
      'key-spacing': 'error',

      'keyword-spacing': [
        'error',
        {
          overrides: {
            if: {
              after: false
            },

            return: {
              after: true
            },

            throw: {
              after: true
            },

            case: {
              after: true
            }
          }
        }
      ],

      'line-comment-position': [
        'error',
        {
          position: 'above',
          applyDefaultPatterns: true
        }
      ],

      'linebreak-style': ['error', 'unix'],
      'lines-around-comment': 'off',
      'lines-between-class-members': ['error', 'always'],

      'max-len': [
        'off',
        100,
        2,
        {
          ignoreUrls: true,
          ignoreComments: false,
          ignoreRegExpLiterals: true,
          ignoreStrings: false,
          ignoreTemplateLiterals: false
        }
      ],

      'max-statements-per-line': 'error',
      'multiline-ternary': ['error', 'never'],
      'new-parens': 'error',

      'newline-per-chained-call': [
        'error',
        {
          ignoreChainWithDepth: 4
        }
      ],

      'no-extra-parens': [
        'error',
        'all',
        {
          conditionalAssign: true,
          ignoreJSX: 'all'
        }
      ],

      'no-mixed-spaces-and-tabs': 'error',
      'no-multi-spaces': 'error',

      'no-multiple-empty-lines': [
        'error',
        {
          max: 1,
          maxBOF: 0,
          maxEOF: 0
        }
      ],

      'no-tabs': 'error',

      'no-trailing-spaces': [
        'error',
        {
          skipBlankLines: false,
          ignoreComments: false
        }
      ],

      'no-whitespace-before-property': 'error',
      'nonblock-statement-body-position': ['error', 'beside'],

      'object-curly-newline': [
        'error',
        {
          ObjectExpression: {
            minProperties: 4,
            multiline: true,
            consistent: true
          },

          ObjectPattern: {
            minProperties: 4,
            multiline: true,
            consistent: true
          },

          ImportDeclaration: {
            minProperties: 4,
            multiline: true,
            consistent: true
          },

          ExportDeclaration: {
            minProperties: 4,
            multiline: true,
            consistent: true
          }
        }
      ],

      'object-curly-spacing': ['error', 'always'],

      'object-property-newline': [
        'error',
        {
          allowAllPropertiesOnSameLine: true
        }
      ],

      'operator-linebreak': ['error', 'none'],

      'padded-blocks': [
        'error',
        {
          blocks: 'never',
          classes: 'never',
          switches: 'never'
        },
        {
          allowSingleLineBlocks: true
        }
      ],

      'padding-line-between-statements': 'off',
      quotes: ['error', 'single'],
      'rest-spread-spacing': ['error', 'never'],
      semi: ['error', 'always'],
      'semi-spacing': [
        'error',
        {
          before: false,
          after: true
        }
      ],
      'semi-style': ['error', 'last'],
      'space-before-blocks': 'error',

      'space-before-function-paren': [
        'error',
        {
          anonymous: 'always',
          named: 'never',
          asyncArrow: 'always'
        }
      ],

      'space-in-parens': ['error', 'never'],
      'space-infix-ops': 'error',

      'space-unary-ops': [
        'error',
        {
          words: true,
          nonwords: false
        }
      ],

      'switch-colon-spacing': 'error',
      'template-curly-spacing': 'error',
      'template-tag-spacing': ['error', 'always'],
      'unicode-bom': ['error', 'never'],

      'wrap-iife': [
        'error',
        'outside',
        {
          functionPrototypeMethods: false
        }
      ],

      'wrap-regex': 'error',
      'yield-star-spacing': ['error', 'after']
    }
  }
];
