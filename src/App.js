import { Link } from "react-router-dom";
import "./App.css";
import React, { useState, useRef, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Signup from "./pages/Signup";
import Mypage from "./pages/Mypage";
import Footer from "./components/Footer";

const side = () => {
  return (
    <div className="headerbar">
      <nav>
        <ul>
          <li>
            <Link
              to={"/login"}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              로그인
            </Link>
          </li>
          <li>
            <Link
              to={"/signup"}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              회원가입
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

const sideleft = () => {
  return (
    <div className="headerbar">
      <nav>
        <ul>
          <li>
            <Link to={"/"} style={{ textDecoration: "none", color: "inherit" }}>
              STAR D
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
const sidecenter = () => {
  return (
    <div className="sidebar">
      <nav>
        <ul>
          <li>스터디</li>
          <li>커뮤니티</li>
          <li>공지사항</li>
        </ul>
      </nav>
    </div>
  );
};

const nosidecenter=()=>{
  return (
    <Header
    headText={""}
    leftChild={sideleft()}
    rightChild={side()}
  />
  );
}
  const rendsidecenter=()=>{
    return (
      <Header
      headText={sidecenter()}
      leftChild={sideleft()}
      rightChild={side()}
    />
    );
}

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home sideheader={rendsidecenter()}/>} />
          <Route path="/login" element={<Login sideheader={nosidecenter()}/>} />
          <Route path="/signup" element={<Signup sideheader={nosidecenter()}/>} />
          <Route path="/logout" element={<Logout sideheader={rendsidecenter()}/>} />
          <Route path="/mypage" element={<Mypage sideheader={rendsidecenter()} />} />
        </Routes>
      </div>
      <Footer/>
    </BrowserRouter>
   
  );
        }

export default App;
