import {Link} from "react-router-dom";
import axios from "axios";
import "./App.css";
import React, {useState, useRef, useEffect,useMemo, lazy, Suspense} from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";



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
import MyApplyStudy from "./pages/mypage/MyApplyStudy";
import Header from "./components/repeat_etc/Header";
import InputSubSign from "./pages/userpage/InputSubSign";
import FindID from "./pages/userpage/FindID";
import SearchBar from "./SearchBar";
import SearchResult from "./pages/studypage/SearchResult";
import StudyApplyList from "./pages/studypage/StudyApplyList";
import TeamBlog from "./pages/studypage/TeamBlog";
import Community from "./pages/community/Community";
import PostDetail from "./pages/community/PostDetail";
import CommSearchBar from "./components/community/CommSearchBar";
import CommSearchResult from "./pages/community/CommSearchResult";
import Chat from "./components/chat/Chat";
import FindedID from "./pages/userpage/FindedID.js";
import TeamToDoList from "./pages/TeamToDo/TeamToDoList";
import TeamSchedule from "./pages/TeamSchedule/TeamSchedule";
import MemberEvaluate from "./pages/mypage/MemberEvaluate";

function App() {
    return (
        <BrowserRouter>
            <div className="App">

                <Routes>
                    <Route
                        path="/"
                        element={<Home />}
                    />
                    <Route
                        path="/login"
                        element={<Login/>}
                    />
                    <Route
                        path="/subinfo/signup"
                        element={<Signup />}
                    />
                    <Route
                        path="/logout"
                        element={<Logout/>}
                    />
                    <Route
                        path="/login/findeID"
                        element={<FindID/>}
                    />
                    <Route
                        path="/login/findedID"
                        element={<FindedID/>}
                    />
                    <Route
                        path="/mypage"
                        element={<Mypage/>}
                    />

                    <Route
                        path="/editinfo"
                        element={<Editinfo/>}
                    />
                    <Route
                        path="/myparticipatestudy"
                        element={
                            <MyParticipateStudy/>
                        }
                    />
                    <Route
                        path="/myapplystudy"
                        element={
                            <MyApplyStudy/>
                        }
                    />
                    <Route
                        path="/myopenstudy"
                        element={<MyOpenStudy/>}
                    />
                    <Route
                        path="/studydetail/:id"
                        element={<StudyDetail/>}
                    />
                    <Route
                        path="/ToDoList"
                        element={<ToDoList/>}
                    />
                    <Route
                        path="/MyPage/Schedule"
                        element={<Schedule/>}
                    />
                    <Route
                        path="/studyapplyform/:id"
                        element={
                            <StudyApplyForm/>
                        }
                    />
                    <Route
                        path="/study/:page"
                        element={
                            <Study/>
                        }
                    />
                    <Route
                        path="/studyopen"
                        element={
                            <StudyInsert/>
                        }
                    />
                    <Route
                        path="/subinfo"
                        element={
                        <InputSubSign/>
                        }
                        />
                    <Route
                        path="/search"
                        element={
                            <SearchResult/>
                        }
                    />
                    <Route
                        path="/:id/teamblog"
                        element={
                            <TeamBlog/>
                        }
                    />
                    <Route path="/" exact component={Home} />
                    <Route path="/search" component={SearchResult} />
                    <Route
                        path={"/StudyApplyList/:id"}
                        element={
                             <StudyApplyList/>
                        }
                    />
                    <Route path={"/:id/teamblog/TeamToDoList"}
                           element={
                            <TeamToDoList/>
                           }
                    />
                    <Route path="/:id/teamblog/TeamSchedule"
                           element={<TeamSchedule/>} />

                    <Route
                        path="/community"
                        element={
                            <Community/>
                        }
                    />
                    <Route
                        path="/notice"
                        element={
                            <Community/>
                        }
                    />
                    <Route
                        path="/postdetail/:id"
                        element={
                            <PostDetail/>
                        }
                    />
                    <Route
                        path="/comm/search"
                        element={
                            <CommSearchResult/>
                        }
                    />
                    <Route path="/comm/search" component={CommSearchResult} />
                    <Route
                        path="/chat"
                        element={
                            <Chat/>
                        }
                    />
                    <Route
                        path="/:id/evaluate"
                        element={
                            <MemberEvaluate/>
                        }
                    />
                </Routes>

                <Footer/>

            </div>
        </BrowserRouter>
    );
}

export default App;
