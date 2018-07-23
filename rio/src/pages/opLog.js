import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import withRoot from "../HoC/withRoot";
import withHeader from "../HoC/withHeader";
import LogItem from "../components/opLog/logItem";
import Filter from "../components/opLog/filters";
import ToCB from "../components/opLog/toCB";

const styles = theme => ({
  root: {
    padding: theme.spacing.unit
  },
  header: {
    margin: theme.spacing.unit
  },
  log: {
    margin: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 15
  }
});

class OpLog extends React.Component {
  state = {
    onService: true,
    outOfService: false,
    unavailable: false
  };

  handleToCBClick = () => {
    window.scrollTo(0, this.something.offsetTop - window.outerHeight / 2);
  };

  handleFilterUpdate = ({ onService, outOfService }) => {
    this.setState({ onService, outOfService });
  };

  render() {
    const { classes, log, match } = this.props;
    const { params = {} } = match;
    const { options = null } = params;

    const ordered = log.sort((a, b) => {
      if (a.cv < b.cv) return -1;
      if (a.cv > b.cv) return 1;
      if (a.id < b.id) return -1;
      if (a.id > b.id) return 1;
      return 0;
    });
    const filtered = ordered.filter(item => {
      if (options === "unavailable") return item.unavailable;
      else if (!item.unavailable) {
        if (this.state.onService && !item.outOfService) return true;
        if (this.state.outOfService && item.outOfService) return true;
      }
      return false;
    });
    return (
      <div className={classes.root}>
        <div className={classes.header}>
          {!options && (
            <div>
              <Filter
                handleFilterUpdate={this.handleFilterUpdate}
                onService={this.state.onService}
                outOfService={this.state.outOfService}
                unavailable={this.state.unavailable}
              />
              <ToCB handleToCBClick={this.handleToCBClick} />
            </div>
          )}
        </div>
        <div className={classes.log}>
          {filtered.map(item => (
            <div
              key={item.id}
              ref={node => {
                if (item.co === "CB") this.something = node;
              }}
            >
              <LogItem
                title={item.title}
                eo={item.eo}
                co={item.co}
                io={item.io}
                outOfService={item.outOfService}
                unavailable={item.unavailable}
                limitation={item.limitation}
                lim={item.lim}
                cv={item.cv}
                instructedGx={item.instructedGx}
                realGx={item.realGx}
                edit={item.edit}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

OpLog.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => ({});

const mapStateToProps = ({ log, opLog, facilities, movement }) => ({
  log,
  opLog,
  facilities,
  movement
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRoot(withStyles(styles)(withHeader(OpLog))));
