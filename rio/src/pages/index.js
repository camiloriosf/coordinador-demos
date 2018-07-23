import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import withRoot from "../HoC/withRoot";
import withHeader from "../HoC/withHeader";
import Grid from "@material-ui/core/Grid";
import Container from "../components/dashboard/container";
import SubSystems from "../components/dashboard/subSystems";

const styles = theme => ({
  root: {
    padding: theme.spacing.unit
  }
});

class Index extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={16}>
          <Grid item xs={12} sm={4}>
            <Container title="Subsistemas">
              <SubSystems />
            </Container>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Container title="Control de Frecuencia" />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Container title="Desconexión/Disponibilidad" />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Container title="Politica" />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Container title="Eventos Importantes en Curso" />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Container title="Log Operativo" />
          </Grid>
        </Grid>
      </div>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  null,
  null
)(withRoot(withStyles(styles)(withHeader(Index))));
