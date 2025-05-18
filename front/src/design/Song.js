import React from "react";
import styled from "styled-components";
import {FaRegHeart,} from "react-icons/fa";
const Song = ({ currentSong , fav}) => {
	return (
		<SongContainer>    <button className="loved" onClick={() => fav(currentSong._id)}>  <i>
			<br></br>
		<FaRegHeart />
	  </i>*Favourite</button><br></br>
			
			<Img src={`http://localhost:4000/${currentSong.imgSrc}`} alt={currentSong.songName}></Img>
		
			<H1>{currentSong.songName}</H1>
			<H2>{currentSong.artist}</H2>
		</SongContainer>
	);
};

const SongContainer = styled.div`
   margin-left:100px;
   width:350px;
    
	margin-top: 10vh;
	min-height: 50vh;
	max-height: 70vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	display: flex;
    
    border-radius: 20px;
    box-shadow: 0 28px 28px rgb(0 0 0 / 20%);
  
    color: orange;
    background-color: darkolivegreen;
   
`;

const Img = styled.img`
border-radius: 120px;
display: block;
margin: auto;
height: 200px;
width: 270px;
	@media screen and (max-width: 768px) {
		width: 50%;
	}
`;

const H1 = styled.h2`
	padding: 3rem 1rem 1rem 1rem;
`;

const H2 = styled.h3`
	font-size: 1rem;
`;

export default Song;
