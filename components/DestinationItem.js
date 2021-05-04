import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { Ionicons, AntDesign, FontAwesome } from '@expo/vector-icons';

const DestinationItem = props => {
    const renderVegNonVeg = () => {
        if (props.isVegetarian == true)
          return <Text style={{fontFamily: 'open-sans', fontSize: 16}}><FontAwesome name="dot-circle-o" size={20} color="green" /> VEG.</Text>;
        else if (props.isVegetarian == false)
          return <Text style={{fontFamily: 'open-sans', fontSize: 16}}><FontAwesome name="dot-circle-o" size={20} color="red" /> NON VEG.</Text>;
        return <Text></Text>;
    }

    return (
      <View style={styles.destinationItem}>
        <TouchableOpacity onPress={props.onSelectDestination}>
          <View>
            <View style={{...styles.destinationRow, ...styles.destinationHeader}}>
              <ImageBackground source={{uri: props.destImage}} style={styles.bgImage}>
                <Text style={styles.title}>{props.placeName}</Text>
              </ImageBackground>
            </View>
            <View style={{...styles.destinationRow, ...styles.destinationDetail}}>
              <Text style={{fontFamily: 'open-sans', fontSize: 18}}>
                <Ionicons name="location-sharp" size={18} color="yellow" /> {props.location}
              </Text>
            </View>
            <View style={{...styles.destinationRow, ...styles.destinationDetail}}>
              <Text style={{fontFamily: 'open-sans', fontSize: 18}}><AntDesign name="like1" size={18} color="green" /> {props.ratingOnTen}/10 ({props.noOfRatings} Reviews)</Text>
            </View>
            <View style={{...styles.destinationRow, ...styles.destinationDetail}}>
                { renderVegNonVeg() }
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
};

const styles = StyleSheet.create({
    title: {
      fontFamily: 'open-sans-bold',
      fontSize: 18,
      color: 'white',
      backgroundColor: 'rgba(0,0,0,0.5)',
      paddingVertical: 5,
      paddingHorizontal: 12,
      textAlign: 'center'
    },
    destinationItem: {
      height: 280,
      width: '100%',
      backgroundColor: '#dbdbdb',
      marginBottom: 12,
      borderRadius: 10,
      overflow: 'hidden'
    },
    destinationRow: {
      flexDirection: 'row'
    },
    destinationColumn: {
      flexDirection: 'column'
    },
    destinationHeader: {
      height: '72%'
    },
    destinationDetail: {
      paddingHorizontal: 10,
      paddingVertical: 1,
      alignItems: 'center'
    },
    bgImage: {
      width: '100%',
      height: '100%',
      justifyContent: 'flex-end'
    }
});

export default DestinationItem;
