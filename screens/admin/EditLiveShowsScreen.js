import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  Switch,
  Button,
  LogBox,
  ToastAndroid,
  AlertIOS
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import MultiSelect from 'react-native-multiple-select';
import CustomHeaderButton from '../../components/CustomHeaderButton';
import { CATEGORIES } from '../../data/dummy-data';
import Colors from '../../constants/Colors';
import * as destinationsActions from '../../store/actions/destinations';

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

const EditLiveShowsScreen = props => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    const destinationId = props.navigation.getParam('destinationId');
    const allDestLength = useSelector(state => state.destinations.liveShows).length + 1;
    const allDestinationDetails = useSelector(state => state.destinations.liveShows);
    const editedDestination = useSelector(state => state.destinations.liveShows.find(dest => dest.id === destinationId));
    const [pricingForEntry, setPricingForEntry] = useState(editedDestination ? editedDestination.pricingForEntry : []);
    var items = [
      {
        id: 'c3',
        name: 'Live Concerts'
      }, {
        id: 'c5',
        name: 'Live Shows'
      }
    ];
    const [selectedCategories, setSelectedCategories] = useState(editedDestination ? editedDestination.categoryIds : []);

    const [eventName, setEventName] = useState(editedDestination ? editedDestination.eventName : '');
    const [location, setLocation] = useState(editedDestination ? editedDestination.location : '');
    const [performers, setPeformers] = useState(editedDestination ? editedDestination.performers : []);
    const [nameofPerformer, setNameofPerformer] = useState('');
    const [genreOfEvent, setGenreOfEvent] = useState(editedDestination ? editedDestination.genreOfEvent : '');
    const [contactOfManager, setContactOfManager] = useState(editedDestination ? editedDestination.contactOfManager : '');
    const [contactOfHost, setContactOfHost] = useState(editedDestination ? editedDestination.contactOfHost : '');
    const [description, setDescription] = useState(editedDestination ? editedDestination.description : '');
    const [eventForImage, setEventForImage] = useState(editedDestination ? editedDestination.eventForImage : '');
    const [duration, setDuration] = useState(editedDestination ? editedDestination.duration : '');
    const [isEighteenPlus, setIsEighteenPlus] = useState(editedDestination ? editedDestination.isEighteenPlus : false);

    const [comboName, setComboName] = useState('');
    const [comboPrice, setComboPrice] = useState(0);
    const initialRender = useRef(true);
    const dispatch = useDispatch();

    useEffect(() => {
      if (initialRender.current) {
        initialRender.current = false;
      } else {
        console.log(performers);
        console.log(pricingForEntry);
        console.log(selectedCategories);
        if (Platform.OS === 'android') {
          ToastAndroid.show('Combo Details Saved! Change Inputs & Add Another!', ToastAndroid.SHORT)
        } else {
          AlertIOS.alert('Combo Details Saved! Change Inputs & Add Another!');
        }
      }
    }, [pricingForEntry]);

    const submitHandler = useCallback(() => {
      if (editedDestination) {
          dispatch(destinationsActions.updateLiveShow(destinationId, selectedCategories[0], eventName, performers, genreOfEvent, location, contactOfManager, contactOfHost, description, duration, eventForImage, pricingForEntry, isEighteenPlus));
      } else {
          const dId = 'ls'+allDestLength;
          console.log(dId);
          dispatch(destinationsActions.addLiveShow(dId, selectedCategories[0], eventName, performers, genreOfEvent, location, contactOfManager, contactOfHost, description, duration, eventForImage, pricingForEntry, isEighteenPlus));
      }
      props.navigation.goBack();
    }, [dispatch, destinationId, selectedCategories, eventName, performers, genreOfEvent, location, contactOfManager, contactOfHost, description, duration, eventForImage, pricingForEntry, isEighteenPlus]);

    useEffect(() => {
      props.navigation.setParams({ submit: submitHandler });
    }, [submitHandler]);

    const saveComboDetails = () => {
      setPricingForEntry(pricingForEntry => [...pricingForEntry, {name: comboName, price: comboPrice}]);
    };

    const savePerformers = () => {
      setPeformers(performers => [...performers, nameofPerformer]);
    };

    return (
      <ScrollView>
        <View style={styles.form}>
          <View style={styles.formControl}>
            <Text style={styles.placeholder}>Select Category(ies) for Destination:</Text>
          </View>
          <MultiSelect
            hideTags
            items={items}
            uniqueKey="id"
            onSelectedItemsChange={selectedItems => setSelectedCategories(selectedItems)}
            selectedItems={selectedCategories}
            selectText="  Pick Items"
            searchInputPlaceholderText="Search Items..."
            onChangeInput={(text) => console.log(text)}
            tagRemoveIconColor="#CCC"
            tagBorderColor="#CCC"
            tagTextColor="#CCC"
            selectedItemTextColor="#CCC"
            selectedItemIconColor="#CCC"
            itemTextColor="#000"
            displayKey="name"
            searchInputStyle={{color: '#CCC'}}
            submitButtonColor="#48d22b"
            submitButtonText="Submit"
          />
          <View style={styles.formControl}>
            <Text style={styles.placeholder}>Event Name:</Text>
            <TextInput
              style={styles.userInput}
              value={eventName}
              onChangeText={text => setEventName(text)}
            />
          </View>
          <View style={styles.formControl}>
            <Text style={styles.placeholder}>Enter Performer Name:</Text>
            <TextInput
              style={styles.userInput}
              placeholder="Performer Name"
              value={nameofPerformer}
              onChangeText={text => setNameofPerformer(text)}
            />
            <Button
              onPress={savePerformers}
              title="Save and Add Another"
              color="#841584"
            />
          </View>
          <View style={styles.formControl}>
            <Text style={styles.placeholder}>Location:</Text>
            <TextInput
              style={styles.userInput}
              value={location}
              onChangeText={text => setLocation(text)}
            />
          </View>
          <View style={styles.formControl}>
            <Text style={styles.placeholder}>Genre Of Event:</Text>
            <TextInput
              style={styles.userInput}
              value={genreOfEvent}
              onChangeText={text => setGenreOfEvent(text)}
            />
          </View>
          <View style={styles.formControl}>
            <Text style={styles.placeholder}>Contact Of Manager:</Text>
            <TextInput
              style={styles.userInput}
              value={contactOfManager}
              onChangeText={text => setContactOfManager(text)}
            />
          </View>
          <View style={styles.formControl}>
            <Text style={styles.placeholder}>Contact Of Host:</Text>
            <TextInput
              style={styles.userInput}
              value={contactOfHost}
              onChangeText={text => setContactOfHost(text)}
            />
          </View>
          <View style={styles.formControl}>
            <Text style={styles.placeholder}>Description:</Text>
            <TextInput
              style={styles.userInput}
              value={description}
              onChangeText={text => setDescription(text)}
            />
          </View>
          <View style={styles.formControl}>
            <Text style={styles.placeholder}>Event Image URL:</Text>
            <TextInput
              style={styles.userInput}
              value={eventForImage}
              onChangeText={text => setEventForImage(text)}
            />
          </View>
          <View style={styles.formControl}>
            <Text style={styles.placeholder}>Duration:</Text>
            <TextInput
              style={styles.userInput}
              value={duration}
              onChangeText={text => setDuration(text)}
            />
          </View>
          <View style={styles.formControl}>
            <FilterSwitch label='Eighteen Plus' value={isEighteenPlus} onChange={newValue => setIsEighteenPlus(newValue)} />
          </View>
          <View style={styles.formControl}>
            <Text style={styles.placeholder}>Enter Entry Tickets Details:</Text>
            <TextInput
              style={styles.userInput}
              placeholder="Name of Combo"
              value={comboName}
              onChangeText={text => setComboName(text)}
            />
            <TextInput
              style={styles.userInput}
              placeholder="Price of Combo"
              keyboardType="numeric"
              value={comboPrice}
              onChangeText={text => setComboPrice(parseFloat(text))}
            />
            <Button
              onPress={saveComboDetails}
              title="Save and Add Another"
              color="#841584"
            />
          </View>
        </View>
      </ScrollView>
    );
};

EditLiveShowsScreen.navigationOptions = navigationData => {
    const submitFn = navigationData.navigation.getParam('submit');
    return {
        headerTitle: navigationData.navigation.getParam('destinationId') ? 'Edit Live Show Details' : 'Add New Live Show',
        headerRight: () => (
          <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
              title='Save'
              iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
              onPress={submitFn}
            />
          </HeaderButtons>
        )
    };
};

const styles = StyleSheet.create({
  form: {
    margin: 15,
    padding: 10,
    backgroundColor: '#dbdbdb',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 5
  },
  formControl: {
    width: '100%'
  },
  placeholder: {
    fontFamily: 'open-sans-bold',
    marginVertical: 8
  },
  userInput: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1
  },
  filterContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '80%'
  }
});

export default EditLiveShowsScreen;
