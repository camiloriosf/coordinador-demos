import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import withRoot from "../HoC/withRoot";
import withHeader from "../HoC/withHeader";

const styles = theme => ({
  root: {
    margin: theme.spacing.unit,
    width: "100%"
  }
});

class Analysis extends React.Component {
  render() {
    const { classes } = this.props;

    return <div className={classes.root}>Análisis</div>;
  }
}

Analysis.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRoot(withStyles(styles)(withHeader(Analysis)));
