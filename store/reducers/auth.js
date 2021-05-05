import { AUTHENTICATE, LOGOUT, SIGNUP, SET_AUTH_USERS } from '../actions/auth';
import AuthUsers from '../../models/AuthUsers';

const initialState = {
    token: null,
    userId: null,
    authUsersData: []
};

export default (state = initialState, action) => {
    switch (action.type) {
      case SET_AUTH_USERS:
        return {
          ...state,
          authUsersData: action.authUsers
        };
        break;
      case AUTHENTICATE:
        return {
          ...state,
          token: action.token,
          userId: action.userId
        };
        break;
      case SIGNUP:
        const newUser = new AuthUsers(
          action.authUserData.userID,
          action.authUserData.userName,
          action.authUserData.email,
          action.authUserData.phoneNumber
        );
        return {
          token: action.token,
          userId: action.userId,
          authUsersData: state.authUsersData.concat(newUser)
        };
        break;
      case LOGOUT:
        return initialState;
        break;
      default:
        return state;
    }
};
