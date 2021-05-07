import React from 'react';
import { useSelector } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
//import { CATEGORIES, DESTINATIONS, LIVE_SHOWS_CONCERTS } from '../data/dummy-data';
import DestinationItem from '../components/DestinationItem';
import LiveShowItem from '../components/LiveShowItem';
import DestinationList from '../components/DestinationList';

const CategoryDestinationsScreen = props => {
    const catId = props.navigation.getParam('categoryId');
    var availableDestinations;
    if (catId === 'c3' || catId === 'c5') {
        availableDestinations = useSelector(state => state.destinations.filteredLiveShows);
    }
    else if (catId === 'c1' || catId === 'c2' || catId === 'c4' || catId === 'c6' || catId === 'c7' || catId === 'c8') {
        availableDestinations = useSelector(state => state.destinations.filteredDestinations);
    }
    var displayedDestinations;
    if (catId === 'c3' || catId === 'c5') {
        //displayedDestinations = LIVE_SHOWS_CONCERTS.filter(destination => destination.categoryIds === catId);
        displayedDestinations = availableDestinations.filter(destination => destination.categoryIds === catId);
    }
    else if (catId === 'c1' || catId === 'c2' || catId === 'c4' || catId === 'c6' || catId === 'c7' || catId === 'c8') {
        //displayedDestinations = DESTINATIONS.filter(destination => destination.categoryIds.indexOf(catId) >= 0);
        displayedDestinations = availableDestinations.filter(destination => destination.categoryIds.indexOf(catId) >= 0);
    }
    if (displayedDestinations.length === 0) {
      return (
        <View style={styles.container}>
          <Text style={{fontFamily: 'open-sans'}}>No Destinations Found. Maybe Check Your Filters?</Text>
        </View>
      );
    }
    const favoriteDestinations = useSelector(state => state.destinations.favoriteDestinations);
    const renderDestinationItem = itemData => {
      if (catId === 'c3' || catId === 'c5') {
        return (
          <LiveShowItem
            eventName={itemData.item.eventName}
            eventForImage={itemData.item.eventForImage}
            location={itemData.item.location}
            duration={itemData.item.duration}
            genreOfEvent={itemData.item.genreOfEvent}
            isEighteenPlus={itemData.item.isEighteenPlus}
            onSelectDestination={() => {
                props.navigation.navigate({
                  routeName: 'LiveShowDetails',
                  params: {
                    liveShowId: itemData.item.id,
                    eventName: itemData.item.eventName,
                    categoryId: catId
                  }
                });
            }}
          />
        );
      } else {
        const isFavorite = favoriteDestinations.find(dest => dest.id === itemData.item.id);
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
                    isFav: isFavorite,
                    categoryId: catId
                  }
                });
            }}
          />
        );
      }
    };
    return (
      <DestinationList
        displayedDestinations={displayedDestinations}
        renderDestinationItem={renderDestinationItem}
      />
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default CategoryDestinationsScreen;
