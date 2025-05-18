import React, { useState, useRef, useEffect } from "react";

function Volume({imgSrc}) {

   
    return (
        <>

<img
          className="artwork"
          src={imgSrc}
          alt={`track artwork for by `}
        />
        </>
    )
}

export default Volume
