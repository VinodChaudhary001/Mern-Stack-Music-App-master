// CategoryAction.js

import {
    FETCH_CATEGORIES_REQUEST,
    FETCH_CATEGORIES_SUCCESS,
    FETCH_CATEGORIES_FAILURE,
  } from './types';
  
  // Action creator to fetch categories
  export const fetchCategories = () => {
    return async (dispatch) => {
      dispatch({ type: FETCH_CATEGORIES_REQUEST });
  
      try {
        const response = await fetch('http://localhost:4000/api/categories');
        const data = await response.json();
  
        dispatch({ type: FETCH_CATEGORIES_SUCCESS, payload: data });
      } catch (error) {
        dispatch({ type: FETCH_CATEGORIES_FAILURE, payload: error.message });
      }
    };
  };
  