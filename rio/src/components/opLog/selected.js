import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import OptionBox from "./sections/optionBox";

const styles = theme => ({
  root: {
    margin: theme.spacing.unit,
    display: "flex",
    flexWrap: "wrap"
  }
});

class Selected extends React.Component {
  render() {
    const { classes, selection, handleClick } = this.props;

    return (
      <div className={classes.root}>
        {selection.map(item => (
          <OptionBox
            key={item.id}
            id={item.id}
            index={item.index}
            title={item.title}
            handleClick={handleClick}
          />
        ))}
      </div>
    );
  }
}

Selected.propTypes = {
  classes: PropTypes.object.isRequired,
  selection: PropTypes.array.isRequired,
  handleClick: PropTypes.func.isRequired
};

export default withStyles(styles)(Selected);
