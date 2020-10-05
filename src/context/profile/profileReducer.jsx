import {
  GET_USER_PROFILE,
  GET_USER_NOTIFICATIONS,
  SET_CURRENT_USER,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    default:
      return state;
    case GET_USER_PROFILE:
      return {
        ...state,
        userProfile: action.payload.user,
        navs: action.payload.userConfig,
      };
    case GET_USER_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload,
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
  }
};
