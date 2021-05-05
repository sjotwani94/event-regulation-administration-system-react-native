import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, Platform, Alert, ActivityIndicator, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/CustomHeaderButton';
import LiveShowItem from '../../components/LiveShowItem';
import DestinationList from '../../components/DestinationList';
import * as destinationsActions from '../../store/actions/destinations';
import Colors from '../../constants/Colors';

const AdminLiveShowsScreen = props => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState();
    const currentUserId = useSelector(state => state.auth.userId);
    const allDestinations = useSelector(state => state.destinations.liveShows.filter(dest => dest.ownerId === currentUserId));
    const dispatch = useDispatch();
    const loadLiveShows = useCallback(async () => {
      setError(null);
      setIsLoaded(true);
      try {
        await dispatch(destinationsActions.fetchLiveShows());
      } catch (e) {
        setError(e.message);
      }
      setIsLoaded(false);
    }, [dispatch, setError, setIsLoaded]);

    useEffect(() => {
      const willFocusSub = props.navigation.addListener('willFocus', loadLiveShows);
      return () => {
        willFocusSub.remove();
      };
    }, [loadLiveShows]);

    useEffect(() => {
      loadLiveShows();
    }, [dispatch, loadLiveShows]);
    const editLiveShowHandler = (id) => {
        props.navigation.navigate('EditLiveShow', { liveShowId: id });
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
          <Button title="Try Again" onPress={loadLiveShows} color={Colors.primaryColor} />
        </View>
      );
    }
    if (!isLoaded && allDestinations.length === 0) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontFamily: 'open-sans'}}>No live shows found! Maybe Start Adding Some!</Text>
        </View>
      );
    }
    const renderDestinationItem = itemData => {
        return (
          <LiveShowItem
            eventName={itemData.item.eventName}
            eventForImage={itemData.item.eventForImage}
            location={itemData.item.location}
            duration={itemData.item.duration}
            genreOfEvent={itemData.item.genreOfEvent}
            isEighteenPlus={itemData.item.isEighteenPlus}
            onSelectDestination={() => {
                Alert.alert('Action', 'Which action do you want to perform with selected live show?', [
                  {text: 'Edit Details', style: 'default', onPress: () => {
                    editLiveShowHandler(itemData.item.firebaseId);
                  } },
                  {text: 'Delete Live Show', style: 'destructive', onPress: () => {
                    dispatch(destinationsActions.deleteLiveShow(itemData.item.firebaseId));
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

AdminLiveShowsScreen.navigationOptions = navigationData => {
    return {
        headerTitle: 'All Live Shows',
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
                navigationData.navigation.navigate('EditLiveShow');
              }}
            />
          </HeaderButtons>
        )
    };
};

export default AdminLiveShowsScreen;
