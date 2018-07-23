import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  root: {
    margin: theme.spacing.unit
  },
  box: {
    minHeight: 50,
    minWidth: 100,
    borderRadius: 5,
    padding: theme.spacing.unit,
    backgroundColor: theme.palette.primary.main,
    "&:hover, &$focusVisible": {
      opacity: 0.5
    }
  },
  disabled: {
    opacity: 0.2
  },
  focusVisible: {}
});

class OptionBox extends React.Component {
  render() {
    const { classes, title, id, index, disabled, handleClick } = this.props;

    return (
      <div className={classes.root}>
        <ButtonBase
          focusRipple
          disabled={disabled}
          className={classes.box}
          classes={{ disabled: classes.disabled }}
          focusVisibleClassName={classes.focusVisible}
          onClick={handleClick({ id, index, title })}
        >
          <Typography variant="body2" style={{ color: "white" }}>
            {title}
          </Typography>
        </ButtonBase>
      </div>
    );
  }
}

OptionBox.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  id: PropTypes.any.isRequired,
  index: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired
};

OptionBox.defaultProps = {
  disabled: false
};

export default withStyles(styles)(OptionBox);
