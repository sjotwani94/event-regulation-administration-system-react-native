import React from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Platform,
  TouchableHighlight,
  LogBox
} from 'react-native';
import { CATEGORIES } from '../data/dummy-data';
import Colors from '../constants/Colors';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/CustomHeaderButton';

const CategoriesScreen = props => {
    LogBox.ignoreLogs(['Your project is accessing the following APIs']);
    let TouchableComponent = TouchableOpacity;
    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableComponent = TouchableHighlight;
    }
    const renderGridItem = (itemData) => {
        return (
          <TouchableOpacity style={styles.gridItem} onPress={() => {
            props.navigation.navigate({
              routeName: 'CategoryDestinations',
              params: {
                categoryId: itemData.item.id
              }
            });
          }}>
            <View style={styles.screen}>
              <ImageBackground
                source={itemData.item.image}
                imageStyle={{
                  borderRadius: 18,
                  shadowColor: 'black',
                  shadowOpacity: 0.26,
                  shadowOffset: { width: 0, height: 2 },
                  shadowRadius: 10
                }}
                style={styles.image}
              >
                <View style={styles.child}>
                  <Text style={styles.eventName}>{itemData.item.title}</Text>
                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>
      );
    }

    return (
      <View>
        <Text style={styles.titleStyle}>Select A Category of Event to View Available Destinations</Text>
        <FlatList data={CATEGORIES} renderItem={renderGridItem} numColumns={2} />
      </View>
      //   <Button title="Go To Destinations!" onPress={() => {
      //       props.navigation.navigate({routeName: 'CategoryDestinations'});
      //   }} />
    );
};

CategoriesScreen.navigationOptions = navigationData => {
    return {
      headerTitle: 'Event Categories',
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
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    gridItem: {
        flex: 1,
        marginTop: 15,
        height: 120,
        width: 180
    },
    image: {
        width: 180,
        height: 120,
        alignItems: 'center',
        justifyContent: 'center'
    },
    child: {
        width: 180,
        height: 100,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, .4)',
        borderRadius: 18
    },
    eventName: {
        color: '#fff',
        opacity: .9,
        fontFamily: 'open-sans-bold',
        fontSize: 18,
        textAlign: 'center',
        fontWeight: '500',
        marginVertical: 15,
        backgroundColor: 'transparent'
    },
    titleStyle: {
      textAlign: 'center',
      fontSize: 18,
      fontFamily: 'open-sans',
      marginTop: 10,
      marginHorizontal: 20,
      color: Colors.primaryColor
    }
});

export default CategoriesScreen;
