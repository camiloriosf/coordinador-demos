import * as types from "./types";

function removeAddMovementFilterRequest() {
  return {
    type: types.REMOVE_ADD_MOVEMENT_FILTER_REQUEST
  };
}

function removeAddMovementFilterSuccess({ regionId }) {
  return {
    type: types.REMOVE_ADD_MOVEMENT_FILTER_SUCCESS,
    payload: { regionId }
  };
}

function removeAddMovementFilterFailure() {
  return {
    type: types.REMOVE_ADD_MOVEMENT_FILTER_FAILURE
  };
}

export default ({ regionId }) => async dispatch => {
  try {
    dispatch(removeAddMovementFilterRequest());
    return dispatch(removeAddMovementFilterSuccess({ regionId }));
  } catch (error) {
    return dispatch(removeAddMovementFilterFailure());
  }
};
