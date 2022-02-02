import React from "react";
import styled from "@emotion/styled";
import { makeApiCall } from "../../utils/helpers";

const NavButton = styled.button`
  background-color: #364036;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
`;

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
        fullList: [...state.fullList, { repos: edges, cursor: endCursor }],
        cursor: endCursor,
      });
    } else {
      dispatch({
        type: "NEXT_PAGE",
        fullList: [...state.fullList],
        cursor: state.endCursor ?? [state.fullList.length - 1].cursor,
      });
    }
  };

  const prevPage = () => {
    if (state.currentPage > 1) {
      dispatch({ type: "PREV_PAGE" });
    }
  };

  return (
    <div>
      <NavButton onClick={prevPage}>{"<"}</NavButton>
      <NavButton onClick={nextPage}>{">"}</NavButton>
    </div>
  );
};

export default Nav;
