import React, { useState, useEffect } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, Image, ImageBackground, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import * as authActions from '../store/actions/auth';
import Colors from '../constants/Colors';

const AuthScreen = props => {
    const [errorFound, setErrorFound] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);

    const [email, setEmail] = useState('');
    const [emailIsValid, setEmailIsValid] = useState(false);
    const [emailTouched, setEmailTouched] = useState(false);

    const [password, setPassword] = useState('');
    const [passwordIsValid, setPasswordIsValid] = useState(false);
    const [passwordTouched, setPasswordTouched] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
      if (errorFound) {
        Alert.alert('An Error Occurred!', errorFound, [{ text: 'Okay'}]);
      }
    }, [errorFound])

    const signUpHandler = async () => {
        let action;
        if (isSignUp) {
          action = authActions.signup(email, password);
        } else {
          action = authActions.login(email, password);
        }
        if (emailIsValid && passwordIsValid) {
          setErrorFound(null);
          setIsLoading(true);
          try {
            await dispatch(action);
            if (!isSignUp) {
              props.navigation.navigate('Main');
            } else {
              Alert.alert('Registration Successful!', 'Now you can login using your registered credentials!', [{ text: 'Okay'}]);
              setIsLoading(false);
            }
          } catch (e) {
            setErrorFound(e.message);
            setIsLoading(false);
          }
        } else {
          Alert.alert('Error Submitting Form!', 'Please rectify errors in the form and try again.', [{ text: 'Okay'}]);
        }
    };

    const emailChangeHandler = text => {
      let patternName = /^[a-zA-Z][a-zA-Z0-9_]*([@][a-zA-Z]+([.][a-zA-Z]+)([.][a-zA-Z]*)*)$/;
      if (text.trim().length === 0 || !patternName.test(text)) {
        setEmailIsValid(false);
      } else {
        setEmailIsValid(true);
      }
      setEmail(text);
    };

    const passwordChangeHandler = text => {
      let patternName = /^[a-zA-Z0-9!@#$%^&*]{8,20}$/;
      if (text.trim().length === 0 || !patternName.test(text)) {
        setPasswordIsValid(false);
      } else {
        setPasswordIsValid(true);
      }
      setPassword(text);
    };
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/eras.jpg")}
          style={styles.backgroundImage}
          imageStyle={{
            borderRadius: 18,
            shadowColor: 'black',
            shadowOpacity: 0.26,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 10
          }}
        >
        <View style={styles.child}>
        <View style={styles.logoHandler}>
          <Image
            source={require("../assets/EventManager.jpg")}
            style={styles.image}
          />
        </View>
        <Text style={styles.logo}>Regulation</Text>
        <Text style={styles.logo}>Adminstration</Text>
        <Text style={[ styles.logo, { marginBottom: 40 }]}>System</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Email..."
            placeholderTextColor="#003f5c"
            onChangeText={emailChangeHandler}
            onEndEditing={() => {
              setEmailTouched(true);
            }}
          />
        </View>
          {
            !emailIsValid &&
            emailTouched &&
            <View style={styles.errorMessage}>
              <Text style={{color: '#FFFFFF', fontFamily: 'open-sans'}}>Please Enter A Valid Email Address!</Text>
            </View>
          }
        <View style={styles.inputView}>
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="Password..."
            placeholderTextColor="#003f5c"
            onChangeText={passwordChangeHandler}
            onEndEditing={() => {
              setPasswordTouched(true);
            }}
          />
        </View>
          {
            !passwordIsValid &&
            passwordTouched &&
            <View style={styles.errorMessage}>
              <Text style={{color: '#FFFFFF', fontFamily: 'open-sans'}}>Password Should Be of Minimum 8 & Maximum 20 Characters!</Text>
            </View>
          }
        <TouchableOpacity>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginBtn} onPress={signUpHandler}>
          {
            isLoading ?
            (<ActivityIndicator size="small" color={Colors.whiteColor}/>) :
            (isSignUp ? <Text style={styles.loginText}>SIGN UP</Text> : <Text style={styles.loginText}>LOGIN</Text>)
          }
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setIsSignUp(prevState => !prevState)
          }}
        >
          {isSignUp ? <Text style={styles.loginText}>Switch to Login</Text> : <Text style={styles.loginText}>Switch to Sign Up</Text>}
        </TouchableOpacity>
        </View>
        </ImageBackground>
      </View>
    );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    alignSelf: 'stretch',
    width: null
  },
  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  child: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0, 0, 0, .4)'
  },
  logoHandler: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    overflow: 'hidden'
  },
  image: {
    height: 150,
    width: 150
  },
  logo:{
    fontSize: 18,
    color:"#fb5b5a",
    fontFamily: 'open-sans-bold'
  },
  inputView:{
    width: "80%",
    backgroundColor: "#465881",
    borderRadius: 25,
    height: 50,
    marginBottom: 10,
    justifyContent: "center",
    padding: 20
  },
  errorMessage: {
    width: "80%",
    backgroundColor: "#FF0000",
    borderRadius: 5,
    marginBottom: 10,
    justifyContent: "center",
    padding: 2
  },
  inputText:{
    height: 50,
    color: "white",
    fontFamily: 'open-sans'
  },
  forgot:{
    color:"white",
    fontSize:11,
    fontFamily: 'open-sans'
  },
  loginBtn:{
    width:"80%",
    backgroundColor:"#fb5b5a",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10,
    fontFamily: 'open-sans'
  },
  loginText:{
    color:"white",
    fontFamily: 'open-sans'
  }
});

export default AuthScreen;
