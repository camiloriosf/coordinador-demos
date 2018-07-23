import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import green from "@material-ui/core/colors/green";
import orange from "@material-ui/core/colors/orange";
import grey from "@material-ui/core/colors/grey";
import red from "@material-ui/core/colors/red";
import blue from "@material-ui/core/colors/blue";
import yellow from "@material-ui/core/colors/yellow";
import LogItemOptions from "./logItemOptions";
import EditIcon from "@material-ui/icons/Edit";
import ClearIcon from "@material-ui/icons/Clear";
import SaveIcon from "@material-ui/icons/Save";
import DescriptionIcon from "@material-ui/icons/Comment";
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
  },
  yellowIcon: {
    color: yellow[700]
  }
});

class LogItem extends React.Component {
  state = {
    requiredGx: this.props.instructedGx,
    glow: true,
    numPad: false,
    comments: false
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
  handleCloseNumPad = () => {
    this.setState({ numPad: false });
  };
  handleOpenNumPad = () => {
    this.setState({ numPad: true });
  };
  handleNumPadSubmit = ({ value }) => () => {
    this.setState({ numPad: false, requiredGx: value });
  };
  handleOpenComments = () => {
    this.setState({ comments: true });
  };
  handleCloseComments = () => {
    this.setState({ comments: false });
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

    const { requiredGx, glow, numPad, comments } = this.state;

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
            {!header ? (
              <IconButton
                className={classes.button}
                aria-label="Notes"
                onClick={this.handleOpenComments}
              >
                <DescriptionIcon className={classes.yellowIcon} />
              </IconButton>
            ) : (
              "Comentarios"
            )}
          </Typography>
        </div>
        <div className={classes.number}>
          <Typography variant="body2" noWrap>
            {!header ? cv : "CV"}
          </Typography>
        </div>
        <div className={classes.number}>
          {edit ? (
            <div>
              <TextField
                id="instructedGx"
                label="instructedGx"
                className={classes.textField}
                value={requiredGx}
                inputProps={{ step: 0.1 }}
                onClick={this.handleOpenNumPad}
                margin="normal"
              />
              <NumPad
                open={numPad}
                value={requiredGx}
                handleClose={this.handleCloseNumPad}
                handleSubmit={this.handleNumPadSubmit}
              />
            </div>
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
          {!edit &&
            !header && (
              <Typography variant="body2" noWrap>
                12:00:00
              </Typography>
            )}
          {!edit &&
            header && (
              <Typography variant="body2" noWrap>
                {"Última instrucción"}
              </Typography>
            )}
        </div>
        <div>
          <Dialog open={comments} onClose={this.handleCloseComments}>
            <DialogTitle>{"Comentarios"}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Curabitur scelerisque nisi a elementum vulputate. Ut tincidunt
                molestie urna, vel accumsan nisl accumsan vitae. Fusce fermentum
                felis metus, in molestie leo tristique nec. Morbi euismod sapien
                sem, et commodo ante pellentesque vitae. Nunc vestibulum ligula
                in feugiat varius. Donec imperdiet dolor ac nibh vestibulum
                feugiat sit amet sit amet ante. Pellentesque quis vulputate
                lorem, a facilisis urna. Nullam elementum mattis erat, ac
                pretium diam vulputate eu. Integer vitae lobortis ligula, non
                commodo odio. Nulla finibus ipsum a nisl vestibulum vulputate.
                Donec quis ultrices ex.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={this.handleCloseComments}
                color="primary"
                autoFocus
              >
                Aceptar
              </Button>
            </DialogActions>
          </Dialog>
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
