import "./client";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Login, Chat } from "./pages";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/chat" component={Chat} />
      </Switch>
    </Router>
  );
}

export default App;
