import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import PostPage from "./PostPage";

let container;
let view;
beforeEach(() => {
  // eslint-disable-next-line testing-library/no-render-in-setup
  view = render(
    <BrowserRouter>
      <PostPage />
    </BrowserRouter>
  );
});

test("Render post form", () => {
  localStorage.setUser();
  container = view.container;
  expect(container).toBeInTheDocument();
});
