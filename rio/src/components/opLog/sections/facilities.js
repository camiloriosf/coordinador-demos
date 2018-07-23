import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import OptionBox from "./optionBox";
import Map from "./map";

const styles = theme => ({
  root: {
    margin: theme.spacing.unit
  },
  options: {
    display: "flex",
    flexWrap: "wrap"
  }
});

class Facilities extends React.Component {
  render() {
    const {
      classes,
      facilities,
      handleAddFilter,
      handleDeleteFilter,
      handleClick
    } = this.props;
    const { filters, list } = facilities;

    return (
      <div className={classes.root}>
        <Grid container spacing={16}>
          <Grid item xs={12}>
            {filters.map(item => (
              <Chip
                label={item.region}
                key={item.regionId}
                onDelete={handleDeleteFilter({ regionId: item.regionId })}
              />
            ))}
          </Grid>
          <Grid item xs={6} className={classes.options}>
            {list.map(item => {
              if (
                filters.length > 0 &&
                filters.find(as => as.regionId === item.regionId)
              ) {
                return (
                  <OptionBox
                    key={item.id}
                    id={item.id}
                    index={0}
                    title={item.title}
                    disabled={item.disabled}
                    handleClick={handleClick}
                  />
                );
              } else if (filters.length === 0) {
                return (
                  <OptionBox
                    key={item.id}
                    id={item.id}
                    index={0}
                    title={item.title}
                    disabled={item.disabled}
                    handleClick={handleClick}
                  />
                );
              }
              return null;
            })}
          </Grid>
          <Grid item xs={6}>
            <Map handleAddFilter={handleAddFilter} />
          </Grid>
        </Grid>
      </div>
    );
  }
}

Facilities.propTypes = {
  classes: PropTypes.object.isRequired,
  facilities: PropTypes.object.isRequired,
  handleAddFilter: PropTypes.func.isRequired,
  handleDeleteFilter: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired
};

export default withStyles(styles)(Facilities);
