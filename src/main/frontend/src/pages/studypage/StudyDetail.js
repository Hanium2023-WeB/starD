import React, {useState, useEffect, useCallback} from "react";
import {useParams, Link, useNavigate} from "react-router-dom";
import Header from "../../components/repeat_etc/Header";
import "../../css/study_css/StudyDetail.css";
import "../../css/comment_css/Comment.css";

import StudyInfo from "../../components/study/StudyInfo";
import StudyEdit from "../../pages/studypage/StudyEdit";
import Backarrow from "../../components/repeat_etc/Backarrow";
import Comment from "../../components/comment/Comment";
import {useLocation} from "react-router-dom";
import axios from "axios";
import StudyApplyList from "../../pages/studypage/StudyApplyList";


const StudyDetail = ({sideheader}) => {

    const location = useLocation();
    let studyId = location.state;
    console.log("studyId : ", studyId);
    const [studyItem, setStudyItem] = useState();
    const navigate = useNavigate();
    const {id} = useParams();
    console.log("studyId : ", id);
    const [studies, setStudies] = useState([]);
    const [studyDetail, setStudyDetail] = useState([]);
    const [isApply, setIsApply] = useState(false);
    const accessToken = localStorage.getItem('accessToken');
    const isLoggedInUserId = localStorage.getItem('isLoggedInUserId');
    const [applyReason, setApplyReason] = useState([]);
    const [isRecruiter, setIsRecruiter] = useState(false);
    useEffect(() => {
        if (studyId === null) {
            studyId = id;
        }

        axios.get(`http://localhost:8080/api/v2/studies/${studyId}`, {
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }).then((res) => {
            setStudyItem(res.data);
            if (res.data.recruiter.id === isLoggedInUserId) {
                console.log("자기 자신의 글", res.data);
                setIsRecruiter(true);
            }
        })
            .catch((error) => {
                alert("로그인 해 주세요.");
                navigate('/login');
                console.error("스터디 세부 데이터 가져오기 실패:", error);
            });

        axios.get(`http://localhost:8080/api/v2/studies/${studyId}/apply-reason`, {
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }).then((res) => {
            const result = res.data;
            if (result.length !== 0) {   // 지원했으면 true
                console.log("지원 O");
                setIsApply(true);
                setApplyReason(res.data.applyReason);
            }
        })
            .catch((error) => {
                console.error("스터디 지원 여부 데이터 가져오기 실패:", error);
            });
    }, [id]);

    const handleStudyDelete = useCallback(() => {
        const confirmDelete = window.confirm("정말로 스터디를 삭제하시겠습니까?");
        if (confirmDelete) {
            axios.delete(`http://localhost:8080/api/v2/studies/${studyId}`,
                {
                    withCredentials: true,
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    },
                }).then((res) => {
                console.log("API Response:", res.data);
                console.log("삭제성공");
                setStudies(res.data);
            }).catch((error) => {
                console.log(error);
            })
            window.location.href = "/myopenstudy";
        }
    }, [id]);

    return (
        <div>
            <Header showSideCenter={true}/>
            <div className="study_detail_container">
                <h1>STAR TOUR STORY</h1>
                <div className="arrow_left">
                    <Backarrow/>
                </div>
                <div className="study_detail">
                    {studyItem && (
                        <div key={studyItem.id}>
                            <StudyInfo
                                study={studyItem}
                                handleStudyDelete={handleStudyDelete}
                                isRecruiter={isRecruiter}
                            />
                            <div className="study_intro">
                                <div style={{fontWeight: "bold"}}>스터디 소개</div>
                                {studyItem && (
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: studyItem.content.replace(/\n/g, "<br>"),
                                        }}
                                    />
                                )}
                            </div>
                            {isApply === true && applyReason && (
                                <div className="study_apply_reason">
                                    <div>나의 지원동기 및 각오</div>
                                    <div>{applyReason}</div>
                                </div>
                            )}
                            {isApply === false && isRecruiter === false && (
                                <div className="btn">
                                    <Link
                                        to={`/studyapplyform/${studyItem.id}`}
                                        style={{
                                            textDecoration: "none",
                                            color: "inherit",
                                        }}
                                    >
                                        <button className="apply_btn">탑승하기</button>
                                    </Link>
                                </div>
                            )}
                            {isApply === false && isRecruiter === true && (
                                <div className="btn">
                                    <Link
                                        to={`/StudyApplyList/${studyItem.id}`}
                                        style={{
                                            textDecoration: "none",
                                            color: "inherit",
                                        }}
                                    >
                                        <button className="apply_btn">신청자 조회</button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <div className="comment_container">
                <Comment/>
            </div>
        </div>
    );
};

export default StudyDetail;