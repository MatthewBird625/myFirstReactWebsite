import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import RegisterForm from "./RegisterForm";

let container;
let view;
beforeEach(() => {
  // eslint-disable-next-line testing-library/no-render-in-setup
  view = render(
    <BrowserRouter>
      <RegisterForm />
    </BrowserRouter>
  );
});

test("Render Register form", () => {
  container = view.container;
  expect(container).toBeInTheDocument();
});

test("register form input", () => {
  const nameInput = screen.getByLabelText("Name");
  const emailInput = screen.getByLabelText("Email address");
  const passInput = screen.getByLabelText("Password");

  // Simulate input.
  fireEvent.change(nameInput, { target: { value: "john smith" } });
  fireEvent.change(emailInput, { target: { value: "john@gmail.com" } });
  fireEvent.change(passInput, { target: { value: "Password1!" } });

  //check input is in the form
  expect(nameInput.value).toBe("john smith");
  expect(emailInput.value).toBe("john@gmail.com");
  expect(passInput.value).toBe("Password1!");
});
