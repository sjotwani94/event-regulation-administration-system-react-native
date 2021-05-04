import React from 'react';
import { Platform, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createSwitchNavigator } from 'react-navigation';
import { createAppContainer } from 'react-navigation';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import StartupScreen from '../screens/StartupScreen';
import AuthScreen from '../screens/AuthScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryDestinationsScreen from '../screens/CategoryDestinationsScreen';
import DestinationDetailsScreen from '../screens/DestinationDetailsScreen';
import LiveShowDetailsScreen from '../screens/LiveShowDetailsScreen';
import BookingsOverviewScreen from '../screens/BookingsOverviewScreen';
import BookingDetailsScreen from '../screens/BookingDetailsScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import FiltersScreen from '../screens/FiltersScreen';
import AdminDestinationsScreen from '../screens/admin/AdminDestinationsScreen';
import AdminLiveShowsScreen from '../screens/admin/AdminLiveShowsScreen';
import EditDestinationsScreen from '../screens/admin/EditDestinationsScreen';
import EditLiveShowsScreen from '../screens/admin/EditLiveShowsScreen';
import Colors from '../constants/Colors';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/CustomHeaderButton';
import CustomDrawerContentComponent from '../components/CustomDrawerContentComponent';

const DestinationNavigator = createStackNavigator(
  {
    Categories: {
      screen: CategoriesScreen
    },
    CategoryDestinations: {
      screen: CategoryDestinationsScreen,
      navigationOptions: {
        headerTitle: 'Available Destinations/Events'
      }
    },
    DestinationDetails: {
      screen: DestinationDetailsScreen
    },
    LiveShowDetails: {
      screen: LiveShowDetailsScreen
    },
    BookingsOverview: {
      screen: BookingsOverviewScreen
    },
    BookingDetails: {
      screen: BookingDetailsScreen
    }
  },
  {
    defaultNavigationOptions: {
      headerTitle: 'ERAS',
      headerTintColor: Platform.OS === 'android' ? Colors.whiteColor : Colors.primaryColor,
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : '',
      },
      headerTitleStyle: {
        fontFamily: 'open-sans'
      }
    },
    navigationOptions: {
      tabBarLabel: <Text style={{fontFamily: 'open-sans'}}>Events</Text>,
    },
  }
);

const FavoriteNavigator = createStackNavigator(
  {
    Favorites: FavoritesScreen,
    DestinationDetails: DestinationDetailsScreen
  },
  {
    defaultNavigationOptions: {
      headerTitle: 'Your Favorites',
      headerTintColor: Platform.OS === 'android' ? Colors.whiteColor : Colors.pinkColor,
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.pinkColor : '',
      },
      headerTitleStyle: {
        fontFamily: 'open-sans'
      }
    },
    navigationOptions: {
      tabBarLabel: <Text style={{fontFamily: 'open-sans'}}>Favorites</Text>,
    },
  }
);

const TabScreenConfig = {
  Destinations: {screen: DestinationNavigator, navigationOptions: {
    tabBarIcon: (tabInfo) => {
      return <MaterialIcons name='event-available' size={25} color={tabInfo.tintColor} />;
    },
    tabBarColor: Colors.primaryColor
  }},
  Favorites: {screen: FavoriteNavigator, navigationOptions: {
    tabBarIcon: (tabInfo) => {
      return <Ionicons name='ios-star' size={25} color={tabInfo.tintColor} />;
    },
    tabBarColor: Colors.pinkColor
  }}
};

const DestinationsFavoriteTabNavigator =
Platform.OS === 'android'
? createMaterialBottomTabNavigator(TabScreenConfig, {
  activeColor: Colors.whiteColor,
  inactiveColor: Colors.lightPinkColor,
  activeBackgroundColor: Colors.primaryColor,
  inactiveBackgroundColor: Colors.pinkColor,
  shifting: true
})
: createBottomTabNavigator(
  TabScreenConfig,
  {
    tabBarOptions: {
      labelStyle: {
        fontFamily: 'open-sans'
      },
      activeTintColor: Colors.whiteColor,
      inactiveTintColor: Colors.primaryColor,
      activeBackgroundColor: Colors.primaryColor,
      inactiveBackgroundColor: Colors.pinkColor
    }
  }
);

const FiltersNavigator = createStackNavigator(
  {
    Filters: FiltersScreen
  },
  {
    defaultNavigationOptions: {
      headerTitle: 'Filter Destinations',
      headerTintColor: Platform.OS === 'android' ? Colors.whiteColor : Colors.navyBlueColor,
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.navyBlueColor : '',
      },
      headerTitleStyle: {
        fontFamily: 'open-sans'
      }
    },
    navigationOptions: {
      drawerLabel: 'Filters!',
    },
  }
);

const AdministrateDestinationsNavigator = createStackNavigator(
  {
    AdminDestination: AdminDestinationsScreen,
    EditDestination: EditDestinationsScreen
  },
  {
    defaultNavigationOptions: {
      headerTitle: 'All Destinations',
      headerTintColor: Platform.OS === 'android' ? Colors.whiteColor : Colors.greener,
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.greener : '',
      },
      headerTitleStyle: {
        fontFamily: 'open-sans'
      }
    },
    navigationOptions: {
      tabBarLabel: <Text style={{fontFamily: 'open-sans'}}>Destinations</Text>,
    },
  }
);

const AdministrateLiveShowsNavigator = createStackNavigator(
  {
    AdminLiveShow: AdminLiveShowsScreen,
    EditLiveShow: EditLiveShowsScreen
  },
  {
    defaultNavigationOptions: {
      headerTitle: 'All Live Shows',
      headerTintColor: Platform.OS === 'android' ? Colors.whiteColor : Colors.greener,
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.greener : '',
      },
      headerTitleStyle: {
        fontFamily: 'open-sans'
      }
    },
    navigationOptions: {
      tabBarLabel: <Text style={{fontFamily: 'open-sans'}}>Live Shows</Text>,
    },
  }
);

const AdminScreenConfig = {
  AdminDestinations: {screen: AdministrateDestinationsNavigator, navigationOptions: {
    tabBarIcon: (tabInfo) => {
      return <MaterialIcons name='event-available' size={25} color={tabInfo.tintColor} />;
    },
    tabBarColor: Colors.greener
  }},
  AdminLiveShows: {screen: AdministrateLiveShowsNavigator, navigationOptions: {
    tabBarIcon: (tabInfo) => {
      return <Ionicons name='ios-star' size={25} color={tabInfo.tintColor} />;
    },
    tabBarColor: Colors.greener
  }}
};

const AdministrationTabNavigator =
Platform.OS === 'android'
? createMaterialBottomTabNavigator(AdminScreenConfig, {
  activeColor: Colors.whiteColor,
  inactiveColor: Colors.greener,
  activeBackgroundColor: Colors.greener,
  inactiveBackgroundColor: Colors.whiteColor,
  shifting: true
})
: createBottomTabNavigator(
  AdminScreenConfig,
  {
    tabBarOptions: {
      labelStyle: {
        fontFamily: 'open-sans'
      },
      activeTintColor: Colors.whiteColor,
      inactiveTintColor: Colors.greener,
      activeBackgroundColor: Colors.greener,
      inactiveBackgroundColor: Colors.whiteColor
    }
  }
);

const MainNavigator = createDrawerNavigator(
  {
    DestinationFavorites: {
      screen: DestinationsFavoriteTabNavigator,
      navigationOptions: {
        drawerLabel: 'Events & Favorite Destinations',
      },
    },
    Filters: FiltersNavigator,
    Administration: {
      screen: AdministrationTabNavigator,
      navigationOptions: {
        drawerLabel: 'Administration',
        drawerIcon: drawerConfig => (
          <FontAwesome
            name="user-secret"
            size={23}
            color={drawerConfig.tintColor}
          />
        )
      },
    }
  },
  {
    contentComponent: CustomDrawerContentComponent,
    drawerPosition: 'left',
    contentOptions: {
      activeTintColor: Colors.primaryColor,
      inactiveTintColor: Colors.greyColor,
      activeBackgroundColor: Colors.lightPurpleColor,
      inactiveBackgroundColor: Colors.whiteColor,
      itemStyle: {
        borderRadius: 8,
        marginVertical: 5,
        marginHorizontal: 2
      },
      labelStyle: {
        fontFamily: 'open-sans',
        fontWeight: 'normal'
      }
    }
  }
);

const AuthorizedNavigator = createSwitchNavigator({
  Startup: StartupScreen,
  Auth: AuthScreen,
  Main: MainNavigator
});

export default createAppContainer(AuthorizedNavigator);
