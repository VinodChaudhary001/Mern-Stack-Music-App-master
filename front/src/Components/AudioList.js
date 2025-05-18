import React, { useEffect, useState } from "react";
import { FaHeadphones, FaRegClock, FaRegHeart, FaHeart } from "react-icons/fa";
import "../styles/LeftMenu.css";
import MusicPlayer from "./MusicPlayer";
import { fetchSong } from '../Admin/actions/SongAction';
import { connect } from 'react-redux';

const AudioList = ({ item }) => {
  const [songs, setSongs] = useState([]);
  const [song, setSong] = useState();
  const [img, setImage] = useState();
  const [auto, setAuto] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0); // Track the index of the current song

  // Update song and image when item changes
  useEffect(() => {
    if (item && item.length > 0) {
   
      setSongs(item); // Update songs state with item data
      setSong(item[0]?.song || ''); // Use optional chaining to prevent errors
      setImage(item[0]?.imgSrc || ''); // Use optional chaining to prevent errors
    }
  }, [item]);

  const changeFavourite = (id) => {
    setSongs((prevSongs) =>
      prevSongs.map((song) =>
        song.id === id ? { ...song, favourite: !song.favourite } : song
      )
    );
  };

  const setMainSong = (songSrc, imgSrc, index) => {
    setSong(songSrc);
    setImage(imgSrc);
    setAuto(true);
    setCurrentSongIndex(index); // Update the current song index
  };

  const playNextSong = (id) => {
    const nextIndex = (currentSongIndex + 1) % songs.length;
    const nextSong = songs[nextIndex];
    if (nextSong) {
      setSong(nextSong.song);
      setImage(nextSong.imgSrc);
      setCurrentSongIndex(nextIndex);
    } else {
      console.log("Next song not found.");
    }
  };

  const playPreviousSong = (id) => {
    const prevIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    const prevSong = songs[prevIndex];
    if (prevSong) {
      setSong(prevSong.song);
      setImage(prevSong.imgSrc);
      setCurrentSongIndex(prevIndex);
    } else {
      console.log("Previous song not found.");
    }
  };

  return (
    <div className="AudioList">
      <h2 className="title">
        The list <span>{songs.length} songs</span>
      </h2>

      <div className="songsContainer">
        {item.map((song, index) => (
          <div
            className="songs"
            key={index}
            onClick={() => setMainSong(song?.song, song?.imgSrc, index)} // Pass index to setMainSong
          >
            <div className="count">
              <p>{`#${index + 1}`}</p>
            </div>
            <div className="song">
              <div className="imgBox">
                <img src={`http://localhost:4000/${song.imgSrc}`} alt="" />
              </div>
              <div className="section">
                <p className="songName">
                  {song?.songName} <span className="songSpan">{song?.artist}</span>
                </p>

                <div className="hits">
                  {/* <p className="hit">
                    <i><FaHeadphones /></i> 95,490,102
                  </p>
                  <p className="duration">
                    <i><FaRegClock /></i> 03:04
                  </p> */}
                  <p className="favourite" onClick={() => changeFavourite(song?.index)}>
                    {song?.favourite ? <i><FaHeart /></i> : <i><FaRegHeart /></i>}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <MusicPlayer
        song={song}
        imgSrc={img}
        autoplay={auto}
        
        setCurrentSongIndex={setCurrentSongIndex}
        currentSongId ={currentSongIndex >= 0 && currentSongIndex < songs.length ? songs[currentSongIndex]._id : null}
        playNextSong={playNextSong}
        playPreviousSong={playPreviousSong}
      />
    </div>
  );
};

export { AudioList };
