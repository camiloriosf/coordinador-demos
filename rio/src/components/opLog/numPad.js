import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";
import grey from "@material-ui/core/colors/grey";
import BackspaceIcon from "@material-ui/icons/Backspace";

const styles = theme => ({
  root: {
    width: 300,
    margin: 0
  },
  item: {
    border: 1,
    borderStyle: "solid",
    borderColor: grey[200]
  },
  button: {
    height: 80,
    width: "100%"
  }
});

class NumPad extends React.Component {
  state = {
    value: this.props.value
  };
  handleAdd = () => {
    this.setState(prev => ({ value: (prev.value * 10 + 1) / 10 }));
  };
  handleSubstract = () => {
    if (this.state.value === 0) return;
    this.setState(prev => ({ value: (prev.value * 10 - 1) / 10 }));
  };
  handleBackspace = () => {
    const str = this.state.value.toString();
    if (str === 0) return;
    const value = str.substring(0, str.length - 1);
    if (value === "") this.setState({ value: 0 });
    else this.setState({ value });
  };
  handleNumber = num => () => {
    const str = this.state.value.toString();
    if (str === "0" && num === 0) return;
    if (str === "0") this.setState({ value: num });
    else {
      const value = str + num;
      this.setState({ value });
    }
  };
  handlePoint = () => {
    const str = this.state.value.toString();
    if (str.includes(".")) return;
    const value = str + ".";
    this.setState({ value });
  };
  render() {
    const { classes, open, handleClose, handleSubmit } = this.props;
    const { value } = this.state;
    return (
      <Dialog open={open} onClose={handleClose}>
        <Grid container spacing={0} justify="center" className={classes.root}>
          <Grid item xs={3}>
            <ButtonBase
              focusRipple
              className={classes.button}
              onClick={this.handleSubstract}
            >
              <Typography variant="display1" gutterBottom>
                -
              </Typography>
            </ButtonBase>
          </Grid>
          <Grid
            item
            xs={6}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Typography variant="display1" gutterBottom>
              {value}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <ButtonBase
              focusRipple
              className={classes.button}
              onClick={this.handleAdd}
            >
              <Typography variant="display1" gutterBottom>
                +
              </Typography>
            </ButtonBase>
          </Grid>
          {[7, 8, 9, 4, 5, 6, 1, 2, 3].map(num => (
            <Grid key={num} item xs={4} className={classes.item}>
              <ButtonBase
                focusRipple
                className={classes.button}
                onClick={this.handleNumber(num)}
              >
                <Typography variant="title" gutterBottom>
                  {num}
                </Typography>
              </ButtonBase>
            </Grid>
          ))}
          <Grid item xs={4} className={classes.item}>
            <ButtonBase
              focusRipple
              className={classes.button}
              onClick={this.handlePoint}
            >
              <Typography variant="title" gutterBottom>
                .
              </Typography>
            </ButtonBase>
          </Grid>
          <Grid item xs={4} className={classes.item}>
            <ButtonBase
              focusRipple
              className={classes.button}
              onClick={this.handleNumber(0)}
            >
              <Typography variant="title" gutterBottom>
                0
              </Typography>
            </ButtonBase>
          </Grid>
          <Grid item xs={4} className={classes.item}>
            <ButtonBase
              focusRipple
              className={classes.button}
              onClick={this.handleBackspace}
            >
              <BackspaceIcon />
            </ButtonBase>
          </Grid>
          <Grid item xs={6} className={classes.item}>
            <ButtonBase
              focusRipple
              className={classes.button}
              onClick={handleClose}
            >
              <Typography variant="button" gutterBottom>
                Cancelar
              </Typography>
            </ButtonBase>
          </Grid>
          <Grid item xs={6} className={classes.item}>
            <ButtonBase
              focusRipple
              className={classes.button}
              onClick={handleSubmit({ value: Number(value) })}
            >
              <Typography variant="button" color="primary" gutterBottom>
                Aceptar
              </Typography>
            </ButtonBase>
          </Grid>
        </Grid>
      </Dialog>
    );
  }
}

NumPad.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool,
  value: PropTypes.number.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

NumPad.defaultProps = {
  open: false
};

export default withStyles(styles)(NumPad);
