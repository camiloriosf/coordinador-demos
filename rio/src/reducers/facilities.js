import update from "immutability-helper";
import * as types from "../actions/types";

export default (state = {}, { type, payload }) => {
  switch (type) {
    case types.CREATE_ADD_MOVEMENT_FILTER_SUCCESS:
      return update(state, {
        filters: {
          $apply: b =>
            b.find(item => item.regionId === payload.regionId)
              ? b
              : [...b, { ...payload }]
        }
      });
    case types.REMOVE_ADD_MOVEMENT_FILTER_SUCCESS:
      return update(state, {
        filters: arr => arr.filter(item => item.regionId !== payload.regionId)
      });
    default:
      return state;
  }
};
