import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { Ionicons, AntDesign, FontAwesome } from '@expo/vector-icons';

const LiveShowItem = props => {
    const renderAgeRestriction = () => {
        if (props.isEighteenPlus == true)
          return <Text style={{fontFamily: 'open-sans', fontSize: 16}}><FontAwesome name="minus-circle" size={20} color="red" /> 18+ ONLY</Text>;
        else if (props.isEighteenPlus == false)
          return <Text style={{fontFamily: 'open-sans', fontSize: 16}}><FontAwesome name="plus-circle" size={20} color="green" /> OPEN FOR ALL</Text>;
        return <Text></Text>;
    }

    return (
      <View style={styles.destinationItem}>
        <TouchableOpacity onPress={props.onSelectDestination}>
          <View>
            <View style={{...styles.destinationRow, ...styles.destinationHeader}}>
              <ImageBackground source={{uri: props.eventForImage}} style={styles.bgImage}>
                <Text style={styles.title}>{props.eventName}</Text>
              </ImageBackground>
            </View>
            <View style={{...styles.destinationRow, ...styles.destinationDetail}}>
              <Text style={{fontFamily: 'open-sans', fontSize: 18}}>
                <Ionicons name="location-sharp" size={18} color="yellow" /> {props.location}
              </Text>
            </View>
            <View style={{...styles.destinationRow, ...styles.destinationDetail}}>
              <Text style={{fontFamily: 'open-sans', fontSize: 16}}><Ionicons name="timer" size={20} color="green" /> {props.duration}</Text>
            </View>
            <View style={{...styles.destinationRow, ...styles.destinationDetail}}>
              <Text style={{fontFamily: 'open-sans', fontSize: 16}}><AntDesign name="play" size={18} color="#57a0ff" /> {props.genreOfEvent}</Text>
            </View>
            <View style={{...styles.destinationRow, ...styles.destinationDetail}}>
                { renderAgeRestriction() }
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
};

const styles = StyleSheet.create({
    title: {
      fontFamily: 'open-sans-bold',
      fontSize: 16,
      color: 'white',
      backgroundColor: 'rgba(0,0,0,0.5)',
      paddingVertical: 5,
      paddingHorizontal: 12,
      textAlign: 'center'
    },
    destinationItem: {
      height: 300,
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
      height: '66%'
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

export default LiveShowItem;
