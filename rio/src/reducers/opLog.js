import update from "immutability-helper";
import * as types from "../actions/types";

export default (state = {}, { type, payload }) => {
  switch (type) {
    case types.SHOW_ADD_MOVEMENT_FORM_SUCCESS:
      return update(state, {
        showAddForm: { $set: payload.open }
      });
    default:
      return state;
  }
};
