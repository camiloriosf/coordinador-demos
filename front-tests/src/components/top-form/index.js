import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Sheet from "./sheet";

const styles = theme => ({
  root: { position: "relative", minHeight: 500, margin: 50 },
  sheet: {
    position: "absolute",
    top: -300,
    transform: "rotate(-20deg)",
    transformOrigin: "bottom left"
  }
});

class Index extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.sheet}>
          <Sheet />
        </div>
      </div>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Index);
