import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";

const styles = theme => ({
  root: {
    position: "fixed",
    display: "flex",
    bottom: 0,
    left: 0,
    zIndex: 900,
    margin: theme.spacing.unit * 3
  },
  paper: {
    margin: theme.spacing.unit,
    padding: theme.spacing.unit
  },
  button: {
    margin: theme.spacing.unit
  },
  addIcon: {
    marginRight: theme.spacing.unit
  }
});

class Zone extends React.Component {
  render() {
    const { classes, handleClick } = this.props;

    return (
      <div className={classes.root}>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={handleClick}
        >
          <AddIcon className={classes.addIcon} />
          Crear Zona
        </Button>
        <Paper elevation={4} className={classes.paper}>
          asdasd
        </Paper>
      </div>
    );
  }
}

Zone.propTypes = {
  classes: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired
};

export default withStyles(styles)(Zone);
