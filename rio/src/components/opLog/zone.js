import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AddIcon from "@material-ui/icons/Add";
import PhoneIcon from "@material-ui/icons/Phone";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import grey from "@material-ui/core/colors/grey";

const styles = theme => ({
  root: {
    position: "fixed",
    display: "flex",
    bottom: 0,
    left: 0,
    zIndex: 900,
    margin: theme.spacing.unit * 3,
    alignItems: "center"
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
    const { classes, handleClick } = this.props;

    return (
      <div className={classes.root}>
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
              icon={<PersonPinIcon />}
              label="Zona 1"
              style={{
                borderRightStyle: "solid",
                borderRightColor: grey[400],
                borderRightWidth: 2
              }}
            />
            <Tab
              icon={<PersonPinIcon />}
              label="Zona 2"
              style={{
                borderRightStyle: "solid",
                borderRightColor: grey[400],
                borderRightWidth: 2
              }}
            />
            <Tab icon={<PersonPinIcon />} label="Zona 3" />
          </Tabs>
        </Paper>
      </div>
    );
  }
}

Zone.propTypes = {
  classes: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired
};

export default withStyles(styles)(Zone);
