// Could add pagination with before and after parameter.

export const GET_REPOS = `
  query SearchRepos($queryString: String!, $numberOfRepos: Int!, $cursor: String) {
    search(query: $queryString, type: REPOSITORY, first: $numberOfRepos, after: $cursor) {
      repositoryCount
      edges {
        node {
          ... on Repository {
            name
            url
            description
            primaryLanguage {
              name
            }
            openGraphImageUrl
            stargazerCount
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;
