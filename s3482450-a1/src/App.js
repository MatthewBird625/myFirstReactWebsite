import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBarComponent from "./components/NavBarComponent";
import { Container } from "react-bootstrap";
import LandingPage from "./pages/LandingPage";
import { useState } from "react";

import LoginForm from "./components/LoginForm";
import Login from "./components/Login";

function App() {
  const [login, setLogin] = useState(false);

  return (
    <BrowserRouter>
      <div className="App">
        <header>
          <NavBarComponent loggedIn={login}></NavBarComponent>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<LandingPage />}>
            <Route path="/" element={<Login />} />
              <Route path="/login" element={<LoginForm />} />
            
            </Route>
            <Route path="/register" element={<LoginForm />} />
          </Routes>
        </main>

        <footer className="py-5 my5 bg-dark">
          <Container className="px-4">
            <p className="text-white text-center">
              Copyright &copy; Matthew Bird/RMIT 2022
            </p>
          </Container>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
