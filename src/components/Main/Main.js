import React, { useReducer } from "react";
import styled from "@emotion/styled";
import { gitHubReducer } from "../../utils/reducer";
import Nav from "../Nav/Nav";
import Results from "../Results/Results";
import Search from "../Search/Search";
import Repo from "../Results/Repo/Repo";

const MainContainer = styled.main`
  display: flex;
  justifiy-content: center;
  aligin-items: center;
  flex-direction: column;
  padding: 20px;
`

const RepoContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: start;
`;

const Main = () => {
  const [state, dispatch] = useReducer(gitHubReducer, {
    term: "",
    error: false,
    fullList: [],
    currentPage: 0,
    loading: false
  });

  return (
    <MainContainer>
      <Search dispatch={dispatch} term={state.term} />
      {state.error ? <span>can i haz input plz</span> : null}
      {state.fullList.length ? (
        <Results dispatch={dispatch} state={state}>
          <Nav dispatch={dispatch} state={state} />
          <RepoContainer>
            {!state.loading ? state.fullList[state.currentPage - 1].repos.map((r, i) => {
              const {
                name,
                url,
                primaryLanguage,
                description,
                openGraphImageUrl,
                stargazerCount,
              } = r.node;
              return (
                <Repo
                  key={`${name}-${i}`}
                  name={name}
                  description={description}
                  primaryLanguage={primaryLanguage?.name ?? "none"}
                  url={url}
                  openGraphImageUrl={openGraphImageUrl}
                  stargazerCount={stargazerCount}
                />
              );
            }) : <span>Loading...</span>}
          </RepoContainer>
        </Results>
      ) : null}
    </MainContainer>
  );
};

export default Main;
