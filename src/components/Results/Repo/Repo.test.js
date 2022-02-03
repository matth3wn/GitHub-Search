import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Repo from "./Repo";

describe("<Repo /> component", () => {
  it("should render without crashing", () => {
    const props = {
      name: "test",
      description: "test description",
      primaryLanguage: "JavaScript",
      url: "example.com",
      openGraphImageUrl: "https://picsum.photos/200/300",
      stargazerCount: 5,
    };
    render(<Repo {...props} />);
    expect(screen.getByText('test')).toBeInTheDocument();
    expect(screen.getByAltText("repo")).toBeInTheDocument();
    expect(screen.getByText("⭐ 5")).toBeInTheDocument();
    expect(screen.getByText("Language: JavaScript")).toBeInTheDocument();
    expect(screen.getByText("test description")).toBeInTheDocument();
  });
});
