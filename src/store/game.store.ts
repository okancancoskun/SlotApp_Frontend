import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IGame } from "../interfaces";
import axios from "../helpers/axios";

interface IState {
  games: IGame[];
  gameData?: {
    game: IGame | null;
    initialSpin: string[];
  };
  loading: "pending" | "succeeded" | "failed" | null;
}

const initialState: IState = {
  games: [],
  gameData: { game: null, initialSpin: [] },
  loading: null,
};

export const getGames = createAsyncThunk(
  "game/all",
  async ({ search }: { search?: string }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`game/all`, { params: { search } });
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Error while fetching games"
      );
    }
  }
);

export const getGame = createAsyncThunk(
  "game/findOne",
  async (param: string, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`game/${param}`);
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Error while fetching the game"
      );
    }
  }
);

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getGames.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(getGames.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.games = action.payload;
    });
    builder.addCase(getGames.rejected, (state, action) => {
      state.loading = "failed";
    });
    builder.addCase(getGame.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(getGame.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.gameData = action.payload;
    });
    builder.addCase(getGame.rejected, (state, action) => {
      state.loading = "failed";
    });
  },
});

const gameReducer = gameSlice.reducer;
export default gameReducer;
