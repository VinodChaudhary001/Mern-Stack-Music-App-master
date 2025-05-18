import React, { useState, useRef, useEffect } from "react";
import "../styles/artist.css";
import styled from "styled-components";
import Header  from "./Header";
// Import components
import Player from "../design/Player";
import Song from "../design/Song";
import Library from "../design/Library";
import Nav from "../design/Nav";
import Credit from "../design/Credit";
import { Songs } from "./Songs";
import { connect } from 'react-redux';
import { fetchSong } from '../Admin/actions/SongAction';
import { fetchCategories } from '../Admin/actions/CategoryAction';
import { createFavorites } from "../Admin/actions/AuthAdminAction"
import axios from "axios";
function Artist(props) {
  // Ref
  const audioRef = useRef(null);

  // State
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [libraryStatus, setLibraryStatus] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [fav, setfav] = useState([]); // Initialize to 0
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });

  useEffect(() => {
    props.fetchSong();
     props.fetchCategories();
  }, []);

  useEffect(() => {
    if (props.songs.length > 0) {
      setSongs(props.songs);
      setCurrentSong(props.songs[0] || null);
    }
  }, [props.songs]);

  const updateTimeHandler = (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({ ...songInfo, currentTime, duration });
  };

  const songEndHandler = () => {
    const nextIndex = (currentSongIndex + 1) % songs.length;
    setCurrentSongIndex(nextIndex); // Update current song index
    setCurrentSong(songs[nextIndex]);
  };

  const playNextSong = () => {
    const nextIndex = (currentSongIndex + 1) % songs.length;
    setCurrentSongIndex(nextIndex); // Update current song index
    setCurrentSong(songs[nextIndex]);
  };

  const playPreviousSong = () => {
    const prevIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    setCurrentSongIndex(prevIndex); // Update current song index
    setCurrentSong(songs[prevIndex]);
  };

  const handleSearch = (e) => {
    let getchangedata = e.toLowerCase();
    if (getchangedata === "") {
      setSongs(props.songs);
    } else {
      let storedata = props.songs.filter((j, k) => j.songName.toLowerCase().match(getchangedata));
      setSongs(storedata);
    }
  }
  
  const handleCategoryClick = (category) => {
    let filteredData;
    if (category === "All") {
      filteredData = props.songs; // Display all songs when "All" is clicked
    } else {
      filteredData = props.songs.filter((item) => item.category === category);
    }
    setSongs(filteredData);
  };

  // const handleClick = (item) => {
  //   if (fav.indexOf(item) !== -1) return;
  //   setfav([...fav, item]);
  // };

  const handleClick = async (song_id) => {
    try {
      const formData = { song_id };
      // console.log('Form submitted with values:', formData);
      await props.createFavorites(formData);
      console.log('createFavorites action dispatched successfully');
       // Save to local storage
      addToFavorites(song_id); 
      window.location.reload();
    } catch (error) {
      console.error('Error creating favorites:', error);
    }
  };

  // Function to check if a song is in favorites


  //Function to add a song to favorites
// Function to add a song to favorites
const addToFavorites = (songId) => {
  // Check if the songId is already stored in local storage
  const favoriteSongs = JSON.parse(localStorage.getItem('favoriteSongs')) || [];
  
  // Check if the songId is already in the list of favorites
  if (!favoriteSongs.includes(songId)) {
    // Add the songId to the list of favorites
    favoriteSongs.push(songId);
    // Save the updated list to local storage
    localStorage.setItem('favoriteSongs', JSON.stringify(favoriteSongs));

    // Now, you can also check if the song is already in the database
    // If not, then you can add it to the database here
    // Example: props.createFavorites(songId);
  }
};

// Button component to add/remove song from favorites



  
  return (
    
    <div className="mainContainer">
    <Header></Header>
    <AppContainer libraryStatus={libraryStatus}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      {currentSong && <Song currentSong={currentSong} fav={handleClick}/>}
      <br />
      <Player
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        audioRef={audioRef}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
        songs={songs}
        setSongs={setSongs}
        setCurrentSongIndex={setCurrentSongIndex}
        currentSongId={currentSong ? currentSong.id : null} // Pass current song ID
        playNextSong={playNextSong} // Pass function to play next song
        playPreviousSong={playPreviousSong} // Pass function to play previous song
      />
      <Library
        search={handleSearch}
        filter={handleCategoryClick}
        categories={props.categories}
        songs={songs}
        setCurrentSong={setCurrentSong}
        audioRef={audioRef}
        isPlaying={isPlaying}
        setSongs={setSongs}
        libraryStatus={libraryStatus}
      />
      <Credit />
      <audio
        onLoadedMetadata={updateTimeHandler}
        onTimeUpdate={updateTimeHandler}
        onEnded={songEndHandler}
        ref={audioRef}
        src={currentSong ? `http://localhost:4000/${currentSong.song}` : ''}
      />
    </AppContainer>
    </div>
   
  );
};

const AppContainer = styled.div`
  transition: all 0.5s ease;
  position:absolute;
  margin-top: 12px;
  margin-left: ${(p) => (p.libraryStatus ? "20rem" : "0")};
  @media screen and (max-width: 768px) {
    margin-left: 0;
  }
`;

const mapStateToProps = (state) => {
  return {
    categories: state.CategoryAdmin.categories || [],
    songs: state.SongAdmin.songs || [],
  };
};

export default connect(mapStateToProps, { fetchSong , fetchCategories , createFavorites})(Artist);
