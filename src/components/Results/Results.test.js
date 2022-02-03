import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Results from "./Results";

describe("<Results /> component", () => {
  it("should render without crashing", () => {
    const { container } = render(
      <Results>
        <div>child 1</div>
        <div>child 2</div>
        <div>child 3</div>
      </Results>
    );
    expect(screen.getByText("Results")).toBeInTheDocument();
    expect(container.childNodes.length).toBe(4);
  });
});
