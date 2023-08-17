import React, { useState } from "react";
import SearchBar from '../SearchBar';
import LogoButton from '../components/LogoButton';


const searchItems=[
    "back-end",
    "front-end",
    "cloud",
    "aws",
    "framework"
  ]

  
const Home = ({sideheader}) => {
 
  return (
    <div>
    {sideheader}
    <div className="subground">
    <SearchBar searchItems={searchItems}/>
  </div>
  </div>
    
  );
};
export default Home;
