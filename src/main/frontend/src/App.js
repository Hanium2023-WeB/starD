import {Link} from "react-router-dom";

import "./App.css";
import React, {useState, useRef, useEffect} from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Header from "./components/Header";
import axios from "axios";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Signup from "./pages/Signup";
import Mypage from "./pages/Mypage";
import Footer from "./components/Footer";

const Side = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {

        axios
            .get("http://localhost:8080/current-member", {
                withCredentials: true
            })
            .then((res) => {
                console.log(res.data);

                // 서버로부터 받은 데이터가 null이 아니면 로그인한 상태로 설정
                setIsLoggedIn(res.data !== 'anonymousUser');
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
                        <Link to={"/"} style={{textDecoration: "none", color: "inherit"}}>
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
                    <Route path="/" element={<Home sideheader={rendsidecenter()}/>}/>
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
                    <Route path="/sign-in" element={<Login/>}/>
                </Routes>
                <div>
                </div>
                <Link to={"/mypage"}
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
