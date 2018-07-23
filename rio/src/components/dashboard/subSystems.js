import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const styles = theme => ({
  root: {
    width: "100%",
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  },
  link: {
    textDecoration: "none"
  }
});

let id = 0;
function createData(subsystem, facility, control, marginal, cmg) {
  id += 1;
  return { id, subsystem, facility, control, marginal, cmg };
}

const data = [
  createData(
    "Subsistema A",
    "Linea Juanito -> Pedrito 220",
    "Limite termico",
    "Nehuenco",
    30.0
  ),
  createData(
    "Subsistema B",
    "Linea Juanito -> Pedrito 220",
    "Limite termico",
    "Nehuenco",
    30.0
  ),
  createData("Subsistema D", "Trafo", "Falla", "Nehuenco", 30.0),
  createData(
    "Subsistema C",
    "Linea Juanito -> Pedrito 220",
    "Regulacion Tension",
    "Nehuenco",
    30.0
  )
];

class Container extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Subsistema</TableCell>
              <TableCell>Instalación</TableCell>
              <TableCell>Control</TableCell>
              <TableCell>Central Marginal</TableCell>
              <TableCell numeric>*Cmg</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(n => {
              return (
                <TableRow key={n.id}>
                  <TableCell
                    component="th"
                    scope="row"
                    className={classes.link}
                  >
                    <a href="/#">{n.subsystem}</a>
                  </TableCell>
                  <TableCell>{n.facility}</TableCell>
                  <TableCell>{n.control}</TableCell>
                  <TableCell>{n.marginal}</TableCell>
                  <TableCell numeric>{n.cmg}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    );
  }
}

Container.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Container);
