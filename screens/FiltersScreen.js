import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch } from 'react-redux';
import CustomHeaderButton from '../components/CustomHeaderButton';
import Colors from '../constants/Colors';
import { setFilters } from '../store/actions/destinations';

const FilterSwitch = props => {
    return (
      <View style={styles.filterContainer}>
        <Text>{props.label}</Text>
        <Switch
          value={props.value}
          onValueChange={props.onChange}
          trackColor={{true: Colors.greener, false: 'red'}}
          thumbColor={Colors.whiteColor}
        />
      </View>
    );
};

const FiltersScreen = props => {
    const { navigation } = props;
    const [isVegetarian, setIsVegetarian] = useState(false);
    const [isEighteenPlus, setIsEighteenPlus] = useState(false);

    const dispatchEvent = useDispatch();

    const saveFilters = useCallback(() => {
      const appliedFilters = {
        vegetarian: isVegetarian,
        eighteenPlus: isEighteenPlus
      };

      dispatchEvent(setFilters(appliedFilters));
    }, [isVegetarian, isEighteenPlus, dispatchEvent]);

    useEffect(() => {
      navigation.setParams({save: saveFilters});
    }, [saveFilters]);

    return (
      <View style={styles.screen}>
        <Text style={styles.title}>Available Filters / Restrictions</Text>
        <FilterSwitch label='Vegetarian' value={isVegetarian} onChange={newValue => setIsVegetarian(newValue)} />
        <FilterSwitch label='Eighteen Plus' value={isEighteenPlus} onChange={newValue => setIsEighteenPlus(newValue)} />
      </View>
    );
};

FiltersScreen.navigationOptions = navigationData => {
    return {
      headerTitle: 'Filter Destinations',
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
            title='Save'
            iconName='ios-save'
            onPress={navigationData.navigation.getParam('save')}
          />
        </HeaderButtons>
      )
    };
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center'
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        margin: 20,
        textAlign: 'center'
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%'
    }
});

export default FiltersScreen;
