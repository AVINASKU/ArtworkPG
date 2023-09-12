import * as types from "../types/types";

const initialState = {
  acpBookingData: [],
  rootBreadCrumb: "Capacity Management",
};

const acpBooking = (state = initialState, action) => {
  switch (action.type) {
    case types.ACP_BOOKING_DATA:
      return {
        ...state,
        acpBookingData: action.payload,
      };
    default:
      return state;
  }
};
export default acpBooking;
