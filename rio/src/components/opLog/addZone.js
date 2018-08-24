import React from "react";
import PropTypes from "prop-types";
import update from "immutability-helper";
import classNames from "classnames";
import * as go from "gojs";
import { ToolManager, Diagram } from "gojs";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import KeyboardArrowRightButton from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowLeftButton from "@material-ui/icons/KeyboardArrowLeft";
import SaveIcon from "@material-ui/icons/Save";
import RefreshIcon from "@material-ui/icons/Refresh";
import { GojsDiagram } from "react-gojs";

const styles = theme => ({
  appBar: {
    position: "relative"
  },
  content: {
    display: "flex",
    width: "100vw",
    maxWidth: "100vw",
    height: "100vh"
  },
  flex: {
    flex: 1
  },
  diagram: {
    width: "100%",
    flex: 1
  },
  lines: {
    flex: 0.8,
    padding: 20,
    width: "100%"
  },
  gridItem: {
    padding: theme.spacing.unit
  },
  panels: {
    width: "100%",
    height: 400
  },
  formControl: {
    padding: theme.spacing.unit,
    width: "100%"
  },
  panelBody: {
    margin: theme.spacing.unit
  },
  button: {
    margin: theme.spacing.unit
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 20
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "100%"
  }
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class AddZone extends React.Component {
  state = {
    model: {
      nodeDataArray: [
        { key: "Barra 1", category: "bar" },
        { key: "Barra 2", category: "bar" },
        { key: "Barra 3", category: "bar" },
        { key: "Barra 4", category: "bar" },
        { key: "Barra 5", category: "bar" },
        { key: "Linea 1", category: "line", open: false },
        { key: "Linea 2", category: "line", open: false },
        { key: "Linea 3", category: "line", open: false },
        { key: "Linea 4", category: "line", open: false },
        { key: "Linea 5", category: "line", open: false },
        { key: "Linea 6", category: "line", open: false }
      ],
      linkDataArray: [
        { from: "Barra 1", to: "Linea 1" },
        { from: "Barra 1", to: "Linea 6" },
        { from: "Linea 6", to: "Barra 4" },
        { from: "Linea 1", to: "Barra 2" },
        { from: "Barra 1", to: "Linea 2" },
        { from: "Linea 2", to: "Barra 3" },
        { from: "Barra 2", to: "Linea 3" },
        { from: "Linea 3", to: "Barra 4" },
        { from: "Barra 3", to: "Linea 4" },
        { from: "Linea 4", to: "Barra 5" },
        { from: "Barra 2", to: "Linea 5" },
        { from: "Linea 5", to: "Barra 5" }
      ]
    },
    zone: "",
    lines: ["Linea 1", "Linea 2", "Linea 3"],
    selected: [],
    open: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleAddLine = value => event => {
    const { lines } = this.state;
    const index = lines.indexOf(value);
    lines.splice(index, 1);
    this.setState(prev => ({ lines, selected: [...prev.selected, value] }));
  };
  handleRemoveLine = value => event => {
    const { selected } = this.state;
    const index = selected.indexOf(value);
    selected.splice(index, 1);
    this.setState(prev => ({ selected, lines: [...prev.lines, value] }));
  };
  createDiagram = diagramId => {
    const $ = go.GraphObject.make;

    const myDiagram = $(go.Diagram, diagramId, {
      initialContentAlignment: go.Spot.TopCenter,
      layout: $(go.TreeLayout, {
        angle: 90,
        arrangement: go.TreeLayout.ArrangementVertical,
        treeStyle: go.TreeLayout.StyleLayered
      }),
      maxSelectionCount: 1,
      isReadOnly: false,
      allowHorizontalScroll: true,
      allowVerticalScroll: true,
      allowZoom: true,
      allowSelect: true,
      autoScale: Diagram.None,
      contentAlignment: go.Spot.TopCenter
    });

    myDiagram.toolManager.panningTool.isEnabled = false;
    myDiagram.toolManager.mouseWheelBehavior = ToolManager.WheelScroll;

    const toolTipTemplate = $(
      go.Adornment,
      "Auto",
      $(go.Shape, { fill: "#FFFFCC" }),
      $(go.TextBlock, { margin: 4 }, new go.Binding("text", "", d => d.key))
    );

    myDiagram.nodeTemplateMap.add(
      "bar",
      $(
        go.Node,
        "Horizontal",
        {
          toolTip: toolTipTemplate,
          locationSpot: go.Spot.Center,
          locationObjectName: "BAR",
          selectable: false
        },
        $(go.Shape, "Circle", {
          name: "BAR",
          fill: "rgba(0, 255, 0, .4)",
          stroke: "#082D47",
          width: 20,
          height: 20,
          fromSpot: go.Spot.BottomSide,
          toSpot: go.Spot.TopSide
        })
      )
    );

    myDiagram.nodeTemplateMap.add(
      "line",
      $(
        go.Node,
        "Horizontal",
        {
          locationSpot: go.Spot.Center,
          locationObjectName: "BAR",
          click: (e, node) => this.nodeClickHandler(node)
        },
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(
          go.Point.stringify
        ),
        $(
          go.Shape,
          "Rectangle",
          {
            name: "BAR",
            stroke: "black",
            desiredSize: new go.Size(20, 20),
            portId: "",
            fromSpot: go.Spot.BottomSide,
            toSpot: go.Spot.TopSide
          },
          new go.Binding("fill", "", d => (d.open ? "white" : "black"))
        )
      )
    );

    myDiagram.linkTemplate = $(
      go.Link,
      { routing: go.Link.Orthogonal, selectable: false },
      $(go.Shape, { stroke: "black", strokeWidth: 2 })
    );

    return myDiagram;
  };
  nodeClickHandler = node => {
    this.setState(
      update(this.state, {
        model: {
          nodeDataArray: {
            $apply: nodes => {
              return nodes.map(n => {
                if (n.key === node.data.key) {
                  return { ...n, open: !n.open };
                }
                return n;
              });
            }
          }
        }
      })
    );
    this.checkSystems(this.state.model);
  };
  checkSystems = data => {
    console.log(data);
  };
  render() {
    const { classes, open, handleClose } = this.props;
    const { lines, selected } = this.state;
    return (
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              onClick={handleClose}
              aria-label="Close"
            >
              <CloseIcon />
            </IconButton>
            <Typography
              variant="title"
              color="inherit"
              className={classes.flex}
            >
              Agregar Zona
            </Typography>
          </Toolbar>
        </AppBar>
        <div className={classes.content}>
          <GojsDiagram
            diagramId="diagram"
            model={this.state.model}
            createDiagram={this.createDiagram}
            className={classes.diagram}
          />
          <Grid
            container
            spacing={0}
            className={classes.lines}
            alignItems="flex-start"
            alignContent="flex-start"
          >
            <Grid item xs={6}>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="zone-simple">
                  Seleccionar Zona Predefinida
                </InputLabel>
                <Select
                  value={this.state.zone}
                  onChange={this.handleChange}
                  inputProps={{
                    name: "zone",
                    id: "zone-simple"
                  }}
                  fullWidth
                >
                  <MenuItem value="">
                    <em>Ninguna</em>
                  </MenuItem>
                  <MenuItem value={10}>Zona 1</MenuItem>
                  <MenuItem value={20}>Zona 2</MenuItem>
                  <MenuItem value={30}>Zona 3</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid
              item
              xs={6}
              className={classes.gridItem}
              style={{ textAlign: "right" }}
            >
              <Button
                variant="contained"
                size="small"
                disabled
                className={classes.button}
              >
                <RefreshIcon
                  className={classNames(classes.leftIcon, classes.iconSmall)}
                />
                Actualizar zona
              </Button>
              <Button
                variant="contained"
                size="small"
                className={classes.button}
                onClick={this.handleClickOpen}
              >
                <SaveIcon
                  className={classNames(classes.leftIcon, classes.iconSmall)}
                />
                Guardar zona
              </Button>
            </Grid>
            <Grid item xs={6} className={classes.gridItem}>
              <Paper elevation={1} className={classes.panels}>
                <List
                  subheader={<ListSubheader>Lineas Disponibles</ListSubheader>}
                >
                  {lines.map(item => (
                    <ListItem
                      key={item}
                      button
                      onClick={this.handleAddLine(item)}
                    >
                      <ListItemText primary={item} />
                      <ListItemIcon>
                        <KeyboardArrowRightButton />
                      </ListItemIcon>
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>
            <Grid item xs={6} className={classes.gridItem}>
              <Paper elevation={1} className={classes.panels}>
                <List
                  subheader={
                    <ListSubheader>Lineas Seleccionadas</ListSubheader>
                  }
                >
                  {selected.map(item => (
                    <ListItem
                      key={item}
                      button
                      onClick={this.handleRemoveLine(item)}
                    >
                      <ListItemIcon>
                        <KeyboardArrowLeftButton />
                      </ListItemIcon>
                      <ListItemText primary={item} />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>
            <Grid
              item
              xs={12}
              style={{ textAlign: "center" }}
              className={classes.gridItem}
            >
              <TextField
                id="multiline-static"
                label="Comentarios"
                multiline
                rows="4"
                className={classes.textField}
                margin="normal"
              />
            </Grid>
            <Grid
              item
              xs={12}
              style={{ textAlign: "left" }}
              className={classes.gridItem}
            >
              <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Tipo Desacople</FormLabel>
                <RadioGroup
                  aria-label="desacople"
                  name="desacople"
                  className={classes.group}
                  value="economico"
                  onChange={this.handleChange}
                  row
                >
                  <FormControlLabel
                    value="economico"
                    control={<Radio color="primary" />}
                    label="Economico"
                    labelPlacement="start"
                  />
                  <FormControlLabel
                    value="fisico"
                    control={<Radio color="primary" />}
                    label="Fisico"
                    labelPlacement="start"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid
              item
              xs={12}
              style={{ textAlign: "center" }}
              className={classes.gridItem}
            >
              <Button
                variant="contained"
                className={classes.button}
                onClick={handleClose}
              >
                Volver
              </Button>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={handleClose}
              >
                Crear Zona
              </Button>
            </Grid>
          </Grid>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Guardar Zona</DialogTitle>
            <DialogContent>
              <DialogContentText>Ingresar nombre de zona</DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="zone"
                label="Nombre Zona"
                type="text"
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancelar
              </Button>
              <Button onClick={this.handleClose} color="primary">
                Guardar
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </Dialog>
    );
  }
}

AddZone.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default withStyles(styles)(AddZone);
