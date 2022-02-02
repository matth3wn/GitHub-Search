import React from "react";
import styled from "@emotion/styled";

const Header = styled.h2`
  color: white;
`;

const Results = ({ children }) => {
  return (
    <>
      <Header>Results</Header>
      {children}
    </>
  );
};

export default Results;
