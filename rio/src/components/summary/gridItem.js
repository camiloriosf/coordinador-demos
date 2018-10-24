import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
  root: {
    width: "100%",
    margin: theme.spacing.unit
  },
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    height: "100%"
  }
});

class GridItem extends React.Component {
  render() {
    const { classes, children } = this.props;

    return (
      <div className={classes.root}>
        <Paper className={classes.paper} elevation={1}>
          {children}
        </Paper>
      </div>
    );
  }
}

GridItem.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.any.isRequired
};

export default withStyles(styles)(GridItem);
