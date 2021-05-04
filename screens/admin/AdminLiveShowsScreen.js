import React from 'react';
import { FlatList, Platform, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/CustomHeaderButton';
import LiveShowItem from '../../components/LiveShowItem';
import DestinationList from '../../components/DestinationList';
import * as destinationsActions from '../../store/actions/destinations';

const AdminLiveShowsScreen = props => {
    const allDestinations = useSelector(state => state.destinations.liveShows);
    const dispatch = useDispatch();
    const editDestinationHandler = (id) => {
        props.navigation.navigate('EditLiveShow', { destinationId: id });
    };
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
                    editDestinationHandler(itemData.item.id);
                  } },
                  {text: 'Delete Destination', style: 'destructive', onPress: () => {
                    dispatch(destinationsActions.deleteLiveShow(itemData.item.id));
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
