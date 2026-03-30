import React from "react";
import { render, screen } from "@testing-library/react";
import Message from "../Message";

jest.mock("react-markdown", () => {
  return ({ children }) => <div>{children}</div>;
});

describe("Message Component", () => {
  test("renders user message correctly", () => {
    const msg = {
      role: "user",
      content: "Hello User",
    };

    render(<Message msg={msg} />);

    const messageText = screen.getByText("Hello User");

    expect(messageText).toBeInTheDocument();
    expect(messageText.parentElement).toHaveClass("user-msg");
  });

  test("renders AI message correctly", () => {
    const msg = {
      role: "ai",
      content: "Hello AI",
    };

    render(<Message msg={msg} />);

    const messageText = screen.getByText("Hello AI");

    expect(messageText).toBeInTheDocument();
    expect(messageText.parentElement).toHaveClass("ai-msg");
  });

  test("renders markdown content (mocked)", () => {
    const msg = {
      role: "ai",
      content: "**Bold Text**",
    };

    render(<Message msg={msg} />);

   
    expect(screen.getByText("**Bold Text**")).toBeInTheDocument();
  });
});