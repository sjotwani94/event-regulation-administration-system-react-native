import { AsyncStorage } from 'react-native';
import AuthUsers from '../../models/AuthUsers';

export const AUTHENTICATE = 'AUTHENTICATE';
export const SIGNUP = 'SIGNUP';
export const LOGOUT = 'LOGOUT';
export const SET_AUTH_USERS = 'SET_AUTH_USERS';

let timer;

export const authenticate = (userId, token, expiryTime) => {
    return dispatch => {
      dispatch(setLogoutTimer(expiryTime));
      dispatch({ type: AUTHENTICATE, userId: userId, token: token });
    };
};

export const signup = (email, password, userName, phoneNumber) => {
    return async dispatch => {
        const response = await fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyASa2BP_eyOwBTEKKoF_ZJomyfVm9hrRKk',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            }
        );

        if (!response.ok) {
            const errorResData = await response.json();
            const errorID = errorResData.error.message;
            let message = 'Something Went Wrong!';
            if (errorID === 'EMAIL_EXISTS') {
                message = 'You Are Already Registered!';
            } else if (errorID === 'INVALID_PASSWORD') {
                message = 'Invalid Password!';
            }
            throw new Error(message);
        }

        const resData = await response.json();
        const userID = resData.localId;

        const responseReg = await fetch(`https://event-management-system-25cfe-default-rtdb.firebaseio.com/authUsers.json`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            userID,
            userName,
            phoneNumber,
            email
          })
        });

        const resRegData = await responseReg.json();
        console.log(resRegData);

        console.log(resData);
        dispatch({
          type: SIGNUP,
          userId: resData.localId,
          token: resData.idToken,
          authUserData: {
            userID,
            userName,
            phoneNumber,
            email
          }
        });
    };
};

export const login = (email, password) => {
    return async dispatch => {
        const response = await fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyASa2BP_eyOwBTEKKoF_ZJomyfVm9hrRKk',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            }
        );

        if (!response.ok) {
            const errorResData = await response.json();
            const errorID = errorResData.error.message;
            let message = 'Something Went Wrong!';
            if (errorID === 'EMAIL_NOT_FOUND') {
                message = 'Email Not Registered. Maybe Sign Up First!';
            } else if (errorID === 'INVALID_PASSWORD') {
                message = 'Invalid Password!';
            }
            throw new Error(message);
        }

        const resData = await response.json();
        console.log(resData);
        dispatch(authenticate(resData.localId, resData.idToken, parseInt(resData.expiresIn) * 1000));
        const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
        saveDataToStorage(resData.idToken, resData.localId, expirationDate);
    };
};

export const logout = () => {
    clearLogoutTimer();
    AsyncStorage.removeItem('userData');
    return { type: LOGOUT };
};

export const fetchAuthUsers = () => {
  return async dispatch => {
      const response = await fetch('https://event-management-system-25cfe-default-rtdb.firebaseio.com/authUsers.json');
      const resData = await response.json();
      const loadedAuthUsers = [];

      for (const key in resData) {
        loadedAuthUsers.push(
          new AuthUsers(
            resData[key].userID,
            resData[key].userName,
            resData[key].email,
            resData[key].phoneNumber
          )
        );
      }
      dispatch({ type: SET_AUTH_USERS, authUsers: loadedAuthUsers });
  };
};

const clearLogoutTimer = () => {
    if (timer) {
        clearTimeout(timer);
    }
};

const setLogoutTimer = expirationTime => {
    return dispatch => {
        timer = setTimeout(() => {
            dispatch(logout());
        }, expirationTime);
    };
};

const saveDataToStorage = (token, userId, expirationDate) => {
    AsyncStorage.setItem(
      'userData',
      JSON.stringify({
        token: token,
        userId: userId,
        expiryDate: expirationDate.toISOString()
      })
    );
};
