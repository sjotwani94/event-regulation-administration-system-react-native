import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DestinationList from '../components/DestinationList';
import DestinationItem from '../components/DestinationItem';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/CustomHeaderButton';

const FavoritesScreen = props => {
    const favDestinations = useSelector(state => state.destinations.favoriteDestinations);
    const renderDestinationItem = itemData => {
        const random = Math.floor(Math.random() * (itemData.item.categoryIds.length - 0)) + 0;
        const catId = itemData.item.categoryIds[random];
        return (
          <DestinationItem
            placeName={itemData.item.placeName}
            destImage={itemData.item.destImage}
            location={itemData.item.location}
            ratingOnTen={itemData.item.ratingOnTen}
            noOfRatings={itemData.item.noOfRatings}
            isVegetarian={itemData.item.isVegetarian}
            onSelectDestination={() => {
                props.navigation.navigate({
                  routeName: 'DestinationDetails',
                  params: {
                    destinationId: itemData.item.id,
                    placeName: itemData.item.placeName,
                    categoryId: catId
                  }
                });
            }}
          />
       );
    };
    if (favDestinations.length === 0 || !favDestinations) {
      return (
        <View style={styles.container}>
          <Text style={{fontFamily: 'open-sans'}}>No Favorite Destinations Found. Start Adding Some!</Text>
        </View>
      );
    }
    return (
      <DestinationList
        displayedDestinations={favDestinations}
        renderDestinationItem={renderDestinationItem}
      />
    );
};

FavoritesScreen.navigationOptions = navigationData => {
    return {
      headerTitle: 'Saved Favorites',
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default FavoritesScreen;
