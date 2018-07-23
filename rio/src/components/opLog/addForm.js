import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import Facilities from "./sections/facilities";
import Selected from "./selected";

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    margin: theme.spacing.unit
  }),
  section: {
    margin: theme.spacing.unit * 3
  }
});

function getSteps() {
  return [
    "Seleccionar Central",
    "Seleccionar Unidad",
    "Seleccionar Configuración",
    "Ingresar Consigna",
    "Ingresar Estado Operacional",
    "Ingresar Motivo",
    "Ingresar Condiciones",
    "Ingresar Comentarios"
  ];
}

class AddForm extends React.Component {
  render() {
    const {
      classes,
      facilities,
      movement,
      handleSelectionClick,
      handleAddFilter,
      handleDeleteFilter,
      handleFacilitiesClick
    } = this.props;
    const { selection, activeStep } = movement;
    const steps = getSteps();
    return (
      <div>
        <Paper className={classes.root} elevation={4}>
          <Typography variant="headline" component="h3">
            Agregar movimiento
          </Typography>
          <form autoComplete="off">
            <Stepper nonLinear activeStep={activeStep} alternativeLabel>
              {steps.map((label, index) => {
                return (
                  <Step key={label}>
                    <StepButton onClick={handleSelectionClick({ index })}>
                      {label}
                    </StepButton>
                  </Step>
                );
              })}
            </Stepper>
            <div className={classes.section}>
              <Typography variant="headline" component="h3">
                Selección
              </Typography>
              <Selected
                selection={selection}
                handleClick={handleSelectionClick}
              />
            </div>
            <div className={classes.section}>
              <Typography variant="headline" component="h3">
                Opciones
              </Typography>
              {activeStep === 0 && (
                <Facilities
                  facilities={facilities}
                  handleAddFilter={handleAddFilter}
                  handleDeleteFilter={handleDeleteFilter}
                  handleClick={handleFacilitiesClick}
                />
              )}
            </div>
          </form>
        </Paper>
      </div>
    );
  }
}

AddForm.propTypes = {
  classes: PropTypes.object.isRequired,
  facilities: PropTypes.object.isRequired,
  movement: PropTypes.object.isRequired,
  handleSelectionClick: PropTypes.func.isRequired,
  handleAddFilter: PropTypes.func.isRequired,
  handleDeleteFilter: PropTypes.func.isRequired,
  handleFacilitiesClick: PropTypes.func.isRequired
};

export default withStyles(styles)(AddForm);
