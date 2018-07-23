import * as types from "./types";

function updateAddMovementFacilityRequest() {
  return {
    type: types.UPDATE_ADD_MOVEMENT_FACILITY_REQUEST
  };
}

function updateAddMovementFacilitySuccess({ id, index, title }) {
  return {
    type: types.UPDATE_ADD_MOVEMENT_FACILITY_SUCCESS,
    payload: { id, index, title }
  };
}

function updateAddMovementFacilityFailure() {
  return {
    type: types.UPDATE_ADD_MOVEMENT_FACILITY_FAILURE
  };
}

export default ({ id, index, title }) => async dispatch => {
  try {
    dispatch(updateAddMovementFacilityRequest());
    return dispatch(updateAddMovementFacilitySuccess({ id, index, title }));
  } catch (error) {
    return dispatch(updateAddMovementFacilityFailure());
  }
};
