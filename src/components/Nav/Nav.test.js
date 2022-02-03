import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Nav from "./Nav";

jest.mock("../../utils/helpers", () => {
  return {
    __esModule: true,
    makeApiCall: jest.fn().mockReturnValue({
      data: {
        search: {
          repositoryCount: 400,
          edges: [
            {
              node: {
                name: "enzyme",
                url: "https://github.com/enzymejs/enzyme",
                description: "JavaScript Testing utilities for React",
                primaryLanguage: {
                  name: "JavaScript",
                },
                openGraphImageUrl:
                  "https://avatars.githubusercontent.com/u/60945302?s=400&v=4",
                stargazerCount: 19804,
              },
            },
          ],
          pageInfo: {
            endCursor: "Y3Vyc29yOjEw",
            hasNextPage: true,
            hasPreviousPage: false,
          },
        },
      },
    }),
  };
});

describe("<Nav /> component", () => {
  it("should render without crashing", () => {
    const { container } = render(<Nav />);
    expect(container).toBeDefined();
  });

  it("should not fire PREV_PAGE dispatch when current page is < 1", () => {
    const mockDispatch = jest.fn((arg) => arg);
    const state = { currentPage: 0 };
    render(<Nav dispatch={mockDispatch} state={state} />);
    const prevButton = screen.getByText("<");

    expect(prevButton).toBeInTheDocument();

    fireEvent.click(prevButton);
    expect(mockDispatch.mock.calls.length).toEqual(0);
  });

  it("should fire PREV_PAGE dispatch when current page is > 1", () => {
    const mockDispatch = jest.fn((arg) => arg);
    const state = { currentPage: 2 };
    render(<Nav dispatch={mockDispatch} state={state} />);
    const prevButton = screen.getByText("<");

    expect(prevButton).toBeInTheDocument();

    fireEvent.click(prevButton);
    expect(mockDispatch.mock.calls[0][0]).toEqual({
      type: "LOADING",
      value: true,
    });
    expect(mockDispatch.mock.calls[1][0]).toEqual({ type: "PREV_PAGE" });
  });

  it("should fire NEXT_PAGE dispatch", () => {
    const mockDispatch = jest.fn((arg) => arg);
    const state = {
      currentPage: 1,
      fullList: [{ cursor: "test" }, { cursor: "test" }],
      cursor: "test",
    };
    render(<Nav dispatch={mockDispatch} state={state} />);
    const nextButton = screen.getByText(">");

    expect(nextButton).toBeInTheDocument();

    fireEvent.click(nextButton);

    expect(mockDispatch.mock.calls[0][0]).toEqual({
      type: "LOADING",
      value: true,
    });
    expect(mockDispatch.mock.calls[1][0]).toEqual({
      type: "NEXT_PAGE",
      fullList: [{ cursor: "test" }, { cursor: "test" }],
      cursor: undefined,
    });
  });
});
