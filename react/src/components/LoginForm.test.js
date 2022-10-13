import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import LoginForm from "./LoginForm";

let container;
let view;
beforeEach(() => {
  // eslint-disable-next-line testing-library/no-render-in-setup
  view = render(
    <BrowserRouter>
      <LoginForm />
    </BrowserRouter>
  );
});

test("Render Login form", () => {
  container = view.container;
  expect(container).toBeInTheDocument();
});

test("login form input", () => {
  const emailInput = screen.getByLabelText("Email address");
  const passInput = screen.getByLabelText("Password");

  // Simulate input.
  fireEvent.change(emailInput, { target: { value: "john@gmail.com" } });
  fireEvent.change(passInput, { target: { value: "Password1!" } });

  //check input is in the form
  expect(emailInput.value).toBe("john@gmail.com");
  expect(passInput.value).toBe("Password1!");
});
