import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import Colors from '../constants/Colors';

const CustomButton = props => {
    return (
        <TouchableHighlight onPress={props.onClick}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>{props.children}</Text>
          </View>
        </TouchableHighlight>
    );
};

const styles = StyleSheet.create({
    button: {
      backgroundColor: Colors.greener,
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 15
    },
    buttonText: {
      color: 'white',
      fontFamily: 'open-sans',
      fontSize: 18
    }
});

export default CustomButton;
