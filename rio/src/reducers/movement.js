import update from "immutability-helper";
import * as types from "../actions/types";

export default (state = {}, { type, payload }) => {
  switch (type) {
    // case types.UPDATE_ADD_MOVEMENT_FACILITY_SUCCESS:
    //   return update(state, {
    //     selection: {
    //       $apply: b => {
    //         let updated = false;
    //         const array = b.map(item => {
    //           if (item.index === payload.index) {
    //             updated = true;
    //             return { ...item, id: payload.id, title: payload.title };
    //           }
    //           return item;
    //         });
    //         if (!updated) array.push({ ...payload });
    //         return array;
    //       }
    //     },
    //     activeStep: {
    //       $set: payload.index + 1
    //     }
    //   });
    case types.UPDATE_ADD_MOVEMENT_FACILITY_SUCCESS:
      return update(state, {
        selection: { $set: [{ ...payload }] },
        activeStep: {
          $set: payload.index + 1
        }
      });
    case types.UPDATE_ADD_MOVEMENT_STEPPER_SUCCESS:
      return update(state, {
        activeStep: {
          $set: payload.index
        }
      });
    default:
      return state;
  }
};
