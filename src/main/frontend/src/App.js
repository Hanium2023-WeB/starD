import {Link} from "react-router-dom";
import axios from "axios";
import "./App.css";
import React, {useState, useRef, useEffect, lazy, Suspense} from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
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
import EditSchedule from "./components/schedule/EditSchedule";

const Side = () => {

    // const { isLoggedIn } = useAuth(); // useAuth를 이용하여 로그인 상태를 가져옴

    const [isLoggedIn, setIsLoggedIn] = useState(false);    // 로그인 여부 확인 변수
    const accessToken = localStorage.getItem('accessToken');       // localStorage에 저장된 accessToken 추출
    const isLoggedInUserId = localStorage.getItem('isLoggedInUserId');       // localStorage에 저장된 로그인한 사용자 Id 추출

    // console.log(accessToken, isLoggedInUserId);     // accessToken과 로그인한 사용자 Id 추출
    // localStorage.removeItem('accessToken');
    // localStorage.removeItem('isLoggedInUserId');

    useEffect(() => {

        const logout = (member) => {    // 로그아웃 function
            axios.post("http://localhost:8080/api/v2/members/logout", {
                accessToken: accessToken,
                memberId: member
            }, {
                withCredentials: true,
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                },
                params: {
                    accessToken: accessToken,
                    memberId: member
                }
            })
                .then(() => {
                    console.log("로그아웃 성공");

                    // 로그아웃 성공 시 localStorage에 저장된 accessToken, isLoggedInUserId 제거
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('isLoggedInUserId');

                    // 로그아웃 상태로 설정
                    setIsLoggedIn(false);
                })
                .catch(error => {
                    console.log("로그아웃 실패", error);
                });
        };


        if (accessToken != null && isLoggedInUserId != null) {      // 로그인 한 상태이거나 accessToken이 만료된 상태
            console.log("test");
            axios.get("http://localhost:8080/api/v2/members/accessToken-expiration", {    // accessToken 만료 여부 확인 function
                withCredentials: true,
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                },
                params: {
                    accessToken: accessToken
                }
            })
                .then((res) => {
                    console.log("결과 값 : " + res.data);

                    if (res.data === false)      // accessToken이 만료되지 않는 상태
                        setIsLoggedIn(true);
                    else {                      // accessToken이 만료된 상태 -> 로그아웃 및 로그아웃 상태로 변환
                        logout(isLoggedInUserId);
                        setIsLoggedIn(false);
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        } else {    // accessToken이 존재하지 않다면 로그인 안 한 상태
            console.log("test2");
            setIsLoggedIn(false);
        }
    }, []);

    return (
        <div className="headerbar">
            <nav>
                <ul>
                    {isLoggedIn ? (
                        <React.Fragment>
                            <li>
                                <Link
                                    to={"/logout"}
                                    style={{textDecoration: "none", color: "inherit"}}
                                >
                                    로그아웃
                                </Link>
                            </li>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <li>
                                <Link
                                    to={"/login"}
                                    style={{textDecoration: "none", color: "inherit"}}
                                >
                                    로그인
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to={"/signup"}
                                    style={{textDecoration: "none", color: "inherit"}}
                                >
                                    회원가입
                                </Link>
                            </li>
                        </React.Fragment>
                    )}
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
                            style={{textDecoration: "none", color: "inherit"}}
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
                        style={{textDecoration: "none", color: "inherit"}}
                    >
                        <li>스터디</li>
                    </Link>
                    <li>커뮤니티</li>
                    <li>공지사항</li>
                </ul>
            </nav>
        </div>
    );
};

const nosidecenter = () => {
    return <Header headText={""} leftChild={sideleft()} rightChild={Side()}/>;
};
const rendsidecenter = () => {
    return (
        <Header
            headText={sidecenter()}
            leftChild={sideleft()}
            rightChild={Side()}
        />
    );
};

function App() {

    // const Home = lazy(() => import('./pages/Home'));
    // const Login = lazy(() => import('./pages/Login'));
    // const Signup = lazy(() => import('./pages/Signup'));

    return (
        <BrowserRouter>
            <div className="App">

                {/*<Suspense fallback={<div>Loading...</div>}>*/}
                {/*    <Routes>*/}
                {/*        <Route path="/" element={<Home sideheader={rendsidecenter()} />} />*/}
                {/*        <Route path="/login" element={<Login sideheader={nosidecenter()} />} />*/}
                {/*    </Routes>*/}
                {/*</Suspense>*/}

                {/*<Suspense fallback={<div>Loading...</div>}>*/}
                {/*    <Routes>*/}
                {/*        <Route path="/signup" element={<Signup sideheader={nosidecenter()} />} />*/}
                {/*    </Routes>*/}
                {/*</Suspense>*/}

                <Routes>
                    <Route
                        path="/"
                        element={<Home sideheader={rendsidecenter()}/>}
                    />
                    <Route
                        path="/login"
                        element={<Login sideheader={nosidecenter()}/>}
                    />
                    <Route
                        path="/signup"
                        element={<Signup sideheader={nosidecenter()}/>}
                    />
                    <Route
                        path="/logout"
                        element={<Logout sideheader={rendsidecenter()}/>}
                    />
                    <Route
                        path="/mypage"
                        element={<Mypage sideheader={rendsidecenter()}/>}
                    />

                    <Route
                        path="/editinfo"
                        element={<Editinfo sideheader={rendsidecenter()}/>}
                    />
                    <Route
                        path="/myparticipatestudy"
                        element={
                            <MyParticipateStudy sideheader={rendsidecenter()}/>
                        }
                    />
                    <Route
                        path="/myopenstudy"
                        element={<MyOpenStudy sideheader={rendsidecenter()}/>}
                    />
                    <Route
                        path="/studydetail/:id"
                        element={<StudyDetail sideheader={rendsidecenter()}/>}
                    />
                    <Route
                        path="/ToDoList"
                        element={<ToDoList sideheader={rendsidecenter()}/>}
                    />
                    <Route
                        path="/MyPage/Schedule"
                        element={<Schedule sideheader={rendsidecenter()}/>}
                    />
                    <Route
                        path="/studyapplyform/:id"
                        element={
                            <StudyApplyForm sideheader={rendsidecenter()}/>
                        }
                    />
                    <Route
                        path="/study"
                        element={
                            <Study sideheader={rendsidecenter()}/>
                        }
                    />
                    <Route
                        path="/studyopen"
                        element={
                            <StudyInsert sideheader={rendsidecenter()}/>
                        }
                    />
                    <Route
                        path="/MyPage/Schedule/schedule/editschedule"
                        element={
                            <EditSchedule sideheader={rendsidecenter()}/>
                        }
                    />

                </Routes>
                <div></div>
                <Link
                    to={"/mypage"}
                    style={{textDecoration: "none", color: "inherit"}}
                >
                    마이페이지
                </Link>
                <Footer/>
            </div>
        </BrowserRouter>
    );
}

export default App;