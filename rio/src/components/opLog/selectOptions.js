import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const styles = theme => ({
  root: {
    margin: theme.spacing.unit
  }
});

class SelectOptions extends React.Component {
  state = {
    open: true,
    value: 2
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  handleChange = (event, value) => {
    this.setState({ value });
  };
  render() {
    const { classes } = this.props;

    return (
      <Dialog
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Selección de Registros
        </DialogTitle>
        <DialogContent>
          <Tabs
            value={this.state.value}
            indicatorColor="primary"
            textColor="primary"
            onChange={this.handleChange}
          >
            <Tab label="Estado Operacional" />
            <Tab label="Consigna" />
            <Tab label="Instrucción Operacional" />
            <Tab label="Condición de Embalse" disabled />
            <Tab label="Estado Operacional Combustible" disabled />
          </Tabs>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={this.handleClose} color="primary" autoFocus>
            Ingresar
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

SelectOptions.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SelectOptions);
