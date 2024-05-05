// webpack.config.js

const path = require('path');

module.exports = {
  resolve: {
    fallback: {
      "crypto": require.resolve("crypto-browserify"),
      "fs": false, // Do not use a polyfill for fs
      "http": require.resolve("stream-http"),
      "net": false, // Do not use a polyfill for net
      "stream": require.resolve("stream-browserify"),
    }
  }
};
