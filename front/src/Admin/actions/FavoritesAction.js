import {
    FETCH_FAVORITES_REQUEST,
    FETCH_FAVORITES_SUCCESS,
    FETCH_FAVORITES_FAILURE,
  } from './Favouritestypes'; // Import the correct action types
  
  // actions/songActions.js
  export const createFavoritesSuccess = (data) => {
    return {
      type: 'CREATE_Favorites_SUCCESS',
      payload: data,
    };
  };
  
  export const createFavoritesError = (error) => {
    return {
      type: 'CREATE_Favorites_ERROR',
      payload: error,
    };
  };
  
  export const fetchFavorites = () => {
    return async (dispatch) => {
      dispatch({ type: FETCH_FAVORITES_REQUEST }); // Use the correct action type
    
      try {
        const response = await fetch('http://localhost:4000/api/favorites');
        const data = await response.json();
    
        dispatch({ type: FETCH_FAVORITES_SUCCESS, payload: data }); // Use the correct action type
      } catch (error) {
        dispatch({ type: FETCH_FAVORITES_FAILURE, payload: error.message }); // Use the correct action type
      }
    };
  };
  export const deleteFavorites = (id) => {
      return async (dispatch, getState) => {
        
        const response = await fetch(`http://localhost:4000/api/deletefavourites/${id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            "auth-token": localStorage.getItem("token")
          }
        });
        const data = await response.json();
        console.log(data)
        
        if (data.deleteCustomer) {
          dispatch({ type: "DELETEFAVOURITES_SUCCESS", payload: data });
        } else {
          dispatch({ type: "DELETEFAVOURITES_FAIL", payload: data });
        }
      }
    };