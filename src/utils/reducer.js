export const gitHubReducer = (state, action) => {
  switch (action.type) {
    case "SET_REPOS":
      return {
        ...state,
        error: false,
        cursor: action.cursor,
        fullList: [{ repos: action.value, cursor: action.cursor }],
        currentPage: 1,
        loading: false
      };
    case "SET_ERROR":
      return {
        ...state,
        error: action.value,
        loading: false
      };
    case "SET_INPUT":
      return {
        ...state,
        term: action.value,
      };
    case "PREV_PAGE":
      return {
        ...state,
        currentPage: state.currentPage - 1,
        loading: false
      };
    case "NEXT_PAGE":
      return {
        ...state,
        fullList: action.fullList,
        cursor: action.cursor,
        currentPage: state.currentPage + 1,
        loading: false
      };
    case "LOADING":
      return {
        ...state,
        loading: action.value,
      };
    default:
      return state;
  }
};
