import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT
} from './actionTypes';
import { registerApi } from '../api/registerApi';
import { loginapi } from '../api/loginApi';
import { setAlert } from './alert';
import { getUsersByIdApi } from '../api/getUsersByIdApi';
import setAuthToken from '../../utils/setAuthToken';

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    //this function will set or remove the token from the header
    setAuthToken(localStorage.token);
  }

  const res = await getUsersByIdApi();
  if (res.status === 200) {
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } else {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// action method for register

export const register =
  ({ firstname, lastname, email, password }) =>
  async (dispatch) => {
    const response = await registerApi({
      firstname,
      lastname,
      email,
      password
    });
    if (response.status === 200) {
      dispatch(setAlert(response.data.msg, 'success'));
    } else {
      dispatch(setAlert(response.data.msg, 'danger'));
    }
  };

//action method for login
export const login =
  ({ email, password }) =>
  async (dispatch) => {
    const response = await loginapi({
      email,
      password
    });
    if (response.status === 200) {
      dispatch({ type: LOGIN_SUCCESS, payload: response.data });
      dispatch(loadUser());
    } else {
      dispatch(setAlert(response.data.msg, 'danger'));
      dispatch({ type: LOGIN_FAIL });
    }
  };

export const logout = () => async (dispatch) => {
  dispatch({ type: LOGOUT });
};
