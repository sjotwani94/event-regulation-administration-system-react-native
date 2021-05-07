import { BOOKINGS } from '../../data/dummy-data';
import Bookings from '../../models/Bookings';
import {
  ADD_BOOKING,
  UPDATE_BOOKING,
  SET_BOOKINGS
} from '../actions/bookings';

const initialState = {
    allBookings: BOOKINGS
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_BOOKINGS:
      return {
        allBookings: action.bookings
      };
      break;
    case ADD_BOOKING:
      const newBooking = new Bookings(
        action.bookingData.bookingId,
        action.bookingData.firebaseId,
        action.bookingData.customerId,
        action.bookingData.destId,
        action.bookingData.typeOfEvent,
        action.bookingData.numberOfMembers,
        action.bookingData.startDuration,
        action.bookingData.endDuration,
        action.bookingData.comboTypePriceQuantity,
        action.bookingData.totalBill,
        action.bookingData.paymentReceived
      );
      return {
        allBookings: state.allBookings.concat(newBooking)
      };
      break;
    case UPDATE_BOOKING:
      const updatedBooking = state.allBookings.find(dest => dest.firebaseId === action.bookingId);
      const updatedIndex = updatedBooking.firebaseId;
      const statusUpdatedBooking = new Bookings(
        updatedBooking.bookingId,
        updatedIndex,
        updatedBooking.userId,
        updatedBooking.destId,
        updatedBooking.typeOfEvent,
        updatedBooking.numberOfMembers,
        updatedBooking.startDuration,
        updatedBooking.endDuration,
        updatedBooking.comboTypePriceQuantity,
        updatedBooking.totalBill,
        action.bookingData.paymentReceived
      );
      const updatedBookings = [...state.allBookings];
      updatedBookings[updatedIndex] = statusUpdatedBooking;
      return {
        allBookings: updatedBookings
      };
      break;
    default:
      return state;
  }
};
