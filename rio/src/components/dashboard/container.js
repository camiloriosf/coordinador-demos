import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    margin: theme.spacing.unit
  })
});

class Container extends React.Component {
  render() {
    const { classes, title, children } = this.props;

    return (
      <div>
        <Paper className={classes.root} elevation={4}>
          <Typography variant="headline" component="h3">
            {title}
          </Typography>
          {children}
        </Paper>
      </div>
    );
  }
}

Container.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired
};

export default withStyles(styles)(Container);
