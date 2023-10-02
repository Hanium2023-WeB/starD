import Header from "../../components/repeat_etc/Header";
import React, {useState} from "react";

import "../../css/community_css/Community.css";
import SearchBar from "../../SearchBar";
import PostInsert from "../../components/community/PostInsert";
import PostListItem from "../../components/community/PostListItem";

const Community = () => {
    const [posts, setPosts] = useState([]);
    const [showPostInsert, setShowPostInsert] = useState(false);

    const handleMoveToStudyInsert = (e) => {
        // if (accessToken && isLoggedInUserId) {
            e.preventDefault();
            setShowPostInsert(!showPostInsert);
        // } else {
        //     alert("로그인 해주세요");
        //     navigate("/login");
        // }
    };

    const searchItems = [
        "back-end",
        "front-end",
        "cloud",
        "aws",
        "framework"
    ]
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
                                <table className="post_table" key={posts.id}>
                                    <th>카테고리</th>
                                    <th>제목</th>
                                    <th>닉네임</th>
                                    <th>날짜</th>
                                    <th>조회수</th>
                                    <th>공감수</th>
                                    <th>스크랩수</th>
                                    {posts.map((d, index) => (
                                        <PostListItem posts={d} d={d}
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