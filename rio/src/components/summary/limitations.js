import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const styles = theme => ({
  root: {},
  container: {
    width: "100%",
    marginTop: theme.spacing.unit,
    overflowX: "auto",
    maxHeight: 200
  }
});

let id = 0;
function createData(conf, cv, opState, slogan, opInstruction) {
  id += 1;
  return { id, conf, cv, opState, slogan, opInstruction };
}

const rows = [
  createData("VALDIVIA_BL1_COGEN_PINO", 24, "OP", "CB", "XX"),
  createData("ATACAMA-1TG1AB_TG1A+TG1B+TV1_GNL_INFLEX", 24, "OP", "CB", "XX"),
  createData("CMPCCORDILLERA_BL1_COGEN", 24, "OP", "CB", "XX"),
  createData("KELAR-TG12_TG1+TG2+TV1_GNL_INFLEX", 24, "OP", "CB", "XX"),
  createData("NEHUENCO-2_TG1+TV1_GNL_INFLEX", 24, "OP", "CB", "XX"),
  createData("CANDELARIA-1_GNL_INFLEX", 24, "OP", "CB", "XX"),
  createData("SANISIDRO-1_TG1+TV1+FA1_GNL_INFLEX", 24, "OP", "CB", "XX"),
  createData("NEHUENCO-1_TG1_GNL_INFLEX", 24, "OP", "CB", "XX")
];

class Limitations extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div>
        <Typography variant="headline" component="h3">
          Limitaciones
        </Typography>
        <div className={classes.container}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
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
                      {row.conf}
                    </TableCell>
                    <TableCell numeric>{row.cv}</TableCell>
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

Limitations.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Limitations);
