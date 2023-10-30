import Header from "../../components/repeat_etc/Header";
import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";

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

    const handleMoveToStudyInsert = (e) => {
        if (accessToken && isLoggedInUserId) {
            e.preventDefault();
            setShowPostInsert(!showPostInsert);
        } else {
            alert("로그인 해주세요");
            navigate("/login");
        }
    };

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
                <p id={"entry-path"}> 커뮤니티 </p>
                <Backarrow subname={"COMMUNITY LIST"}/>
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