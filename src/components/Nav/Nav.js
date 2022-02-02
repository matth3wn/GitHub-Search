import React from "react";
import { makeApiCall } from "../../utils/helpers";

const Nav = ({ dispatch, state }) => {
  const nextPage = async () => {
    if (
      state.fullList.length === 0 ||
      state.fullList.length === state.currentPage
    ) {
      const cursor =
        state.fullList.length < 1
          ? state.cursor
          : state.fullList[state.fullList.length - 1].cursor;
          
      const { edges, endCursor } = await makeApiCall({
        term: state.term,
        cursor,
      });
      dispatch({
        type: "NEXT_PAGE",
        value: edges,
        fullList: [...state.fullList, { repos: edges, cursor: endCursor }],
        cursor: endCursor,
      });
      console.log("if", state);
    } else {
      dispatch({
        type: "NEXT_PAGE",
        value: state.fullList[state.currentPage].repos,
        fullList: [...state.fullList],
        cursor: state.endCursor ?? [state.fullList.length - 1].cursor,
      });

      console.log("else", state);
    }
  };

  const prevPage = () => {
    if (state.currentPage > 1) {
      dispatch({ type: "PREV_PAGE" });
    }
    console.log("prev", state);
  };

  return (
    <div>
      <button onClick={prevPage}>{"<"}</button>
      <button onClick={nextPage}>{">"}</button>
    </div>
  );
};

export default Nav;
