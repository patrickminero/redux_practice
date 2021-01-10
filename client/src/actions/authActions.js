import axios from 'axios';
import { returnedErrors } from './errorActions';
import { USER_LOADED, USER_LOADING, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, REGISTER_SUCCESS, REGISTER_FAIL } from './types';

//check token and load user

export const loadUser = () => (dispatch, getState) =>{
  dispatch({ type: USER_LOADING});

  axios.get('/api/auth/user', tokenConfig(getState))
  .then(res => dispatch({
    type: USER_LOADED,
    payload: res.data
  }))
  .catch(err =>{
    dispatch(returnedErrors(err.response.data, err.response.status))
    dispatch({
      type: AUTH_ERROR,
    })
  })
}

export const register = ({username, email, password}) => dispatch =>{
  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  }
  const body = JSON.stringify({"user":{"username": username, "email":email, "password":password}})

  axios.post('/api/users/register', body, config)
  .then(res => dispatch({
    type: REGISTER_SUCCESS,
    payload: res.data
  }))
  .catch(err => {
    dispatch(returnedErrors(err.response.data, err.response.status, 'REGISTER_FAIL'))
    dispatch({
      type: REGISTER_FAIL
    })
  })
}

export const login = ({email, password}) => dispatch =>{
  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  }
  const body = JSON.stringify({"user":{"email":email, "password":password}})

  axios.post('/api/auth/login', body, config)
  .then(res => dispatch({
    type: LOGIN_SUCCESS,
    payload: res.data
  }))
  .catch(err => {
    dispatch(returnedErrors(err.response.data, err.response.status, 'LOGIN_FAIL'))
    dispatch({
      type: LOGIN_FAIL
    })
  })
}

export const logout = () => {
  return {
    type: LOGOUT_SUCCESS
  }
}

//set up headers and token
export const tokenConfig = (getState) =>{
  const token = getState().auth.token;

  const config = {
    headers: {
      "Content-type": "application/json",
    }
  }

  if(token){
    config.headers['X-auth-token'] = token;
  }

  return config;
}