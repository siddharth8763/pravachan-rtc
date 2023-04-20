import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./Pages/Home/Home";
import Navigation from "./Components/Shared/Navigation/Navigation";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import Rooms from "./Pages/Rooms/Rooms";
import "./App.css";
import Authenticate from "./Pages/Authenticate/Authenticate";
import Activate from "./Pages/Activate/Activate";
const isAuth = false;
const user = {
  activated: true,
};

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Switch>
        <GuestRoute path="/" exact>
          <Home />
        </GuestRoute>
        <GuestRoute path="/authenticate">
          <Authenticate />
        </GuestRoute>
        <SemiProtectedRoute path="/activate">
          <Activate />
        </SemiProtectedRoute>
        <ProtectedRoute path="/rooms">
          <Rooms />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

const GuestRoute = ({ children, ...rest }) => {
  //const { isAuth } = useSelector((state) => state.auth);
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return isAuth ? (
          <Redirect
            to={{
              pathname: "/rooms",
              state: { from: location },
            }}
          />
        ) : (
          children
        );
      }}
    ></Route>
  );
};

const SemiProtectedRoute = ({ children, ...rest }) => {
  //const { user, isAuth } = useSelector((state) => state.auth);
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return !isAuth ? (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        ) : isAuth && !user.activated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/rooms",
              state: { from: location },
            }}
          />
        );
      }}
    ></Route>
  );
};

const ProtectedRoute = ({ children, ...rest }) => {
  //const { user, isAuth } = useSelector((state) => state.auth);
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return !isAuth ? (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        ) : isAuth && !user.activated ? (
          <Redirect
            to={{
              pathname: "/activate",
              state: { from: location },
            }}
          />
        ) : (
          children
        );
      }}
    ></Route>
  );
};

export default App;
