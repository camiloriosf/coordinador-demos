import * as types from "./types";

function showAddMovementFormRequest() {
  return {
    type: types.SHOW_ADD_MOVEMENT_FORM_REQUEST
  };
}

function showAddMovementFormSuccess({ open }) {
  return {
    type: types.SHOW_ADD_MOVEMENT_FORM_SUCCESS,
    payload: { open }
  };
}

function showAddMovementFormFailure() {
  return {
    type: types.SHOW_ADD_MOVEMENT_FORM_FAILURE
  };
}

export default ({ open }) => async dispatch => {
  try {
    dispatch(showAddMovementFormRequest());
    return dispatch(showAddMovementFormSuccess({ open }));
  } catch (error) {
    return dispatch(showAddMovementFormFailure());
  }
};
