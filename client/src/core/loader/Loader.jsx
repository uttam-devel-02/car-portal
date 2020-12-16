import React from "react";
import './Loader.css'
import { useState } from 'react';


function Loader(data) {
  var loaderFlag = false;
  if(data.loader == true) {
    loaderFlag = true;
  }

  if(loaderFlag === true) {
    return (
      <div id="overlay">
        <div className="center">
          <div className="spinner-border text-success" role="status" style={{ height: "50px", width: "50px"}}>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    );
  } else {
    return (<div></div>);
  }
}

export default Loader;