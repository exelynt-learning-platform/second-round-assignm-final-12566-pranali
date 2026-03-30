import reducer, { sendMessage } from "../../features/chat/chatSlice";
import axios from "axios";

// Mock axios
jest.mock("axios");

describe("chatSlice", () => {
  const initialState = {
    messages: [],
    loading: false,
    error: null,
  };

  //  1. Test initial state
  test("should return initial state", () => {
    expect(reducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  // 2. Test pending state
  test("should handle sendMessage.pending", () => {
    const action = {
      type: sendMessage.pending.type,
      meta: { arg: "Hello" },
    };

    const state = reducer(initialState, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
    expect(state.messages[0]).toEqual({
      role: "user",
      content: "Hello",
    });
  });

  // 3. Test fulfilled state
  test("should handle sendMessage.fulfilled", () => {
    const prevState = {
      messages: [{ role: "user", content: "Hello" }],
      loading: true,
      error: null,
    };

    const action = {
      type: sendMessage.fulfilled.type,
      payload: "Hi there!",
    };

    const state = reducer(prevState, action);

    expect(state.loading).toBe(false);
    expect(state.messages[1]).toEqual({
      role: "ai",
      content: "Hi there!",
    });
  });

  //  4. Test rejected state
  test("should handle sendMessage.rejected", () => {
    const prevState = {
      messages: [],
      loading: true,
      error: null,
    };

    const action = {
      type: sendMessage.rejected.type,
      payload: "API Error",
    };

    const state = reducer(prevState, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBe("API Error");
  });

  // 5. Test async thunk success
  test("should dispatch fulfilled when API call is successful", async () => {
    axios.post.mockResolvedValue({
      data: {
        candidates: [
          {
            content: {
              parts: [{ text: "AI response" }],
            },
          },
        ],
      },
    });

    const dispatch = jest.fn();
    const thunk = sendMessage("Hello");

    await thunk(dispatch, () => ({}), null);

    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: sendMessage.pending.type })
    );

    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: sendMessage.fulfilled.type,
        payload: "AI response",
      })
    );
  });

  // 6. Test async thunk failure
  test("should dispatch rejected when API fails", async () => {
    axios.post.mockRejectedValue({
      response: {
        data: {
          error: { message: "API Error" },
        },
      },
    });

    const dispatch = jest.fn();
    const thunk = sendMessage("Hello");

    await thunk(dispatch, () => ({}), null);

    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: sendMessage.pending.type })
    );

    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: sendMessage.rejected.type,
        payload: "API Error",
      })
    );
  });
});