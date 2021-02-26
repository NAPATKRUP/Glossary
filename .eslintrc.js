module.exports = {
  env: {
    node: true, // this is the best starting point
    browser: true, // for react web
    es6: true, // enables es6 features
  },
  parser: 'babel-eslint', // needed to make babel stuff work properly
  extends: 'airbnb',
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/jsx-props-no-spreading': [0],
    'lines-around-comment': [1, { beforeLineComment: true }],
    'no-use-before-define': [0],
    'react/prop-types': [0],
    'react/no-array-index-key': [0],
  },
};
