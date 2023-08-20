import {Link} from "react-router-dom";
import {useAuth} from "./pages/AuthContext";
import axios from "axios";
import "./App.css";
import React, {useState, useRef, useEffect} from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Header from "./components/Header";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Signup from "./pages/Signup";
import Mypage from "./pages/Mypage";
import Footer from "./components/Footer";
import Editinfo from "./pages/Editinfo";
import MyParticipateStudy from "./pages/MyParticipateStudy";
import MyOpenStudy from "./pages/MyOpenStudy";
import StudyDetail from "./pages/StudyDetail";

const Side = () => {

    // const { isLoggedIn } = useAuth(); // useAuth를 이용하여 로그인 상태를 가져옴

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const accessToken = localStorage.getItem('accessToken');

    useEffect(() => {

        const logout = (member) => {

            axios.post("http://localhost:8080/api/v1/members/logout", {
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
                    localStorage.removeItem('accessToken');
                    setIsLoggedIn(false);
                })
                .catch(error => {
                    console.log("로그아웃 실패", error);
                });
        };

        const isAccessTokenExpired = () => {
            axios.get("http://localhost:8080/api/v1/members/isAccessTokenExpired", {
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

                    if (res.data === false)
                        return false;
                    return true;
                })
                .catch(error => {
                    console.log(error);
                });
        }

        axios
            .get("http://localhost:8080/api/v1/members/check", {
                withCredentials: true,
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
            .then((res) => {
                console.log("현재 로그인한 사용자 ID : " + res.data);
                console.log("현재 로그인한 사용자 accessToken : " + accessToken);

                // 서버로부터 받은 데이터가 null이 아니면 로그인한 상태로 설정
                if (res.data == "anonymousUser" || res.data == null)
                    setIsLoggedIn(false);
                else {
                    if (isAccessTokenExpired()){
                        logout(res.data);
                        setIsLoggedIn(false);
                    } else {
                        setIsLoggedIn(true);
                    }


                }
                // setIsLoggedIn(res.data != null || res.data != "anonymousUser");
                return res.data;
            })
            .catch(error => {
                console.log(error);
            });


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
                    <li>스터디</li>
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
    return (
        <BrowserRouter>
            <div className="App">
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