import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./Pages/Home/Home";
import Navigation from "./Components/Shared/Navigation/Navigation";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import "./App.css";
import Authenticate from "./Pages/Authenticate/Authenticate";
import React from "react";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route
          path="/authenticate"
          element={
            <GuestRoute>
              <Authenticate />
            </GuestRoute>
          }
        />
        {/* <Route path="/activate" element={<SemiProtectedRoute><Activate/></SemiProtectedRoute>}/> */}
        {/* <Route path="/rooms" element={<GuestRoute><Rooms /></GuestRoute>} /> */}
      </Routes>
    </BrowserRouter>
  );
}

const GuestRoute = ({ path, ...rest }) => {
  const navigate = useNavigate();
  //const { isAuth } = useSelector((state) => state.auth);
  const isAuth = true;
  if (isAuth) {
    navigate("/rooms", { replace: true });
    return null;
  }

  return <Route path={path} {...rest} />;
};

const SemiProtectedRoute = ({ children, ...rest }) => {
  const { user, isAuth } = useSelector((state) => state.auth);
  return (
    <Route {...rest}>
      {() => {
        if (!isAuth) {
          return (
            <Navigate
              to={{
                pathname: "/",
                state: { from: rest.location },
              }}
            />
          );
        } else if (isAuth && !user.activated) {
          return children;
        } else {
          return (
            <Navigate
              to={{
                pathname: "/rooms",
                state: { from: rest.location },
              }}
            />
          );
        }
      }}
    </Route>
  );
};

const ProtectedRoute = ({ children, ...rest }) => {
  const { user, isAuth } = useSelector((state) => state.auth);
  return (
    <Route {...rest}>
      {() => {
        if (!isAuth) {
          return (
            <Navigate
              to={{
                pathname: "/",
                state: { from: rest.location },
              }}
            />
          );
        } else if (isAuth && !user.activated) {
          return (
            <Navigate
              to={{
                pathname: "/activate",
                state: { from: rest.location },
              }}
            />
          );
        } else {
          return children;
        }
      }}
    </Route>
  );
};

export default App;
