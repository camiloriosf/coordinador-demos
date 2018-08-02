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
import Paper from "@material-ui/core/Paper";
import Collapse from "@material-ui/core/Collapse";
import green from "@material-ui/core/colors/green";
import grey from "@material-ui/core/colors/grey";
import red from "@material-ui/core/colors/red";
import blue from "@material-ui/core/colors/blue";
import yellow from "@material-ui/core/colors/yellow";
import LogItemOptions from "./logItemOptions";
import EditIcon from "@material-ui/icons/Edit";
import ClearIcon from "@material-ui/icons/Clear";
import SaveIcon from "@material-ui/icons/Save";
import DescriptionIcon from "@material-ui/icons/Comment";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
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
  red: {
    backgroundColor: red[500]
  },
  config: {
    marginLeft: theme.spacing.unit,
    width: 400,
    display: "flex",
    cursor: "pointer"
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
  },
  expandMoreIcon: {
    transition: "all 100ms ease-in-out"
  },
  expandLessIcon: {
    transform: "rotate(180deg)"
  },
  configDetails: {
    margin: theme.spacing.unit,
    padding: theme.spacing.unit,
    display: "flex",
    flexWrap: "wrap"
  },
  configDetail: {
    margin: theme.spacing.unit,
    padding: theme.spacing.unit,
    minWidth: 150,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  configTitle: {
    textAlign: "center"
  },
  configSubTitle: {
    textAlign: "center",
    marginTop: theme.spacing.unit
  }
});

class LogItem extends React.Component {
  state = {
    requiredGx: this.props.instructedGx,
    glow: true,
    numPad: false,
    comments: false,
    expandConfig: false
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
    }, 1000);
  };

  clearTimer = () => {
    if (this.timerHandle) {
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

  handleExpandConfig = () => {
    this.setState(prev => ({ expandConfig: !prev.expandConfig }));
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
      edit
    } = this.props;

    const { requiredGx, glow, numPad, comments, expandConfig } = this.state;

    return (
      <div>
        <div
          className={classnames(
            classes.root,
            co === "CB" && classes.glow,
            co === "CB" && !glow && classes.noGlow,
            edit && classes.editBox
          )}
        >
          <div className={classes.edit}>
            {!edit ? (
              <IconButton className={classes.button} aria-label="Edit">
                <EditIcon />
              </IconButton>
            ) : (
              <IconButton className={classes.button} aria-label="Edit">
                <ClearIcon />
              </IconButton>
            )}
          </div>
          <div className={classes.status}>
            <Avatar
              className={classnames(
                classes.avatar,
                outOfService && classes.grey,
                unavailable && classes.red
              )}
            >
              {this.renderState()}
            </Avatar>
          </div>
          <div className={classes.config}>
            <Button
              color="default"
              className={classes.button}
              onClick={this.handleExpandConfig}
            >
              <ExpandMoreIcon
                className={classnames(
                  classes.expandMoreIcon,
                  expandConfig && classes.expandLessIcon
                )}
              />
              {title}
            </Button>
            {/* {expandConfig ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          <Typography variant="body2" noWrap>
            {title}
          </Typography> */}
          </div>
          <div className={classes.number}>
            <Typography variant="body2" noWrap>
              <IconButton
                className={classes.button}
                aria-label="Notes"
                onClick={this.handleOpenComments}
              >
                <DescriptionIcon className={classes.yellowIcon} />
              </IconButton>
            </Typography>
          </div>
          <div className={classes.number}>
            <Typography variant="body2" noWrap>
              {cv}
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
                {instructedGx}
              </Typography>
            )}
          </div>
          <div className={classes.number}>
            <Typography variant="body2" noWrap>
              {realGx}
            </Typography>
          </div>
          <div className={classes.options}>
            <LogItemOptions
              ins={eo}
              type="EO"
              limitation={limitation}
              edit={edit}
            />
          </div>
          <div className={classes.options}>
            <LogItemOptions ins={co} type="CO" edit={edit} />
          </div>
          <div className={classes.options}>
            <LogItemOptions ins={io} type="IO" edit={edit} />
          </div>
          <div className={classes.options}>
            {edit ? (
              <Button variant="fab" color="primary" aria-label="save">
                <SaveIcon />
              </Button>
            ) : (
              <Typography variant="body2" noWrap>
                12:00:00
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
                  molestie urna, vel accumsan nisl accumsan vitae. Fusce
                  fermentum felis metus, in molestie leo tristique nec. Morbi
                  euismod sapien sem, et commodo ante pellentesque vitae. Nunc
                  vestibulum ligula in feugiat varius. Donec imperdiet dolor ac
                  nibh vestibulum feugiat sit amet sit amet ante. Pellentesque
                  quis vulputate lorem, a facilisis urna. Nullam elementum
                  mattis erat, ac pretium diam vulputate eu. Integer vitae
                  lobortis ligula, non commodo odio. Nulla finibus ipsum a nisl
                  vestibulum vulputate. Donec quis ultrices ex.
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
        <div>
          <Collapse in={expandConfig}>
            <div className={classes.configDetails}>
              <Paper elevation={4} className={classes.configDetail}>
                <Typography
                  variant="display2"
                  noWrap
                  className={classes.configTitle}
                >
                  1
                </Typography>
                <Typography
                  variant="body2"
                  noWrap
                  className={classes.configSubTitle}
                >
                  Pmin
                </Typography>
              </Paper>
              <Paper elevation={4} className={classes.configDetail}>
                <Typography
                  variant="display2"
                  noWrap
                  className={classes.configTitle}
                >
                  10
                </Typography>
                <Typography
                  variant="body2"
                  noWrap
                  className={classes.configSubTitle}
                >
                  Pmax
                </Typography>
              </Paper>
              <Paper elevation={4} className={classes.configDetail}>
                <Typography
                  variant="display2"
                  noWrap
                  className={classes.configTitle}
                >
                  2
                </Typography>
                <Typography
                  variant="body2"
                  noWrap
                  className={classes.configSubTitle}
                >
                  Costo Partida
                </Typography>
              </Paper>
            </div>
          </Collapse>
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
  edit: false
};

export default withStyles(styles)(LogItem);
