import axios from 'axios';
import { createSongSuccess, createSongError } from './SongAction'; 
import {createFavoritesSuccess, createFavoritesError } from './FavoritesAction'; 

export const LoginUser = AdminUser => {
  return async (dispatch, getState) => {
    const response = await fetch("http://localhost:4000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      },
      body: JSON.stringify(AdminUser)
    });
    const data = await response.json();

    if (data.token) {
      localStorage.setItem("token", data.token);
      dispatch({ type: "LOGIN_SUCCESS", payload: data });
    } else {
      dispatch({ type: "LOGIN_FAIL", payload: data });
    }
  };
};



export const RegisterUser = AdminUser => {
  return async (dispatch, getState) => {
    const response = await fetch("http://localhost:4000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      },
      body: JSON.stringify(AdminUser)
    });
    const data = await response.json();

    if (data.token) {
      localStorage.setItem("token", data.token);
      dispatch({ type: "LOGIN_SUCCESS", payload: data });
    } else {
      dispatch({ type: "LOGIN_FAIL", payload: data });
    }
  };
};

export const createCategory = (AdminUser) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch("http://localhost:4000/api/category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify(AdminUser)
      });

      if (!response.ok) {
        throw new Error('Failed to create category');
      }

      const data = await response.json();

      // Dispatch an action to update the state, if needed
      dispatch({ type: 'CREATE_CATEGORY_SUCCESS', payload: data });

      // Optionally, return the data received from the server
      return data;
    } catch (error) {
      // Dispatch an action to handle the error
      dispatch({ type: 'CREATE_CATEGORY_ERROR', payload: error.message });

      // Optionally, rethrow the error to propagate it
      throw error;
    }
  };
};

export const createSongs = (AdminUser) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch("http://localhost:4000/api/song", {
        method: "POST",
        headers: {
          // Do not set Content-Type here, it will be set automatically by FormData
        },
        body: AdminUser, // Pass the form data directly as the body
      });

      if (!response.ok) {
        throw new Error('Failed to create song');
      }

      const data = await response.json();

      // Dispatch an action to update the state, if needed
      dispatch(createSongSuccess(data));

      // Optionally, return the data received from the server
      return data;
    } catch (error) {
      // Dispatch an action to handle the error
      dispatch(createSongError(error.message));

      // Optionally, rethrow the error to propagate it
      throw error;
    }
  };
};


export const getAdminProfile = AdminUser => {
  return async (dispatch, getState) => {
  const response = await fetch(
      "http://localhost:4000/api/getAdminProfile",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          "auth-token": localStorage.getItem("token")
        },
        body: JSON.stringify(AdminUser)
      }
    );
    const data = await response.json();
    
    if (!data.AdminProfile) {
      dispatch({ type: "GETADMIN_FAIL", payload: data });
      
    } else {
      dispatch({ type: "GETADMIN_SUCCESS", payload: data });
    }
  };
};


// createFavorites action creator
export const createFavorites = (formData) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch("http://localhost:4000/api/create-favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set Content-Type header
        },
        body: JSON.stringify(formData), // Stringify the form data
      });

      if (!response.ok) {
        throw new Error('Failed to create favorites');
      }

      const data = await response.json();

      // Dispatch an action to update the state, if needed
      dispatch(createFavoritesSuccess(data));

      // Optionally, return the data received from the server
      return data;
    } catch (error) {
      // Dispatch an action to handle the error
      dispatch(createFavoritesError(error.message));

      // Optionally, rethrow the error to propagate it
      throw error;
    }
  };
};

export const updateSong = (songId, formData) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/updatesong/${songId}`,
        {
          method: "PUT",
          headers: {
            "auth-token": localStorage.getItem("token")
          },
          body: formData
        }
      );
      const data = await response.json();
      
      if (!data.updatedSong) {
        dispatch({ type: "UPDATE_SONG_FAIL", payload: data });
      } else {
        dispatch({ type: "UPDATE_SONG_SUCCESS", payload: data.updatedSong });
      }
    } catch (error) {
      console.error('Error updating song:', error);
      dispatch({ type: "UPDATE_SONG_ERROR", payload: error.message });
    }
  };
};
