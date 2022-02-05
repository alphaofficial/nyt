import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/api";

type FetchArticleArgs = { fq: string };

export const fetchArticle = createAsyncThunk(
  "articles/fetch_article",
  async ({ fq }: FetchArticleArgs, { rejectWithValue }) => {
    try {
      const { data } = await api.get(
        `/articlesearch.json?api-key=${process.env.REACT_APP_API_KEY}&fq=${fq}&fl=document_type,headline,pub_date,abstract,snippet,web_url,lead_paragraph`
      );
      return data.response.docs[0];
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export default fetchArticle;
