import { REMOVE_OLD_NOTIFICATION } from './constants';
import {
  REQUEST_AUTH_START,
  REQUEST_AUTH_SUCCESS,
  REQUEST_AUTH_FAIL,
  REQUEST_LOGOUT_START,
  REQUEST_LOGOUT_SUCCESS,
  REQUEST_LOGOUT_FAIL,
} from '../auth/constants';

import {
  REQUEST_UPDATE_USER_START,
  REQUEST_UPDATE_USER_SUCCESS,
  REQUEST_UPDATE_USER_FAIL,
  REQUEST_USERS_START,
  REQUEST_USERS_SUCCESS,
  REQUEST_USERS_FAIL,
  REQUEST_USER_CREATE_START,
  REQUEST_USER_CREATE_SUCCESS,
  REQUEST_USER_CREATE_FAIL,
  REQUEST_USER_DELETE_START,
  REQUEST_USER_DELETE_SUCCESS,
  REQUEST_USER_DELETE_FAIL,
} from '../user/constants';


const initialState = {
  messages: [],
  isFetching: false,
  counter: 0,
};

const notificationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_AUTH_START:
    case REQUEST_LOGOUT_START:
    case REQUEST_UPDATE_USER_START:
    case REQUEST_USERS_START:
    case REQUEST_USER_CREATE_START:
    case REQUEST_USER_DELETE_START:
      return {
        ...state,
        isFetching: true,
      };


    case REQUEST_AUTH_SUCCESS:
    case REQUEST_AUTH_FAIL:
    case REQUEST_LOGOUT_SUCCESS:
    case REQUEST_LOGOUT_FAIL:
    case REQUEST_UPDATE_USER_SUCCESS:
    case REQUEST_UPDATE_USER_FAIL:
    case REQUEST_USERS_SUCCESS:
    case REQUEST_USERS_FAIL:
    case REQUEST_USER_CREATE_SUCCESS:
    case REQUEST_USER_CREATE_FAIL:
    case REQUEST_USER_DELETE_SUCCESS:
    case REQUEST_USER_DELETE_FAIL:
      return {
        ...state,
        messages: [
          ...state.messages,
          Object.assign({},
            { body: action.payload.msg }, { id: state.counter }, { type: action.payload.msgType }),
        ],
        counter: state.counter + 1,
        isFetching: false,
      };
    case REMOVE_OLD_NOTIFICATION:
      return {
        ...state,
        messages: state.messages.filter(i => i.id !== action.payload),
      };
    default:
      return state;
  }
};

export default notificationsReducer;
