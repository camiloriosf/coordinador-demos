import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    height: 800,
    width: 600,
    backgroundColor: "#ffffff",
    boxShadow: "0 1px 3px 0 rgba(0,0,0,0.5)",
    borderRadius: 8
  }
});

class Sheet extends React.Component {
  render() {
    const { classes } = this.props;

    return <div className={classes.root} />;
  }
}

Sheet.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Sheet);
