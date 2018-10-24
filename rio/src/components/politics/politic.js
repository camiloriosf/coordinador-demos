import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    height: 600
  },
  item: {
    backgroundColor: "red"
  }
});

class Politic extends React.Component {
  render() {
    const { classes, title } = this.props;

    return (
      <div>
        <Paper className={classes.root} elevation={1}>
          <Typography variant="headline" component="h3">
            {title}
          </Typography>
          <List>
            <ListItem
              button
              classes={{ button: { "&:hover": { backgroundColor: "red" } } }}
            >
              <ListItemText primary="Trash" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Spam" />
            </ListItem>
          </List>
        </Paper>
      </div>
    );
  }
}

Politic.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired
};

export default withStyles(styles)(Politic);
