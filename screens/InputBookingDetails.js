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
  Alert,
  Picker,
  TouchableOpacity,
  Modal
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import MultiSelect from 'react-native-multiple-select';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { FontAwesome5, Fontisto } from '@expo/vector-icons';
import moment from 'moment';
import CustomHeaderButton from '../components/CustomHeaderButton';
import { CATEGORIES } from '../data/dummy-data';
import Colors from '../constants/Colors';
import * as bookingsActions from '../store/actions/bookings';

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

const InputBookingDetails = props => {
    LogBox.ignoreLogs(['Failed prop type']);
    const destinationId = props.navigation.getParam('destId');
    const categoryName = props.navigation.getParam('categoryName');
    const comboPriceDetails = props.navigation.getParam('comboPriceDetails');
    const bookingFor = props.navigation.getParam('estateName');
    const ownerId = props.navigation.getParam('ownerId');
    const ownerDetails = useSelector(state => state.auth.authUsersData.find(author => author.userId === ownerId));
    const ownerName = ownerDetails.nameOfUser;
    const ownerMobileNo = ownerDetails.mobileNoOfUser;
    const allBookingsLength = useSelector(state => state.bookings.allBookings).length + 1;

    const renderComboNames = {};
    for (var i = 0; i < comboPriceDetails.length; i++) {
      var key = comboPriceDetails[i].name;
      var price = comboPriceDetails[i].price;
      renderComboNames.[key] = price;
    }

    const [comboTypePriceQuantity, setComboTypePriceQuantity] = useState([]);
    const [totalBill, setTotalBill] = useState('');
    const [nameOfCombo, setNameOfCombo] = useState('');
    const [priceOfCombo, setPriceOfCombo] = useState('');

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };

    const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);

    const showEndDatePicker = () => {
      setEndDatePickerVisibility(true);
    };

    const hideEndDatePicker = () => {
      setEndDatePickerVisibility(false);
    };

    const [customAlertVisibility, setCustomAlertVisibility] = useState(false);

    const showCustomAlert = (visibility) => {
      setCustomAlertVisibility(visibility);
    };

    const okButtonClicked = () => {
      props.navigation.popToTop();
    }

    const [formState, dispatchFormState] = useReducer(formReducer, {
      inputValues: {
        numberOfMembers: '',
        startDuration: '',
        endDuration: '',
        quantityOfCombo: 0
      },
      inputValidities: {
        numberOfMembers: false,
        startDuration: false,
        endDuration: false,
        quantityOfCombo: false
      },
      inputTouches: {
        numberOfMembers: false,
        startDuration: false,
        endDuration: false,
        quantityOfCombo: false
      },
      formIsValid: false
    });

    const initialRender = useRef(true);
    const dispatch = useDispatch();

    useEffect(() => {
      if (initialRender.current) {
        initialRender.current = false;
      } else {
        console.log(comboTypePriceQuantity);
        let sumOfCombos = 0;
        for (var j = 0; j < comboTypePriceQuantity.length; j++) {
          var price = comboTypePriceQuantity[j].price;
          var quantity = comboTypePriceQuantity[j].quantity;
          sumOfCombos += (price*quantity);
        }
        setTotalBill(sumOfCombos.toString());
        if (Platform.OS === 'android') {
          ToastAndroid.show('Combo Details Saved! Change Inputs & Choose Another if you want!', ToastAndroid.SHORT)
        } else {
          AlertIOS.alert('Combo Details Saved! Change Inputs & Choose Another if you want!');
        }
      }
    }, [comboTypePriceQuantity]);

    const submitHandler = useCallback(() => {
      if (!formState.formIsValid) {
        Alert.alert('Wrong Input!', 'Please Check The Errors in the Form.', [
          { text: 'Okay!' }
        ]);
        return ;
      }
      if (comboTypePriceQuantity.length <= 0) {
        Alert.alert('Wrong Input!', 'No Combo Selected, Make Sure to choose at least 1.', [
          { text: 'Okay!' }
        ]);
        return ;
      }
      const bId = 'b'+allBookingsLength;
      console.log(bId);
      dispatch(
        bookingsActions.addBooking(
          bId,
          ownerId,
          destinationId,
          categoryName,
          parseInt(formState.inputValues.numberOfMembers),
          formState.inputValues.startDuration,
          formState.inputValues.endDuration,
          comboTypePriceQuantity,
          parseFloat(totalBill),
          false
        )
      );
      showCustomAlert(true);
    }, [dispatch, comboTypePriceQuantity, totalBill, formState]);

    useEffect(() => {
      props.navigation.setParams({ submit: submitHandler });
    }, [submitHandler]);

    const saveComboTypePriceQuantityDetails = () => {
      setComboTypePriceQuantity(
        comboTypePriceQuantity => [...comboTypePriceQuantity,
          {
            name: nameOfCombo,
            price: parseFloat(priceOfCombo),
            quantity: parseInt(formState.inputValues.quantityOfCombo)
          }
        ]
      );
    };

    const inputChangeHandler = (inputIdentifier, text) => {
      let isValid = true;
      if (inputIdentifier === 'startDuration') {
        const curDateTime = new Date();
        const selectedDateTime = new Date(text);
        const diffTime = selectedDateTime - curDateTime;
        if (diffTime < 0) {
          isValid = false;
        }
      } else if (inputIdentifier === 'endDuration') {
        const startDateTime = new Date(formState.inputValues.startDuration);
        const selectedDateTime = new Date(text);
        const diffTime = selectedDateTime - startDateTime;
        if (diffTime < 3600000) {
          isValid = false;
        }
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

    const handleConfirm = (date) => {
      inputChangeHandler('startDuration', moment(date).format('MMMM DD YYYY, h:mm:ss A'));
      hideDatePicker();
    };

    const handleEndConfirm = (date) => {
      inputChangeHandler('endDuration', moment(date).format('MMMM DD YYYY, h:mm:ss A'));
      hideEndDatePicker();
    };

    return (
      <ScrollView>
        <View style={styles.form}>
          <View style={styles.formControl}>
            <Text style={[ styles.placeholder, { textAlign: 'center', fontSize: 25 }]}>Booking For:</Text>
          </View>
          <View style={styles.formControlSpecial}>
            <Text style={styles.placeholderSpecial}>Event/Place Name:</Text>
            <TextInput
              style={styles.userInputSpecial}
              value={bookingFor}
              editable={false}
            />
          </View>
          <View style={styles.formControlSpecial}>
            <Text style={styles.placeholderSpecial}>Category:</Text>
            <TextInput
              style={styles.userInputSpecial}
              value={categoryName}
              editable={false}
            />
          </View>
          <View style={styles.formControl}>
            <Text style={styles.placeholder}>Number of Members:</Text>
            <TextInput
              style={styles.userInput}
              keyboardType="numeric"
              value={formState.inputValues.numberOfMembers}
              onChangeText={inputChangeHandler.bind(this, 'numberOfMembers')}
            />
            {!formState.inputValidities.numberOfMembers && formState.inputTouches.numberOfMembers && <Text style={{color: '#FF0000', fontFamily: 'open-sans'}}>Please Enter Valid Number of Members!</Text>}
          </View>
          <View style={styles.formControl}>
            <TouchableOpacity onPress={showDatePicker}>
              <Text style={styles.placeholder}>Book From (Date & Time):</Text>
              <TextInput
                style={styles.userInput}
                value={formState.inputValues.startDuration}
                placeholder="Click Here to set Start Date & Time"
                editable={false}
              />
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="datetime"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
            {!formState.inputValidities.startDuration && formState.inputTouches.startDuration && <Text style={{color: '#FF0000', fontFamily: 'open-sans'}}>Please Enter A Duration Later Than Current One!</Text>}
          </View>
          <View style={styles.formControl}>
            <TouchableOpacity onPress={showEndDatePicker}>
              <Text style={styles.placeholder}>To (Date & Time):</Text>
              <TextInput
                style={styles.userInput}
                value={formState.inputValues.endDuration}
                placeholder="Click Here to set End Date & Time"
                editable={false}
              />
              <DateTimePickerModal
                isVisible={isEndDatePickerVisible}
                mode="datetime"
                onConfirm={handleEndConfirm}
                onCancel={hideEndDatePicker}
              />
            </TouchableOpacity>
            {!formState.inputValidities.endDuration && formState.inputTouches.endDuration && <Text style={{color: '#FF0000', fontFamily: 'open-sans'}}>Please Enter Duration At Least an Hour Later Than Start Duration!</Text>}
          </View>
          <View style={styles.formControl}>
            <Text style={styles.placeholder}>Enter Combo Details:</Text>
            <Picker
              style={styles.userInput}
              selectedValue={nameOfCombo}
              onValueChange={(itemValue, itemIndex) =>
                {
                  setNameOfCombo(itemValue);
                  setPriceOfCombo(renderComboNames[itemValue].toString());
                }
              }>
              {Object.keys(renderComboNames).map((key) => {
                  return (<Picker.Item label={key} value={key} key={key}/>) //if you have a bunch of keys value pair
              })}
            </Picker>
            <TextInput
              style={styles.userInput}
              placeholder="Price of Combo"
              value={priceOfCombo}
            />
            <TextInput
              style={styles.userInput}
              placeholder="Quantity of Combo"
              keyboardType="numeric"
              value={formState.inputValues.quantityOfCombo}
              onChangeText={inputChangeHandler.bind(this, 'quantityOfCombo')}
            />
            {!formState.inputValidities.quantityOfCombo && formState.inputTouches.quantityOfCombo && <Text style={{color: '#FF0000', fontFamily: 'open-sans'}}>Please Enter A Valid Quantity!</Text>}
            <Button
              onPress={saveComboTypePriceQuantityDetails}
              title="Save and Add Another"
              color="#841584"
            />
          </View>
          <View style={styles.formControl}>
            <Text style={styles.placeholder}>Total Bill:</Text>
            <TextInput
              style={styles.userInput}
              value={totalBill}
              editable={false}
              onChangeText={setTotalBill}
            />
          </View>
        </View>
        <Modal
          visible={customAlertVisibility}
          transparent={false}
          animationType={"fade"}
          onRequestClose={() => {showCustomAlert(false)}} >
            <View style={{ flex:1, alignItems: 'center', justifyContent: 'center' }}>
                <View style={styles.alertMainView}>
                    <Text style={styles.alertTitle}>Successful!</Text>
                    <View style={{ width: '100%', height: 2, backgroundColor: '#fff'}} />
                    <Text style={styles.alertMessage}> Your Total Bill Amount is ₹{totalBill}</Text>
                    <Text style={styles.alertMessage}> Owner of Event/Place: {ownerName}</Text>
                    <Text style={styles.alertMessage}> Pay the amount using any of the given wallets to Owner's Mobile No.: {ownerMobileNo}</Text>
                    <Text style={styles.alertMessage}>
                      <FontAwesome5 name="cc-paypal" size={50} color="white" />&nbsp;
                      <FontAwesome5 name="cc-amazon-pay" size={50} color="white" />&nbsp;
                      <FontAwesome5 name="google-wallet" size={50} color="white" />&nbsp;
                      <Fontisto name="payu" size={50} color="white" />
                    </Text>
                    <View style={{ width: '100%', height: 2, backgroundColor: '#fff'}} />
                    <View style={{flexDirection: 'row', height: '10%'}}>
                        <TouchableOpacity
                            style={styles.buttonStyle}
                            onPress={okButtonClicked}
                            activeOpacity={0.7}
                             >
                            <Text style={styles.TextStyle}> OK </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
      </ScrollView>
    );
};

InputBookingDetails.navigationOptions = navigationData => {
    const submitFn = navigationData.navigation.getParam('submit');
    return {
        headerTitle: 'Input Booking Details',
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
    backgroundColor: '#009eb3',
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
  formControlSpecial: {
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    marginHorizontal: 10,
    marginVertical: 3,
    borderRadius: 5,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 5
  },
  placeholder: {
    fontFamily: 'open-sans-bold',
    marginVertical: 8
  },
  placeholderSpecial: {
    color: '#000d96',
    fontFamily: 'open-sans-bold',
    marginVertical: 8
  },
  userInput: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1
  },
  userInputSpecial: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    color: '#6b77ff'
  },
  filterContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '80%'
  },
  alertMainView: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor : "#009688",
      height: 500 ,
      width: '90%',
      borderWidth: 1,
      borderColor: '#fff',
      borderRadius:7
  },
  alertTitle: {
      fontSize: 25,
      color: "#fff",
      textAlign: 'center',
      height: '10%',
      width: '100%',
      fontFamily: 'open-sans-bold',
      marginTop: -10
  },
  alertMessage: {
      fontSize: 20,
      color: "#fff",
      textAlign: 'center',
      height: '17%',
      fontFamily: 'open-sans'
  },
  buttonStyle: {
      width: '50%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center'
  },
  TextStyle: {
      color:'#fff',
      textAlign:'center',
      fontSize: 22,
      marginTop: 25
  }
});

export default InputBookingDetails;
