/**
 * This file fixes the "regeneratorRuntime" issue with babel.
 * See: https://stackoverflow.com/questions/33527653/babel-6-regeneratorruntime-is-not-defined
 */
module.exports = {
  entry: ["babel-polyfill", "./src/renderer/index.js"],
  output: {
    filename: "web_index.js"
  }
};
