import React from "react";
import { Route, Switch } from "react-router-dom";
// import Index from "./pages/index";
import OpLog from "./pages/opLog";
import Summary from "./pages/summary";

const App = () => (
  <Switch>
    <Route exact path="/" component={OpLog} />
    <Route exact path="/resumen" component={Summary} />
    {/* <Route exact path="/filter/:options(unavailable)" component={OpLog} /> */}
    {/* <Route component={Index} /> */}
  </Switch>
);

export default App;
