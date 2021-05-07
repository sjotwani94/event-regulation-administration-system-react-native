import React, { useState, useEffect, useCallback } from 'react';
import { FlatList, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import DestinationList from '../../components/DestinationList';
import AdminBookingItem from '../../components/AdminBookingItem';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/CustomHeaderButton';
import * as bookingsActions from '../../store/actions/bookings';

const BookingsAtMyPlaces = props => {
    const [errorFound, setErrorFound] = useState();

    const dispatch = useDispatch();

    const loadBookings = useCallback(async () => {
      setErrorFound(null);
      try {
        await dispatch(bookingsActions.fetchBookings());
      } catch (e) {
        setErrorFound(e.message);
      }
    }, [dispatch, setErrorFound]);

    useEffect(() => {
      const willFocusSub = props.navigation.addListener('willFocus', loadBookings);
      return () => {
        willFocusSub.remove();
      };
    }, [loadBookings]);

    useEffect(() => {
      loadBookings();
    }, [dispatch, loadBookings]);

    useEffect(() => {
      if (errorFound) {
        Alert.alert('An Error Occurred!', errorFound, [{ text: 'Okay'}]);
      }
    }, [errorFound]);
    const userId = useSelector(state => state.auth.userId);
    const bookings = useSelector(state => state.bookings.allBookings.filter(author => author.userId === userId));
    const renderBookingItem = itemData => {
        return (
          <AdminBookingItem
            userId={itemData.item.userId}
            destId={itemData.item.destId}
            typeOfEvent={itemData.item.typeOfEvent}
            numberOfMembers={itemData.item.numberOfMembers}
            startDuration={itemData.item.startDuration}
            totalBill={itemData.item.totalBill}
            paymentReceived={itemData.item.paymentReceived}
            onSelectBooking={() => {
                props.navigation.navigate({
                  routeName: 'CustomerBookingDetails',
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

BookingsAtMyPlaces.navigationOptions = navigationData => {
    return {
        headerTitle: 'Bookings At My Places',
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

export default BookingsAtMyPlaces;
