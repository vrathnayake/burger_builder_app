import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };

};

export const authSucess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };

};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };

};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('experationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT,

    }
};

export const checkAuthTimeOut = (expiresIn) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expiresIn * 1000);
    };

};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_PATH,
        path: path
    };

};

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authdata = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        //let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAmDI13zPqC60Gkh1wC-KqaOFKbkkc2-44';
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAmDI13zPqC60Gkh1wC-KqaOFKbkkc2-44'
        if (!isSignUp) {
            //url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAmDI13zPqC60Gkh1wC-KqaOFKbkkc2-44'
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAmDI13zPqC60Gkh1wC-KqaOFKbkkc2-44'
        }
        axios.post(url, authdata)
            .then((response) => {
                const experationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('experationDate', experationDate);
                localStorage.setItem('userId', response.data.localId);
                dispatch(authSucess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeOut(response.data.expiresIn));
            })
            .catch((err) => {
                dispatch(authFail(err.response.data.error));
            });
    };

};


export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const experationDate = new Date(localStorage.getItem('experationDate'));
            if (experationDate > new Date()) {
                dispatch(authSucess(token), localStorage.getItem('userId'));
                dispatch(checkAuthTimeOut((experationDate.getTime() - new Date().getTime()) / 1000));
            } else {
                dispatch(logout());

            }
        }

    };

};


