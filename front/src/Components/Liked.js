import React, { useState, useEffect } from "react";
import { FaRegClock, FaRegHeart, FaHeart } from "react-icons/fa";
import { fetchFavorites } from '../Admin/actions/FavoritesAction';
import { fetchSong } from '../Admin/actions/SongAction';
import { connect } from 'react-redux';
import Header from "./Header";
import { AudioList } from "./AudioList";
function Liked(props) {
  const [songs, setSongs] = useState([]);
  const [favoritesSongs, setFavoritesSongs] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    props.fetchSong();
    props.fetchFavorites();
  }, []);

  useEffect(() => {
    // Filter songs based on favorite IDs
    const filteredSongs = props.songs.filter(song => 
      props.favorites.some(favorite => favorite.song_id === song._id)
    );
    setFavoritesSongs(filteredSongs);
  }, [props.favorites, props.songs]);

  const changeFavourite = (id) => {
    // Update favorite status
    setFavoritesSongs(prevSongs =>
      prevSongs.map(song =>
        song._id === id ? { ...song, favourite: !song.favourite } : song
      )
    );
  };
  const nextSlide = () => {
    console.log("Next slide clicked");
    setCurrentSlide((prev) => (prev === favoritesSongs.length - 1 ? 0 : prev + 1)); // Update current state
    console.log("Current slide:", currentSlide);
  };
  
  const prevSlide = () => {
    console.log("Previous slide clicked");
    setCurrentSlide((prev) => (prev === 0 ? favoritesSongs.length  - 1 : prev - 1)); // Update current state
    console.log("Current slide:", currentSlide);
  };
  return (
   <div className="mainContainer">

      <Header />
      
      <br /><br /><br />
      
   
      {favoritesSongs.length > 0 && <AudioList item={favoritesSongs} />}
    </div>
   
  );
}

const mapStateToProps = (state) => ({
  favorites: state.FavoritesAdmin.favorites || [],
  songs: state.SongAdmin.songs || [],
});

export default connect(mapStateToProps, { fetchFavorites, fetchSong })(Liked);
