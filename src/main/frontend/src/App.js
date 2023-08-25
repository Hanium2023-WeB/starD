import { Link } from "react-router-dom";
import "./App.css";
import React, { useState, useRef, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/repeat_etc/Header";

import Home from "./pages/Home";
import Login from "./pages/userpage/Login";
import Logout from "./pages/userpage/Logout";
import Signup from "./pages/userpage/Signup";
import Mypage from "./pages/mypage/Mypage";
import Footer from "./components/repeat_etc/Footer";
import Editinfo from "./pages/mypage/Editinfo";
import MyParticipateStudy from "./pages/mypage/MyParticipateStudy";
import MyOpenStudy from "./pages/mypage/MyOpenStudy";
import StudyDetail from "./pages/studypage/StudyDetail";
import ToDoList from "./pages/mypage/ToDoList";
import Schedule from "./pages/mypage/Schedule.js";
import StudyApplyForm from "./pages/studypage/StudyApplyForm";
import Study from "./pages/studypage/Study";
import StudyInsert from "./components/study/StudyInsert";

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
						<Link
							to={"/"}
							style={{ textDecoration: "none", color: "inherit" }}
						>
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
					<Link
						to={"/study"}
						style={{ textDecoration: "none", color: "inherit" }}
					><li>스터디</li></Link>
					<li>커뮤니티</li>
					<li>공지사항</li>
				</ul>
			</nav>
		</div>
	);
};

const nosidecenter = () => {
	return <Header headText={""} leftChild={sideleft()} rightChild={side()} />;
};
const rendsidecenter = () => {
	return (
		<Header
			headText={sidecenter()}
			leftChild={sideleft()}
			rightChild={side()}
		/>
	);
};

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<Routes>
					<Route
						path="/"
						element={<Home sideheader={rendsidecenter()} />}
					/>
					<Route
						path="/login"
						element={<Login sideheader={nosidecenter()} />}
					/>
					<Route
						path="/signup"
						element={<Signup sideheader={nosidecenter()} />}
					/>
					<Route
						path="/logout"
						element={<Logout sideheader={rendsidecenter()} />}
					/>
					<Route
						path="/mypage"
						element={<Mypage sideheader={rendsidecenter()} />}
					/>

					<Route
						path="/editinfo"
						element={<Editinfo sideheader={rendsidecenter()} />}
					/>
					<Route
						path="/myparticipatestudy"
						element={
							<MyParticipateStudy sideheader={rendsidecenter()} />
						}
					/>
					<Route
						path="/myopenstudy"
						element={<MyOpenStudy sideheader={rendsidecenter()} />}
					/>
					<Route
						path="/studydetail/:id"
						element={<StudyDetail sideheader={rendsidecenter()} />}
					/>
					<Route
						path="/ToDoList"
						element={<ToDoList sideheader = {rendsidecenter()}/>}
						/>
							<Route
						path="/MyPage/Schedule"
						element={<Schedule sideheader = {rendsidecenter()}/>}
						/>
					<Route
						path="/studyapplyform/:id"
						element={
							<StudyApplyForm sideheader={rendsidecenter()} />
						}
					/>
					<Route
						path="/study"
						element={
							<Study sideheader={rendsidecenter()} />
						}
					/>
					<Route
						path="/studyopen"
						element={
							<StudyInsert sideheader={rendsidecenter()} />
						}
					/>
					
				</Routes>
				<div></div>
				<Link
					to={"/mypage"}
					style={{ textDecoration: "none", color: "inherit" }}
				>
					마이페이지
				</Link>
				<Footer />
			</div>
		</BrowserRouter>
	);
}

export default App;
