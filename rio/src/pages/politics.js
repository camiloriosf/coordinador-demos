import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import withRoot from "../HoC/withRoot";
import withHeader from "../HoC/withHeader";
import Compare from "../components/politics/compare";

const styles = theme => ({
  root: {
    margin: theme.spacing.unit,
    width: "100%"
  }
});

class Politics extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Compare />
      </div>
    );
  }
}

Politics.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRoot(withStyles(styles)(withHeader(Politics)));
