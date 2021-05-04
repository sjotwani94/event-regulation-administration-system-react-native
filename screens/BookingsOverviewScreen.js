import React from 'react';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import DestinationList from '../components/DestinationList';
import BookingItem from '../components/BookingItem';

const BookingsOverviewScreen = props => {
    const bookings = useSelector(state => state.bookings.allBookings);
    const renderBookingItem = itemData => {
        return (
          <BookingItem
            userId={itemData.item.userId}
            destId={itemData.item.destId}
            typeOfEvent={itemData.item.typeOfEvent}
            numberOfMembers={itemData.item.numberOfMembers}
            startDuration={itemData.item.startDuration}
            totalBill={itemData.item.totalBill}
            onSelectBooking={() => {
                props.navigation.navigate({
                  routeName: 'BookingDetails',
                  params: {
                    bookingId: itemData.item.id
                  }
                });
            }}
          />
        );

    };
    return (
      <DestinationList
        displayedDestinations={bookings}
        renderDestinationItem={renderBookingItem}
      />
    );
};

BookingsOverviewScreen.navigationOptions = navigationData => {
    return {
        headerTitle: 'Booking History'
    };
};

export default BookingsOverviewScreen;
