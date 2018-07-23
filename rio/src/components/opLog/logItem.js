import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import green from "@material-ui/core/colors/green";
import orange from "@material-ui/core/colors/orange";
import grey from "@material-ui/core/colors/grey";
import red from "@material-ui/core/colors/red";
import blue from "@material-ui/core/colors/blue";
// import WarningIcon from "@material-ui/icons/Warning";
import LogItemOptions from "./logItemOptions";
import EditIcon from "@material-ui/icons/Edit";
import ClearIcon from "@material-ui/icons/Clear";
import SaveIcon from "@material-ui/icons/Save";
// import NumPad from "react-numpad-material";
import NumPad from "./numPad";

const styles = theme => ({
  root: {
    margin: theme.spacing.unit,
    display: "flex",
    alignItems: "center"
  },
  edit: {
    width: 80
  },
  status: {
    width: 100,
    marginLeft: theme.spacing.unit
  },
  avatar: {
    color: "#fff",
    backgroundColor: green[500]
  },
  grey: {
    backgroundColor: grey[200]
  },
  orange: {
    backgroundColor: orange[500]
  },
  red: {
    backgroundColor: red[500]
  },
  config: {
    marginLeft: theme.spacing.unit,
    width: 400
  },
  limitation: {
    width: 100,
    display: "flex",
    justifyContent: "center"
  },
  icon: {
    color: orange[500]
  },
  number: {
    width: 100,
    display: "flex",
    justifyContent: "center"
  },
  options: {
    width: 150,
    display: "flex",
    justifyContent: "center"
  },
  editBox: {
    backgroundColor: blue[50]
  },
  textField: {
    width: 100
  },
  glow: {
    backgroundColor: grey[200],
    boxShadow:
      "0px 1px 3px rgba(0, 0, 0, 0.05) inset, 0px 0px 20px rgba(82, 168, 236, 0.6)",
    transition: "box-shadow 1s ease-in-out"
  },
  noGlow: {
    boxShadow: "none"
  }
});

class LogItem extends React.Component {
  state = {
    requiredGx: this.props.instructedGx,
    glow: true
  };
  componentDidMount = () => {
    const { co } = this.props;
    if (co === "CB") {
      this.setTimer();
    }
  };
  componentWillUnmount = () => {
    this.clearTimer();
  };
  setTimer = () => {
    if (this.timerHandle) {
      return;
    }
    this.timerHandle = setInterval(() => {
      this.setState(prevState => ({ glow: !prevState.glow }));
      // this.timerHandle = 0;
    }, 1000);
  };

  clearTimer = () => {
    // Is our timer running?
    if (this.timerHandle) {
      // Yes, clear it
      clearInterval(this.timerHandle);
      this.timerHandle = 0;
    }
  };

  handleChange = value => {
    this.setState({ requiredGx: value });
  };
  renderState = () => {
    const { outOfService, unavailable } = this.props;
    if (outOfService || unavailable) {
      return <Typography variant="body2">F/S</Typography>;
    }
    return <Typography variant="body2">E/S</Typography>;
  };
  render() {
    const {
      classes,
      title,
      eo,
      co,
      io,
      cv,
      instructedGx,
      realGx,
      outOfService,
      unavailable,
      limitation,
      header,
      edit
    } = this.props;

    const { requiredGx, glow } = this.state;

    return (
      <div
        className={classnames(
          classes.root,
          co === "CB" && classes.glow,
          co === "CB" && !glow && classes.noGlow,
          edit && !header && classes.editBox
        )}
      >
        <div className={classes.edit}>
          {!header ? (
            !edit ? (
              <IconButton className={classes.button} aria-label="Edit">
                <EditIcon />
              </IconButton>
            ) : (
              <IconButton className={classes.button} aria-label="Edit">
                <ClearIcon />
              </IconButton>
            )
          ) : (
            <Typography variant="body2" noWrap>
              Editar
            </Typography>
          )}
        </div>
        <div className={classes.status}>
          {!header ? (
            <Avatar
              className={classnames(
                classes.avatar,
                outOfService && classes.orange,
                unavailable && classes.red
              )}
            >
              {this.renderState()}
            </Avatar>
          ) : (
            <Typography variant="body2" noWrap>
              Estado
            </Typography>
          )}
        </div>
        <Typography variant="body2" noWrap className={classes.config}>
          {!header ? title : "Configuración"}
        </Typography>
        {/* <div className={classes.limitation}>
          {!header && limitation && <WarningIcon className={classes.icon} />}
          {header && (
            <Typography variant="body2" noWrap>
              {"Limitación"}
            </Typography>
          )}
        </div> */}
        <div className={classes.number}>
          <Typography variant="body2" noWrap>
            {!header ? cv : "CV"}
          </Typography>
        </div>
        <div className={classes.number}>
          {edit ? (
            // <NumPad.Popover
            //   onChange={this.handleChange}
            //   position="centerRight"
            //   arrow="left"
            //   qtyIncrement={0.1}
            //   isDecimal
            //   decimalSeparator="."
            //   value={requiredGx}
            // >
            //   <TextField
            //     id="instructedGx"
            //     label="instructedGx"
            //     className={classes.textField}
            //     value={requiredGx}
            //     inputProps={{ step: 0.1 }}
            //     margin="normal"
            //   />
            // </NumPad.Popover>
            <div />
          ) : (
            <Typography variant="body2" noWrap>
              {!header ? instructedGx : "Gx Instruida"}
            </Typography>
          )}
        </div>
        <div className={classes.number}>
          <Typography variant="body2" noWrap>
            {!header ? realGx : "Gx Real"}
          </Typography>
        </div>
        <div className={classes.options}>
          {!header ? (
            <LogItemOptions
              ins={eo}
              type="EO"
              limitation={limitation}
              edit={edit}
            />
          ) : (
            <Typography variant="body2" noWrap>
              {"Estado Operacional"}
            </Typography>
          )}
        </div>
        <div className={classes.options}>
          {!header ? (
            <LogItemOptions ins={co} type="CO" edit={edit} />
          ) : (
            <Typography variant="body2" noWrap>
              {"Consigna"}
            </Typography>
          )}
        </div>
        <div className={classes.options}>
          {!header ? (
            <LogItemOptions ins={io} type="IO" edit={edit} />
          ) : (
            <Typography variant="body2" noWrap>
              {"Instrucción Operacional"}
            </Typography>
          )}
        </div>
        <div className={classes.options}>
          {edit &&
            !header && (
              <Button variant="fab" color="primary" aria-label="save">
                <SaveIcon />
              </Button>
            )}
        </div>
      </div>
    );
  }
}

LogItem.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string,
  eo: PropTypes.string,
  co: PropTypes.string,
  io: PropTypes.string,
  cv: PropTypes.number,
  instructedGx: PropTypes.number,
  realGx: PropTypes.number,
  outOfService: PropTypes.bool,
  unavailable: PropTypes.bool,
  limitation: PropTypes.bool,
  lim: PropTypes.string,
  header: PropTypes.bool,
  edit: PropTypes.bool
};

LogItem.defaultProps = {
  title: "",
  cv: 0,
  instructedGx: 0,
  realGx: 0,
  outOfService: false,
  unavailable: false,
  limitation: false,
  lim: "",
  header: false,
  edit: false
};

export default withStyles(styles)(LogItem);
