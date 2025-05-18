import {
  FETCH_SONGS_REQUEST,
  FETCH_SONGS_SUCCESS,
  FETCH_SONGS_FAILURE,
} from './Songtypes'; // Import the correct action types

// actions/songActions.js
export const createSongSuccess = (data) => {
    return {
      type: 'CREATE_SONG_SUCCESS',
      payload: data,
    };
  };
  
  export const createSongError = (error) => {
    return {
      type: 'CREATE_SONG_ERROR',
      payload: error,
    };
  };

  export const fetchSong = () => {
    return async (dispatch) => {
      dispatch({ type: FETCH_SONGS_REQUEST }); // Use the correct action type
    
      try {
        const response = await fetch('http://localhost:4000/api/songs');
        const data = await response.json();
    
        dispatch({ type: FETCH_SONGS_SUCCESS, payload: data }); // Use the correct action type
      } catch (error) {
        dispatch({ type: FETCH_SONGS_FAILURE, payload: error.message }); // Use the correct action type
      }
    };
  };