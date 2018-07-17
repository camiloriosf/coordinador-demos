import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import moment from "moment";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { DatePicker } from "material-ui-pickers";
import withRoot from "../withRoot";

const styles = theme => ({
  root: {
    width: "100%",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    width: 400
  },
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: theme.spacing.unit * 5
  },
  fields: {
    margin: theme.spacing.unit
  },
  button: {
    width: "100%",
    margin: theme.spacing.unit,
    marginTop: theme.spacing.unit * 2
  }
});

class Index extends React.Component {
  state = {
    start: moment(),
    end: moment(),
    email: "",
    open: false
  };

  handleDateChange = name => date => {
    this.setState({ [name]: date });
  };
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };
  handleSubmit = async event => {
    event.preventDefault();
    const { start, end, email } = this.state;
    const response = await axios.get(
      "https://3q2uq65i80.execute-api.us-east-1.amazonaws.com/dev/getData",
      {
        params: {
          start: start.format("YYYY-MM-DD"),
          end: end.format("YYYY-MM-DD"),
          email
        }
      }
    );
    // const response = await axios({
    //   method: "get",
    //   url: "https://lmgu1xd3ta.execute-api.us-east-1.amazonaws.com/dev/getData",
    //   data: {
    //     firstName: "Fred",
    //     lastName: "Flintstone"
    //   }
    // });

    if (response) this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  render() {
    const { classes } = this.props;
    const { start, end, email } = this.state;

    return (
      <div className={classes.root}>
        <Paper className={classes.paper} elevation={4}>
          <Typography variant="headline" component="h3">
            Descargar Datos
          </Typography>
          <form
            className={classes.container}
            noValidate
            autoComplete="off"
            onSubmit={this.handleSubmit}
          >
            <DatePicker
              label="Fecha de inicio"
              fullWidth
              className={classes.fields}
              value={start}
              disableFuture
              maxDateMessage="La fecha debe ser menor a la de hoy"
              onChange={this.handleDateChange("start")}
              animateYearScrolling={false}
            />
            <DatePicker
              label="Fecha de termino"
              showTodayButton
              fullWidth
              className={classes.fields}
              value={end}
              disableFuture
              maxDateMessage="La fecha debe ser menor a la de hoy"
              onChange={this.handleDateChange("end")}
              animateYearScrolling={false}
            />
            <TextField
              id="email"
              label="email"
              fullWidth
              className={classes.fields}
              value={email}
              onChange={this.handleChange("email")}
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className={classes.button}
            >
              Descargar Datos
            </Button>
          </form>
        </Paper>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Estamos procesando tu solicitud
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              En breve recibirás un correo con un link de descarga.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Aceptar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRoot(withStyles(styles)(Index));
