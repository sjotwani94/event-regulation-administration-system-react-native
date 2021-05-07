import React from 'react';
import { FlatList, View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import DestinationList from '../components/DestinationList';
import BookingItem from '../components/BookingItem';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/CustomHeaderButton';

const BookingsPaymentDoneScreen = props => {
    const userId = useSelector(state => state.auth.userId);
    const bookings = useSelector(state => state.bookings.allBookings.filter(author => author.userId === userId && author.paymentReceived === true));
    if (bookings.length === 0) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{fontFamily: 'open-sans'}}>No Bookings With Done Payments Found!</Text>
        </View>
      );
    }
    const renderBookingItem = itemData => {
        return (
          <BookingItem
            userId={itemData.item.userId}
            destId={itemData.item.destId}
            typeOfEvent={itemData.item.typeOfEvent}
            numberOfMembers={itemData.item.numberOfMembers}
            startDuration={itemData.item.startDuration}
            totalBill={itemData.item.totalBill}
            paymentReceived={itemData.item.paymentReceived}
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

BookingsPaymentDoneScreen.navigationOptions = navigationData => {
    return {
        headerTitle: 'Booking History',
        headerLeft: () => (
          <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
              title='Menu'
              iconName='ios-menu'
              onPress={() => {
                navigationData.navigation.toggleDrawer();
              }}
            />
          </HeaderButtons>
        )
    };
};

export default BookingsPaymentDoneScreen;
