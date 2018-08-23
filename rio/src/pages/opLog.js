import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import withRoot from "../HoC/withRoot";
import withHeader from "../HoC/withHeader";
import LogItem from "../components/opLog/logItem";
import Zone from "../components/opLog/zone";
import AddZone from "../components/opLog/addZone";
import ToCB from "../components/opLog/toCB";
import Header from "../components/opLog/logSubHeader";

const styles = theme => ({
  root: {
    overflowY: "hidden"
  },
  header: {},
  log: {
    maxHeight: "calc(100vh - 260px)",
    overflowY: "auto"
  }
});

class OpLog extends React.Component {
  state = {
    onService: true,
    outOfService: false,
    unavailable: false,
    openAddZone: false
  };

  handleToCBClick = () => {
    this.something.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center"
    });
  };

  handleFilterUpdate = ({ onService, outOfService }) => {
    this.setState({ onService, outOfService });
  };

  handleAddZone = () => {
    this.setState({ openAddZone: true });
  };

  handleAddZoneClose = () => {
    this.setState({ openAddZone: false });
  };

  render() {
    const { openAddZone } = this.state;
    const { classes, log, match, open } = this.props;
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
        <div>
          {!options && (
            <div>
              <Zone handleClick={this.handleAddZone} openHeader={open} />
              <ToCB handleToCBClick={this.handleToCBClick} />
              <AddZone
                open={openAddZone}
                handleClose={this.handleAddZoneClose}
              />
            </div>
          )}
        </div>
        <Header />
        <div className={classes.log}>
          {filtered.map((item, index) => (
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
                index={index}
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
