import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async (message, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${process.env.REACT_APP_GEMINI_API_KEY}`,
        {
          contents: [
            {
              parts: [{ text: message }],
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

   
      const text =
        response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!text) {
        return rejectWithValue("No response from AI");
      }

      return text;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error?.message || "API Error"
      );
    }
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state, action) => {
        state.loading = true;
        state.error = null;

        state.messages.push({
          role: "user",
          content: action.meta.arg,
        });
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading = false;

        state.messages.push({
          role: "ai",
          content: action.payload,
        });
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "Something went wrong. Try again.";
      });
  },
});

export default chatSlice.reducer;