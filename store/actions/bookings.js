import Bookings from '../../models/Bookings';

export const ADD_BOOKING = 'ADD_BOOKING';
export const UPDATE_BOOKING = 'UPDATE_BOOKING';
export const SET_BOOKINGS = 'SET_BOOKINGS';

export const fetchBookings = () => {
  return async dispatch => {
    try {
      const response = await fetch('https://event-management-system-25cfe-default-rtdb.firebaseio.com/bookings.json');
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const resData = await response.json();
      const loadedBookings = [];

      for (const key in resData) {
        loadedBookings.push(
          new Bookings(
            resData[key].bookingId,
            key,
            resData[key].customerId,
            resData[key].destId,
            resData[key].typeOfEvent,
            resData[key].numberOfMembers,
            resData[key].startDuration,
            resData[key].endDuration,
            resData[key].comboTypePriceQuantity,
            resData[key].totalBill,
            resData[key].paymentReceived
          )
        );
      }
      dispatch({ type: SET_BOOKINGS, bookings: loadedBookings })
    } catch (e) {
      throw e;
    }
  };
};

export const addBooking = (bookingId, destId, typeOfEvent, numberOfMembers, startDuration, endDuration, comboTypePriceQuantity, totalBill, paymentReceived) => {
    return async (dispatch, getState) => {
      const token = getState().auth.token;
      const userId = getState().auth.userId;
      const response = await fetch(`https://event-management-system-25cfe-default-rtdb.firebaseio.com/bookings.json?auth=${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          bookingId,
          customerId: userId,
          destId,
          typeOfEvent,
          numberOfMembers,
          startDuration,
          endDuration,
          comboTypePriceQuantity,
          totalBill,
          paymentReceived
        })
      });

      const resData = await response.json();

      dispatch({
        type: ADD_BOOKING,
        bookingData: {
          bookingId,
          firebaseId: resData.name,
          customerId: userId,
          destId,
          typeOfEvent,
          numberOfMembers,
          startDuration,
          endDuration,
          comboTypePriceQuantity,
          totalBill,
          paymentReceived
        }
      });
    };
};

export const updatePaymentStatus = (bid, paymentReceived) => {
    return async (dispatch, getState) => {
      const token = getState().auth.token;
      await fetch(`https://event-management-system-25cfe-default-rtdb.firebaseio.com/bookings/${bid}.json?auth=${token}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          paymentReceived
        })
      });

      dispatch({
        type: UPDATE_BOOKING,
        bookingId: bid,
        bookingData: {
          paymentReceived
        }
      });
    };
};
