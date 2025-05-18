import React, { useState, useRef, useEffect } from "react";
import "../styles/MusicPlayer.css";
import {
  FaRegHeart,
  FaHeart,
  FaForward,
  FaStepForward,
  FaStepBackward,
  FaBackward,
  FaPlay,
  FaPause,
  FaShareAlt,
} from "react-icons/fa";
import { BsFillVolumeUpFill, BsMusicNoteList } from "react-icons/bs";
import { BsDownload } from "react-icons/bs";
import { Songs } from "./Songs";
import TrackList from "./TrackList";
import { fetchFavorites, deleteFavorites } from '../Admin/actions/FavoritesAction';
import { connect } from 'react-redux';
function MusicPlayer({ song, imgSrc, auto, currentSongIndex , setCurrentSongIndex,currentSongId,playNextSong,playPreviousSong}) 

// function MusicPlayer({ song, imgSrc, auto}) 

{
  const [isLove, setLove] = useState(false);
  const [isPlaying, setPlay] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrenttime] = useState(0);
  const [volume, setVolume] = useState(50);
  const [favorites, setFavorites] = useState([]);



  const audioPlayer = useRef();
  const progressBar = useRef();
  const animationRef = useRef();
  // useEffect(() => {
    
  //   props.fetchFavorites();
  // }, []);

  useEffect(() => {
    const seconds = Math.floor(audioPlayer.current.duration);
    setDuration(seconds);
    progressBar.current.max = seconds;
  }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]);

  const changePlayPause = () => {
    const prevValue = isPlaying;
    setPlay(!prevValue);

    if (!prevValue) {
      audioPlayer.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  };

  // const whilePlaying = () => {
  //   progressBar.current.value = audioPlayer.current.currentTime;
  //   changeCurrentTime();
  //   animationRef.current = requestAnimationFrame(whilePlaying);
  // };
  
  const whilePlaying = () => {
    if (audioPlayer.current) {
      progressBar.current.value = audioPlayer.current.currentTime;
      changeCurrentTime();
      animationRef.current = requestAnimationFrame(whilePlaying);
    }
  };
  

  const calculateTime = (sec) => {
    const minutes = Math.floor(sec / 60);
    const returnMin = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(sec % 60);
    const returnSec = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnMin} : ${returnSec}`;
  };

  const changeProgress = () => {
    audioPlayer.current.currentTime = progressBar.current.value;
    changeCurrentTime();
  };

  const changeCurrentTime = () => {
    progressBar.current.style.setProperty(
      "--played-width",
      `${(progressBar.current.value / duration) * 100}%`
    );

    setCurrenttime(progressBar.current.value);
  };



  const handleVolumeChange = (event) => {
    const volumeValue = event.target.value / 100; // Scale the volume from [0, 100] to [0, 1]
    audioPlayer.current.volume = volumeValue;
    setVolume(event.target.value); // Update the state with the new volume value
  };
  
  const changeSongLove = (id) => {
    setLove(!isLove); // Toggle the love icon
  
    // Check if favorites array is empty
    if (favorites.length === 0) {
      // Handle the case where favorites is empty
      // You might want to add the song to favorites or fetch favorites from the server
      console.log('Favorites is empty');
      // For example, you might want to fetch favorites here:
      // fetchFavorites(); // Directly call the action creator if available in this file
      return;
    }
  
    // Check if the song with the given id exists in the favorites list
    const isFavorite = favorites.some((favorite) => favorite.song_id === id);
  
    // If the song is in favorites, delete it
    if (isFavorite) {
      // deleteFavorites(id); // Directly call the action creator if available in this file
    }
  };
  
  return (
    <div className="musicPlayer">
      <div className="songImage">
        <img src={`http://localhost:4000/${imgSrc}`}  alt={currentSongId} />
      </div>
      <div className="songAttributes">
        <audio src={`http://localhost:4000/${song}`}  preload="metadata" ref={audioPlayer} />

        <div className="top">
          <div className="left">
            <div className="loved" onClick={() => changeSongLove(currentSongId)}>
              {isLove ? (
                <i>
                  <FaRegHeart />
                </i>
              ) : (
                <i>
                  <FaHeart />
                </i>
              )}
            </div>
            <a
    href={song}  // Provide the URL of the audio file
    download="audio.mp3"  // Specify the filename for the downloaded file
    className="download"
  >
    <BsDownload />
  </a>
            <i>
          <BsFillVolumeUpFill />
        </i>

        <input
        type="range"
        min="0"
        max="100"
        value={volume}
        onChange={handleVolumeChange}
      
      />
        <i>
          <BsMusicNoteList />
        </i>
          </div>

          <div className="middle">
            
            <div className="back" >
              {/* <i value={song.id}></i> */}
              <i onClick={() => playPreviousSong(currentSongId)}>
                <FaStepBackward />
              </i>
              <i onClick={() => playPreviousSong(currentSongId)}>
                <FaBackward />
              </i>
            </div>
            <div className="playPause" onClick={changePlayPause}>
              {isPlaying ? (
                <i>
                  <FaPause />
                </i>
              ) : (
                <i>
                  <FaPlay />
                </i>
              )}
            </div>
            
            <div className="forward">
            <i onClick={() => playNextSong(currentSongId)}>
                <FaForward />
              </i>
              <i onClick={() => playNextSong(currentSongId)}>
                <FaStepForward />
              </i>
            </div>
         
          </div>

          <div className="right">
            <i>
              <FaShareAlt />
            </i>
          </div>
        </div>

        <div className="bottom">
          <div className="currentTime">{calculateTime(currentTime)}</div>
          <input
            type="range"
            className="progressBar"
            ref={progressBar}
            defaultValue="0"
            onChange={changeProgress}
            autoPlay={auto}
          />
          <div className="duration">
            {duration && !isNaN(duration) && calculateTime(duration)
              ? duration && !isNaN(duration) && calculateTime(duration)
              : "00:00"}
          </div>
        </div>
      </div>
    </div>
  );
}

//export default MusicPlayer;
const mapStateToProps = (state) => ({
  favorites: state.FavoritesAdmin.favorites || [],

});

export default connect(mapStateToProps, {  fetchFavorites, deleteFavorites })(MusicPlayer);
