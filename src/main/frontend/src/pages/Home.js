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
const Home = () => {
  
  return (
    <div>
      <LogoButton/>
      <div className="subground">
        <div className="sidebar">
          <nav>
            <ul>
              <li>스터디</li>
              <li>커뮤니티</li>
              <li>공지사항</li>
            </ul>
          </nav>
        </div>
      </div>
      <SearchBar searchItems={searchItems}/>
    </div>
  );
};
export default Home;
