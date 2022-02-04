import { combineReducers } from "@reduxjs/toolkit";

import articles from "@/store/articles";

const rootReducer = combineReducers({
  articles: articles.reducer,
});

export default rootReducer;
