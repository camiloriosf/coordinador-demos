import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
// import Button from "@material-ui/core/Button";

const styles = theme => ({
  root: {
    display: "flex"
  },
  selectors: {
    flex: 1
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  button: {
    margin: theme.spacing.unit
  }
});

class Header extends React.Component {
  state = {
    option: "all",
    filter: ""
  };

  handleSelectChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    // const { classes, handleShowAddForm } = this.props;
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.selectors}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="option-simple">Opción</InputLabel>
            <Select
              value={this.state.option}
              onChange={this.handleSelectChange}
              inputProps={{
                name: "option",
                id: "option-simple"
              }}
            >
              <MenuItem value="all">Todos</MenuItem>
              <MenuItem value="today">Hoy</MenuItem>
            </Select>
          </FormControl>
          <TextField
            id="filter"
            label="Filtro"
            className={classes.textField}
            value={this.state.filter}
            onChange={this.handleChange("filter")}
            margin="normal"
          />
        </div>
        {/* <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={handleShowAddForm}
        >
          Agregar Movimiento
        </Button> */}
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);
