import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Main from "./Main";

describe("<Main /> component", () => {
  it("should render without crashing", () => {
    const { container } = render(<Main />);
    expect(container).toBeDefined();
  });
});
