import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/api";

type FetchArticlesArgs = { query: string; page: number };

export const fetchArticles = createAsyncThunk(
  "articles/fetch_articles",
  async ({ query, page = 1 }: FetchArticlesArgs, { rejectWithValue }) => {
    try {
      const { data } = await api.get(
        `/articlesearch.json?api-key=${process.env.REACT_APP_API_KEY}&q=${query}&page=${page}&fl=document_type,headline,snippet,web_url`
      );
      return data.response.docs;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export default fetchArticles;
