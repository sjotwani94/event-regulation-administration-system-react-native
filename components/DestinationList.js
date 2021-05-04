import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';

const DestinationList = props => {
    return (
      <View style={styles.list}>
        <FlatList
          data={props.displayedDestinations}
          keyExtractor={(item, index) => item.id}
          renderItem={props.renderDestinationItem}
          style={{width: '100%', padding: 10}}
        />
      </View>
    );
};

const styles = StyleSheet.create({
    list: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default DestinationList;
