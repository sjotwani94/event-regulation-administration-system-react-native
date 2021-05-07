import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { useSelector } from 'react-redux';
import { Ionicons, AntDesign, FontAwesome, FontAwesome5, MaterialIcons } from '@expo/vector-icons';

const AdminBookingItem = props => {
    const userId = props.userId;
    const destinationId = props.destId;
    const typeOfEvent = props.typeOfEvent;
    var selectedDestination;
    if (typeOfEvent === 'Live Concerts' || typeOfEvent === 'Live Shows') {
      selectedDestination = useSelector(state => state.destinations.liveShows.find(destination => destination.id === destinationId));
      const PaymentReceived = () => {
        if (props.paymentReceived === false) {
          return (
            <View style={[ {...styles.bookingRow, ...styles.bookingDetail}, { justifyContent: 'center' }]}>
              <Text style={{fontFamily: 'open-sans', fontSize: 18}}>
                Payment Status:&nbsp;
              </Text>
              <View style={{backgroundColor: 'red', paddingHorizontal: 4, borderRadius: 5}}>
                <Text style={{fontFamily: 'open-sans', fontSize: 18}}>
                  Not Received By Owner
                </Text>
              </View>
            </View>
          );
        } else {
          return (
            <View style={[ {...styles.bookingRow, ...styles.bookingDetail}, { justifyContent: 'center' }]}>
              <Text style={{fontFamily: 'open-sans', fontSize: 18}}>
                Payment Status:&nbsp;
              </Text>
              <View style={{backgroundColor: 'green', paddingHorizontal: 4, borderRadius: 5}}>
                <Text style={{fontFamily: 'open-sans', fontSize: 18}}>
                  Received By Owner
                </Text>
              </View>
            </View>
          );
        }
      };
      return (
        <View style={styles.bookingItem}>
          <TouchableOpacity onPress={props.onSelectBooking}>
            <View>
              <View style={{...styles.bookingRow, ...styles.bookingHeader}}>
                <ImageBackground source={{uri: selectedDestination.eventForImage}} style={styles.bgImage}>
                  <Text style={styles.title}>{selectedDestination.eventName}</Text>
                </ImageBackground>
              </View>
              <View style={{...styles.bookingRow, ...styles.bookingDetail}}>
                <Text style={{fontFamily: 'open-sans', fontSize: 18}}>
                  <Ionicons name="location-sharp" size={18} color="yellow" /> {selectedDestination.location}
                </Text>
              </View>
              <View style={{...styles.bookingRow, ...styles.bookingDetail}}>
                <Text style={{fontFamily: 'open-sans', fontSize: 18}}><MaterialIcons name="event-seat" size={18} color="blue" /> Type: {props.typeOfEvent} ({props.numberOfMembers} Persons)</Text>
              </View>
              <View style={{backgroundColor: 'orange', marginHorizontal: 5, paddingHorizontal: 5, marginVertical: 1, borderRadius: 5}}>
                <Text style={{fontFamily: 'open-sans', fontSize: 18, color: 'white'}}>
                  <Ionicons name="calendar" size={18} color="white" /> {props.startDuration}
                </Text>
              </View>
              <View style={{...styles.bookingRow, ...styles.bookingDetail}}>
                <Text style={{fontFamily: 'open-sans', fontSize: 18}}>
                  <FontAwesome5 name="money-bill-wave" size={18} color="green" /> Total Bill: ₹{props.totalBill}
                </Text>
              </View>
              <PaymentReceived />
            </View>
          </TouchableOpacity>
        </View>
      );
    } else {
      selectedDestination = useSelector(state => state.destinations.destinations.find(destination => destination.id === destinationId));
      const PaymentReceived = () => {
        if (props.paymentReceived === false) {
          return (
            <View style={[ {...styles.bookingRow, ...styles.bookingDetail}, { justifyContent: 'center' }]}>
              <Text style={{fontFamily: 'open-sans', fontSize: 18}}>
                Payment Status:&nbsp;
              </Text>
              <View style={{backgroundColor: 'red', paddingHorizontal: 4, borderRadius: 5}}>
                <Text style={{fontFamily: 'open-sans', fontSize: 18}}>
                  Not Received By Owner
                </Text>
              </View>
            </View>
          );
        } else {
          return (
            <View style={[ {...styles.bookingRow, ...styles.bookingDetail}, { justifyContent: 'center' }]}>
              <Text style={{fontFamily: 'open-sans', fontSize: 18}}>
                Payment Status:&nbsp;
              </Text>
              <View style={{backgroundColor: 'green', paddingHorizontal: 4, borderRadius: 5}}>
                <Text style={{fontFamily: 'open-sans', fontSize: 18}}>
                  Received By Owner
                </Text>
              </View>
            </View>
          );
        }
      };
      return (
        <View style={styles.bookingItem}>
          <TouchableOpacity onPress={props.onSelectBooking}>
            <View>
              <View style={{...styles.bookingRow, ...styles.bookingHeader}}>
                <ImageBackground source={{uri: selectedDestination.destImage}} style={styles.bgImage}>
                  <Text style={styles.title}>{selectedDestination.placeName}</Text>
                </ImageBackground>
              </View>
              <View style={{...styles.bookingRow, ...styles.bookingDetail}}>
                <Text style={{fontFamily: 'open-sans', fontSize: 18}}>
                  <Ionicons name="location-sharp" size={18} color="yellow" /> {selectedDestination.location}
                </Text>
              </View>
              <View style={{...styles.bookingRow, ...styles.bookingDetail}}>
                <Text style={{fontFamily: 'open-sans', fontSize: 18}}><MaterialIcons name="event-seat" size={18} color="blue" /> Type: {props.typeOfEvent} ({props.numberOfMembers} Persons)</Text>
              </View>
              <View style={{backgroundColor: 'orange', marginHorizontal: 5, paddingHorizontal: 5, marginVertical: 1, borderRadius: 5}}>
                <Text style={{fontFamily: 'open-sans', fontSize: 18, color: 'white'}}>
                  <Ionicons name="calendar" size={18} color="white" /> {props.startDuration}
                </Text>
              </View>
              <View style={{...styles.bookingRow, ...styles.bookingDetail}}>
                <Text style={{fontFamily: 'open-sans', fontSize: 18}}>
                  <FontAwesome5 name="money-bill-wave" size={18} color="green" /> Total Bill: ₹{props.totalBill}
                </Text>
              </View>
              <PaymentReceived />
            </View>
          </TouchableOpacity>
        </View>
      );
    }
};

const styles = StyleSheet.create({
    title: {
      fontFamily: 'open-sans-bold',
      fontSize: 18,
      color: 'white',
      backgroundColor: 'rgba(0,0,0,0.5)',
      paddingVertical: 5,
      paddingHorizontal: 12,
      textAlign: 'center'
    },
    bookingItem: {
      height: 380,
      width: '100%',
      backgroundColor: '#dbdbdb',
      marginBottom: 12,
      borderRadius: 10,
      overflow: 'hidden'
    },
    bookingRow: {
      flexDirection: 'row'
    },
    bookingColumn: {
      flexDirection: 'column'
    },
    bookingHeader: {
      height: '65%'
    },
    bookingDetail: {
      paddingHorizontal: 10,
      paddingVertical: 1,
      alignItems: 'center'
    },
    bgImage: {
      width: '100%',
      height: '100%',
      justifyContent: 'flex-end'
    }
});

export default AdminBookingItem;
