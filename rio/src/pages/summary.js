import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import withRoot from "../HoC/withRoot";
import withHeader from "../HoC/withHeader";
import SubSystems from "../components/summary/subsystems";
import Politics from "../components/summary/politics";
import Limitations from "../components/summary/limitations";
import Instructions from "../components/summary/instructions";
import GridItem from "../components/summary/gridItem";

const styles = theme => ({
  root: {
    margin: theme.spacing.unit,
    width: "100%"
  },
  item: {
    display: "flex"
  }
});

class Summary extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container justify="space-between">
          <Grid item xs={6} className={classes.item}>
            <GridItem>
              <SubSystems />
            </GridItem>
          </Grid>
          <Grid item xs={6} container>
            <Grid item xs={12} className={classes.item}>
              <GridItem>
                <Instructions />
              </GridItem>
            </Grid>
            <Grid item xs={12} className={classes.item}>
              <GridItem>
                <Limitations />
              </GridItem>
            </Grid>
          </Grid>
          <Grid item xs={12} className={classes.item}>
            <GridItem>
              <Politics />
            </GridItem>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Summary.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRoot(withStyles(styles)(withHeader(Summary)));
