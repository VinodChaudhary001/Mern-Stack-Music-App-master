// CategoryReducer.js

import {
    FETCH_FAVORITES_REQUEST,
    FETCH_FAVORITES_SUCCESS,
    FETCH_FAVORITES_FAILURE,
  } from '../actions/Favouritestypes';
  
  const initialState = {
    favorites: [],
    loading: false,
    error: null,
  };
  
  const FavoritesReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_FAVORITES_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case FETCH_FAVORITES_SUCCESS:
        return {
          ...state,
          favorites: action.payload,
          loading: false,
          error: null,
        };
      case FETCH_FAVORITES_FAILURE:
        return {
          ...state,
          favorites: [],
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default FavoritesReducer;
  