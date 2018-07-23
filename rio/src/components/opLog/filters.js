import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";

const styles = theme => ({
  root: {
    position: "fixed",
    bottom: 0,
    left: 0,
    zIndex: 9999,
    margin: theme.spacing.unit * 3
  },
  paper: {
    padding: theme.spacing.unit * 2,
    width: "100%",
    display: "flex",
    alignItems: "baseline"
  },
  textField: {
    minWidth: 300
  }
});

class Filters extends React.Component {
  handleChange = name => event => {
    switch (name) {
      case "onService":
        if (!event.target.checked && !this.props.outOfService)
          this.props.handleFilterUpdate({
            onService: false,
            outOfService: true
          });
        else
          this.props.handleFilterUpdate({
            onService: event.target.checked,
            outOfService: this.props.outOfService
          });
        break;
      case "outOfService":
        if (!event.target.checked && !this.props.onService)
          this.props.handleFilterUpdate({
            onService: true,
            outOfService: false
          });
        else
          this.props.handleFilterUpdate({
            onService: this.props.onService,
            outOfService: event.target.checked
          });
        break;
      default:
        break;
    }
  };
  render() {
    const { classes, onService, outOfService, unavailable } = this.props;

    return (
      <div className={classes.root}>
        <Paper elevation={24} className={classes.paper}>
          <FormGroup row>
            <FormControlLabel
              control={
                <Switch
                  checked={onService}
                  onChange={this.handleChange("onService")}
                  value="onService"
                  color="primary"
                />
              }
              label="E/S"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={outOfService}
                  onChange={this.handleChange("outOfService")}
                  value="outOfService"
                  color="secondary"
                />
              }
              label="F/S"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={unavailable}
                  onChange={this.handleChange("unavailable")}
                  value="unavailable"
                  color="default"
                />
              }
              label="Indisponible"
            />
          </FormGroup>
          <TextField
            id="filter"
            label="Filtrar"
            className={classes.textField}
            margin="normal"
          />
        </Paper>
      </div>
    );
  }
}

Filters.propTypes = {
  classes: PropTypes.object.isRequired,
  handleFilterUpdate: PropTypes.func.isRequired,
  onService: PropTypes.bool.isRequired,
  outOfService: PropTypes.bool.isRequired,
  unavailable: PropTypes.bool.isRequired
};

export default withStyles(styles)(Filters);
