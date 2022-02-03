import React from "react";
import { makeApiCall } from "../../utils/helpers";
import styled from "@emotion/styled";

const Input = styled.input`
  height: 40px;
`;

const Button = styled.button`
  background-color: #364036;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
`;

const Search = ({ dispatch, term }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (term) {
      dispatch({ type: "LOADING", value: true })
      const { edges, endCursor } = await makeApiCall({ term: term.trim() });
      dispatch({ type: "SET_REPOS", value: edges, cursor: endCursor });
    } else {
      dispatch({ type: "SET_ERROR", value: true });
    }
  };
  const handleOnChange = (e) => {
    dispatch({ type: "SET_INPUT", value: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input placeholder="e.g. react" type="search" onChange={handleOnChange} />
      <Button type="submit" name="submit">Search</Button>
    </form>
  );
};

export default Search;
