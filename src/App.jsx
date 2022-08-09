import React from "react";
import Navbar from "./components/Navbar";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Singup from "./components/Signup";
import Notfound from "./components/Notfound";

const App = () => {
  return (
    <>
      <Navbar />

      <Switch>
        <Route exact path="/" component={Home} />

        <Route exact path="/about" component={About} />

        <Route exact path="/contact" component={Contact} />

        <Route exact path="/signin" component={Login} />

        <Route exact path="/signup" component={Singup} />

        <Route component={Notfound}/>
      </Switch>
    </>
  )
}

export default App