import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBarComponent from "./components/NavBarComponent";
import { Container } from "react-bootstrap";
import LandingPage from "./pages/LandingPage";
import { useState } from "react";
import React from "react";

import LoginForm from "./components/LoginForm";
import LoginMenu from "./components/LoginMenu";
import RegisterForm from "./components/RegisterForm";
import ProfilePage from "./pages/ProfilePage";
import Profile from "./components/Profile";
import ProfileEdit from "./components/ProfileEdit";
import PasswordEdit from "./components/PasswordEdit";
import DeleteUser from "./components/DeleteUser";
import PostPage from "./pages/PostPage";
import Feed from "./pages/Feed";

function App() {
  const [login, setLogin] = useState(false);
  const [currentUser, setCurrentUser] = useState("");

  const logInUser = (user) => {
    setCurrentUser(user);
    console.log("setCurrentUser" + user);
  };

  console.log("APPUSER: " + currentUser);

  return (
    <React.StrictMode>
      <BrowserRouter>
        <div className="App">
          <header>
            <NavBarComponent loggedIn={login}></NavBarComponent>
          </header>

          <main>
            <Routes>

            {/* Landing page Route and nested Routes: handles unregistered user landing and has nested components for login and registering */}
              <Route path="/" element={<LandingPage />}>
                <Route path="/" element={<LoginMenu loginStatus={login} />} />
                <Route
                  path="/loginForm"
                  element={
                    <LoginForm logInUser={logInUser} setLogin={setLogin} />
                  }
                />
                <Route path="/register" element={<RegisterForm />} />
              </Route>

              {/* Profile Route, Default landing route after login. Has Routes for Viewing Profile, editing profile and changing password */}
              <Route
                path="/profile"
                element={
                  <ProfilePage loginStatus={login} currentUser={currentUser} />
                }
              >
                <Route
                  path="/profile"
                  element={
                    <Profile loginStatus={login} currentUser={currentUser} />
                  }
                />
                 <Route
                  path="/profile/edit"
                  element={
                    <ProfileEdit loginStatus={login} logInUser={logInUser} currentUser={currentUser} />
                  }
                />
                 <Route
                  path="/profile/changePassword"
                  element={
                    <PasswordEdit loginStatus={login} logInUser={logInUser} currentUser={currentUser} />
                  }
                />
                  <Route
                  path="/profile/delete"
                  element={
                    <DeleteUser loginStatus={login} logInUser={logInUser} currentUser={currentUser}  setLogin= {setLogin} setCurrentUser= {currentUser}/>
                  }
                />
              </Route>
                 <Route path="/post" element={<PostPage login={login} currentUser={currentUser}/>}></Route>
                 <Route path="/feed" element={<Feed login={login} currentUser={currentUser}/>}></Route>
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
    </React.StrictMode>
  );
}

export default App;
