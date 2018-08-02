import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    height: 400,
    width: 4000,
    backgroundColor: "red",
    transform: "rotate(-20deg)",
    transformOrigin: "top left",
    left: -2000,
    top: 1350,
    position: "absolute"
  }
});

class Index extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <div />
      </div>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Index);
