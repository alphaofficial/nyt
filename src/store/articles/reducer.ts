import { createSlice } from "@reduxjs/toolkit";
import thunks from "./thunks";

interface ArticleState {
  loading: boolean;
  error: any;
  articles: any[];
  article: any;
}

const initialState: ArticleState = {
  loading: false,
  error: null,
  articles: [],
  article: null,
};
const articles = createSlice({
  name: "articles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(thunks.fetchArticles.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(thunks.fetchArticles.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.articles = payload;
    });
    builder.addCase(thunks.fetchArticles.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    builder.addCase(thunks.fetchArticle.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.article = payload;
    });
    builder.addCase(thunks.fetchArticle.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export const { reducer, actions } = articles;
