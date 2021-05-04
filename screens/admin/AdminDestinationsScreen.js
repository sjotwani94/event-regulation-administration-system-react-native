import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, Platform, Alert, ActivityIndicator, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/CustomHeaderButton';
import DestinationItem from '../../components/DestinationItem';
import DestinationList from '../../components/DestinationList';
import * as destinationsActions from '../../store/actions/destinations';
import Colors from '../../constants/Colors';

const AdminDestinationsScreen = props => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState();
    const currentUserId = useSelector(state => state.auth.userId);
    const allDestinations = useSelector(state => state.destinations.destinations.filter(dest => dest.ownerId === currentUserId));
    const dispatch = useDispatch();
    const loadDestinations = useCallback(async () => {
      setError(null);
      setIsLoaded(true);
      try {
        await dispatch(destinationsActions.fetchDestinations());
      } catch (e) {
        setError(e.message);
      }
      setIsLoaded(false);
    }, [dispatch, setError, setIsLoaded]);

    useEffect(() => {
      const willFocusSub = props.navigation.addListener('willFocus', loadDestinations);
      return () => {
        willFocusSub.remove();
      };
    }, [loadDestinations]);

    useEffect(() => {
      loadDestinations();
    }, [dispatch, loadDestinations]);
    const editDestinationHandler = (id) => {
        props.navigation.navigate('EditDestination', { destinationId: id });
    };
    if (isLoaded) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size='large' color={Colors.primaryColor}/>
        </View>
      );
    }
    if (error) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontFamily: 'open-sans', marginBottom: 5}}>Some Error Occurred...</Text>
          <Button title="Try Again" onPress={loadDestinations} color={Colors.primaryColor} />
        </View>
      );
    }
    if (!isLoaded && allDestinations.length === 0) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontFamily: 'open-sans'}}>No destinations found! Maybe Start Adding Some!</Text>
        </View>
      );
    }
    const renderDestinationItem = itemData => {
        console.log(allDestinations);
        return (
          <DestinationItem
            placeName={itemData.item.placeName}
            destImage={itemData.item.destImage}
            location={itemData.item.location}
            ratingOnTen={itemData.item.ratingOnTen}
            noOfRatings={itemData.item.noOfRatings}
            isVegetarian={itemData.item.isVegetarian}
            onSelectDestination={() => {
                Alert.alert('Action', 'Which action do you want to perform with selected destination?', [
                  {text: 'Edit Details', style: 'default', onPress: () => {
                    editDestinationHandler(itemData.item.firebaseId);
                  } },
                  {text: 'Delete Destination', style: 'destructive', onPress: () => {
                    dispatch(destinationsActions.deleteDestination(itemData.item.firebaseId));
                  } }
                ]);
            }}
          />
        );
    };
    return (
      <DestinationList
        displayedDestinations={allDestinations}
        renderDestinationItem={renderDestinationItem}
      />
    );
};

AdminDestinationsScreen.navigationOptions = navigationData => {
    return {
        headerTitle: 'All Destinations',
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
        ),
        headerRight: () => (
          <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
              title='Add'
              iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
              onPress={() => {
                navigationData.navigation.navigate('EditDestination');
              }}
            />
          </HeaderButtons>
        )
    };
};

export default AdminDestinationsScreen;
