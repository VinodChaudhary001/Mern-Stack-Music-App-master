import React, { useEffect,useState } from "react";
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import styled from "styled-components";
import "../styles/search.css";

import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { HiHome } from "react-icons/hi"; 
import { BiSearch } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { toast } from "react-hot-toast";

export default function Header(){
  const history = useHistory();

  const handleButtonClick = () => {
    // Push a new entry onto the history stack
    history.push('/liked');
  };
                        return (
                            <div className="Header">
                          <div className="bg-gradient-to-b from-emerald-800 p-6">
                          <div className="w-full mb-4 flex items-center justify-between">
                              <div className="flex gap-x-2 items-center">
                                  <button className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition">
                                      <RxCaretLeft size={35} className="text-white" />
                                  </button>
                                  <button className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition">
                                      <RxCaretRight size={35} className="text-white" />
                                  </button>
                              </div>
              
                           
                             
                                  
                                      <div className="flex gap-x-4 items-center">
                                        
                                          <button type="button" class="w-full rounded-full border border-transparent px-3 py-3 disabled:cursor-not-allowed disabled:opacity-50 text-black font-bold hover:opacity-75 transition bg-white"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M256 288c79.5 0 144-64.5 144-144S335.5 0 256 0 112 64.5 112 144s64.5 144 144 144zm128 32h-55.1c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16H128C57.3 320 0 377.3 0 448v16c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48v-16c0-70.7-57.3-128-128-128z"></path></svg></button>
                                      </div>
                                 
                                     
                              
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4">
  <button className="relative group flex items-center rounded-md overflow-hidden gap-x-4 bg-neutral-100/10 hover:bg-neutral-100/20 transition pr-4">
    <div className="relative min-h-[64px] min-w-[64px]">
      <img
        alt="Image"
        loading="lazy"
        decoding="async"
        data-nimg="fill"
        className="object-cover"
        sizes="100vw"
       
        src={`http://localhost:4000/uploads/liked.png`}
        style={{ position: 'absolute', height: '100%', width: '100%', inset: '0px', color: 'transparent' }}
      />
    </div>
    <p className="font-medium truncate py-5" onClick={handleButtonClick}>Liked Songs</p> 
    <div className="absolute transition opacity-0 rounded-full flex items-center justify-center bg-green-500 p-4 drop-shadow-md right-5 group-hover:opacity-100 hover:scale-110">
      <svg
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="0"
        viewBox="0 0 448 512"
        className="text-black"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"></path>
      </svg>
    </div>
  </button>
</div>

                      </div>


                      </div>
                        );
                        
   
                       
}

const Button =styled.div`
nput, optgroup, select, textarea {
  font-family: inherit;
  font-size: 100%;
  font-weight: inherit;
  line-height: inherit;
  color: inherit;
  margin: 0;
  padding: 0;
}
`;