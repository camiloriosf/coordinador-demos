import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const styles = theme => ({
  root: {},
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  container: {
    width: "100%",
    marginTop: theme.spacing.unit,
    overflowX: "auto",
    height: 300
  },
  table: {}
});

let id = 0;
function createData(central, conf, cmg, opState, slogan, opInstruction) {
  id += 1;
  return { id, central, conf, cmg, opState, slogan, opInstruction };
}

const rows = [
  createData("Licanten", "LICANTEN_1", 24, "OP", "CB", "XX"),
  createData("Licanten", "LICANTEN_1", 24, "OP", "CB", "XX"),
  createData("Licanten", "LICANTEN_1", 24, "OP", "CB", "XX"),
  createData("Licanten", "LICANTEN_1", 24, "OP", "CB", "XX"),
  createData("Licanten", "LICANTEN_1", 24, "OP", "CB", "XX"),
  createData("Licanten", "LICANTEN_1", 24, "OP", "CB", "XX"),
  createData("Licanten", "LICANTEN_1", 24, "OP", "CB", "XX"),
  createData("Licanten", "LICANTEN_1", 24, "OP", "CB", "XX")
];

class Politics extends React.Component {
  state = {
    subsystem: ""
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    const { classes } = this.props;

    return (
      <div>
        <Typography variant="headline" component="h3">
          Politica
        </Typography>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="subsystem-simple">Subsistema</InputLabel>
          <Select
            value={this.state.subsystem}
            onChange={this.handleChange}
            inputProps={{
              name: "subsystem",
              id: "subsystem-simple"
            }}
          >
            <MenuItem value="">
              <em>Todas</em>
            </MenuItem>
            <MenuItem value={10}>Subsistema 1</MenuItem>
            <MenuItem value={20}>Subsistema 2</MenuItem>
            <MenuItem value={30}>Subsistema 3</MenuItem>
          </Select>
        </FormControl>
        <div className={classes.container}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Central</TableCell>
                <TableCell>Configuracion</TableCell>
                <TableCell>CMg</TableCell>
                <TableCell>Estado Operacional</TableCell>
                <TableCell>Consigna</TableCell>
                <TableCell>Instrucción Operacional</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => {
                return (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.central}
                    </TableCell>
                    <TableCell>{row.conf}</TableCell>
                    <TableCell numeric>{row.cmg}</TableCell>
                    <TableCell>{row.opState}</TableCell>
                    <TableCell>{row.slogan}</TableCell>
                    <TableCell>{row.opInstruction}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }
}

Politics.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Politics);
