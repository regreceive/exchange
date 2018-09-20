module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true
    },
    "extends": [
      "eslint:recommended",
      "react-app",
      'plugin:css-modules/recommended',
      'prettier',
      'prettier/flowtype',
      'prettier/react',
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react", 'css-modules', 'prettier'
    ],
    "rules": {
      "css-modules/no-unused-class": [1, { "camelCase": true }],
      "css-modules/no-undef-class": [1, { "camelCase": true }],
      'prettier/prettier': 'error',
      'no-console': [
        0,
        {
          allow: ['warn', 'error', 'info'],
        },
      ],
      'no-undef': 0,
      'jsx-a11y/href-no-hash': 'off',
    }
};
