import React, { useReducer } from "react";
import styled from "@emotion/styled";
import { gitHubReducer } from "../../utils/reducer";
import Nav from "../Nav/Nav";
import Results from "../Results/Results";
import Search from "../Search/Search";
import Repo from "../Results/Repo/Repo";

const RepoContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: start;
`;

const Main = () => {
  const [state, dispatch] = useReducer(gitHubReducer, {
    term: "",
    res: [],
    error: false,
    fullList: [],
    currentPage: 0,
  });

  return (
    <main>
      <Search dispatch={dispatch} term={state.term} error={state.error} />
      {state.error ? <span>can i haz input plz</span> : null}
      {state.fullList.length ? (
        <Results dispatch={dispatch} state={state}>
          <Nav dispatch={dispatch} state={state} />
          <RepoContainer>
            {state.fullList[state.currentPage - 1].repos.map((r, i) => {
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
            })}
          </RepoContainer>
        </Results>
      ) : null}
    </main>
  );
};

export default Main;
