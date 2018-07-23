import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Polygon
} from "react-google-maps";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = theme => ({});

class Map extends React.Component {
  render() {
    const { handleAddFilter } = this.props;

    return (
      <GoogleMap defaultZoom={6} defaultCenter={{ lat: -21.0, lng: -68.922 }}>
        <Polygon
          onClick={handleAddFilter({ region: "I Region", regionId: 0 })}
          onMouseOver={() => console.log(2)}
          onMouseOut={() => console.log(3)}
          options={{ fillColor: "red", strokeWeight: 1 }}
          path={[
            { lat: -18.35456, lng: -70.39214 },
            { lat: -18.31725, lng: -70.31086 },
            { lat: -18.31803, lng: -70.15869 },
            { lat: -18.25805, lng: -69.93347 },
            { lat: -17.96605, lng: -69.7497 },
            { lat: -17.76049, lng: -69.80848 },
            { lat: -17.65039, lng: -69.79082 },
            { lat: -17.66156, lng: -69.6435 },
            { lat: -17.50525, lng: -69.47205 },
            { lat: -17.6139, lng: -69.46662 },
            { lat: -17.78007, lng: -69.3045 },
            { lat: -17.98051, lng: -69.27903 },
            { lat: -18.06492, lng: -69.05182 },
            { lat: -18.16673, lng: -69.13422 },
            { lat: -18.22935, lng: -69.06006 },
            { lat: -18.94786, lng: -68.9447 },
            { lat: -19.09846, lng: -69.18365 },
            { lat: -18.99461, lng: -69.7467 },
            { lat: -19.22013, lng: -70.28165 },
            { lat: -18.80643, lng: -70.35618 },
            { lat: -18.44521, lng: -70.31373 },
            { lat: -18.35456, lng: -70.39214 }
          ]}
        />
      </GoogleMap>
    );
  }
}

Map.propTypes = {
  classes: PropTypes.object.isRequired,
  handleAddFilter: PropTypes.func.isRequired
};

const EnhancedComponent = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%"
        }}
      >
        <CircularProgress />
      </div>
    ),
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(Map);

export default withStyles(styles)(EnhancedComponent);
