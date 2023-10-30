import React, {useCallback, useState} from "react";
import {useNavigate} from "react-router-dom";
import Report from "../report/Report";
import CommentForm from "../comment/CommentForm";
import axios from "axios";

const StudyInfo = ({study, isRecruiter}) => {
    let isLoggedInUserId = localStorage.getItem('isLoggedInUserId');
    const navigate = useNavigate();
    const [showReportModal, setShowReportModal] = useState(false);
    const [reportStudyId, setReportStudyId] = useState(null);
    const [editing, setEditing] = useState(false);
    const accessToken = localStorage.getItem('accessToken');
    const handleOpenReportModal = (studyId) => {
        setReportStudyId(studyId);
        setShowReportModal(true);
    };

    const handleCloseReportModal = () => {
        setReportStudyId(null);
        setShowReportModal(false);
    };

    const handleReportSubmit = (reportReason) => {
        console.log("신고 사유:", reportReason);
    };

    console.log("study:", study);
    console.log("자신의 글인가요? ", isRecruiter);

    const showregion = () => {
        if (study.onOff === "offline" || study.onOff === "both") {
            return (
                <li>
                    <span>지역</span>
                    <span>{study.city} </span>
                    <span>{study.district}</span>
                </li>
            )
        }
    }

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
    const handleEdit=()=>{
        navigate(`/${study.id}/StudyDetail/StudyEdit`,{
            state:{
                study: study,
            }
        });
    }
    //스터디 삭제 >> 미완성
    const handleStudyDelete = useCallback(() => {
        const confirmDelete = window.confirm("정말로 스터디를 삭제하시겠습니까?");
        if (confirmDelete) {
            axios
                .delete(`http://localhost:8080/api/v2/studies/${study.id}`, {
                    withCredentials: true,
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    },
                })
                .then((res) => {
                    console.log("API Response:", res.data);
                    console.log("삭제성공");
                })
                .catch((error) => {
                    console.log("Deletion error:", error);
                });

            // Log values for debugging
            console.log("Study ID to delete:", study.id);
            console.log("Access Token:", accessToken);

            // Redirect to a different URL (e.g., /study/1)
            navigate(`/study/${1}`, {
                state: {
                    page: 1,
                }
            });
        }
    }, [study.id, accessToken, navigate]);


    return (
        <>
            <div className="study_header">
                <h2 className="study_title">{study.title}</h2>
                <div>
                    <div className="study_author_info">
                        <p className="study_author">{study.recruiter.nickname}</p>
                        <p className="study_created_date">{formatDatetime(study.recruitmentStart)}</p>
                        {(study.recruitStatus !== 'RECRUITMENT_COMPLETE') | (study.recruiter !== isLoggedInUserId)  && (
                            <>
                                <p>&nbsp;&nbsp; | &nbsp;&nbsp;</p>
                                <p className="report_btn" onClick={() => handleOpenReportModal(study.id)}>신고</p>
                            </>
                        )}
                        <Report
                            show={showReportModal}
                            handleClose={handleCloseReportModal}
                            onReportSubmit={handleReportSubmit}
                            targetId={reportStudyId}
                        />
                    </div>
                    {isRecruiter && (
                        <div className="study_detail_btn">
                            <button className="study_edit" onClick={handleEdit}>수정</button>
                            <button className="study_remove" onClick={handleStudyDelete}>삭제</button>
                        </div>
                    )}
                </div>
            </div>
            <div className="study_content">
                <ul className="study_info">
                    <li>
                        <span>분야</span>
                        <span>{study.field}</span>
                    </li>
                    <li>
                        <span>스터디 태그</span>
                        <span>{study.tags}</span>
                    </li>
                    <li>
                        <span>모집 인원</span>
                        <span>{study.capacity} 명</span>
                    </li>
                    <li>
                        <span>진행 방식</span>
                        <span>{study.onOff}</span>
                    </li>
                    {showregion()}
                    <li>
                        <span>모집 마감일</span>
                        <span>{study.recruitmentDeadline}</span>
                    </li>
                    <li>
                        <span>스터디 시작일</span>
                        <span>{study.activityStart}</span>
                    </li>
                    <li>
                        <span>스터디 종료일</span>
                        <span>{study.activityDeadline}</span>
                    </li>
                </ul>
            </div>
        </>
    );
};
export default StudyInfo;
