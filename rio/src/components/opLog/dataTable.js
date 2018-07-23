import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import VisibilityIcon from "@material-ui/icons/Visibility";

const styles = theme => ({
  root: {
    width: "100%",
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  },
  options: {
    display: "flex"
  }
});

let id = 0;
function createData(
  hour,
  facility,
  config,
  variation,
  power,
  status,
  reason,
  instruction,
  sign,
  condition,
  comment,
  ref
) {
  id += 1;
  return {
    id,
    hour,
    facility,
    config,
    variation,
    power,
    status,
    reason,
    instruction,
    sign,
    condition,
    comment,
    ref
  };
}

const data = [
  createData(
    "00:01",
    "Guacolda",
    "Guacolda",
    30.0,
    100,
    "U1:N U2:N",
    "Motivo",
    "AC3F",
    "MT",
    "N N",
    "Central no baja por tiempo de operacion",
    "CT: Juanito -> Pedrito 220"
  ),
  createData(
    "00:01",
    "Guacolda",
    "Guacolda",
    30.0,
    100,
    "U1:N U2:N",
    "Motivo",
    "AC3F",
    "MT",
    "N N",
    "Central no baja por tiempo de operacion",
    "CT: Juanito -> Pedrito 220"
  ),
  createData(
    "00:01",
    "Guacolda",
    "Guacolda",
    30.0,
    100,
    "U1:N U2:N",
    "Motivo",
    "AC3F",
    "MT",
    "N N",
    "Central no baja por tiempo de operacion",
    "CT: Juanito -> Pedrito 220"
  ),
  createData(
    "00:01",
    "Guacolda",
    "Guacolda",
    30.0,
    100,
    "U1:N U2:N",
    "Motivo",
    "AC3F",
    "MT",
    "N N",
    "Central no baja por tiempo de operacion",
    "CT: Juanito -> Pedrito 220"
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
              <TableCell>Hora</TableCell>
              <TableCell>Instalación</TableCell>
              <TableCell>Configuración</TableCell>
              <TableCell numeric>DeltaMW</TableCell>
              <TableCell numeric>MW</TableCell>
              <TableCell>Estado operacional</TableCell>
              <TableCell>Motivo</TableCell>
              <TableCell>Instrucción Operacional</TableCell>
              <TableCell>Consigna</TableCell>
              <TableCell>Condición</TableCell>
              <TableCell>Comentario</TableCell>
              <TableCell>Referencia</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(n => {
              return (
                <TableRow key={n.id} hover>
                  <TableCell
                    component="th"
                    scope="row"
                    className={classes.link}
                  >
                    {n.hour}
                  </TableCell>
                  <TableCell>{n.facility}</TableCell>
                  <TableCell>{n.config}</TableCell>
                  <TableCell numeric>{n.variation}</TableCell>
                  <TableCell numeric>{n.power}</TableCell>
                  <TableCell>{n.status}</TableCell>
                  <TableCell>{n.reason}</TableCell>
                  <TableCell>{n.instruction}</TableCell>
                  <TableCell>{n.sign}</TableCell>
                  <TableCell>{n.condition}</TableCell>
                  <TableCell>{n.comment}</TableCell>
                  <TableCell>{n.ref}</TableCell>
                  <TableCell>
                    <div className={classes.options}>
                      <IconButton
                        className={classes.button}
                        aria-label="Delete"
                        color="primary"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        className={classes.button}
                        aria-label="View"
                        color="primary"
                      >
                        <VisibilityIcon />
                      </IconButton>
                    </div>
                  </TableCell>
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
