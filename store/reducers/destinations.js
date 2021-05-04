import { DESTINATIONS, LIVE_SHOWS_CONCERTS } from '../../data/dummy-data';
import Destination from '../../models/Destination';
import LiveShowDetails from '../../models/LiveShowDetails';
import {
  TOGGLE_FAVORITE,
  SET_FILTERS,
  DELETE_DESTINATION,
  DELETE_LIVE_SHOW,
  ADD_DESTINATION,
  UPDATE_DESTINATION,
  ADD_LIVE_SHOW,
  UPDATE_LIVE_SHOW,
  SET_DESTINATIONS
} from '../actions/destinations';

const initialState = {
    destinations: DESTINATIONS,
    filteredDestinations: DESTINATIONS,
    favoriteDestinations: [],
    liveShows: LIVE_SHOWS_CONCERTS,
    filteredLiveShows: LIVE_SHOWS_CONCERTS
};

const destinationsReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_DESTINATIONS:
        return {
          ...state,
          destinations: action.destinations,
          filteredDestinations: action.destinations
        };
        break;
      case TOGGLE_FAVORITE:
        const existingIndex = state.favoriteDestinations.findIndex(dest => dest.id === action.destinationId);
        if (existingIndex >= 0) {
            const updatedFavorites = [...state.favoriteDestinations];
            updatedFavorites.splice(existingIndex, 1);
            return { ...state, favoriteDestinations: updatedFavorites };
        } else {
            const destination = state.destinations.find(destination => destination.id === action.destinationId);
            return { ...state, favoriteDestinations: state.favoriteDestinations.concat(destination) };
        }
        break;
      case SET_FILTERS:
        const appliedFilters = action.filters;
        const updatedFilteredDestinations = state.destinations.filter(destination => {
            if (destination.categoryIds.indexOf('c8') < 0) {
              if (appliedFilters.vegetarian && !destination.isVegetarian) {
                return false;
              }
            }
            return true;
        });
        const updatedFilteredLiveShows = state.liveShows.filter(liveShow => {
            if (appliedFilters.eighteenPlus && liveShow.isEighteenPlus) {
              return false;
            }
            return true;
        });
        const myUpdate = {
            filteredDestinations: updatedFilteredDestinations,
            filteredLiveShows: updatedFilteredLiveShows
        }
        return { ...state, ...myUpdate };
        break;
      case DELETE_DESTINATION:
        return {
          ...state,
          destinations: state.destinations.filter(dest => dest.firebaseId !== action.did),
          filteredDestinations: state.filteredDestinations.filter(dest => dest.firebaseId !== action.did),
          favoriteDestinations: state.favoriteDestinations.filter(dest => dest.firebaseId !== action.did)
        };
        break;
      case ADD_DESTINATION:
        const newDestination = new Destination(
          action.destinationData.destinationId,
          action.destinationData.firebaseId,
          action.destinationData.ownerId,
          action.destinationData.categoryIds,
          action.destinationData.placeName,
          action.destinationData.location,
          action.destinationData.fullAddress,
          action.destinationData.contactManager,
          action.destinationData.description,
          action.destinationData.destImage,
          action.destinationData.ratingOnTen,
          action.destinationData.noOfRatings,
          action.destinationData.isVegetarian,
          action.destinationData.pricingForCombos
        );
        return {
          ...state,
          destinations: state.destinations.concat(newDestination),
          filteredDestinations: state.filteredDestinations.concat(newDestination)
        };
        break;
      case UPDATE_DESTINATION:
        const destId = state.destinations.findIndex(dest => dest.firebaseId === action.destId);
        const updatedDestination = new Destination(
          action.destinationData.destinationId,
          action.destId,
          action.destinationData.ownerId,
          action.destinationData.categoryIds,
          action.destinationData.placeName,
          action.destinationData.location,
          action.destinationData.fullAddress,
          action.destinationData.contactManager,
          action.destinationData.description,
          action.destinationData.destImage,
          action.destinationData.ratingOnTen,
          action.destinationData.noOfRatings,
          action.destinationData.isVegetarian,
          action.destinationData.pricingForCombos
        );
        const updatedDestinations = [...state.destinations];
        updatedDestinations[destId] = updatedDestination;
        const filteredDestId = state.filteredDestinations.findIndex(dest => dest.firebaseId === action.destId);
        const updatedFilteringDestinations = [...state.filteredDestinations];
        updatedFilteringDestinations[filteredDestId] = updatedDestination;
        const favDestId = state.favoriteDestinations.findIndex(dest => dest.firebaseId === action.destId);
        const updatedFavDestinations = [...state.favoriteDestinations];
        updatedFavDestinations[favDestId] = updatedDestination;
        return {
          ...state,
          destinations: updatedDestinations,
          filteredDestinations: updatedFilteringDestinations,
          favoriteDestinations: updatedFavDestinations
        };
        break;
      case DELETE_LIVE_SHOW:
        return {
          ...state,
          liveShows: state.liveShows.filter(dest => dest.id !== action.lid),
          filteredLiveShows: state.filteredLiveShows.filter(dest => dest.id !== action.lid)
        };
        break;
      case ADD_LIVE_SHOW:
        const newLiveShow = new LiveShowDetails(
          action.liveShowData.liveShowId,
          action.liveShowData.categoryIds,
          action.liveShowData.eventName,
          action.liveShowData.performers,
          action.liveShowData.genreOfEvent,
          action.liveShowData.location,
          action.liveShowData.contactOfManager,
          action.liveShowData.contactOfHost,
          action.liveShowData.description,
          action.liveShowData.duration,
          action.liveShowData.eventForImage,
          action.liveShowData.pricingForEntry,
          action.liveShowData.isEighteenPlus
        );
        return {
          ...state,
          liveShows: state.liveShows.concat(newLiveShow),
          filteredLiveShows: state.filteredLiveShows.concat(newLiveShow)
        };
        break;
      case UPDATE_DESTINATION:
        const liveId = state.liveShows.findIndex(dest => dest.id === action.liveId);
        const updatedLiveShow = new LiveShowDetails(
          action.liveId,
          action.liveShowData.categoryIds,
          action.liveShowData.eventName,
          action.liveShowData.performers,
          action.liveShowData.genreOfEvent,
          action.liveShowData.location,
          action.liveShowData.contactOfManager,
          action.liveShowData.contactOfHost,
          action.liveShowData.description,
          action.liveShowData.duration,
          action.liveShowData.eventForImage,
          action.liveShowData.pricingForEntry,
          action.liveShowData.isEighteenPlus
        );
        const updatedLiveShows = [...state.liveShows];
        updatedLiveShows[liveId] = updatedLiveShow;
        const filteredLiveId = state.filteredLiveShows.findIndex(dest => dest.id === action.liveId);
        const updatedFilteringLiveShows = [...state.filteredLiveShows];
        updatedFilteringLiveShows[filteredLiveId] = updatedLiveShow;
        return {
          ...state,
          liveShows: updatedLiveShows,
          filteredDestinations: updatedFilteringLiveShows
        };
        break;
      default:
        return state;
    }
};

export default destinationsReducer;
