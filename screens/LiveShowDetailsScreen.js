import React from 'react';
import { ScrollView, View, Image, Text, Button, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { LIVE_SHOWS_CONCERTS } from '../data/dummy-data';
import { useDispatch, useSelector } from 'react-redux';
import CustomHeaderButton from '../components/CustomHeaderButton';
import CustomButton from '../components/CustomButton';
import { Ionicons, AntDesign, FontAwesome, Entypo } from '@expo/vector-icons';
import Colors from '../constants/Colors';

const LiveShowDetailsScreen = props => {
    const liveShowId = props.navigation.getParam('liveShowId');
    const selectedLiveShow = useSelector(state => state.destinations.liveShows.find(destination => destination.id === liveShowId));
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
    }
    const renderLiveShowCombos = () => {
        const arrayOfItems = [];
        for (var i = 0; i < selectedLiveShow.pricingForEntry.length; i++) {
          arrayOfItems.push(
              <Text>
                {selectedLiveShow.pricingForEntry[i].name}: ₹{selectedLiveShow.pricingForEntry[i].price}
              </Text>
          );
        }
        return arrayOfItems;
    }
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
        <View style={[ styles.destinationColumn, { justifyContent: 'space-between' }]}>
          <Text style={{fontFamily: 'open-sans', fontSize: 16}}>
            <Ionicons name="time" size={18} color="green" />
            {selectedLiveShow.duration}
          </Text>
          <View style={{backgroundColor: '#b8b8b8', borderRadius: 10, marginTop:5, paddingHorizontal: 5, paddingVertical: 2, alignSelf:'baseline'}}>
            <Text style={{fontFamily: 'open-sans', fontSize: 18}}>{selectedLiveShow.genreOfEvent}</Text>
          </View>
        </View>
        <Text style={styles.title}>Pricing:</Text>
        {renderLiveShowCombos().map((combo, key) => <View key={key} style={styles.listItem}>{combo}</View>)}
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, marginVertical: 3}}>
          <CustomButton onClick={() => {
              props.navigation.popToTop();
          }} >
            Go To Main Page
          </CustomButton>
          <CustomButton onClick={() => {
              props.navigation.popToTop();
          }} >
            Book A Ticket
          </CustomButton>
        </View>
      </ScrollView>
    );
};

LiveShowDetailsScreen.navigationOptions = navigationData => {
    const liveShowId = navigationData.navigation.getParam('liveShowId');
    const selectedLiveShow = navigationData.navigation.getParam('eventName');;
    return {
        headerTitle: 'Event Details'
    };
};

const styles = StyleSheet.create({
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
    }
});

export default LiveShowDetailsScreen;
