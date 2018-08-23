import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import MenuIcon from "@material-ui/icons/Menu";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ListIcon from "@material-ui/icons/List";
import AssignmentIcon from "@material-ui/icons/Assignment";
import TimelineIcon from "@material-ui/icons/Timeline";
import logo from "../../static/logoCoordinador.svg";

const MyLink = props => <Link to={props.to} {...props} />;

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: "100%",
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex"
  },
  flex: {
    flex: 1
  },
  log: {
    marginLeft: theme.spacing.unit * 4
  },
  name: {
    marginLeft: theme.spacing.unit * 4
  },
  button: {
    margin: theme.spacing.unit
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 9
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowY: "auto",
    maxHeight: "100vh"
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  hide: {
    display: "none"
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  selected: {
    backgroundColor: theme.palette.primary.main
  },
  selectedIcon: {
    color: theme.palette.primary.contrastText
  },
  selectedText: {
    color: theme.palette.primary.contrastText
  }
});

class Header extends React.Component {
  static getDerivedStateFromProps = (nextProps, nextState) => {
    const { children = {} } = nextProps;
    const { props = {} } = children;
    const { match = {} } = props;
    const { path = "" } = match;
    return { path };
  };
  state = {
    path: ""
  };
  render() {
    const { classes, open, handleDrawerOpen, handleDrawerClose } = this.props;
    const { path } = this.state;
    return (
      <div className={classes.root}>
        <AppBar
          color="default"
          className={classNames(classes.appBar, open && classes.appBarShift)}
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
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
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(
              classes.drawerPaper,
              !open && classes.drawerPaperClose
            )
          }}
          open={open}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <div>
            <ListItem
              button
              component={MyLink}
              to="/resumen"
              className={classNames(path === "/resumen" && classes.selected)}
            >
              <ListItemIcon>
                <DashboardIcon
                  className={classNames(
                    path === "/resumen" && classes.selectedIcon
                  )}
                />
              </ListItemIcon>
              <ListItemText
                primary="Resúmen"
                primaryTypographyProps={{ color: "inherit" }}
                className={classNames(
                  path === "/resumen" && classes.selectedText
                )}
              />
            </ListItem>
            <ListItem
              button
              component={MyLink}
              to="/"
              className={classNames(path === "/" && classes.selected)}
            >
              <ListItemIcon>
                <ListIcon
                  className={classNames(path === "/" && classes.selectedIcon)}
                />
              </ListItemIcon>
              <ListItemText
                primary="Registro"
                className={classNames(path === "/" && classes.selectedText)}
              />
            </ListItem>
            <ListItem
              button
              component={MyLink}
              to="/politica"
              className={classNames(path === "/politica" && classes.selected)}
            >
              <ListItemIcon>
                <AssignmentIcon
                  className={classNames(
                    path === "/politica" && classes.selectedIcon
                  )}
                />
              </ListItemIcon>
              <ListItemText
                primary="Política"
                className={classNames(
                  path === "/politica" && classes.selectedText
                )}
              />
            </ListItem>
            <ListItem
              button
              component={MyLink}
              to="/analisis"
              className={classNames(path === "/analisis" && classes.selected)}
            >
              <ListItemIcon>
                <TimelineIcon
                  className={classNames(
                    path === "/analisis" && classes.selectedIcon
                  )}
                />
              </ListItemIcon>
              <ListItemText
                primary="Análisis"
                className={classNames(
                  path === "/analisis" && classes.selectedText
                )}
              />
            </ListItem>
          </div>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.drawerHeader} />
          {this.props.children}
        </main>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);
