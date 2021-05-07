import React, { useEffect, useCallback } from 'react';
import { ScrollView, View, Image, Text, Button, StyleSheet, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CustomHeaderButton from '../../components/CustomHeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomButton from '../../components/CustomButton';
import { Ionicons, Entypo, AntDesign, FontAwesome, FontAwesome5, MaterialIcons, Feather } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import * as bookingsActions from '../../store/actions/bookings';

const CustomerBookingDetails = props => {
    const bookingId = props.navigation.getParam('bookingId');
    const dispatch = useDispatch();
    const selectedBooking = useSelector(state => state.bookings.allBookings.find(booking => booking.id === bookingId));
    const firebaseId = selectedBooking.firebaseId;
    const customerId = selectedBooking.userId;
    const customerDetails = useSelector(state => state.auth.authUsersData.find(author => author.userId === customerId));
    const customerName = customerDetails.nameOfUser;
    const customerEmail = customerDetails.emailOfUser;
    const customerMobile = customerDetails.mobileNoOfUser;
    const typeOfEvent = selectedBooking.typeOfEvent;
    const renderBookedCombos = () => {
        const arrayOfItems = [];
        for (var i = 0; i < selectedBooking.comboTypePriceQuantity.length; i++) {
          arrayOfItems.push(
            <View style={[ styles.destinationColumn, { justifyContent: 'space-between' }]}>
              <Text style={{fontFamily: 'open-sans', fontSize: 16}}>
                <Feather name="package" size={18} color="green" />{selectedBooking.comboTypePriceQuantity[i].name}
              </Text>
              <Text style={{fontFamily: 'open-sans', fontSize: 16}}>
                <Ionicons name="md-pricetag-outline" size={18} color="green" />Price: ₹{selectedBooking.comboTypePriceQuantity[i].price}
              </Text>
              <Text style={{fontFamily: 'open-sans', fontSize: 16}}>
                <FontAwesome5 name="sort-amount-up" size={18} color="green" />Quantity: {selectedBooking.comboTypePriceQuantity[i].quantity}
              </Text>
            </View>
          );
        }
        return arrayOfItems;
    }
    const updateCustomerPaymentStatus = () => {
      Alert.alert('Confirm Payment Received', 'By Proceeding, You Agree That Payment for this Booking Has Been Done by the Customer. Continue?', [
        {
          text: 'Confirm', style: 'default', onPress: () => {
            dispatch(bookingsActions.updatePaymentStatus(firebaseId, true));
            props.navigation.goBack();
          }
        },
        {
          text: 'Nahi!', style: 'destructive', onPress: () => {
            props.navigation.goBack();
          }
        }
      ]);
    };
    if (typeOfEvent === 'Live Concerts' || typeOfEvent === 'Live Shows') {
      const selectedLiveShow = useSelector(state => state.destinations.liveShows.find(destination => destination.id === selectedBooking.destId));
      const renderEighteenPlus = () => {
          if (selectedLiveShow.isEighteenPlus == true)
            return (
              <View style={{backgroundColor: 'red', paddingHorizontal: 4, borderRadius: 5}}>
                <Text style={{fontFamily: 'open-sans', fontSize: 14, color: 'white'}}>
                  <FontAwesome name="minus-circle" size={14} color="white" /> 18+ ONLY
                </Text>
              </View>
            );
          else if (selectedLiveShow.isEighteenPlus == false)
            return (
              <View style={{backgroundColor: 'green', paddingHorizontal: 4, borderRadius: 5}}>
                <Text style={{fontFamily: 'open-sans', fontSize: 14, color: 'white'}}>
                  <FontAwesome name="plus-circle" size={14} color="white" /> OPEN FOR ALL
                </Text>
              </View>
            );
          return <Text></Text>;
      };
      const PaymentReceived = () => {
        if (selectedBooking.paymentReceived === false) {
          return (
            <View style={styles.destinationColumn}>
              <View style={[ styles.destinationRow, { justifyContent: 'center' }]}>
                <Text style={{fontFamily: 'open-sans', fontSize: 18}}>
                  Payment Status:&nbsp;
                </Text>
                <View style={{backgroundColor: 'red', paddingHorizontal: 4, borderRadius: 5}}>
                  <Text style={{fontFamily: 'open-sans', fontSize: 18}}>
                    Not Received By Owner
                  </Text>
                </View>
              </View>
              <Button
                onPress={updateCustomerPaymentStatus}
                title="Customer Has Done The Payment"
                color="#841584"
              />
            </View>
          );
        } else {
          return (
            <View style={styles.destinationColumn}>
              <View style={[ styles.destinationRow, { justifyContent: 'center' }]}>
                <Text style={{fontFamily: 'open-sans', fontSize: 18}}>
                  Payment Status:&nbsp;
                </Text>
                <View style={{backgroundColor: 'green', paddingHorizontal: 4, borderRadius: 5}}>
                  <Text style={{fontFamily: 'open-sans', fontSize: 18}}>
                    Received By Owner
                  </Text>
                </View>
              </View>
            </View>
          );
        }
      };
      return (
        <ScrollView>
          <Image source={{uri: selectedLiveShow.eventForImage}} style={styles.imageStyle} />
          <View style={styles.destinationRow}>
            <Text style={{fontFamily: 'open-sans', fontSize: 14}}>
              <Ionicons name="location-sharp" size={14} color="blue" />{selectedLiveShow.location}
            </Text>
            { renderEighteenPlus() }
          </View>
          <View style={styles.destinationRow}>
            <Text style={{fontFamily: 'open-sans', fontSize: 16}}>
              <Entypo name="address" size={16} color="orange" /> {selectedLiveShow.eventName}
            </Text>
          </View>
          <View style={styles.destinationColumn}>
            <Text style={styles.title}>Performers:</Text>
            {selectedLiveShow.performers.map(combo => <View key={combo} style={styles.listItem}><Text>{combo}</Text></View>)}
          </View>
          <View style={[ styles.destinationColumn, { alignItems: 'center' }]}>
            <Text style={{fontFamily: 'open-sans', fontSize: 18}}>About The Event:</Text>
            <View style={
              {
                borderWidth: 2,
                borderColor: Colors.navyBlueColor,
                borderRadius: 5,
                marginTop: 5,
                padding: 5
              }
            }>
              <Text style={{fontFamily: 'open-sans'}}>{selectedLiveShow.description}</Text>
            </View>
          </View>
          <View style={styles.destinationRow}>
            <Text style={{fontFamily: 'open-sans', fontSize: 18}}>
              <FontAwesome name="phone-square" size={20} color={Colors.primaryColor} /> Contact Manager:
            </Text>
            <View style={{borderWidth: 1, borderColor: '#b8b8b8', borderRadius: 10, paddingHorizontal: 5}}>
              <Text style={{fontFamily: 'open-sans', fontSize: 18}}>{selectedLiveShow.contactOfManager}</Text>
            </View>
          </View>
          <View style={styles.destinationRow}>
            <Text style={{fontFamily: 'open-sans', fontSize: 18}}>
              <FontAwesome name="phone-square" size={20} color={Colors.accentColor} /> Contact Host:
            </Text>
            <View style={{borderWidth: 1, borderColor: '#b8b8b8', borderRadius: 10, paddingHorizontal: 5}}>
              <Text style={{fontFamily: 'open-sans', fontSize: 18}}>{selectedLiveShow.contactOfHost}</Text>
            </View>
          </View>
          <View style={[ styles.destinationColumn, { justifyContent: 'space-between', alignItems: 'center' }]}>
            <Text style={{fontFamily: 'open-sans-bold', fontSize: 18}}>Booked From:</Text>
            <Text style={{fontFamily: 'open-sans', fontSize: 16}}>
              <Ionicons name="calendar" size={18} color="green" />{selectedBooking.startDuration}
            </Text>
            <Text style={{fontFamily: 'open-sans-bold', fontSize: 18}}>To:</Text>
            <Text style={{fontFamily: 'open-sans', fontSize: 16}}>
              <Ionicons name="calendar" size={18} color="red" />{selectedBooking.endDuration}
            </Text>
            <Text style={{fontFamily: 'open-sans-bold', fontSize: 18}}>
              Number of People: <Ionicons name="people" size={18} color="brown" /> {selectedBooking.numberOfMembers}
            </Text>
            <View style={{backgroundColor: '#6dd6de', borderRadius: 10, marginTop:5, paddingHorizontal: 5, paddingVertical: 2}}>
              <Text style={{fontFamily: 'open-sans', fontSize: 18}}>{selectedBooking.typeOfEvent} ({(selectedLiveShow.genreOfEvent)})</Text>
            </View>
          </View>
          <Text style={styles.title}>Selected Combos:</Text>
          {renderBookedCombos().map((combo, key) => <View key={key} style={styles.listItem2}>{combo}</View>)}
          <View style={{
            backgroundColor: 'green',
            marginHorizontal: 20,
            marginBottom: 5,
            padding: 5,
            borderRadius: 10,
            alignItems: 'center'
          }}>
            <Text style={{fontFamily: 'open-sans', fontSize: 22, color: 'white'}}>
              <FontAwesome5 name="money-bill-wave" size={18} color="white" /> Total Bill: ₹{selectedBooking.totalBill}
            </Text>
          </View>
          <View style={[ styles.destinationColumn, { justifyContent: 'space-between', alignItems: 'center' }]}>
            <Text style={{fontFamily: 'open-sans-bold', fontSize: 18}}>Booking Placed By:</Text>
            <Text style={{fontFamily: 'open-sans', fontSize: 18}}>
              <Ionicons name="person" size={18} color="green" /> {customerName}
            </Text>
            <Text style={{fontFamily: 'open-sans', fontSize: 18}}>
              <Ionicons name="mail" size={18} color="red" /> {customerEmail}
            </Text>
            <Text style={{fontFamily: 'open-sans', fontSize: 18}}>
              <Ionicons name="call-sharp" size={18} color="yellow" /> {customerMobile}
            </Text>
          </View>
          <PaymentReceived />
        </ScrollView>
      );
    } else {
      const selectedDestination = useSelector(state => state.destinations.destinations.find(destination => destination.id === selectedBooking.destId));
      const renderVegNonVeg = () => {
          if (selectedDestination.isVegetarian == true)
            return (
              <View style={{backgroundColor: 'green', paddingHorizontal: 4, borderRadius: 5}}>
                <Text style={{fontFamily: 'open-sans', fontSize: 14, color: 'white'}}>
                  <FontAwesome name="dot-circle-o" size={14} color="white" /> VEG.
                </Text>
              </View>
            );
          else if (selectedDestination.isVegetarian == false)
            return (
              <View style={{backgroundColor: 'red', paddingHorizontal: 4, borderRadius: 5}}>
                <Text style={{fontFamily: 'open-sans', fontSize: 14, color: 'white'}}>
                  <FontAwesome name="dot-circle-o" size={14} color="white" /> NON VEG.
                </Text>
              </View>
            );
          return <Text></Text>;
      };
      const PaymentReceived = () => {
        if (selectedBooking.paymentReceived === false) {
          return (
            <View style={styles.destinationColumn}>
              <View style={[ styles.destinationRow, { justifyContent: 'center' }]}>
                <Text style={{fontFamily: 'open-sans', fontSize: 18}}>
                  Payment Status:&nbsp;
                </Text>
                <View style={{backgroundColor: 'red', paddingHorizontal: 4, borderRadius: 5}}>
                  <Text style={{fontFamily: 'open-sans', fontSize: 18}}>
                    Not Received By Owner
                  </Text>
                </View>
              </View>
              <Button
                onPress={updateCustomerPaymentStatus}
                title="Customer Has Done The Payment"
                color="#841584"
              />
            </View>
          );
        } else {
          return (
            <View style={styles.destinationColumn}>
              <View style={[ styles.destinationRow, { justifyContent: 'center' }]}>
                <Text style={{fontFamily: 'open-sans', fontSize: 18}}>
                  Payment Status:&nbsp;
                </Text>
                <View style={{backgroundColor: 'green', paddingHorizontal: 4, borderRadius: 5}}>
                  <Text style={{fontFamily: 'open-sans', fontSize: 18}}>
                    Received By Owner
                  </Text>
                </View>
              </View>
            </View>
          );
        }
      };
      return (
        <ScrollView>
          <Image source={{uri: selectedDestination.destImage}} style={styles.imageStyle} />
          <View style={styles.destinationRow}>
            <Text style={{fontFamily: 'open-sans', fontSize: 14}}>
              <Ionicons name="location-sharp" size={14} color="blue" />{selectedDestination.location}
            </Text>
            { renderVegNonVeg() }
          </View>
          <View style={styles.destinationRow}>
            <Text style={{fontFamily: 'open-sans', fontSize: 16}}>
              <Entypo name="address" size={16} color="orange" /> Full Address: {selectedDestination.fullAddress}
            </Text>
          </View>
          <View style={styles.destinationColumn}>
            <Text style={{fontFamily: 'open-sans', fontSize: 18}}>About Us:</Text>
            <View style={
              {
                borderWidth: 2,
                borderColor: Colors.navyBlueColor,
                borderRadius: 5,
                marginTop: 5,
                padding: 5
              }
            }>
              <Text style={{fontFamily: 'open-sans'}}>{selectedDestination.description}</Text>
            </View>
          </View>
          <View style={styles.destinationRow}>
            <Text style={{fontFamily: 'open-sans', fontSize: 18}}>
              <FontAwesome name="phone-square" size={20} color={Colors.primaryColor} /> Contact Manager:
            </Text>
            <View style={{borderWidth: 1, borderColor: '#b8b8b8', borderRadius: 10, paddingHorizontal: 5}}>
              <Text style={{fontFamily: 'open-sans', fontSize: 18}}>{selectedDestination.contactManager}</Text>
            </View>
          </View>
          <View style={[ styles.destinationColumn, { justifyContent: 'space-between', alignItems: 'center' }]}>
            <Text style={{fontFamily: 'open-sans-bold', fontSize: 18}}>Booked From:</Text>
            <Text style={{fontFamily: 'open-sans', fontSize: 16}}>
              <Ionicons name="calendar" size={18} color="green" />{selectedBooking.startDuration}
            </Text>
            <Text style={{fontFamily: 'open-sans-bold', fontSize: 18}}>To:</Text>
            <Text style={{fontFamily: 'open-sans', fontSize: 16}}>
              <Ionicons name="calendar" size={18} color="red" />{selectedBooking.endDuration}
            </Text>
            <Text style={{fontFamily: 'open-sans-bold', fontSize: 18}}>
              Number of People: <Ionicons name="people" size={18} color="brown" /> {selectedBooking.numberOfMembers}
            </Text>
            <View style={{backgroundColor: '#6dd6de', borderRadius: 10, marginTop:5, paddingHorizontal: 5, paddingVertical: 2}}>
              <Text style={{fontFamily: 'open-sans', fontSize: 18}}>{selectedBooking.typeOfEvent}</Text>
            </View>
          </View>
          <Text style={styles.title}>Selected Combos:</Text>
          {renderBookedCombos().map((combo, key) => <View key={key} style={styles.listItem2}>{combo}</View>)}
          <View style={{
            backgroundColor: 'green',
            marginHorizontal: 20,
            marginBottom: 5,
            padding: 5,
            borderRadius: 10,
            alignItems: 'center'
          }}>
            <Text style={{fontFamily: 'open-sans', fontSize: 22, color: 'white'}}>
              <FontAwesome5 name="money-bill-wave" size={18} color="white" /> Total Bill: ₹{selectedBooking.totalBill}
            </Text>
          </View>
          <View style={[ styles.destinationColumn, { justifyContent: 'space-between', alignItems: 'center' }]}>
            <Text style={{fontFamily: 'open-sans-bold', fontSize: 18}}>Booking Placed By:</Text>
            <Text style={{fontFamily: 'open-sans', fontSize: 18}}>
              <Ionicons name="person" size={18} color="green" /> {customerName}
            </Text>
            <Text style={{fontFamily: 'open-sans', fontSize: 18}}>
              <Ionicons name="mail" size={18} color="red" /> {customerEmail}
            </Text>
            <Text style={{fontFamily: 'open-sans', fontSize: 18}}>
              <Ionicons name="call-sharp" size={18} color="yellow" /> {customerMobile}
            </Text>
          </View>
          <PaymentReceived />
        </ScrollView>
      );
    }
};

CustomerBookingDetails.navigationOptions = navigationData => {
    return {
        headerTitle: 'Overall Booking Details'
    };
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
  },
  destinationRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
      paddingVertical: 5,
      alignItems: 'center',
      backgroundColor: '#ffffff',
      marginHorizontal: 10,
      marginVertical: 3,
      borderRadius: 5,
      shadowColor: 'black',
      shadowOpacity: 0.26,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 10,
      elevation: 5
  },
  destinationColumn: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      backgroundColor: '#ffffff',
      marginHorizontal: 10,
      marginVertical: 3,
      borderRadius: 5,
      shadowColor: 'black',
      shadowOpacity: 0.26,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 10,
      elevation: 5
  },
  imageStyle: {
      width: '100%',
      height: 230
  },
  title: {
      fontFamily: 'open-sans-bold',
      textAlign: 'center',
      fontSize: 18
  },
  listItem: {
      marginVertical: 5,
      marginHorizontal: 20,
      borderColor: Colors.navyBlueColor,
      borderWidth: 1,
      borderRadius: 5,
      padding: 5
  },
  listItem2: {
      marginVertical: 5,
      marginHorizontal: 20,
      backgroundColor: Colors.navyBlueColor,
      borderWidth: 1,
      borderRadius: 5,
      padding: 5
  }
});

export default CustomerBookingDetails;
