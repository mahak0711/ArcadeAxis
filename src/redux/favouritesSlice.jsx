import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    favorites: [],
  },
  reducers: {
    addFavorite: (state, action) => {
      const game = action.payload;
      if (!state.favorites.some((fav) => fav.id === game.id)) {
        state.favorites.push(game);
      }
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter((game) => game.id !== action.payload);
    },
    toggleFavorite: (state, action) => {
      const game = action.payload;
      const exists = state.favorites.find((g) => g.id === game.id);
      if (exists) {
        state.favorites = state.favorites.filter((g) => g.id !== game.id);
      } else {
        state.favorites.push(game);
      }
    }
  },
});

export const { addFavorite, removeFavorite, toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
