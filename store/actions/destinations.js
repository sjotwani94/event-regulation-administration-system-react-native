import Destination from '../../models/Destination';
import LiveShowDetails from '../../models/LiveShowDetails';

export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';
export const SET_FILTERS = 'SET_FILTERS';
export const DELETE_DESTINATION = 'DELETE_DESTINATION';
export const ADD_DESTINATION = 'ADD_DESTINATION';
export const UPDATE_DESTINATION = 'UPDATE_DESTINATION';
export const DELETE_LIVE_SHOW = 'DELETE_LIVE_SHOW';
export const ADD_LIVE_SHOW = 'ADD_LIVE_SHOW';
export const UPDATE_LIVE_SHOW = 'UPDATE_LIVE_SHOW';
export const SET_DESTINATIONS = 'SET_DESTINATIONS';

export const fetchDestinations = () => {
  return async dispatch => {
    try {
      const response = await fetch('https://event-management-system-25cfe-default-rtdb.firebaseio.com/destinations.json');
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const resData = await response.json();
      const loadedDestinations = [];

      for (const key in resData) {
        loadedDestinations.push(
          new Destination(
            resData[key].destinationId,
            key,
            resData[key].ownerId,
            resData[key].categoryIds,
            resData[key].placeName,
            resData[key].location,
            resData[key].fullAddress,
            resData[key].contactManager,
            resData[key].description,
            resData[key].destImage,
            resData[key].ratingOnTen,
            resData[key].noOfRatings,
            resData[key].isVegetarian,
            resData[key].pricingForCombos
          )
        );
      }
      dispatch({ type: SET_DESTINATIONS, destinations: loadedDestinations })
    } catch (e) {
      throw e;
    }
  };
}

export const toggleFavorite = (id) => {
    return { type: TOGGLE_FAVORITE, destinationId: id };
};

export const setFilters = filterSettings => {
    return { type: SET_FILTERS, filters: filterSettings };
};

export const deleteDestination = destinationId => {
    return async (dispatch, getState) => {
      const token = getState().auth.token;
      await fetch(
        `https://event-management-system-25cfe-default-rtdb.firebaseio.com/destinations/${destinationId}.json?auth=${token}`,
        {
          method: 'DELETE'
        }
      );
      dispatch({
        type: DELETE_DESTINATION,
        did: destinationId
      });
    };
};

export const addDestination = (destinationId, categoryIds, placeName, location, fullAddress, contactManager, description, destImage, ratingOnTen, noOfRatings, isVegetarian, pricingForCombos) => {
    return async (dispatch, getState) => {
      const token = getState().auth.token;
      const userId = getState().auth.userId;
      const response = await fetch(`https://event-management-system-25cfe-default-rtdb.firebaseio.com/destinations.json?auth=${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          destinationId,
          ownerId: userId,
          categoryIds,
          placeName,
          location,
          fullAddress,
          contactManager,
          description,
          destImage,
          ratingOnTen,
          noOfRatings,
          isVegetarian,
          pricingForCombos
        })
      });

      const resData = await response.json();

      dispatch({
        type: ADD_DESTINATION,
        destinationData: {
          destinationId,
          firebaseId: resData.name,
          ownerId: userId,
          categoryIds,
          placeName,
          location,
          fullAddress,
          contactManager,
          description,
          destImage,
          ratingOnTen,
          noOfRatings,
          isVegetarian,
          pricingForCombos
        }
      });
    };
};

export const updateDestination = (destinationId, did, categoryIds, placeName, location, fullAddress, contactManager, description, destImage, ratingOnTen, noOfRatings, isVegetarian, pricingForCombos) => {
    return async (dispatch, getState) => {
      const token = getState().auth.token;
      const userId = getState().auth.userId;
      await fetch(`https://event-management-system-25cfe-default-rtdb.firebaseio.com/destinations/${did}.json?auth=${token}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          destinationId,
          ownerId: userId,
          categoryIds,
          placeName,
          location,
          fullAddress,
          contactManager,
          description,
          destImage,
          ratingOnTen,
          noOfRatings,
          isVegetarian,
          pricingForCombos
        })
      });

      dispatch({
        type: UPDATE_DESTINATION,
        destId: did,
        destinationData: {
          destinationId,
          ownerId: userId,
          categoryIds,
          placeName,
          location,
          fullAddress,
          contactManager,
          description,
          destImage,
          ratingOnTen,
          noOfRatings,
          isVegetarian,
          pricingForCombos
        }
      });
    };
};

export const deleteLiveShow = liveShowId => {
    return { type: DELETE_LIVE_SHOW, lid: liveShowId };
};

export const addLiveShow = (liveShowId, categoryIds, eventName, performers, genreOfEvent, location, contactOfManager, contactOfHost, description, duration, eventForImage, pricingForEntry, isEighteenPlus) => {
    return {
      type: ADD_LIVE_SHOW,
      liveShowData: {
        liveShowId,
        categoryIds,
        eventName,
        performers,
        genreOfEvent,
        location,
        contactOfManager,
        contactOfHost,
        description,
        duration,
        eventForImage,
        pricingForEntry,
        isEighteenPlus
      }
    };
};

export const updateLiveShow = (liveShowId, categoryIds, eventName, performers, genreOfEvent, location, contactOfManager, contactOfHost, description, duration, eventForImage, pricingForEntry, isEighteenPlus) => {
    return {
      type: UPDATE_LIVE_SHOW,
      liveId: liveShowId,
      liveShowData: {
        categoryIds,
        eventName,
        performers,
        genreOfEvent,
        location,
        contactOfManager,
        contactOfHost,
        description,
        duration,
        eventForImage,
        pricingForEntry,
        isEighteenPlus
      }
    };
};
