import * as types from "./types";

function updateAddMovementStepperRequest() {
  return {
    type: types.UPDATE_ADD_MOVEMENT_STEPPER_REQUEST
  };
}

function updateAddMovementStepperSuccess({ index }) {
  return {
    type: types.UPDATE_ADD_MOVEMENT_STEPPER_SUCCESS,
    payload: { index }
  };
}

function updateAddMovementStepperFailure() {
  return {
    type: types.UPDATE_ADD_MOVEMENT_STEPPER_FAILURE
  };
}

export default ({ index }) => async dispatch => {
  try {
    dispatch(updateAddMovementStepperRequest());
    return dispatch(updateAddMovementStepperSuccess({ index }));
  } catch (error) {
    return dispatch(updateAddMovementStepperFailure());
  }
};
