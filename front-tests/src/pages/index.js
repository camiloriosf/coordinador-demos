import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TopFrom from "../components/top-form";
import Section0 from "../components/section-0";
import Section1 from "../components/section-1";

const styles = theme => ({
  root: {
    display: "flex",
    minHeight: "100vh",
    overflowY: "visible"
  },
  side: {
    flex: 1
  },
  center: {
    width: 900,
    minWidth: 900,
    maxWidth: 900,
    flex: 1,
    position: "relative"
  }
});

class Index extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.side} />
        <div className={classes.center}>
          <TopFrom />
          <Section0 />
          <Section1 />
        </div>
        <div className={classes.side} />
      </div>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Index);
