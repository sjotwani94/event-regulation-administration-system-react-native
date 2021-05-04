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

let placeNameTouched = false;
let locationTouched = false;
let fullAddressTouched = false;
let descriptionTouched = false;
let destImageTouched = false;
let contactManagerTouched = false;
let comboNameTouched = false;
let comboPriceTouched = false;

const EditDestinationsScreen = props => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    const destinationId = props.navigation.getParam('destinationId');
    const allDestLength = useSelector(state => state.destinations.destinations).length + 1;
    const allDestinationDetails = useSelector(state => state.destinations.destinations);
    const editedDestination = useSelector(state => state.destinations.destinations.find(dest => dest.firebaseId === destinationId));
    const [pricingForCombos, setPricingForCombos] = useState(editedDestination ? editedDestination.pricingForCombos : []);
    var items = [
      {
        id: 'c1',
        name: 'Birthday'
      }, {
        id: 'c2',
        name: 'Ceremony'
      }, {
        id: 'c6',
        name: 'Wedding'
      }, {
        id: 'c7',
        name: 'Lunch/Dinner Gathering'
      }, {
        id: 'c8',
        name: 'Tourist Places'
      }
    ];
    const [selectedCategories, setSelectedCategories] = useState(editedDestination ? editedDestination.categoryIds : []);

    const [placeName, setPlaceName] = useState(editedDestination ? editedDestination.placeName : '');
    const [placeNameIsValid, setPlaceNameIsValid] = useState(false);

    const [location, setLocation] = useState(editedDestination ? editedDestination.location : '');
    const [locationIsValid, setLocationIsValid] = useState(false);

    const [fullAddress, setFullAddress] = useState(editedDestination ? editedDestination.fullAddress : '');
    const [fullAddressIsValid, setFullAddressIsValid] = useState(false);

    const [contactManager, setContactManager] = useState(editedDestination ? editedDestination.contactManager : '');
    const [contactManagerIsValid, setContactManagerIsValid] = useState(false);

    const [description, setDescription] = useState(editedDestination ? editedDestination.description : '');
    const [descriptionIsValid, setDescriptionIsValid] = useState(false);

    const [destImage, setDestImage] = useState(editedDestination ? editedDestination.destImage : '');
    const [destImageIsValid, setDestImageIsValid] = useState(false);

    const [ratings, setRatings] = useState(editedDestination ? editedDestination.ratingOnTen : 0);
    const [noOfRatings, setNoOfRatings] = useState(editedDestination ? editedDestination.noOfRatings : 0);
    const [isVegetarian, setIsVegetarian] = useState(editedDestination ? editedDestination.isVegetarian : false);

    const [comboName, setComboName] = useState('');
    const [comboNameIsValid, setComboNameIsValid] = useState(false);

    const [comboPrice, setComboPrice] = useState(0);
    const [comboPriceIsValid, setComboPriceIsValid] = useState(false);

    const initialRender = useRef(true);
    const dispatch = useDispatch();

    useEffect(() => {
      if (initialRender.current) {
        initialRender.current = false;
      } else {
        console.log(pricingForCombos);
        console.log(selectedCategories);
        console.log(ratings);
        if (Platform.OS === 'android') {
          ToastAndroid.show('Combo Details Saved! Change Inputs & Add Another!', ToastAndroid.SHORT)
        } else {
          AlertIOS.alert('Combo Details Saved! Change Inputs & Add Another!');
        }
      }
    }, [pricingForCombos]);

    const submitHandler = useCallback(() => {
      if (!placeNameIsValid || !locationIsValid || !fullAddressIsValid || !contactManagerIsValid || !descriptionIsValid || !destImageIsValid) {
        Alert.alert('Wrong Input!', 'Please Check The Errors in the Form.', [
          { text: 'Okay!' }
        ]);
        return ;
      }
      if (selectedCategories.length <= 0) {
        Alert.alert('Wrong Input!', 'No Categories Are Selected, Make Sure to select at least 1.', [
          { text: 'Okay!' }
        ]);
        return ;
      }
      if (pricingForCombos.length <= 0) {
        Alert.alert('Wrong Input!', 'No Price Combos Are Added, Make Sure to add at least 1.', [
          { text: 'Okay!' }
        ]);
        return ;
      }
      if (editedDestination) {
          dispatch(destinationsActions.updateDestination(editedDestination.id, destinationId, selectedCategories, placeName, location, fullAddress, contactManager, description, destImage, ratings, noOfRatings, isVegetarian, pricingForCombos));
      } else {
          const dId = 'd'+allDestLength;
          console.log(dId);
          dispatch(destinationsActions.addDestination(dId, selectedCategories, placeName, location, fullAddress, contactManager, description, destImage, ratings, noOfRatings, isVegetarian, pricingForCombos));
      }
      placeNameTouched = false;
      locationTouched = false;
      fullAddressTouched = false;
      contactManagerTouched = false;
      descriptionTouched = false;
      destImageTouched = false;
      comboNameTouched = false;
      comboPriceTouched = false;
      props.navigation.goBack();
    }, [dispatch, destinationId, selectedCategories, placeName, location, fullAddress, contactManager, description, destImage, ratings, noOfRatings, isVegetarian, pricingForCombos]);

    useEffect(() => {
      props.navigation.setParams({ submit: submitHandler });
    }, [submitHandler]);

    const saveComboDetails = () => {
      if (!comboNameIsValid || !comboPriceIsValid) {
        Alert.alert('Wrong Input!', 'Please Enter Appropriate Values for Combo Name & Price.', [
          { text: 'Okay!' }
        ]);
        return ;
      }
      setPricingForCombos(pricingForCombos => [...pricingForCombos, {name: comboName, price: comboPrice}]);
    };

    const placeNameChangeHandler = text => {
      let patternName = /^[A-Z][A-Za-z_'/]*([ ][a-zA-Z0-9_'/&]*)*$/;
      if (text.trim().length === 0 || !patternName.test(text)) {
        setPlaceNameIsValid(false);
      } else {
        setPlaceNameIsValid(true);
      }
      setPlaceName(text);
    };

    const locationChangeHandler = text => {
      let patternName = /^[A-Z][A-Za-z_,]*([ ][A-Z][a-zA-Z_,]*)*$/;
      if (text.trim().length === 0 || !patternName.test(text)) {
        setLocationIsValid(false);
      } else {
        setLocationIsValid(true);
      }
      setLocation(text);
    };

    const fullAddressChangeHandler = text => {
      let patternName = /^[A-Za-z0-9][A-Za-z0-9_,]*([ ][a-zA-Z0-9_]*[\s]*[,]*)*$/;
      if (text.trim().length === 0 || !patternName.test(text)) {
        setFullAddressIsValid(false);
      } else {
        setFullAddressIsValid(true);
      }
      setFullAddress(text);
    };

    const contactManagerChangeHandler = text => {
      let patternName = /^[0-9-]{10,15}$/;
      if (text.trim().length === 0 || !patternName.test(text)) {
        setContactManagerIsValid(false);
      } else {
        setContactManagerIsValid(true);
      }
      setContactManager(text);
    };

    const descriptionChangeHandler = text => {
      if (text.trim().length === 0) {
        setDescriptionIsValid(false);
      } else {
        setDescriptionIsValid(true);
      }
      setDescription(text);
    };

    const destImageChangeHandler = text => {
      if (text.trim().length === 0) {
        setDestImageIsValid(false);
      } else {
        setDestImageIsValid(true);
      }
      setDestImage(text);
    };

    const comboNameChangeHandler = text => {
      let patternName = /^[A-Za-z0-9'-:]*([ ][a-zA-Z0-9'-:()]*)*$/;
      if (text.trim().length === 0 || !patternName.test(text)) {
        setComboNameIsValid(false);
      } else {
        setComboNameIsValid(true);
      }
      setComboName(text);
    };

    const comboPriceChangeHandler = text => {
      if (text.trim().length === 0 || parseFloat(text) <= 0) {
        setComboPriceIsValid(false);
      } else {
        setComboPriceIsValid(true);
      }
      setComboPrice(parseFloat(text));
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
            <Text style={styles.placeholder}>Place Name:</Text>
            <TextInput
              style={styles.userInput}
              value={placeName}
              onChangeText={placeNameChangeHandler}
              returnKeyType='next'
              onEndEditing={() => {placeNameTouched = true}}
            />
            {!placeNameIsValid && placeNameTouched && <Text style={{color: '#FF0000', fontFamily: 'open-sans'}}>Please Enter A Valid Place Name!</Text>}
          </View>
          <View style={styles.formControl}>
            <Text style={styles.placeholder}>Location:</Text>
            <TextInput
              style={styles.userInput}
              value={location}
              onChangeText={locationChangeHandler}
              onEndEditing={() => {locationTouched = true}}
            />
            {!locationIsValid && locationTouched && <Text style={{color: '#FF0000', fontFamily: 'open-sans'}}>Please Enter A Valid Location!</Text>}
          </View>
          <View style={styles.formControl}>
            <Text style={styles.placeholder}>Full Address:</Text>
            <TextInput
              style={styles.userInput}
              value={fullAddress}
              onChangeText={fullAddressChangeHandler}
              multiline
              numberOfLines={3}
              onEndEditing={() => {fullAddressTouched = true}}
            />
            {!fullAddressIsValid && fullAddressTouched && <Text style={{color: '#FF0000', fontFamily: 'open-sans'}}>Please Enter A Valid Full Address!</Text>}
          </View>
          <View style={styles.formControl}>
            <Text style={styles.placeholder}>Contact Manager:</Text>
            <TextInput
              style={styles.userInput}
              value={contactManager}
              onChangeText={contactManagerChangeHandler}
              onEndEditing={() => {contactManagerTouched = true}}
            />
            {!contactManagerIsValid && contactManagerTouched && <Text style={{color: '#FF0000', fontFamily: 'open-sans'}}>Please Enter A Valid Contact Number!</Text>}
          </View>
          <View style={styles.formControl}>
            <Text style={styles.placeholder}>Description:</Text>
            <TextInput
              style={styles.userInput}
              value={description}
              onChangeText={descriptionChangeHandler}
              multiline
              numberOfLines={4}
              onEndEditing={() => {descriptionTouched = true}}
            />
            {!descriptionIsValid && descriptionTouched && <Text style={{color: '#FF0000', fontFamily: 'open-sans'}}>Please Enter A Valid Description!</Text>}
          </View>
          <View style={styles.formControl}>
            <Text style={styles.placeholder}>Destination Image URL:</Text>
            <TextInput
              style={styles.userInput}
              value={destImage}
              onChangeText={destImageChangeHandler}
              onEndEditing={() => {destImageTouched = true}}
            />
            {!destImageIsValid && destImageTouched && <Text style={{color: '#FF0000', fontFamily: 'open-sans'}}>Please Enter A Valid Image URL!</Text>}
          </View>
          <View style={styles.formControl}>
            <Text style={styles.placeholder}>Ratings:</Text>
            <TextInput
              style={styles.userInput}
              value={ratings}
              numericvalue
              keyboardType="numeric"
              onChangeText={text => setRatings(parseFloat(text))}
            />
          </View>
          <View style={styles.formControl}>
            <Text style={styles.placeholder}>Number Of Ratings:</Text>
            <TextInput
              style={styles.userInput}
              value={String(noOfRatings)}
              numericvalue
              keyboardType="numeric"
              onChangeText={text => setNoOfRatings(Number(text))}
            />
          </View>
          <View style={styles.formControl}>
            <FilterSwitch label='Vegetarian' value={isVegetarian} onChange={newValue => setIsVegetarian(newValue)} />
          </View>
          <View style={styles.formControl}>
            <Text style={styles.placeholder}>Enter Package Details:</Text>
            <TextInput
              style={styles.userInput}
              placeholder="Name of Combo"
              value={comboName}
              onChangeText={comboNameChangeHandler}
              onEndEditing={() => {comboNameTouched = true}}
            />
            {!comboNameIsValid && comboNameTouched && <Text style={{color: '#FF0000', fontFamily: 'open-sans'}}>Please Enter A Valid Combo Name!</Text>}
            <TextInput
              style={styles.userInput}
              placeholder="Price of Combo"
              numericvalue
              keyboardType="numeric"
              value={comboPrice}
              onChangeText={comboPriceChangeHandler}
              onEndEditing={() => {comboPriceTouched = true}}
            />
            {!comboPriceIsValid && comboPriceTouched && <Text style={{color: '#FF0000', fontFamily: 'open-sans'}}>Please Enter A Valid Combo Price!</Text>}
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

EditDestinationsScreen.navigationOptions = navigationData => {
    const submitFn = navigationData.navigation.getParam('submit');
    return {
        headerTitle: navigationData.navigation.getParam('destinationId') ? 'Edit Destination Details' : 'Add New Destination',
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

export default EditDestinationsScreen;
