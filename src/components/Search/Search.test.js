import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Search from "./Search";

describe("<Search /> component", () => {
  it("should render without crashing", () => {
    const { container } = render(<Search />);
    expect(container).toBeDefined();
  });

  it("should fire error dispatch if no input", () => {
    const mockDispatch = jest.fn((arg) => arg);
    render(<Search dispatch={mockDispatch} />);
    const button = screen.getByText("Search");

    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(mockDispatch.mock.calls[0][0]).toEqual({
      type: "SET_ERROR",
      value: true,
    });
  });

  it("should fire SET_INPUT event on input change", () => {
    const mockDispatch = jest.fn((arg) => arg);
    render(<Search dispatch={mockDispatch} />);
    const input = screen.getByPlaceholderText("e.g. react");
    fireEvent.change(input, { target: { value: "react" } });
    expect(mockDispatch.mock.calls[0][0]).toEqual({
      type: "SET_INPUT",
      value: "react",
    });
  });
});
