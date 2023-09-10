import LikeButton from "../repeat_etc/LikeButton";
import ScrapButton from "../repeat_etc/ScrapButton";
import {Link} from "react-router-dom";
import React from "react";

function calculateDateDifference(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const timeDifference = end - start;
    const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));

    return daysDifference;
}

function checkRecruitStatus(recruitStatus) {

    if (recruitStatus == "RECRUITING")
        return "모집 중";
}

const StudyListItem = ({studies, toggleLike, toggleScrap, d, index}) => {

    console.log("studies : ", studies);
    console.log("d : ", d);
    const daysDifference = calculateDateDifference(studies.activityStart, studies.activityDeadline);
    const recruitStatus = checkRecruitStatus(studies.recruitStatus);

    return (
        <div className="list" key={studies.id}>
            <div className="list_header">
                <div className="list_sub_header">
                    <div className="list_day">
                        {daysDifference}일간의 우주여행
                    </div>
                    <div className="list_status">{recruitStatus}</div>
                </div>
                <div className="list_btn">
                    <div className="list_like">
                        <LikeButton like={studies.like}
                                    onClick={() => toggleLike(index)}/>
                    </div>
                    <div className="list_scrap">
                        {/* 스크랩 버튼을 클릭하면 해당 스터디 리스트 항목의 스크랩 상태를 토글 */}
                        <ScrapButton scrap={studies.scrap}
                                     onClick={() => toggleScrap(index)}/>
                    </div>
                </div>
            </div>
            <Link
                to={`/studydetail/${studies.id}`}
                style={{
                    textDecoration: "none",
                    color: "inherit",
                }}
            >
                <div className="list_deadline">
                    마감일 | {studies.recruitmentDeadline}
                </div>
                <div className="list_title">{studies.title}</div>
                <div className="list_tag">{studies.tags}</div>
                <div className="list_onoff">{studies.onOff}</div>
                <div className="stroke"></div>
                <div className="list_founder">{studies.recruiter.id}</div>
            </Link>
        </div>
    )
}
export default StudyListItem;