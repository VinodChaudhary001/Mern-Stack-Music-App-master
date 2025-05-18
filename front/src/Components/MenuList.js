import { BsFillHouseFill, BsJournalAlbum } from "react-icons/bs";
import { BiPulse,BiSearchAlt } from "react-icons/bi";

import { FaBroadcastTower, FaMicrophoneAlt, FaPodcast } from "react-icons/fa";

const MenuList = [
  {
    id: 1,
    icon: <BsFillHouseFill />,
    name: "Home",
    path:"/",
  },
 
  {
    id: 2,
    icon: <BiSearchAlt/>,
    name: "Search",
    path:"/search",
  },
  {
    id: 3,
    icon: <FaMicrophoneAlt />,
    name: "Artist",
    path:"/artist",
  },
  // {
  //   id: 4,
  //   icon: <BsJournalAlbum />,
  //   name: "Albums",
  //   path:"/albums",
  // },

 
];

export { MenuList };
