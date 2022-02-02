import React from "react";
import { makeApiCall } from "../../utils/helpers";

const Search = ({ dispatch, term, error }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (term) {
      const { edges, endCursor } = await makeApiCall({ term: term.trim() });
      dispatch({ type: "SET_REPOS", value: edges, cursor: endCursor });
    } else {
      dispatch({ type: "SET_ERROR", value: true });
    }
  };
  const handleOnChange = (e) => {
    if (error) {
      dispatch({ type: "SET_ERROR", value: true });
    }
    dispatch({ type: "SET_INPUT", value: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="e.g. react" type="search" onChange={handleOnChange} />
      <button type="submit">Search!</button>
    </form>
  );
};

export default Search;
