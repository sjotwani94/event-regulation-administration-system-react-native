import React, { useEffect, useCallback } from 'react';
import { ScrollView, View, Image, Text, Button, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { DESTINATIONS } from '../data/dummy-data';
import { useDispatch, useSelector } from 'react-redux';
import CustomHeaderButton from '../components/CustomHeaderButton';
import CustomButton from '../components/CustomButton';
import { Ionicons, AntDesign, FontAwesome, Entypo } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import { toggleFavorite } from '../store/actions/destinations';

const DestinationDetailsScreen = props => {
    const destinationId = props.navigation.getParam('destinationId');
    const currentDestinationIsFavorite = useSelector(state => state.destinations.favoriteDestinations.some(dest => dest.id === destinationId));
    const selectedDestination = useSelector(state => state.destinations.destinations.find(destination => destination.id === destinationId));
    const dispatch = useDispatch();
    const toggleFavoriteHandler = useCallback(() => {
      dispatch(toggleFavorite(destinationId));
    }, [dispatch, destinationId]);

    useEffect(() => {
      props.navigation.setParams({toggleFav: toggleFavoriteHandler});
    }, [toggleFavoriteHandler]);

    useEffect(() => {
      props.navigation.setParams({isFav: currentDestinationIsFavorite});
    }, [currentDestinationIsFavorite]);

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
    }
    const renderDestinationCombos = () => {
        const arrayOfItems = [];
        for (var i = 0; i < selectedDestination.pricingForCombos.length; i++) {
          arrayOfItems.push(
              <Text>
                {selectedDestination.pricingForCombos[i].name}: ₹{selectedDestination.pricingForCombos[i].price}
              </Text>
          );
        }
        return arrayOfItems;
    }
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
        <View style={styles.destinationRow}>
          <Text style={{fontFamily: 'open-sans', fontSize: 18}}>
            <AntDesign name="like1" size={18} color="green" />
            Rating: {selectedDestination.ratingOnTen}/10
          </Text>
          <View style={{backgroundColor: '#b8b8b8', borderRadius: 10, paddingHorizontal: 5}}>
            <Text style={{fontFamily: 'open-sans', fontSize: 18}}>{selectedDestination.noOfRatings} Global Reviews</Text>
          </View>
        </View>
        <Text style={styles.title}>Pricing:</Text>
        {renderDestinationCombos().map((combo, key) => <View key={key} style={styles.listItem}>{combo}</View>)}
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, marginVertical: 3}}>
          <CustomButton onClick={() => {
              props.navigation.popToTop();
          }} >
            Go To Main Page
          </CustomButton>
          <CustomButton onClick={() => {
              props.navigation.navigate({
                routeName: 'BookingsOverview'
              });
          }} >
            Book Destination
          </CustomButton>
        </View>
      </ScrollView>
    );
};

DestinationDetailsScreen.navigationOptions = navigationData => {
    const destinationId = navigationData.navigation.getParam('destinationId');
    const selected = navigationData.navigation.getParam('placeName');
    const toggleFavorite = navigationData.navigation.getParam('toggleFav');
    const isFavorite = navigationData.navigation.getParam('isFav');
    return {
        headerTitle: selected,
        headerRight: () => (
          <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
              title='Favorite'
              iconName={isFavorite ? 'ios-star' : 'ios-star-outline'}
              onPress={toggleFavorite}
            />
          </HeaderButtons>
        )
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

export default DestinationDetailsScreen;
