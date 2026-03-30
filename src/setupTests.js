// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
// ✅ Global mock for react-markdown (fixes Jest ESM issue everywhere)
jest.mock("react-markdown", () => {
  return ({ children }) => <div>{children}</div>;
});