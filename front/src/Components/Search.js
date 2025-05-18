import React, { useState, useRef, useEffect} from "react";
import Header from "./Header";
import PlayButton from "./PlayButton";
import MediaItem from "./MediaItem";
import { fetchSong } from '../Admin/actions/SongAction';
import { connect } from 'react-redux';
import MusicPlayer from "./Musics";
import {FaRegHeart} from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import styled from "styled-components";
import { BiSearchAlt } from "react-icons/bi";
function Search(props) {
  const audioRef = useRef(null);
  const [copydata, setCopyData] = useState([]);
  const [songs, setSong] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [img, setImage] = useState(null);
  const [auto, setAuto] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [songsPerPage] = useState(10); // Number of songs to display per page

  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });

 
     // Pagination logic
    const indexOfLastSong = currentPage * songsPerPage;
    const indexOfFirstSong = indexOfLastSong - songsPerPage;
    const currentSongs = copydata.slice(indexOfFirstSong, indexOfLastSong);
       // Update current page
    const paginate = (pageNumber) => setCurrentPage(pageNumber); 

    useEffect(() => {
      props.fetchSong();
    }, []);
  

    useEffect(() => {
      if (props.songs.length > 0) {
        setCopyData(props.songs);
      }
    }, [props.songs]);
  useEffect(() => {
    if (props.songs.length > 0) {
      setCopyData(props.songs);
      setSong(props.songs[0]);
      setImage(props.songs[0]?.imgSrc);
      setCurrentSong(props.songs[0] || null);
    }
  }, [props.songs]);

  const setMainSong = (songSrc, imgSrc ,index) => {
    setSong(songSrc);
    setImage(imgSrc);
    setAuto(true);
    setCurrentSongIndex(index);
    setCurrentSong([index]);
  };

  const songEndHandler = () => {
    const nextIndex = (currentSongIndex + 1) % songs.length;
    setCurrentSongIndex(nextIndex); // Update current song index
    setCurrentSong(songs[nextIndex]);
  };

  const playNextSong = () => {
    console.log("Next song button clicked");

    const nextIndex = (currentSongIndex + 1) % songs.length;
    setCurrentSongIndex(nextIndex); // Update current song index
    setCurrentSong(songs[nextIndex]);
  };

  const playPreviousSong = () => {
    console.log("Prev  song button clicked");

    const prevIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    setCurrentSongIndex(prevIndex); // Update current song index
    setCurrentSong(songs[prevIndex]);
  };
  const handleSearch = (searchQuery) => {
    const filteredSongs = props.songs.filter(song => {
      return song.songName.toLowerCase().includes(searchQuery.toLowerCase());
    });
    setCopyData(filteredSongs);
  };
  

  return (
    <div className='bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto'>
      <Header />
      <div className='mt-2 mb-7 px-6'>
        <div className='flex justify-between items-center'>
        <input
              type="text"
              placeholder="Search..."
              onChange={(e) => handleSearch(e.target.value)}
            />
            <i>
              <BiSearchAlt />
            </i>
          <h1 className='text-white text-2xl font-semibold'>Newest songs</h1>
        </div>
       
           
          
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-4 mt-4">
        {currentSongs.map((song, index) => (
          <div key={index} className="category-image">
          
              <button className="loved" onClick={() => console.log("Add to favorites", song)}>
                <FaRegHeart />
                *Fav
              </button>
              <br />
<div onClick={() => setMainSong(song.song, song.imgSrc)}
      className="relative group flex flex-col items-center rounded-md overflow-hidden gap-x-4 bg-neutral-400/5 cursor-pointer hover:bg-neutral-400/10 transition p-3"
    >
              <div className="flex items-center justify-center gap-x-4">
        <img 
          className="object-cover" 
          src={`http://localhost:4000/${song.imgSrc}`}
          fill
          alt="Song Cover"
        />
      </div>
            
      <div className="flex flex-col items-start w-full pt-4 gap-y-1">
        <p className="font-semibold truncate w-full">
          {song.title}
        </p>
        <p className="text-neutral-400 text-sm pb-4 w-full truncate">
          By {song.author}
        </p>
      </div>
              
            
            <div className="absolute bottom-24 right-5">
        <button 
         
          className="transition opacity-0 rounded-full flex items-center bg-green-500 p-4 drop-shodow-md translate translate-y-1/4 group-hover:opacity-100 group-hover:translate-y-0 hover:scale-110"
        >
          <FaPlay className="text-black" />
        </button>
      </div>
          </div>
          </div>
        ))}
      </div> 
       {/* Pagination controls */}
       <div className="flex items-center justify-center gap-4">
      {copydata.length > songsPerPage && (
        <div className="pagination">
          {Array(Math.ceil(copydata.length / songsPerPage))
            .fill()
            .map((_, index) => (
              <Button key={index} onClick={() => paginate(index + 1)}>
                {index + 1}
              </Button>
            ))}
        </div>
      )}
      </div>
      <br></br>
      <div className='fixed bottom-0 bg-black w-full py-2 h-[80px] px-4'>
        <PlayButton 
        song={songs}
        onEnded={songEndHandler}
        showImage={true}
        img={img}
        currentSong={currentSong}
        audioRef={audioRef}
        autoplay={auto}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
        setCurrentSongIndex={setCurrentSongIndex} 
        playNextSong={playNextSong}
        playPreviousSong={playPreviousSong}
        currentSongId ={currentSongIndex >= 0 && currentSongIndex < songs.length ? songs[currentSongIndex].id : null}
        />
       
      </div>
      {/* <div class="footer">
        <MusicPlayer song={song} imgSrc={img} autoplay={auto} />
      </div> */}
    </div>
  );
}
const Button = styled.button`
	background: transparent;
	border: none;
	color:#FFA500;
	cursor: pointer;
	border: 2px solid rgb(65, 65, 65);
	padding: 0.5rem;
	transition: all 0.3s ease;
	&:hover {
		background: rgb(65, 65, 65);
		color: white;
	}
`;
const mapStateToProps = (state) => {
  return {
    songs: state.SongAdmin.songs || [],
  };
};

export default connect(mapStateToProps, { fetchSong })(Search);
