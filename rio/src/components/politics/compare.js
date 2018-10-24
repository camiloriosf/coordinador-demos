import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Politic from "./politic";

const styles = theme => ({
  root: {
    margin: theme.spacing.unit
  },
  gridItem: {}
});

class Compare extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={40} justify="space-evenly">
          <Grid item xs={4} className={classes.gridItem}>
            <Politic title="Bloque A" />
          </Grid>
          <Grid item xs={4} className={classes.gridItem}>
            <Politic title="Bloque B" />
          </Grid>
        </Grid>
      </div>
    );
  }
}

Compare.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Compare);
