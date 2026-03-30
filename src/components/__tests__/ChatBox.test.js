import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import ChatBox from "../ChatBox";

// ✅ Mock scrollIntoView (FIX for your error)
beforeAll(() => {
  window.HTMLElement.prototype.scrollIntoView = jest.fn();
});

// Mock child components
jest.mock("../Message", () => () => <div>Message</div>);
jest.mock("../Loader", () => () => <div>Loading...</div>);

// Mock redux action
jest.mock("../../features/chat/chatSlice", () => ({
  sendMessage: jest.fn((msg) => ({
    type: "chat/sendMessage",
    payload: msg,
  })),
}));

const mockStore = configureStore([]);

describe("ChatBox Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      chat: {
        messages: [],
        loading: false,
        error: null,
      },
    });

    store.dispatch = jest.fn();
  });

  test("renders input field", () => {
    render(
      <Provider store={store}>
        <ChatBox />
      </Provider>
    );

    expect(
      screen.getByPlaceholderText("Type a message...")
    ).toBeInTheDocument();
  });

  test("does not dispatch if input is empty", () => {
    render(
      <Provider store={store}>
        <ChatBox />
      </Provider>
    );

    const input = screen.getByPlaceholderText("Type a message...");
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    expect(store.dispatch).not.toHaveBeenCalled();
  });

  test("dispatches sendMessage on Enter key", () => {
    render(
      <Provider store={store}>
        <ChatBox />
      </Provider>
    );

    const input = screen.getByPlaceholderText("Type a message...");

    fireEvent.change(input, { target: { value: "Hello" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    expect(store.dispatch).toHaveBeenCalled();
  });

  test("clears input after sending message", () => {
    render(
      <Provider store={store}>
        <ChatBox />
      </Provider>
    );

    const input = screen.getByPlaceholderText("Type a message...");

    fireEvent.change(input, { target: { value: "Hello" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    expect(input.value).toBe("");
  });

  test("shows loader when loading is true", () => {
    store = mockStore({
      chat: {
        messages: [],
        loading: true,
        error: null,
      },
    });

    render(
      <Provider store={store}>
        <ChatBox />
      </Provider>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("shows error message", () => {
    store = mockStore({
      chat: {
        messages: [],
        loading: false,
        error: "Something went wrong",
      },
    });

    render(
      <Provider store={store}>
        <ChatBox />
      </Provider>
    );

    expect(
      screen.getByText("Something went wrong")
    ).toBeInTheDocument();
  });
});