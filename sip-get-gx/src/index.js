import React from "react";
import ReactDOM from "react-dom";
import MomentUtils from "material-ui-pickers/utils/moment-utils";
import MuiPickersUtilsProvider from "material-ui-pickers/utils/MuiPickersUtilsProvider";
import Index from "./pages/index";

ReactDOM.render(
  <MuiPickersUtilsProvider utils={MomentUtils}>
    <Index />
  </MuiPickersUtilsProvider>,
  document.querySelector("#root")
);
