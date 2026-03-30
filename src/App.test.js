import { render, screen } from "@testing-library/react";
import App from "./App";

// ✅ Mock ChatBox to avoid Redux dependency
jest.mock("./components/ChatBox", () => () => (
  <div>
    <input type="text" placeholder="chat input" />
  </div>
));

describe("App Component", () => {
  test("renders AI Chatbot heading", () => {
    render(<App />);
    expect(screen.getByText(/AI Chatbot/i)).toBeInTheDocument();
  });

  test("renders ChatBox", () => {
    render(<App />);
    expect(screen.getByPlaceholderText(/chat input/i)).toBeInTheDocument();
  });
});