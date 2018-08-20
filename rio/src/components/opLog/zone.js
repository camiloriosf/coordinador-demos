import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AddIcon from "@material-ui/icons/Add";
import TabUnselected from "@material-ui/icons/TabUnselected";
import grey from "@material-ui/core/colors/grey";

const styles = theme => ({
  root: {
    position: "fixed",
    display: "flex",
    bottom: 0,
    left: 100,
    zIndex: 900,
    margin: theme.spacing.unit * 3,
    alignItems: "center"
  },
  openHeader: {
    left: 280
  },
  paper: {
    margin: theme.spacing.unit
  },
  button: {
    margin: theme.spacing.unit,
    maxHeight: 50
  },
  zoneButton: {
    margin: theme.spacing.unit
  },
  addIcon: {
    marginRight: theme.spacing.unit
  }
});

class Zone extends React.Component {
  state = {
    value: false
  };
  handleChange = (event, value) => {
    this.setState(prev => ({ value: prev.value === value ? false : value }));
  };

  render() {
    const { classes, handleClick, openHeader } = this.props;

    return (
      <div
        className={classNames(classes.root, openHeader && classes.openHeader)}
      >
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={handleClick}
        >
          <AddIcon className={classes.addIcon} />
          Crear Zona
        </Button>
        <Paper elevation={4} className={classes.paper}>
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            fullWidth
            indicatorColor="secondary"
            textColor="secondary"
          >
            <Tab
              icon={<TabUnselected />}
              label="Zona 1"
              style={{
                borderRightStyle: "solid",
                borderRightColor: grey[400],
                borderRightWidth: 2
              }}
            />
            <Tab
              icon={<TabUnselected />}
              label="Zona 2"
              style={{
                borderRightStyle: "solid",
                borderRightColor: grey[400],
                borderRightWidth: 2
              }}
            />
            <Tab icon={<TabUnselected />} label="Zona 3" />
          </Tabs>
        </Paper>
      </div>
    );
  }
}

Zone.propTypes = {
  classes: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
  openHeader: PropTypes.bool.isRequired
};

export default withStyles(styles)(Zone);
