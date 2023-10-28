import Header from "../../components/repeat_etc/Header";
import React, {useEffect, useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";

import "../../css/community_css/Community.css";
import SearchBar from "../../components/community/CommSearchBar";
import PostInsert from "../../components/community/PostInsert";
import PostListItem from "../../components/community/PostListItem";
import axios from "axios";
import Backarrow from "../../components/repeat_etc/Backarrow";

const Community = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [showPostInsert, setShowPostInsert] = useState(false);
    let accessToken = localStorage.getItem('accessToken');
    let isLoggedInUserId = localStorage.getItem('isLoggedInUserId');

    const location = useLocation();
    const currentPath = location.pathname;
    const [type, setType] = useState(null);

    useEffect(() => {
        if (currentPath === "/community") {
            setType("COMM");
        } else if (currentPath === "/notice") {
            setType("NOTICE");
        }
    }, [currentPath]);

    console.log("*** ", currentPath);
    console.log("* ", type);


    const handleMoveToStudyInsert = (e) => {
         if (accessToken && isLoggedInUserId) {
            e.preventDefault();
            setShowPostInsert(!showPostInsert);
         } else {
             alert("로그인 해주세요");
             navigate("/login");
         }
    };

    let url;
    if (type === "COMM") {
        url = "http://localhost:8080/com";
    } else if (type === "NOTICE") {
        url = `http://localhost:8080/notice`;
    }

    useEffect(() => {
        if (type !== null) {
            axios.get(url)
                .then((res) => {
                    setPosts(res.data);
                })
                .catch((error) => {
                    console.error("데이터 가져오기 실패:", error);
                });
        }
    }, [type]);

    //TODO - notice 헤더 별도로 구현 (notice/faq 나뉘게)
    return (
        <div className={"main_wrap"} id={"community"}>
            <Header showSideCenter={true}/>
            <div className="community_container">
                <p id={"entry-path"}> 커뮤니티 </p>
                {type === "COMM" ? (
                    <Backarrow subname="Community List" />
                ) : type === "NOTICE" ? (
                    <Backarrow subname="Notice List" />
                ) : null}
                {showPostInsert && (
                    <PostInsert />
                )}
                {!showPostInsert && (
                    <div>
                        <div className="community_header">
                            <SearchBar/>
                            <button onClick={handleMoveToStudyInsert} className="new_post_btn">
                                새 글 작성
                            </button>
                        </div>
                        <div className="community">
                            <div>
                                <table className="post_table" key={posts.id}>
                                    <th>카테고리</th>
                                    <th>제목</th>
                                    <th>닉네임</th>
                                    <th>날짜</th>
                                    <th>조회수</th>
                                    <th>공감수</th>
                                    <th>스크랩수</th>
                                    {posts.map((d, index) => (
                                        <PostListItem setPosts={setPosts} posts={d} d={d}
                                                      index={index} key={d.id}/>
                                    ))}
                                </table>
                            </div>
                        </div>
                    </div>
                    )}
            </div>
        </div>
    );
}
export default Community;