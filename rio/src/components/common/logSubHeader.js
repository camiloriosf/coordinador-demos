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
    justifyContent: "center"
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
    statusEl: null,
    openStatusFilter: false,
    openConfigSearch: false
  };
  handleOpenFilter = event => {
    const { currentTarget } = event;
    this.setState({
      statusEl: currentTarget,
      openStatusFilter: true
    });
  };

  handleCloseFilter = () => {
    this.setState({
      openStatusFilter: false
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

    const { statusEl, openStatusFilter, openConfigSearch } = this.state;
    const id = openStatusFilter ? "status-filter-popper" : null;
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
            onClick={this.handleOpenFilter}
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
        <div className={classes.options}>
          <Typography variant="body2" noWrap>
            Estado Operacional
          </Typography>
        </div>
        <div className={classes.options}>
          <Typography variant="body2" noWrap>
            Consigna
          </Typography>
        </div>
        <div className={classes.options}>
          <Typography variant="body2" noWrap>
            Instrucción Operacional
          </Typography>
        </div>
        <div className={classes.options}>
          <Typography variant="body2" noWrap>
            Última instrucción
          </Typography>
        </div>
        <div>
          <Popper
            id={id}
            open={openStatusFilter}
            anchorEl={statusEl}
            transition
            placement="bottom-start"
            style={{ zIndex: 9999, marginLeft: -53, marginTop: -58 }}
          >
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Paper square elevation={4}>
                  <div className={classes.filterPopup}>
                    <Typography variant="body2" noWrap>
                      Estado
                    </Typography>
                    <IconButton
                      className={classes.button}
                      aria-label="Filter"
                      onClick={this.handleCloseFilter}
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
