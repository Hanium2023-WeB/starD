import Header from "../../components/repeat_etc/Header";
import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";

import "../../css/community_css/Community.css";
import SearchBar from "../../SearchBar";
import PostInsert from "../../components/community/PostInsert";
import PostListItem from "../../components/community/PostListItem";
import axios from "axios";

const Community = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [showPostInsert, setShowPostInsert] = useState(false);

    // localStorage에 저장된 accessToken 추출
    const accessToken = localStorage.getItem('accessToken');

    // localStorage에 저장된 로그인한 사용자 Id 추출
    const isLoggedInUserId = localStorage.getItem('isLoggedInUserId');

    const handleMoveToStudyInsert = (e) => {
         if (accessToken && isLoggedInUserId) {
            e.preventDefault();
            setShowPostInsert(!showPostInsert);
         } else {
             alert("로그인 해주세요");
             navigate("/login");
         }
    };

    const searchItems = [
        "back-end",
        "front-end",
        "cloud",
        "aws",
        "framework"
    ]

    useEffect(() => {
        axios.get("http://localhost:8080/com")
            .then((res) => {
                setPosts(res.data);
            })
            .catch((error) => {
                console.error("데이터 가져오기 실패:", error);
            });
    }, []);

    return (
        <div className={"main_wrap"} id={"community"}>
            <Header showSideCenter={true}/>
            <div className="community_container">
                <h1>COMMUNITY LIST</h1>
                {showPostInsert && (
                    <PostInsert />
                )}
                {!showPostInsert && (
                    <div>
                        <div className="community_header">
                            <SearchBar searchItems={searchItems}/>
                            <button onClick={handleMoveToStudyInsert} className="new_post_btn">
                                새 글 작성
                            </button>
                        </div>
                        <div className="community">
                            <div>
                                <table className="post_table">
                                    <thead>
                                        <tr>
                                            <th>카테고리</th>
                                            <th>제목</th>
                                            <th>닉네임</th>
                                            <th>날짜</th>
                                            <th>조회수</th>
                                            <th>공감수</th>
                                            <th>스크랩수</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {posts.map((post) => (
                                            <PostListItem key={post.id}
                                                          setPosts={setPosts}
                                                          posts={post}/>
                                        ))}
                                    </tbody>
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