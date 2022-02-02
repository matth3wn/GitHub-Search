import CONSTANTS from "./contants";
import { GET_REPOS } from "./queries";

export const makeApiCall = async ({ term, limit = 8, cursor = null }) => {
  try {
    const response = await fetch(CONSTANTS.githubUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${CONSTANTS.githubToken}`,
      },
      body: JSON.stringify({
        query: GET_REPOS,
        variables: {
          queryString: `${term} stars:>1600`,
          numberOfRepos: limit,
          cursor,
        },
      }),
    });

    const {
      data: { search: { edges = [], pageInfo: { endCursor } = {} } = {} } = {},
    } = await response.json();

    return { edges, endCursor };
  } catch (error) {
    console.error("Something went wrong...", error);
    return error;
  }
};
