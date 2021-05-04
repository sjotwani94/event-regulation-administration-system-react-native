import { BOOKINGS } from '../../data/dummy-data';

const initialState = {
    allBookings: BOOKINGS,
    userBookings: BOOKINGS.filter(book => book.userId === 'u1')
};

export default (state = initialState, action) => {
    return state;
};
