import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import yellow from "@material-ui/core/colors/yellow";
import DescriptionIcon from "@material-ui/icons/Comment";

const styles = theme => ({
  root: {},
  container: {
    width: "100%",
    marginTop: theme.spacing.unit,
    overflowX: "auto",
    height: 300
  },
  table: {},
  yellowIcon: {
    color: yellow[700]
  }
});

let id = 0;
function createData(name, line, central, cmg) {
  id += 1;
  return { id, name, line, central, cmg };
}

const rows = [
  createData("Zona 1", "linea 1, linea 2", "Taltal", 24),
  createData("Zona 1", "linea 1, linea 2", "Taltal", 24),
  createData("Zona 1", "linea 1, linea 2", "Taltal", 24),
  createData("Zona 1", "linea 1, linea 2", "Taltal", 24),
  createData("Zona 1", "linea 1, linea 2", "Taltal", 24)
];

class SubSystems extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div>
        <Typography variant="headline" component="h3">
          Subsistemas
        </Typography>
        <div className={classes.container}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Subsistema</TableCell>
                <TableCell>Donde</TableCell>
                <TableCell>Central Cmg</TableCell>
                <TableCell numeric>Cmg</TableCell>
                <TableCell>Comentarios</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => {
                return (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell>{row.line}</TableCell>
                    <TableCell>{row.central}</TableCell>
                    <TableCell numeric>{row.cmg}</TableCell>
                    <TableCell numeric>
                      <DescriptionIcon className={classes.yellowIcon} />
                    </TableCell>
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

SubSystems.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SubSystems);
