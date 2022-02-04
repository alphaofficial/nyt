import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/api";

type FetchArticleArgs = { fq: string };

export const fetchArticle = createAsyncThunk(
  "articles/fetch_article",
  async ({ fq }: FetchArticleArgs, { rejectWithValue }) => {
    try {
      const { data } = await api.get(
        `/articlesearch.json?api-key=${process.env.REACT_APP_API_KEY}&fq=${fq}`
      );
      return data.response.docs[0];
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export default fetchArticle;
