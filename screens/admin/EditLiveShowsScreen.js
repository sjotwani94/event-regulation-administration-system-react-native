import React, { useState, useEffect, useRef, useCallback, useReducer } from 'react';
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
  AlertIOS,
  Alert
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

const REDUCER_UPDATE = 'REDUCER_UPDATE';

const formReducer = (state, action) => {
  switch (action.type) {
    case REDUCER_UPDATE:
      const updatedValues = {
        ...state.inputValues,
        [action.input]: action.value
      };
      const updatedValidities = {
        ...state.inputValidities,
        [action.input]: action.isValid
      };
      const updatedTouches = {
        ...state.inputTouches,
        [action.input]: true
      };
      let updatedFormIsValid = true;
      for (const key in updatedValidities) {
          updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
      }
      return {
        inputValues: updatedValues,
        inputValidities: updatedValidities,
        inputTouches: updatedTouches,
        formIsValid: updatedFormIsValid
      };
      break;
    default:
      return state;
  }
};

const EditLiveShowsScreen = props => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    const liveShowId = props.navigation.getParam('liveShowId');
    const allDestLength = useSelector(state => state.destinations.liveShows).length + 1;
    const editedDestination = useSelector(state => state.destinations.liveShows.find(dest => dest.firebaseId === liveShowId));
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

    const [formState, dispatchFormState] = useReducer(formReducer, {
      inputValues: {
        eventName: editedDestination ? editedDestination.eventName : '',
        nameofPerformer: '',
        genreOfEvent: editedDestination ? editedDestination.genreOfEvent : '',
        location: editedDestination ? editedDestination.location : '',
        contactOfManager: editedDestination ? editedDestination.contactOfManager : '',
        contactOfHost: editedDestination ? editedDestination.contactOfHost : '',
        description: editedDestination ? editedDestination.description : '',
        duration: editedDestination ? editedDestination.duration : '',
        eventForImage: editedDestination ? editedDestination.eventForImage : '',
        comboName: '',
        comboPrice: 0
      },
      inputValidities: {
        eventName: editedDestination ? true : false,
        nameofPerformer: false,
        genreOfEvent: editedDestination ? true : false,
        location: editedDestination ? true : false,
        contactOfManager: editedDestination ? true : false,
        contactOfHost: editedDestination ? true : false,
        description: editedDestination ? true : false,
        duration: editedDestination ? true : false,
        eventForImage: editedDestination ? true : false,
        comboName: false,
        comboPrice: false
      },
      inputTouches: {
        eventName: editedDestination ? true : false,
        nameofPerformer: false,
        genreOfEvent: editedDestination ? true : false,
        location: editedDestination ? true : false,
        contactOfManager: editedDestination ? true : false,
        contactOfHost: editedDestination ? true : false,
        description: editedDestination ? true : false,
        duration: editedDestination ? true : false,
        eventForImage: editedDestination ? true : false,
        comboName: false,
        comboPrice: false
      },
      formIsValid: editedDestination ? true : false
    });

    const [performers, setPeformers] = useState(editedDestination ? editedDestination.performers : []);
    const [isEighteenPlus, setIsEighteenPlus] = useState(editedDestination ? editedDestination.isEighteenPlus : false);

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
      if (!formState.formIsValid) {
        Alert.alert('Wrong Input!', 'Please Check The Errors in the Form.', [
          { text: 'Okay!' }
        ]);
        return ;
      }
      if (selectedCategories.length <= 0) {
        Alert.alert('Wrong Input!', 'No Categories Are Selected, Make Sure to select one.', [
          { text: 'Okay!' }
        ]);
        return ;
      }
      if (pricingForEntry.length <= 0) {
        Alert.alert('Wrong Input!', 'No Pricing for Entries Are Added, Make Sure to add at least 1.', [
          { text: 'Okay!' }
        ]);
        return ;
      }
      if (editedDestination) {
          dispatch(
            destinationsActions.updateLiveShow(
              editedDestination.id,
              liveShowId,
              selectedCategories[0],
              formState.inputValues.eventName,
              performers,
              formState.inputValues.genreOfEvent,
              formState.inputValues.location,
              formState.inputValues.contactOfManager,
              formState.inputValues.contactOfHost,
              formState.inputValues.description,
              formState.inputValues.duration,
              formState.inputValues.eventForImage,
              pricingForEntry,
              isEighteenPlus
            )
          );
      } else {
          const dId = 'ls'+allDestLength;
          console.log(dId);
          dispatch(
            destinationsActions.addLiveShow(
              dId,
              selectedCategories[0],
              formState.inputValues.eventName,
              performers,
              formState.inputValues.genreOfEvent,
              formState.inputValues.location,
              formState.inputValues.contactOfManager,
              formState.inputValues.contactOfHost,
              formState.inputValues.description,
              formState.inputValues.duration,
              formState.inputValues.eventForImage,
              pricingForEntry,
              isEighteenPlus
            )
          );
      }
      props.navigation.goBack();
    }, [dispatch, liveShowId, selectedCategories, performers, pricingForEntry, isEighteenPlus, formState]);

    useEffect(() => {
      props.navigation.setParams({ submit: submitHandler });
    }, [submitHandler]);

    const saveComboDetails = () => {
      setPricingForEntry(pricingForEntry => [...pricingForEntry, {name: formState.inputValues.comboName, price: parseFloat(formState.inputValues.comboPrice)}]);
    };

    const savePerformers = () => {
      setPeformers(performers => [...performers, formState.inputValues.nameofPerformer]);
    };

    const inputChangeHandler = (inputIdentifier, text) => {
      let patternEventName = /^[A-Z][A-Za-z_'/]*([ ][a-zA-Z0-9_'/&]*)*$/;
      let isValid = true;
      if (inputIdentifier === "eventName" && !patternEventName.test(text)) {
        isValid = false;
      }
      if (text.trim().length <= 0) {
        isValid = false;
      }
      dispatchFormState({
        type: REDUCER_UPDATE,
        value: text,
        isValid: isValid,
        input: inputIdentifier
      });
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
              value={formState.inputValues.eventName}
              onChangeText={inputChangeHandler.bind(this, 'eventName')}
            />
            {!formState.inputValidities.eventName && formState.inputTouches.eventName && <Text style={{color: '#FF0000', fontFamily: 'open-sans'}}>Please Enter A Valid Event Name!</Text>}
          </View>
          <View style={styles.formControl}>
            <Text style={styles.placeholder}>Enter Performer Name:</Text>
            <TextInput
              style={styles.userInput}
              placeholder="Performer Name"
              value={formState.inputValues.nameofPerformer}
              onChangeText={inputChangeHandler.bind(this, 'nameofPerformer')}
            />
            {!formState.inputValidities.nameofPerformer && formState.inputTouches.nameofPerformer && <Text style={{color: '#FF0000', fontFamily: 'open-sans'}}>Please Enter A Valid Performer's Name!</Text>}
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
              value={formState.inputValues.location}
              onChangeText={inputChangeHandler.bind(this, 'location')}
            />
            {!formState.inputValidities.location && formState.inputTouches.location && <Text style={{color: '#FF0000', fontFamily: 'open-sans'}}>Please Enter A Valid Location!</Text>}
          </View>
          <View style={styles.formControl}>
            <Text style={styles.placeholder}>Genre Of Event:</Text>
            <TextInput
              style={styles.userInput}
              value={formState.inputValues.genreOfEvent}
              onChangeText={inputChangeHandler.bind(this, 'genreOfEvent')}
            />
            {!formState.inputValidities.genreOfEvent && formState.inputTouches.genreOfEvent && <Text style={{color: '#FF0000', fontFamily: 'open-sans'}}>Please Enter A Valid Genre of Event!</Text>}
          </View>
          <View style={styles.formControl}>
            <Text style={styles.placeholder}>Contact Of Manager:</Text>
            <TextInput
              style={styles.userInput}
              value={formState.inputValues.contactOfManager}
              onChangeText={inputChangeHandler.bind(this, 'contactOfManager')}
            />
            {!formState.inputValidities.contactOfManager && formState.inputTouches.contactOfManager && <Text style={{color: '#FF0000', fontFamily: 'open-sans'}}>Please Enter A Valid Contact Number!</Text>}
          </View>
          <View style={styles.formControl}>
            <Text style={styles.placeholder}>Contact Of Host:</Text>
            <TextInput
              style={styles.userInput}
              value={formState.inputValues.contactOfHost}
              onChangeText={inputChangeHandler.bind(this, 'contactOfHost')}
            />
            {!formState.inputValidities.contactOfHost && formState.inputTouches.contactOfHost && <Text style={{color: '#FF0000', fontFamily: 'open-sans'}}>Please Enter A Valid Contact Number!</Text>}
          </View>
          <View style={styles.formControl}>
            <Text style={styles.placeholder}>Description:</Text>
            <TextInput
              style={styles.userInput}
              value={formState.inputValues.description}
              onChangeText={inputChangeHandler.bind(this, 'description')}
            />
            {!formState.inputValidities.description && formState.inputTouches.description && <Text style={{color: '#FF0000', fontFamily: 'open-sans'}}>Please Enter A Valid Description!</Text>}
          </View>
          <View style={styles.formControl}>
            <Text style={styles.placeholder}>Event Image URL:</Text>
            <TextInput
              style={styles.userInput}
              value={formState.inputValues.eventForImage}
              onChangeText={inputChangeHandler.bind(this, 'eventForImage')}
            />
            {!formState.inputValidities.eventForImage && formState.inputTouches.eventForImage && <Text style={{color: '#FF0000', fontFamily: 'open-sans'}}>Please Enter A Valid Event Image Link!</Text>}
          </View>
          <View style={styles.formControl}>
            <Text style={styles.placeholder}>Duration:</Text>
            <TextInput
              style={styles.userInput}
              value={formState.inputValues.duration}
              onChangeText={inputChangeHandler.bind(this, 'duration')}
            />
            {!formState.inputValidities.duration && formState.inputTouches.duration && <Text style={{color: '#FF0000', fontFamily: 'open-sans'}}>Please Enter A Valid Duration of Event!</Text>}
          </View>
          <View style={styles.formControl}>
            <FilterSwitch label='Eighteen Plus' value={isEighteenPlus} onChange={newValue => setIsEighteenPlus(newValue)} />
          </View>
          <View style={styles.formControl}>
            <Text style={styles.placeholder}>Enter Entry Tickets Details:</Text>
            <TextInput
              style={styles.userInput}
              placeholder="Name of Combo"
              value={formState.inputValues.comboName}
              onChangeText={inputChangeHandler.bind(this, 'comboName')}
            />
            {!formState.inputValidities.comboName && formState.inputTouches.comboName && <Text style={{color: '#FF0000', fontFamily: 'open-sans'}}>Please Enter A Valid Combo Name!</Text>}
            <TextInput
              style={styles.userInput}
              placeholder="Price of Combo"
              keyboardType="numeric"
              value={formState.inputValues.comboPrice}
              onChangeText={inputChangeHandler.bind(this, 'comboPrice')}
            />
            {!formState.inputValidities.comboPrice && formState.inputTouches.comboPrice && <Text style={{color: '#FF0000', fontFamily: 'open-sans'}}>Please Enter A Valid Combo Price!</Text>}
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
        headerTitle: navigationData.navigation.getParam('liveShowId') ? 'Edit Live Show Details' : 'Add New Live Show',
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
