import Header from "../../components/repeat_etc/Header";
import Backarrow from "../../components/repeat_etc/Backarrow";
import StudyEdit from "../../components/study/StudyEdit";
import StudyInfo from "../../components/study/StudyInfo";
import {Link} from "react-router-dom";
import Comment from "../../components/comment/Comment";
import React from "react";
import LikeButton from "../../components/repeat_etc/LikeButton";
import ScrapButton from "../../components/repeat_etc/ScrapButton";

const PostDetail = () => {
    return (
        <div>
            <Header showSideCenter={true}/>
            <div className="community_container">
                <h1>COMMUNITY LIST</h1>
                <div className="community_detail">
                    <div className="post_header">
                        <div className="post_category">
                            <span>카테고리 > </span>
                            <span>자소서</span>
                        </div>
                        <div className="post_title">
                            자소서 작성하는데 이런 문장 넣어도 될까요?
                        </div>
                        <div className="post_info">
                            <div className="left">
                                <span className="post_nickname">솜솜이</span>
                                <span className="post_created_date">2023.09.27 18:01</span>
                            </div>
                            <div className="right">
                                <span className="like_btn"><LikeButton /></span>
                                <span className="scrap_btn"><ScrapButton /></span>
                                <span>조회 <span>3</span></span>
                            </div>
                        </div>
                    </div>
                    <div className="post_content">
                        자소서 작성하는데 이런 문장 넣어도 될까요?? 자소서 작성하는데 이런 문장 넣어도 될까요??<br/>
                        자소서 작성하는데 이런 문장 넣어도 될까요?? 자소서 작성하는데 이런 문장 넣어도 될까요??<br/>
                        자소서 작성하는데 이런 문장 넣어도 될까요?? 자소서 작성하는데 이런 문장 넣어도 될까요??<br/>
                        자소서 작성하는데 이런 문장 넣어도 될까요?? 자소서 작성하는데 이런 문장 넣어도 될까요??<br/>
                        자소서 작성하는데 이런 문장 넣어도 될까요?? 자소서 작성하는데 이런 문장 넣어도 될까요??<br/>
                        자소서 작성하는데 이런 문장 넣어도 될까요?? 자소서 작성하는데 이런 문장 넣어도 될까요??<br/>
                        자소서 작성하는데 이런 문장 넣어도 될까요?? 자소서 작성하는데 이런 문장 넣어도 될까요??<br/>
                        자소서 작성하는데 이런 문장 넣어도 될까요?? 자소서 작성하는데 이런 문장 넣어도 될까요??
                    </div>
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