import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Popper from "@material-ui/core/Popper";
import InputAdornment from "@material-ui/core/InputAdornment";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import ClearIcon from "@material-ui/icons/Clear";
import FilterListIcon from "@material-ui/icons/FilterList";
import SearchIcon from "@material-ui/icons/Search";

const styles = theme => ({
  root: {
    margin: theme.spacing.unit,
    display: "flex",
    alignItems: "center"
  },
  edit: {
    width: 80
  },
  status: {
    width: 100,
    marginLeft: theme.spacing.unit
  },
  config: {
    marginLeft: theme.spacing.unit,
    width: 400
  },
  number: {
    width: 100,
    display: "flex",
    justifyContent: "center"
  },
  options: {
    width: 150,
    display: "flex",
    justifyContent: "center",
    textAlign: "center"
  },
  filter: {
    display: "flex",
    alignItems: "center"
  },
  filterPopup: {
    display: "flex",
    alignItems: "center",
    padding: 10
  },
  searchBox: {
    padding: 0,
    margin: 0
  }
});

class LogSubHeader extends React.Component {
  state = {
    openConfigSearch: false,
    statusEl: null,
    statusFilter: false,
    opStateEl: null,
    opStateFilter: false,
    sloganEl: null,
    sloganFilter: false,
    instructionEl: null,
    instructionFilter: false
  };

  handleOpenFilter = name => event => {
    const { currentTarget } = event;
    this.setState({
      [`${name}El`]: currentTarget,
      [`${name}Filter`]: true
    });
  };

  handleCloseFilter = name => () => {
    this.setState({
      [`${name}Filter`]: false
    });
  };

  handleOpenSearch = () => {
    this.setState({
      openConfigSearch: true
    });
  };

  handleCloseSearch = () => {
    this.setState({
      openConfigSearch: false
    });
  };

  handleSearchChange = event => {
    console.log(event.target.value);
  };

  render() {
    const { classes } = this.props;

    const {
      openConfigSearch,
      statusEl,
      statusFilter,
      opStateEl,
      opStateFilter,
      sloganEl,
      sloganFilter,
      instructionEl,
      instructionFilter
    } = this.state;
    const id = statusFilter ? "status-filter-popper" : null;
    const idOpState = opStateFilter ? "op-state-filter-popper" : null;
    const idSlogan = sloganFilter ? "slogan-filter-popper" : null;
    const idInstruction = instructionFilter
      ? "instruction-filter-popper"
      : null;
    return (
      <div className={classes.root}>
        <div className={classes.edit}>
          <Typography variant="body2" noWrap>
            Editar
          </Typography>
        </div>
        <div className={classnames(classes.status, classes.filter)}>
          <Typography variant="body2" noWrap>
            Estado
          </Typography>
          <IconButton
            className={classes.button}
            aria-label="Filter"
            onClick={this.handleOpenFilter("status")}
          >
            <FilterListIcon />
          </IconButton>
        </div>
        <div className={classes.config}>
          {!openConfigSearch && (
            <Fade in={!openConfigSearch}>
              <div className={classes.filter}>
                <Typography key="confTitle" variant="body2" noWrap>
                  Configuración
                </Typography>
                <IconButton
                  className={classes.button}
                  key="confButton"
                  aria-label="Search"
                  onClick={this.handleOpenSearch}
                >
                  <SearchIcon />
                </IconButton>
              </div>
            </Fade>
          )}
          {openConfigSearch && (
            <Fade in={openConfigSearch}>
              <TextField
                id="search"
                label="Configuración"
                margin="normal"
                className={classes.searchBox}
                onChange={this.handleSearchChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="Search"
                        onClick={this.handleCloseSearch}
                      >
                        <ClearIcon />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Fade>
          )}
        </div>
        <div className={classes.number}>
          <Typography variant="body2" noWrap>
            Comentarios
          </Typography>
        </div>
        <div className={classes.number}>
          <Typography variant="body2" noWrap>
            CV
          </Typography>
        </div>
        <div className={classes.number}>
          <Typography variant="body2" noWrap>
            Gx Instruida
          </Typography>
        </div>
        <div className={classes.number}>
          <Typography variant="body2" noWrap>
            Gx Real
          </Typography>
        </div>
        <div className={classnames(classes.options, classes.filter)}>
          <Typography variant="body2">Estado Operacional</Typography>
          <IconButton
            className={classes.button}
            aria-label="Filter"
            onClick={this.handleOpenFilter("opState")}
          >
            <FilterListIcon />
          </IconButton>
        </div>
        <div className={classnames(classes.options, classes.filter)}>
          <Typography variant="body2">Consigna</Typography>
          <IconButton
            className={classes.button}
            aria-label="Filter"
            onClick={this.handleOpenFilter("slogan")}
          >
            <FilterListIcon />
          </IconButton>
        </div>
        <div className={classnames(classes.options, classes.filter)}>
          <Typography variant="body2">Instrucción Operacional</Typography>
          <IconButton
            className={classes.button}
            aria-label="Filter"
            onClick={this.handleOpenFilter("instruction")}
          >
            <FilterListIcon />
          </IconButton>
        </div>
        <div className={classes.options}>
          <Typography variant="body2" noWrap>
            Última instrucción
          </Typography>
        </div>
        <div>
          <Popper
            id={id}
            open={statusFilter}
            anchorEl={statusEl}
            transition
            placement="bottom-start"
            style={{ zIndex: 9999, marginLeft: -53, marginTop: -58 }}
          >
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={100}>
                <ClickAwayListener
                  onClickAway={this.handleCloseFilter("status")}
                >
                  <Paper square elevation={4}>
                    <div className={classes.filterPopup}>
                      <Typography variant="body2" noWrap>
                        Estado
                      </Typography>
                      <IconButton
                        className={classes.button}
                        aria-label="Filter"
                        onClick={this.handleCloseFilter("status")}
                      >
                        <FilterListIcon />
                      </IconButton>
                    </div>
                    <MenuItem className={classes.menuItem}>
                      <FormControlLabel
                        control={
                          <Checkbox checked value="checkedB" color="primary" />
                        }
                        label="E/S"
                      />
                    </MenuItem>
                    <MenuItem className={classes.menuItem}>
                      <FormControlLabel
                        control={
                          <Checkbox checked value="checkedB" color="primary" />
                        }
                        label="F/S"
                      />
                    </MenuItem>
                    <MenuItem className={classes.menuItem}>
                      <FormControlLabel
                        control={
                          <Checkbox checked value="checkedB" color="primary" />
                        }
                        label="Indisponible"
                      />
                    </MenuItem>
                  </Paper>
                </ClickAwayListener>
              </Fade>
            )}
          </Popper>
          <Popper
            id={idOpState}
            open={opStateFilter}
            anchorEl={opStateEl}
            transition
            placement="bottom-start"
            style={{ zIndex: 9999, marginLeft: -111, marginTop: -58 }}
          >
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={100}>
                <ClickAwayListener
                  onClickAway={this.handleCloseFilter("opState")}
                >
                  <Paper square elevation={4}>
                    <div className={classes.filterPopup}>
                      <Typography
                        variant="body2"
                        style={{ width: 100, textAlign: "center" }}
                      >
                        Estado Operacional
                      </Typography>
                      <IconButton
                        className={classes.button}
                        aria-label="Filter"
                        onClick={this.handleCloseFilter("opState")}
                      >
                        <FilterListIcon />
                      </IconButton>
                    </div>
                    <MenuItem className={classes.menuItem}>
                      <FormControlLabel
                        control={
                          <Checkbox checked value="checkedB" color="primary" />
                        }
                        label="N"
                      />
                    </MenuItem>
                    <MenuItem className={classes.menuItem}>
                      <FormControlLabel
                        control={
                          <Checkbox checked value="checkedB" color="primary" />
                        }
                        label="DN"
                      />
                    </MenuItem>
                    <MenuItem className={classes.menuItem}>
                      <FormControlLabel
                        control={
                          <Checkbox checked value="checkedB" color="primary" />
                        }
                        label="LP"
                      />
                    </MenuItem>
                  </Paper>
                </ClickAwayListener>
              </Fade>
            )}
          </Popper>
          <Popper
            id={idSlogan}
            open={sloganFilter}
            anchorEl={sloganEl}
            transition
            placement="bottom-start"
            style={{ zIndex: 9999, marginLeft: -69, marginTop: -58 }}
          >
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={100}>
                <ClickAwayListener
                  onClickAway={this.handleCloseFilter("slogan")}
                >
                  <Paper square elevation={4}>
                    <div className={classes.filterPopup}>
                      <Typography variant="body2">Consigna</Typography>
                      <IconButton
                        className={classes.button}
                        aria-label="Filter"
                        onClick={this.handleCloseFilter("slogan")}
                      >
                        <FilterListIcon />
                      </IconButton>
                    </div>
                    <MenuItem className={classes.menuItem}>
                      <FormControlLabel
                        control={
                          <Checkbox checked value="checkedB" color="primary" />
                        }
                        label="MT"
                      />
                    </MenuItem>
                    <MenuItem className={classes.menuItem}>
                      <FormControlLabel
                        control={
                          <Checkbox checked value="checkedB" color="primary" />
                        }
                        label="FS"
                      />
                    </MenuItem>
                    <MenuItem className={classes.menuItem}>
                      <FormControlLabel
                        control={
                          <Checkbox checked value="checkedB" color="primary" />
                        }
                        label="LP"
                      />
                    </MenuItem>
                  </Paper>
                </ClickAwayListener>
              </Fade>
            )}
          </Popper>
          <Popper
            id={idInstruction}
            open={instructionFilter}
            anchorEl={instructionEl}
            transition
            placement="bottom-start"
            style={{ zIndex: 9999, marginLeft: -111, marginTop: -58 }}
          >
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={100}>
                <ClickAwayListener
                  onClickAway={this.handleCloseFilter("instruction")}
                >
                  <Paper square elevation={4}>
                    <div className={classes.filterPopup}>
                      <Typography
                        variant="body2"
                        style={{ width: 100, textAlign: "center" }}
                      >
                        Instrucción Operacional
                      </Typography>
                      <IconButton
                        className={classes.button}
                        aria-label="Filter"
                        onClick={this.handleCloseFilter("instruction")}
                      >
                        <FilterListIcon />
                      </IconButton>
                    </div>
                    <MenuItem className={classes.menuItem}>
                      <FormControlLabel
                        control={
                          <Checkbox checked value="checkedB" color="primary" />
                        }
                        label="MT"
                      />
                    </MenuItem>
                    <MenuItem className={classes.menuItem}>
                      <FormControlLabel
                        control={
                          <Checkbox checked value="checkedB" color="primary" />
                        }
                        label="FS"
                      />
                    </MenuItem>
                    <MenuItem className={classes.menuItem}>
                      <FormControlLabel
                        control={
                          <Checkbox checked value="checkedB" color="primary" />
                        }
                        label="LP"
                      />
                    </MenuItem>
                  </Paper>
                </ClickAwayListener>
              </Fade>
            )}
          </Popper>
        </div>
      </div>
    );
  }
}

LogSubHeader.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LogSubHeader);
