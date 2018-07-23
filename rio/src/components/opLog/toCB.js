import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";

const styles = theme => ({
  root: {
    position: "fixed",
    bottom: 0,
    right: 0,
    margin: theme.spacing.unit * 3
  },
  textField: {
    marginRight: theme.spacing.unit * 3
  }
});

class ToCB extends React.Component {
  render() {
    const { classes, handleToCBClick } = this.props;

    return (
      <div className={classes.root}>
        <Button
          variant="fab"
          color="primary"
          aria-label="add"
          onClick={handleToCBClick}
          className={classes.button}
        >
          <AttachMoneyIcon />
        </Button>
      </div>
    );
  }
}

ToCB.propTypes = {
  classes: PropTypes.object.isRequired,
  handleToCBClick: PropTypes.func.isRequired
};

export default withStyles(styles)(ToCB);
