import * as types from "./types";

function createAddMovementFilterRequest() {
  return {
    type: types.CREATE_ADD_MOVEMENT_FILTER_REQUEST
  };
}

function createAddMovementFilterSuccess({ regionId, region }) {
  return {
    type: types.CREATE_ADD_MOVEMENT_FILTER_SUCCESS,
    payload: { regionId, region }
  };
}

function createAddMovementFilterFailure() {
  return {
    type: types.CREATE_ADD_MOVEMENT_FILTER_FAILURE
  };
}

export default ({ regionId, region }) => async dispatch => {
  try {
    dispatch(createAddMovementFilterRequest());
    return dispatch(createAddMovementFilterSuccess({ regionId, region }));
  } catch (error) {
    return dispatch(createAddMovementFilterFailure());
  }
};
