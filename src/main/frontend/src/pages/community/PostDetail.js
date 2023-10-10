import Header from "../../components/repeat_etc/Header";
import Backarrow from "../../components/repeat_etc/Backarrow";
import StudyEdit from "../../components/study/StudyEdit";
import StudyInfo from "../../components/study/StudyInfo";
import {Link, useParams, useNavigate} from "react-router-dom";
import Comment from "../../components/comment/Comment";
import React, {useState, useEffect} from "react";
import LikeButton from "../../components/repeat_etc/LikeButton";
import ScrapButton from "../../components/repeat_etc/ScrapButton";
import axios from "axios";
import PostEdit from "../../components/community/PostEdit";

const PostDetail = () => {
    const navigate = useNavigate();

    const {id} = useParams();
    console.log("postId : ", id);

    const [postItem, setPostItem] = useState(null);

    const [scrapStates, setScrapStates] = useState(false);
    const [likeStates, setLikeStates] = useState(false);

    const [initiallyScrapStates, setInitiallyScrapStates] = useState(false);
    const [initiallyLikeStates, setInitiallyLikeStates] = useState(false);

    const [posts, setPosts] = useState([]);
    const [editing, setEditing] = useState(false);
    const [postDetail, setPostDetail] = useState([]);// 게시글 상세 정보를 상태로 관리

    let accessToken = localStorage.getItem('accessToken');
    let isLoggedInUserId = localStorage.getItem('isLoggedInUserId');

    useEffect(() => {
        if (accessToken && isLoggedInUserId) {
            axios.get(`http://localhost:8080/star/post/${id}`, { // 공감
                params: { id: id },
                withCredentials: true,
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
                .then(response => {
                    setLikeStates(response.data);
                    setInitiallyLikeStates(response.data);
                })
                .catch(error => {
                    console.log("공감 불러오기 실패", error);
                });

            axios.get(`http://localhost:8080/scrap/post/${id}`, { // 스크랩
                params: { id: id },
                withCredentials: true,
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
                .then(response => {
                    setScrapStates(response.data);
                    setInitiallyScrapStates(response.data);
                })
                .catch(error => {
                    console.log("스크랩 불러오기 실패", error);
                });
        }
    }, [id]);


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
    }, [id, accessToken, isLoggedInUserId, initiallyLikeStates, initiallyScrapStates]);

    const toggleLike = () => {
        if (!(accessToken && isLoggedInUserId)) {
            alert("로그인 해주세요");
            navigate("/login");
        }

        if (likeStates) { // true -> 활성화되어 있는 상태 -> 취소해야 함
            axios.delete(`http://localhost:8080/star/post/${id}`, {
                params: { id: id },
                withCredentials: true,
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
                .then(response => {
                    console.log("공감 취소 성공 " + response.data);
                })
                .catch(error => {
                    console.error("Error:", error);
                    console.log("공감 취소 실패");
                });

            setLikeStates(false);
        } else {
            axios.post(`http://localhost:8080/star/post/${id}`, null, {
                params: { id: id },
                withCredentials: true,
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
                .then(response => {
                    console.log("공감 성공");
                })
                .catch(error => {
                    console.error("Error:", error);
                    console.log("공감 실패");
                });

            setLikeStates(true);
        }
    };

    const toggleScrap = () => {
        if (!(accessToken && isLoggedInUserId)) {
            alert("로그인 해주세요");
            navigate("/login");
        }

        if (scrapStates) { // true -> 활성화되어 있는 상태 -> 취소해야 함
            axios.delete(`http://localhost:8080/scrap/post/${id}`, {
                params: { id: id },
                withCredentials: true,
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
                .then(response => {
                    console.log("스크랩 취소 성공 " + response.data);
                })
                .catch(error => {
                    console.error("Error:", error);
                    console.log("스크랩 취소 실패");
                });

            setScrapStates(false);
        } else {
            axios.post(`http://localhost:8080/scrap/post/${id}`, null, {
                params: { id: id },
                withCredentials: true,
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
                .then(response => {
                    console.log("스크랩 성공");
                })
                .catch(error => {
                    console.error("Error:", error);
                    console.log("스크랩 실패");
                });

            setScrapStates(true);
        }
    };

    const handleEditClick = () => {
        setEditing(true);
    }

    const handleCancelEdit = () => {
        setEditing(false);
    }

    const handlePostUpdate = (updatedPost) => {
        setEditing(false);
        setPostDetail([updatedPost]);
        const updatedPosts = posts.map(post =>
            post.id === updatedPost.id ? updatedPost : post
        );
        setPosts(updatedPosts);
    }

    const handlePostDelete = () => {
        const confirmDelete = window.confirm("정말로 게시글을 삭제하시겠습니까?");
        if (confirmDelete) {
            const updatedPosts = posts.filter(post => post.id !== postDetail[0].id);
            setPosts(updatedPosts);
            window.location.href = "/community";
        }
    }

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
                {editing ? (
                        <PostEdit
                            post={postItem}
                            onUpdatePost={handlePostUpdate}
                            onCancel={handleCancelEdit}
                        />
                    ) : (
                <div className="community_detail">
                    {postItem && (
                        <div className="post_header">
                            <div className="post_category">
                                <span>카테고리 > </span>
                                <span>{postItem.category}</span>
                            </div>
                            <div style={{display:"flex", justifyContent:"space-between"}}>
                                <div className="post_title">
                                    {postItem.title}
                                </div>
                                <div className="button">
                                    <button style={{marginRight:"5px"}} onClick={handleEditClick}>수정</button>
                                    <button onClick={handlePostDelete}>삭제</button>
                                </div>
                            </div>
                            <div className="post_info">
                                <div className="left">
                                    <span className="post_nickname">{postItem.member.nickname}</span>
                                    <span className="post_created_date">{formatDatetime(postItem.createdAt)}</span>
                                </div>
                                <div className="right">
                                    <span className="like_btn"><LikeButton like={likeStates}
                                    onClick={() => toggleLike()} /></span>
                                    <span className="scrap_btn"><ScrapButton scrap={scrapStates}
                                    onClick={() => toggleScrap()} /></span>
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
                    )}
            </div>
            <div className="comment_container">
                <Comment/>
            </div>
        </div>
    )
}
export default PostDetail;