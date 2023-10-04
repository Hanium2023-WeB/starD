import Header from "../../components/repeat_etc/Header";
import Backarrow from "../../components/repeat_etc/Backarrow";
import StudyEdit from "../../components/study/StudyEdit";
import StudyInfo from "../../components/study/StudyInfo";
import {Link, useParams} from "react-router-dom";
import Comment from "../../components/comment/Comment";
import React, {useState, useEffect} from "react";
import LikeButton from "../../components/repeat_etc/LikeButton";
import ScrapButton from "../../components/repeat_etc/ScrapButton";
import axios from "axios";

const PostDetail = () => {

    const {id} = useParams();
    console.log("postId : ", id);

    const [postItem, setPostItem] = useState(null);

    let accessToken = localStorage.getItem('accessToken');
    let isLoggedInUserId = localStorage.getItem('isLoggedInUserId');

    useEffect(() => {
        const config = {
            headers: {}
        };

        if (accessToken && isLoggedInUserId) {
            // 로그인한 사용자인 경우 인증 토큰을 헤더에 추가
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }

        axios.get(`http://localhost:8080/com/${id}`, config)
            .then((res) => {
                setPostItem(res.data);


            })
                .catch((error) => {
                    console.error("커뮤니티 게시글 세부 데이터 가져오기 실패:", error);
        });
    }, [id, accessToken, isLoggedInUserId]);

    // 날짜, 시간 포맷팅("yyyy-MM-dd HH:mm" 형식)
    const formatDatetime = (datetime) => {
      const date = new Date(datetime);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const formattedDatetime = `${year}-${month}-${day} ${hours}:${minutes}`;
      return formattedDatetime;
    };

    return (
        <div>
            <Header showSideCenter={true}/>
            <div className="community_container">
                <h1>COMMUNITY LIST</h1>
                <div className="community_detail">
                    {postItem && (
                        <div className="post_header">
                            <div className="post_category">
                                <span>카테고리 > </span>
                                <span>{postItem.category}</span>
                            </div>
                            <div className="post_title">
                                {postItem.title}
                            </div>
                            <div className="post_info">
                                <div className="left">
                                    <span className="post_nickname">{postItem.member.nickname}</span>
                                    <span className="post_created_date">{formatDatetime(postItem.createdAt)}</span>
                                </div>
                                <div className="right">
                                    <span className="like_btn"><LikeButton /></span>
                                    <span className="scrap_btn"><ScrapButton /></span>
                                    <span>조회 <span>{postItem.viewCount}</span></span>
                                </div>
                            </div>
                        </div>
                    )}
                    {postItem && (
                        <div className="post_content">
                            {postItem.content}
                        </div>
                    )}
                    <div className="btn">
                        <Link to={"/community"}
                              style={{
                                  textDecoration: "none",
                                  color: "inherit",
                              }}
                        >
                            <button className="community_list_btn">글 목록보기</button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="comment_container">
                <Comment/>
            </div>
        </div>
    )
}
export default PostDetail;