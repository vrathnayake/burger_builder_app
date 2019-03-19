import * as actionTypes from '../actions/actionTypes';
import reducer from './auth';

describe('auth reducer', () => {

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirect: '/'
        });
    });

    it('should store the token on login', () => {
        expect(reducer( {
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirect: '/'
        }, {
                type: actionTypes.AUTH_SUCCESS,
                idToken: 'some-token',
                userId: 'some-user-id'
            })).toEqual({
                token: 'some-token',
                userId: 'some-user-id',
                error: null,
                loading: false,
                authRedirect: '/'
            })
    });


});