# GitHub Search Project

This application utilizes GitHub's Search API to return "best matched" from a query string.  

## Getting started  

1) `git clone https://github.com/matth3wn/GitHub-Search.git && cd $_`
2) `npm install`
3) Create `.env` in root directory
4) In `.env`, create a env var, `REACT_APP_GH_TOKEN=<your token>` . If you do not have one docs: [Creating a personal access token on GitHub
](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)
5. `npm start`
6. Open browser and navigate to http://localhost:3000/  

## To run test

Run `npm test` or `npm t`  

### Tech used
Create React App, EmotionJs, React Router

### Future features/enchanments  
- Create sort filter  
- Improve performance by preventing unnecessary re-renders
- Allow users to favorite repos and save  
- Allow for user to user via query string
- Improve test coverage and UI
