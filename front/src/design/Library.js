import React from "react";
import LibrarySong from "./LibrarySong";
import styled from "styled-components";
import { BiSearchAlt } from "react-icons/bi";
const Library = ({search, songs,filter,categories, currentSong, setCurrentSong, audioRef, isPlaying, setSongs, libraryStatus }) => {
	return (
		<LibraryContainer libraryStatus={libraryStatus}>
			<H1>Library</H1>
	
    <Button onClick={() => filter("All")}>
      All
    </Button>
 
  {categories.map((category) => (
  
      <Button onClick={() => filter(category.name)} >
        {category.name}
      </Button>
  
  ))}

			<div className="searchBox">
            <input
              type="text"
              placeholder="Search..."
              onChange={(e) => search(e.target.value)}
            />
            <i>
              <BiSearchAlt />
            </i>
          </div>
			<SongContainer>
				{songs.map((song) => (
					<LibrarySong
						song={song}
						songs={songs}
						setCurrentSong={setCurrentSong}
						key={song.id}
						audioRef={audioRef}
						isPlaying={isPlaying}
						setSongs={setSongs}
					/>
				))}
			</SongContainer>
		</LibraryContainer>
	);
};
const LibraryContainer = styled.div`
    height: 740px;
    margin-top: 132px;
    margin-top: 132px;
	position: fixed;
	z-index: 9;
	top: 0;
	right: 0;
	width: 20rem;
	
	background-color: white;
	box-shadow: 2px 2px 50px rgb(204, 204, 204);
	user-select: none;
	overflow: scroll;

	transition: all 0.5s ease;
	
	scrollbar-width: thin;
	scrollbar-color: rgba(155, 155, 155, 0.5) tranparent;
	&::-webkit-scrollbar {
		width: 5px;
	}
	&::-webkit-scrollbar-track {
		background: transparent;
	}
	&::-webkit-scrollbar-thumb {
		background-color: rgba(155, 155, 155, 0.5);
		border-radius: 20px;
		border: transparent;
	}
	@media screen and (max-width: 768px) {
		width: 100%;
		z-index: 9;
	}
`;
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

const SongContainer = styled.div`
	display: flex;
	flex-direction: column;
	background-color: white;
`;

const H1 = styled.h2`
	padding: 2rem;
`;

export default Library;
