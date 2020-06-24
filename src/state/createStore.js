import { createStore as reduxCreateStore } from "redux";

const reducer = (state, action) => {
  switch (action.type) {
    case `TRANSITION_START`:
      return { ...state, isTransitioning: true };
    case `TRANSITION_END`:
      return { ...state, isTransitioning: false };
    case `LOADING_SUPPRESSED`:
      return { ...state, isLoadingSuppressed: true, isTransitioning: false };
    default:
      return state;
  }
};

const initialState = { isTransitioning: false, isLoadingSuppressed: false };

const createStore = () => reduxCreateStore(reducer, initialState);
export default createStore;
