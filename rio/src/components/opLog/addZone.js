import React from "react";
import PropTypes from "prop-types";
import update from "immutability-helper";
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
import { GojsDiagram } from "react-gojs";

const styles = theme => ({
  appBar: {
    position: "relative"
  },
  content: {
    display: "flex",
    width: "100vw",
    height: "100vh"
  },
  flex: {
    flex: 1
  },
  diagram: {
    width: "100%",
    flex: 1
  },
  search: {
    flex: 0.5
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 260
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
    zone: ""
  };
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
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
          <div className={classes.search}>
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
              >
                <MenuItem value="">
                  <em>Ninguna</em>
                </MenuItem>
                <MenuItem value={10}>Zona 1</MenuItem>
                <MenuItem value={20}>Zona 2</MenuItem>
                <MenuItem value={30}>Zona 3</MenuItem>
              </Select>
            </FormControl>
          </div>
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
