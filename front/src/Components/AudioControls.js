import React, { useState, useRef, useEffect } from "react";
import { ReactComponent as Play } from "../assets/play.svg";
import { ReactComponent as Pause } from "../assets/pause.svg";
import { ReactComponent as Next } from "../assets/next.svg";
import { ReactComponent as Prev } from "../assets/prev.svg";
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
const AudioControls = ({
  isPlaying,
  onPlayPauseClick,
  onPrevClick,
  onNextClick

}) => (
   

  <div className="audio-controls">
     <i
 
      className="prev"
      aria-label="Previous"
      onClick={onPrevClick}
    >
      <Prev />
   
   
                <FaBackward />
              </i>
  
    {isPlaying ? (
      <i
      
        className="pause"
        onClick={() => onPlayPauseClick(false)}
        aria-label="Pause"
      >
       
        <FaPause />
      </i>
    ) : (
      <i
       
        className="play"
        onClick={() => onPlayPauseClick(true)}
        aria-label="Play"
      >
         <FaPlay />
      </i>
    )}
    <i
     
      className="next"
      aria-label="Next"
      onClick={onNextClick}
    >
       <FaStepForward />
    </i>
  </div>

);

export default AudioControls;
