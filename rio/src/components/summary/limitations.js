import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  root: {}
});

class Limitations extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div>
        <Typography variant="headline" component="h3">
          Limitaciones
        </Typography>
        <Typography component="p">Limitaciones</Typography>
      </div>
    );
  }
}

Limitations.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Limitations);
