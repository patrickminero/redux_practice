import { CLEAR_ERRORS, GET_ERRORS } from '../actions/types';

const initialState = {
  message: {},
  status: null,
  id: null
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState, action){
  // eslint-disable-next-line default-case
  switch(action.type){
    case GET_ERRORS:
      return {
        message: action.payload.message,
        status: action.payload.status,
        id: action.payload.id
      }
    case CLEAR_ERRORS:
      return{
        message: {},
        status: null,
        id: null
      }
    default:
      return state;
  }
}