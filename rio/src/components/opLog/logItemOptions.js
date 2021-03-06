import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import ButtonBase from "@material-ui/core/ButtonBase";
import green from "@material-ui/core/colors/green";
import grey from "@material-ui/core/colors/grey";

const styles = theme => ({
  root: {
    margin: theme.spacing.unit,
    display: "flex",
    alignItems: "center"
  },
  button: {
    margin: theme.spacing.unit,
    width: 40,
    height: 40,
    background: green[500],
    color: theme.palette.common.white,
    transition: theme.transitions.create("opacity"),
    "&:hover": {
      opacity: 0.5
    }
  },
  disabled: {
    opacity: 0.3
  },
  lightGreen: {
    background: green[300]
  },
  darkGreen: {
    background: green[700]
  },
  grey: {
    background: grey[500]
  },
  paper: {
    marginLeft: theme.spacing.unit
  },
  shadow: {
    boxShadow: "0px 0px 10px 5px rgba(255, 235, 59, 1)"
  }
});

const optionsEO = [
  "N",
  "DN",
  "DP",
  "FE",
  "DF",
  "DLP",
  "DLF",
  "DRO",
  "LP",
  "LF",
  "P",
  "PO",
  "PDO",
  "RO",
  "MM",
  "PMM",
  "CSE"
];

const optionsCO = [
  "AGC",
  "CB",
  "CI",
  "EP",
  "FS",
  "MT",
  "OI",
  "PC",
  "PMT",
  "PP",
  "PS",
  "CT",
  "SS"
];

const optionsIO = [
  "AGC",
  "CC",
  "CCof",
  "CMM",
  "CPF",
  "CSF",
  "CTx",
  "EP",
  "EXP",
  "OM",
  "OT",
  "RDoh",
  "RE",
  "RP",
  "SDCF",
  "SICF",
  "SIF",
  "TO",
  "US"
];

class LogItemOptions extends React.Component {
  state = {
    show: false,
    anchorEl: null,
    value: 0
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleOptionClick = item => () => {};

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  renderList = () => {
    if (this.props.type === "EO") return optionsEO;
    if (this.props.type === "CO") return optionsCO;
    if (this.props.type === "IO") return optionsIO;
    return [];
  };
  render() {
    const { classes, ins, type, limitation, edit, handleClick } = this.props;
    return (
      <div className={classes.root}>
        <ButtonBase
          onClick={handleClick}
          disabled={!edit}
          classes={{
            root: classnames(
              classes.button,
              type === "EO" && classes.lightGreen,
              type === "IO" && classes.darkGreen,
              limitation && classes.shadow
            )
          }}
        >
          {ins}
        </ButtonBase>
      </div>
    );
  }
}

LogItemOptions.propTypes = {
  classes: PropTypes.object.isRequired,
  ins: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["EO", "CO", "IO"]).isRequired,
  limitation: PropTypes.bool,
  edit: PropTypes.bool,
  handleClick: PropTypes.func
};

LogItemOptions.defaultProps = {
  limitation: false,
  edit: false,
  handleClick: () => {
    return;
  }
};

export default withStyles(styles)(LogItemOptions);
