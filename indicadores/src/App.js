import React from "react";
import { Route, Switch } from "react-router-dom";
import Index from "./pages/index";

const App = () => (
  <Switch>
    <Route exact path="/" component={Index} />
  </Switch>
);

export default App;
