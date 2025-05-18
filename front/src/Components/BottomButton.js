import React, {useState} from 'react';
import {FaArrowCircleUp} from 'react-icons/fa';
import { Button } from './Style';
  
const BottomButton = () =>{
  
  const [visible, setVisible] = useState(false)
  

  const toggleVisible = () => { 
    const scrolled = document.documentElement.scrollTop; 
    if (scrolled > 0){ 
      setVisible(false) 
    }  
    else if (scrolled <= 0){ 
      setVisible(true) 
    } 
  }; 

  const scrollToBottom = () =>{ 
    window.scrollTo({ 
      top: document.documentElement.scrollHeight, 
      behavior: 'auto'
      /* you can also use 'auto' behaviour 
         in place of 'smooth' */
    }); 
  }; 
  window.addEventListener('scroll', toggleVisible);
  
  return (
  

    <Button>
     <FaArrowCircleUp onClick={scrollToBottom} 
     
     style={{display: visible ? 'inline' : 'none'}} />
    </Button>
    
  );
}
  
export default BottomButton;