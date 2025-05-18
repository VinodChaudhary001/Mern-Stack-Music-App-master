import React, { useState, useEffect, useRef } from "react";
import AudioControls from "./AudioControls";
import Backdrop from "./Backdrop";
import "../styles/tracks.css";

import { Songs } from "./Songs";
/*
 * Read the blog post here:
 * https://letsbuildui.dev/articles/building-an-audio-player-with-react-hooks
 */
const AudioPlayer = ({ tracks }) => {
  // State
  const [trackIndex, setTrackIndex] = useState(0);
  const [trackProgress, setTrackProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Destructure for conciseness
  const { songName, artist, color, imgSrc, song } = Songs[trackIndex];

  // Refs
  const audioRef = useRef(new Audio(song));
  const intervalRef = useRef();
  const isReady = useRef(false);
  const progressBar = useRef();
  // Destructure for conciseness
  const { duration } = audioRef.current;
  const [durations, setDuration] = useState(0);
  const [currentTime, setCurrenttime] = useState(0);
  const [copydata, setCopyData] = useState([]);
  const currentPercentage = duration
    ? `${(trackProgress / duration) * 100}%`
    : "0%";
  const trackStyling = `
    -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #fff), color-stop(${currentPercentage}, #777))
  `;



  
  useEffect(() => {

    setTimeout(() => {
        setCopyData(Songs);
    }, 1000);

}, [])
  const startTimer = () => {
    // Clear any timers already running
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        toNextTrack();
      } else {
        setTrackProgress(audioRef.current.currentTime);
      }
    }, [1000]);
  };

  const onScrub = (value) => {
    // Clear any timers already running
    clearInterval(intervalRef.current);
    audioRef.current.currentTime = value;
    setTrackProgress(audioRef.current.currentTime);
  };

  const onScrubEnd = () => {
    // If not already playing, start
    if (!isPlaying) {
      setIsPlaying(true);
    }
    startTimer();
  };

  const toPrevTrack = () => {
    if (trackIndex - 1 < 0) {
      setTrackIndex(tracks.length - 1);
    } else {
      setTrackIndex(trackIndex - 1);
    }
  };

  const toNextTrack = () => {
    if (trackIndex < tracks.length - 1) {
      setTrackIndex(trackIndex + 1);
    } else {
      setTrackIndex(0);
    }
  };
  const whilePlaying = () => {
    progressBar.current.value = audioRef.current.currentTime;
    changeCurrentTime();
    // need to run more than once
    audioRef.current = requestAnimationFrame(whilePlaying);
  };
  const changeCurrentTime = () => {
    progressBar.current.style.setProperty(
      "--played-width",
      `${(progressBar.current.value / duration) * 100}%`
    );

    setCurrenttime(progressBar.current.value);
  };
  
  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
      startTimer();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // Handles cleanup and setup when changing tracks
  useEffect(() => {
    audioRef.current.pause();

    audioRef.current = new Audio(song);
    setTrackProgress(audioRef.current.currentTime);

    if (isReady.current) {
      audioRef.current.play();
      setIsPlaying(true);
      startTimer();
    } else {
      // Set the isReady ref as true for the next pass
      isReady.current = true;
    }
  }, [trackIndex]);

  useEffect(() => {
    // Pause and clean up on unmount
    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    };
  }, []);



  const setMainSong= (field) => (event) => {
    //console.log('event.currentTarget.dataset.id', event.currentTarget.dataset.id)
    
    let data = event.currentTarget.dataset.id;
    switch (field) {
  
        case 1:
            findSong(data);
          break;
     
     
      default:
        break;
    }
  };

  const findSong = (value) => {
    let data1 = [value];
 
setTrackIndex(data1-1);
  };

  return (
    <>
    <ul class="browse-view-containerz">
             
                          
               
    {
copydata.map((song, i) => (

    <div class="category-image">
    

    <li class="category-item">
              <buttton
                onClick={setMainSong(1)}
               
                value={song.id}
            
                data-id={song.id}
                key={song.id}
              >                         

   
       
        
                    <img alt="album" variant="top" class="picz" src={song.imgSrc} />
              
                              
   
    
                    <div className="play-song">
                      <i
                        className="fa fa-play-circle-o play-btn"
                        aria-hidden="true"
                      />
                    </div>
              
    
                  <div className="album-details">

                    <p className="album-name">{song.songName}</p>
                    <p className="artist-name">{song.artist}</p>
       
                    <br></br>
                  </div>
                    </buttton>
     
              </li>
                  </div>
                           )
                           )
                         
           }
             
              </ul>
             
    <div className="audio-player">
      <div className="track-info">
        
        <img
          className="artwork"
          src={imgSrc}
          alt={`track artwork for ${songName} by ${artist}`}
        />
        <h2 className="songName">{songName}</h2>
        <h3 className="artist">{artist}</h3>
        <AudioControls
          ref={audioRef}
          isPlaying={isPlaying}
          onPrevClick={toPrevTrack}
          onNextClick={toNextTrack}
          onPlayPauseClick={setIsPlaying}
   
        />
        <input
          type="range"
          value={trackProgress}
          step="1"
          min="0"
          max={duration ? duration : `${duration}`}
          className="progress"
          onChange={(e) => onScrub(e.target.value)}
          onMouseUp={onScrubEnd}
          onKeyUp={onScrubEnd}
          style={{ background: trackStyling }}
        />
      </div>
      <Backdrop
        trackIndex={trackIndex}
        activeColor={color}
        isPlaying={isPlaying}
      />
    </div>
    </>
  );
};

export default AudioPlayer;
