// __mocks__/react-markdown.js
// Stub for react-markdown (ESM-only, incompatible with Jest/CJS)
const React = require("react");

function ReactMarkdown({ children }) {
  return React.createElement("div", { "data-testid": "markdown" }, children);
}

module.exports = ReactMarkdown;
module.exports.default = ReactMarkdown;
