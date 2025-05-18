import { FaGenderless } from "react-icons/fa";
import axios from 'axios';

// const fetchSongsFromDatabase = async () => {
//   try {
//     // Make an API call to fetch songs from the database
//     const response = await axios.get('/api/songs'); // Replace '/api/songs' with your backend endpoint for songs
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching songs:', error);
//     return []; // Return an empty array in case of an error
//   }
// };

// const Songs = async () => {
//   const songs = await fetchSongsFromDatabase();
//   return songs;
// };


const Songs = [
  {
    id: 1,
    favourite: false,
    category:"Album",
    type:"Artist",
    songName: "Bella Ciao",
    artist: "El Profesor",
    song: "https://ringtonedownload.best/wp-content/uploads/2020/10/Money_Heist_Ringtone_-_Bella_Ciao_Ringtone___VIRAL_BGMwww.ringtonedownload.best_.mp3",
    imgSrc:
    "../netflix/mo.jpg",
    color: "#00aeb0",
  },
  {
    id: 2,
    favourite: false,
    category:"Popular",
    songName: "Beast",
    type:"playlist",
    artist: "Anirudh Ravichander",
    song: "https://drive.google.com/u/0/uc?id=1DsFHtOFDsvoy1KA0eLqYO_hJmrh0xFQb&export=download",
    imgSrc:
      "../netflix/1.jpg",
      color: "#ffb77a",
  },
  {
    id: 3,
    favourite: false,
    category:"Songs",
    type:"playlist",
    songName: "K.G.F: Chapter 2",
    artist: "Hildur Guðnadóttir",
    song: "https://ringtonedownload.best/wp-content/uploads/2022/04/KGF-2-THEME-BGM-RINGTONE-320kbps.mp3",
    imgSrc:
      "../netflix/KGF.jpg",
      color: "#5f9fff",
  },
  {
    id: 4,
    favourite: false,
    category:"Songs",
    type:"Artist",
    songName: "Bheeshma Parvam",
    artist: "Otnicka",
    song: "https://ringtonedownload.best/wp-content/uploads/2022/03/Bheeshma-Parvam-Mass-BGM-Ringtone.mp3",
    imgSrc:
      "../netflix/bh.webp",
  },
  {
    id: 5,
    favourite: false,
    category:"Songs",
    type:"playlist",
    songName: "paires of caribbean",
    artist: "Yuvan Shankar Raja",
    song: "https://ringtonedownload.best/wp-content/uploads/2020/12/Jack-Sparrow-Bgm-Ringtone.mp3",
    imgSrc:
      "../netflix/jj.jpg",
  },
  {
    id: 6,
    favourite: false,
    songName: "Vikram",
    category:"Popular",
    type:"playlist",
    artist: "White Town",
    song: "https://ringtonedownload.best/wp-content/uploads/2022/07/Lokiverse-bgm-2.mp3",
    imgSrc:
      "../netflix/19.jpg",
  },
  {
    id: 7,
    favourite: false,
    songName: "Charlie",
    type:"Artist",
    category:"Songs",
    artist: "Gopi Sundar",
    song: "https://ringtonedownload.best/wp-content/uploads/2020/11/Charlie-Sad-Bgm-Tones.mp3",
    imgSrc:
      "../netflix/ch.jpg",
  },
  {
    id: 8,
    favourite: false,
    category:"Popular",
    type:"playlist",
    songName: "Vikram Vedha",
    artist: "Future",
    song: "https://paglasongs.com//files/download/id/10253",
    imgSrc:
    "../netflix/vi.jpg",
  },
  {
    id: 9,
    favourite: false,
    category:"Songs",
    type:"playlist",
    songName: "Minnale Murali",
    artist: "David Guetta",
    song: "https://www.bgmringtones.com/wp-content/uploads/2021/09/Minnal-Murali-Malayalam-BGM.mp3",
    imgSrc:
      "../netflix/16.jpg",
  },
  {
    id: 10,
    favourite: false,
    category:"Album",
    type:"Artist",
    songName: "Nun",
    artist: "CVR Toon ",
    song: "https://www.redringtones.com/wp-content/uploads/2018/08/the-nun-ringtone.mp3",
    imgSrc:
      "../netflix/nun.jpg",
  },
  {
    id: 11,
    favourite: false,
    category:"Songs",
    type:"Song",
    songName: "Ponni Selvan",
    artist: "CVR Toon ",
    song: "https://paglasongs.com//files/download/id/9074",
    imgSrc:
      "../netflix/ponni.jpeg",
  },
  {
    id: 12,
    favourite: false,
    category:"Popular",
    type:"Popular",
    songName: "Passori",
    artist: " DJ Lemon  ",
    song: "https://paglasongs.com//files/download/id/7224",
    imgSrc:
      "../netflix/passori.jpg",
  },
];
const artist= [
  {

id:1,

name:"GENERS",
},
{
id:2,

name:"NEWRELEASES",
},

{
id:3,

name:"FEATURED",
  },
    
];

const Lists= [
  {
    id:1,
  
    type:"GENERS",
    imgSrc:
    "../netflix/img/100.jpg",
  },
  {
    id:2,
  
    type:"GENERS",
    imgSrc:
    "../netflix/img/101.jpeg",
  },
  {
    id:3,
  
    type:"GENERS",
    imgSrc:
    "../netflix/img/103.jpeg",
  },
  {
    id:4,
  
    type:"GENERS",
    imgSrc:
    "../netflix/img/104.jpeg",
  },
  {
    id:5,
  
    type:"GENERS",
    imgSrc:
    "../netflix/img/105.jpeg",
  },
  {
    id:6,
  
    type:"GENERS",
    imgSrc:
    "../netflix/img/106.jpeg",
  },
  {
    id:7,
  
    type:"GENERS",
    imgSrc:
    "../netflix/img/107.jpeg",
  },
  {
    id:8,
  
    type:"GENERS",
    imgSrc:
    "../netflix/img/108.jpeg",
  },
  {
    id:9,
  
    type:"GENERS",
    imgSrc:
    "../netflix/img/109.jpg",
  },
  {
    id:10,
  
    type:"GENERS",
    imgSrc:
    "../netflix/img/110.png",
  },
  {
    id:11,
  
    type:"GENERS",
    imgSrc:
    "../netflix/img/111.jpeg",
  },
  {
    id:12,
  
    type:"GENERS",
    imgSrc:
    "../netflix/img/112.jpeg",
  },
  {
    id:13,
  
    type:"NEWRELEASES",
    imgSrc:
    "../netflix/img/200.jpeg",
  },
  {
    id:14,
  
    type:"NEWRELEASES",
    imgSrc:
    "../netflix/img/201.jpeg",
  },
  {
    id:15,
  
    type:"NEWRELEASES",
    imgSrc:
    "../netflix/img/202.jpeg",
  },
  {
    id:16,
  
    type:"NEWRELEASES",
    imgSrc:
    "../netflix/img/203.jpeg",
  },
  {
    id:17,
  
    type:"NEWRELEASES",
    imgSrc:
    "../netflix/img/204.jpeg",
  },
  {
    id:18,
  
    type:"NEWRELEASES",
    imgSrc:
    "../netflix/img/205.jpeg",
  },
  {
    id:19,
  
    type:"NEWRELEASES",
    imgSrc:
    "../netflix/img/206.jpeg",
  },
  {
    id:20,
  
    type:"NEWRELEASES",
    imgSrc:
    "../netflix/img/207.jpeg",
  },
  {
    id:21,
  
    type:"NEWRELEASES",
    imgSrc:
    "../netflix/img/208.jpeg",
  },
  {
    id:22,
  
    type:"NEWRELEASES",
    imgSrc:
    "../netflix/img/209.jpeg",
  },
  {
    id:23,
  
    type:"NEWRELEASES",
    imgSrc:
    "../netflix/img/210.jpeg",
  },
  {
    id:24,
  
    type:"NEWRELEASES",
    imgSrc:
    "../netflix/img/211.jpeg",
  },
  {
    id:25,
  
    type:"FEATURED",
    imgSrc:
    "../netflix/img/300.jpeg",
  },
  {
    id:26,
  
    type:"FEATURED",
    imgSrc:
    "../netflix/img/301.jpeg",
  },
  {
    id:27,
  
    type:"FEATURED",
    imgSrc:
    "../netflix/img/302.jpeg",
  },
  {
    id:28,
  
    type:"FEATURED",
    imgSrc:
    "../netflix/img/303.jpeg",
  },
  {
    id:29,
  
    type:"FEATURED",
    imgSrc:
    "../netflix/img/304.jpeg",
  },
  {
    id:30,
  
    type:"FEATURED",
    imgSrc:
    "../netflix/img/305.jpeg",
  },
  {
    id:31,
  
    type:"FEATURED",
    imgSrc:
    "../netflix/img/306.jpeg",
  },
  {
    id:32,
  
    type:"FEATURED",
    imgSrc:
    "../netflix/img/307.jpeg",
  },
  {
    id:33,
  
    type:"FEATURED",
    imgSrc:
    "../netflix/img/308.jpeg",
  },
  {
    id:34,
  
    type:"FEATURED",
    imgSrc:
    "../netflix/img/309.jpeg",
  },
  {
    id:35,
  
    type:"FEATURED",
    imgSrc:
    "../netflix/img/310.jpeg",
  },
  {
    id:36,
  
    type:"FEATURED",
    imgSrc:
    "../netflix/img/311.jpeg",
  },
  
];



const GENERS= [
  {
    id:1,
  
    type:"GENERS",
    imgSrc:
    "../netflix/img/100.jpg",
  },
  {
    id:2,
  
    type:"GENERS",
    imgSrc:
    "../netflix/img/101.jpeg",
  },
  {
    id:3,
  
    type:"GENERS",
    imgSrc:
    "../netflix/img/103.jpeg",
  },
  {
    id:4,
  
    type:"GENERS",
    imgSrc:
    "../netflix/img/104.jpeg",
  },
  {
    id:5,
  
    type:"GENERS",
    imgSrc:
    "../netflix/img/105.jpeg",
  },
  {
    id:6,
  
    type:"GENERS",
    imgSrc:
    "../netflix/img/106.jpeg",
  },
  {
    id:7,
  
    type:"GENERS",
    imgSrc:
    "../netflix/img/107.jpeg",
  },
  {
    id:8,
  
    type:"GENERS",
    imgSrc:
    "../netflix/img/108.jpeg",
  },
  {
    id:9,
  
    type:"GENERS",
    imgSrc:
    "../netflix/img/109.jpg",
  },
  {
    id:10,
  
    type:"GENERS",
    imgSrc:
    "../netflix/img/110.png",
  },
  {
    id:11,
  
    type:"GENERS",
    imgSrc:
    "../netflix/img/111.jpeg",
  },
  {
    id:12,
  
    type:"GENERS",
    imgSrc:
    "../netflix/img/112.jpeg",
  },
 
 
];

const NEWRELEASES= [
  {
    id:1,
  
    type:"GENERS",
    imgSrc:
    "../netflix/img/200.jpeg",
  },
  {
    id:2,
  
    type:"GENERS",
    imgSrc:
    "../netflix/img/201.jpeg",
  },
  {
    id:3,
  
    type:"GENERS",
    imgSrc:
    "../netflix/img/202.jpeg",
  },
  {
    id:4,
  
    type:"GENERS",
    imgSrc:
    "../netflix/img/203.jpeg",
  },
  {
    id:5,
  
    type:"GENERS",
    imgSrc:
    "../netflix/img/204.jpeg",
  },
  {
    id:6,
  
    type:"GENERS",
    imgSrc:
    "../netflix/img/205.jpeg",
  },
  {
    id:7,
  
    type:"GENERS",
    imgSrc:
    "../netflix/img/206.jpeg",
  },
  {
    id:8,
  
    type:"GENERS",
    imgSrc:
    "../netflix/img/207.jpeg",
  },
  {
    id:9,
  
    type:"GENERS",
    imgSrc:
    "../netflix/img/208.jpeg",
  },
  {
    id:10,
  
    type:"GENERS",
    imgSrc:
    "../netflix/img/209.jpeg",
  },
  {
    id:11,
  
    type:"GENERS",
    imgSrc:
    "../netflix/img/210.jpeg",
  },
  {
    id:12,
  
    type:"GENERS",
    imgSrc:
    "../netflix/img/211.jpeg",
  },
 
 
];
const FEATURED= [
  {
    id:1,
  
    type:"FEATURED",
    imgSrc:
    "../netflix/img/300.jpeg",
  },
  {
    id:2,
  
    type:"FEATURED",
    imgSrc:
    "../netflix/img/301.jpeg",
  },
  {
    id:3,
  
    type:"FEATURED",
    imgSrc:
    "../netflix/img/302.jpeg",
  },
  {
    id:4,
  
    type:"FEATURED",
    imgSrc:
    "../netflix/img/303.jpeg",
  },
  {
    id:5,
  
    type:"FEATURED",
    imgSrc:
    "../netflix/img/304.jpeg",
  },
  {
    id:6,
  
    type:"FEATURED",
    imgSrc:
    "../netflix/img/305.jpeg",
  },
  {
    id:7,
  
    type:"FEATURED",
    imgSrc:
    "../netflix/img/306.jpeg",
  },
  {
    id:8,
  
    type:"FEATURED",
    imgSrc:
    "../netflix/img/307.jpeg",
  },
  {
    id:9,
  
    type:"FEATURED",
    imgSrc:
    "../netflix/img/308.jpeg",
  },
  {
    id:10,
  
    type:"FEATURED",
    imgSrc:
    "../netflix/img/309.jpeg",
  },
  {
    id:11,
  
    type:"FEATURED",
    imgSrc:
    "../netflix/img/310.jpeg",
  },
  {
    id:12,
  
    type:"FEATURED",
    imgSrc:
    "../netflix/img/311.jpeg",
  },
  
];

export { Songs, artist,Lists,GENERS,NEWRELEASES,FEATURED};
