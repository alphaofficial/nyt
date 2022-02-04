import { reducer, actions } from "./reducer";
import thunks from "./thunks";

export default {
  reducer,
  actions: { ...actions, ...thunks },
};
