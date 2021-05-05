import React from 'react';
import { View, ScrollView, Text, TouchableNativeFeedback, StyleSheet } from 'react-native';
import { Avatar, Divider } from 'react-native-elements';
import { DrawerItems } from 'react-navigation-drawer';
import { SafeAreaView } from 'react-navigation';
import { SimpleLineIcons, FontAwesome } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../constants/Colors';
import * as authActions from '../store/actions/auth';

let nameOfUser;
let emailOfUser;
const CustomDrawerContentComponent = props => {
  const ripple = TouchableNativeFeedback.Ripple('#adacac', false);
  const dispatch = useDispatch();
  const currentUserId = useSelector(state => state.auth.userId);
  const allAuthUsers = useSelector(state => state.auth.authUsersData.find(dest => dest.userId === currentUserId));
  nameOfUser = allAuthUsers ? allAuthUsers.nameOfUser : 'nothing';
  emailOfUser = allAuthUsers ? allAuthUsers.emailOfUser : 'nothing';

  return (
    <View style={{ flex: 1 }}>

      <ScrollView>
        <SafeAreaView
          style={styles.container}
          forceInset={{ top: 'always', horizontal: 'never' }}
        >
          <View style={[ styles.containHeader, { backgroundColor: Colors.primaryColor }]}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Avatar size='large' rounded icon={{ name: 'user-circle-o', type: 'font-awesome', size: 80 }} />
              <Text style={{ color: '#f9f9f9', marginTop: '3%', fontFamily: 'open-sans-bold' }}>Hi {nameOfUser}</Text>
              <Text style={{ color: '#f9f9f9', fontFamily: 'open-sans' }}>{emailOfUser}</Text>
            </View>
          </View>

          <DrawerItems {...props} />

        </SafeAreaView>
      </ScrollView>

      <View elevation={6} style={{ backgroundColor: '#ffffff' }}>
        <View>
          <View>
            <Divider style={{ backgroundColor: '#777f7c90' }} />
          </View>
          <View style={{ paddingVertical: 10, alignItems: 'center', backgroundColor: Colors.primaryColor }}>
            <Text style={{ fontFamily: 'open-sans', fontSize: 13, color: 'white' }}>Event Regulation & Administration System</Text>
          </View>
          <View style={{ marginBottom: '2%' }}>
            <Divider style={{ backgroundColor: '#777f7c90' }} />
          </View>
        </View>
        <TouchableNativeFeedback background={ripple} onPress={() => {
          dispatch(authActions.logout());
        }}>
          <View style={styles.containDrawerOption}>
            <Text style={styles.bottomText}><SimpleLineIcons name="logout" size={22} color={Colors.primaryColor} />  Logout</Text>
          </View>
        </TouchableNativeFeedback>

        <TouchableNativeFeedback background={ripple}>
          <View style={styles.containDrawerOption}>
            <Text style={styles.bottomText}><FontAwesome name="user-secret" size={24} color={Colors.primaryColor} />  Administration</Text>
          </View>
        </TouchableNativeFeedback>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
    container: {

    },
    containDrawerOption: {
      paddingHorizontal: 15,
      paddingVertical: 5
    },
    containHeader: {
      paddingVertical: 10
    },
    bottomText: {
      color: 'black',
      fontFamily: 'open-sans',
      fontSize: 20,
      paddingBottom: 10
    }
});

export default CustomDrawerContentComponent;
