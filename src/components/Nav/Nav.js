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
    dispatch({ type: "LOADING", value: true });
    if (state.fullList.length === state.currentPage) {
      const cursor =
        state.fullList.length < 1
          ? state.cursor
          : state.fullList[state.fullList.length - 1].cursor;

      try {
        const { edges, endCursor } = await makeApiCall({
          term: state.term,
          cursor,
        });
        dispatch({
          type: "NEXT_PAGE",
          fullList: [...state.fullList, { repos: edges, cursor: endCursor }],
          cursor: endCursor,
        });
      } catch (error) {
        dispatch({ type: "ERROR", value: true });
      }
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
      dispatch({ type: "LOADING", value: true });
      dispatch({ type: "PREV_PAGE" });
    }
  };

  return (
    <div>
      <NavButton name="prevBtn" onClick={prevPage}>
        {"<"}
      </NavButton>
      <NavButton name="nextBtn" onClick={nextPage}>
        {">"}
      </NavButton>
    </div>
  );
};

export default Nav;
