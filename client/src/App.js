import "./App.css";
import { Route } from "react-router-dom";
import Landing from "./components/Landing/landing.jsx";
import Home from "./components/Home/home.jsx";
import Detail from "./components/Detail/details.jsx";
import Create from "./components/Create/create.jsx";

const App = () => {
  return (
    <div>
      <link
        href="https://fonts.googleapis.com/css?family=Montserrat:400,700"
        rel="stylesheet"
      ></link>
      <Route exact path="/">
        <Landing />
      </Route>

      <Route exact path="/Home">
        <Home />
      </Route>

      <Route exact path="/Home/detail/:id">
        <Detail />
      </Route>

      <Route exact path="/Home/create">
        <Create />
      </Route>
    </div>
  );
};

export default App;
