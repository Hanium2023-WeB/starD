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

    const daysDifference = calculateDateDifference(d.activityStart, d.activityDeadline);
    const recruitStatus = checkRecruitStatus(d.recruitStatus);
    return (
        <div className="list" key={d.id}>
            <div className="list_header">
                <div className="list_sub_header">
                    <div className="list_day">
                        {daysDifference}일간의 우주여행
                    </div>
                    <div className="list_status">{recruitStatus}</div>
                </div>
                <div className="list_btn">
                    <div className="list_like">
                        <LikeButton like={studies[index].like}
                                    onClick={() => toggleLike(index)}/>
                    </div>
                    <div className="list_scrap">
                        {/* 스크랩 버튼을 클릭하면 해당 스터디 리스트 항목의 스크랩 상태를 토글 */}
                        <ScrapButton scrap={studies[index].scrap}
                                     onClick={() => toggleScrap(index)}/>
                    </div>
                </div>
            </div>
            <Link
                to={`/studydetail/${d.id}`}
                style={{
                    textDecoration: "none",
                    color: "inherit",
                }}
            >
                <div className="list_deadline">
                    마감일 | {d.recruitmentDeadline}
                </div>
                <div className="list_title">{d.title}</div>
                <div className="list_tag">{d.tags}</div>
                <div className="list_onoff">{d.onOff}</div>
                <div className="stroke"></div>
                <div className="list_founder">{d.recruiter.nickname}</div>
            </Link>
        </div>
    )
}
export default StudyListItem;