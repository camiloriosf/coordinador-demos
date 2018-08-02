import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import logo from "../../static/logoCoordinador.svg";
import LogSubHeader from "./logSubHeader";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1
  },
  log: {
    marginLeft: theme.spacing.unit * 2
  },
  name: {
    marginRight: theme.spacing.unit * 4
  }
});

class Header extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="fixed" color="default">
          <Toolbar>
            <img src={logo} alt="Coordinador Electrico Nacional" />
            <div className={classes.flex} />
            <Typography variant="body2" className={classes.name}>
              Ricardo Lake{" "}
            </Typography>
            <Typography variant="body2" className={classes.name}>
              {" "}
              11:13 10-07-2018
            </Typography>
            <Button color="secondary">Cerrar Sesión</Button>
          </Toolbar>
          <div className={classes.log}>
            <LogSubHeader />
          </div>
        </AppBar>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);
