import React, { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause, FaRegHeart, FaHeart } from 'react-icons/fa';
import { AiFillStepBackward, AiFillStepForward } from 'react-icons/ai';
import { BsFillVolumeUpFill } from 'react-icons/bs';
import MediaItem from "./MediaItem";
function PlayButton({ song, playNextSong, playPreviousSong ,img ,currentSong}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLove, setLove] = useState(false);
  const [volume, setVolume] = useState(50);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioPlayer = useRef(new Audio());
  const progressBar = useRef();

  useEffect(() => {
    const player = audioPlayer.current;
    if (song) {
      player.src = `http://localhost:4000/${song}`;
      player.load();
      if (isPlaying) {
        player.play();
      }
    }

    player.addEventListener('loadedmetadata', handleLoadedMetadata);
    player.addEventListener('timeupdate', handleTimeUpdate);
    player.addEventListener('ended', handleEnded);

    return () => {
      player.pause();
      player.removeEventListener('loadedmetadata', handleLoadedMetadata);
      player.removeEventListener('timeupdate', handleTimeUpdate);
      player.removeEventListener('ended', handleEnded);
    };
  }, [song, isPlaying, playNextSong]);

  const handleLoadedMetadata = () => {
    setDuration(Math.floor(audioPlayer.current.duration));
    progressBar.current.max = audioPlayer.current.duration;
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioPlayer.current.currentTime);
    progressBar.current.value = audioPlayer.current.currentTime;
  };

  const handleEnded = () => {
    playNextSong();
  };

  const togglePlay = () => {
    const player = audioPlayer.current;
    if (isPlaying) {
      player.pause();
    } else {
      player.play();
    }
    setIsPlaying(!isPlaying);
  };

  const changeSongLove = () => {
    setLove(!isLove);
  };

  const handleVolumeChange = (event) => {
    const newVolume = event.target.value / 100;
    audioPlayer.current.volume = newVolume;
    setVolume(event.target.value);
  };

  const calculateTime = (sec) => {
    const minutes = Math.floor(sec / 60);
    const seconds = Math.floor(sec % 60);
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const changeProgress = () => {
    const player = audioPlayer.current;
    player.currentTime = progressBar.current.value;
    setCurrentTime(player.currentTime);
  };

  return (
    <div className="flex items-center justify-center gap-4">
         <MediaItem data={song} showImage={true} img={img}/>
      <i>
        <BsFillVolumeUpFill />
      </i>
      <input type="range" min="0" max="100" value={volume} onChange={handleVolumeChange} />
      <div className="loved" onClick={changeSongLove}>
        {isLove ? <i><FaRegHeart /></i> : <i><FaHeart /></i>}
      </div>
      <AiFillStepBackward size={30} onClick={playPreviousSong} />
      <div onClick={togglePlay} className="flex items-center justify-center h-10 w-10 rounded-full bg-white p-1 cursor-pointer">
        {isPlaying ? <FaPause /> : <FaPlay />}
      </div>
      <AiFillStepForward size={30} onClick={playNextSong} />
      <div className="bottom">
        <div className="currentTime">{calculateTime(currentTime)}</div>
        <input type="range" className="progressBar" ref={progressBar} defaultValue="0" onChange={changeProgress} />
        <div className="duration">{calculateTime(duration)}</div>
      </div>
    </div>
  );
}

export default PlayButton;
