import Header from "../../components/repeat_etc/Header";
import Category from "../../components/repeat_etc/Category";
import React, { useEffect, useState } from "react";
import Backarrow from "../../components/repeat_etc/Backarrow";
import { useLocation } from "react-router-dom";
import MemberEvaluateInsert from "../../components/evaluate/MemberEvaluateInsert";
import "../../css/study_css/MyParticipateStudy.css";

const MemberEvaluate = () => {
    const [evaluation, setEvaluation] = useState([]);
    const [showEvaluateInsert, setShowEvaluateInsert] = useState(false);

    const study = useLocation();
    const { studyId } = study.state;

    const handleMoveToEvaluateInsert = (e) => {
        e.preventDefault();
        setShowEvaluateInsert(!showEvaluateInsert); // Toggle the showEvaluateInsert state
    };

    return (
        <div>
            <Header showSideCenter={true} />
            <div className="container">
                <Category />
                <div className="main_container">
                    <p id={"entry-path"}> 스터디 참여 내역 > 팀원 평가 </p>
                    <Backarrow subname={"팀원 평가"} />
                    <div className="evaluate">
                        {showEvaluateInsert ? ( // Render MemberEvaluateInsert when showEvaluateInsert is true
                            <MemberEvaluateInsert studyId={studyId} />
                        ) : evaluation.length === 0 ? (
                            <>
                                <p>평가 내역이 없습니다.<br/> 팀원 평가를 진행해주세요.</p>
                                <button className="evaluate_button" onClick={handleMoveToEvaluateInsert}>팀원 평가하기</button>
                            </>
                        ) : (
                            <table className="evaluate_table">
                                <thead>
                                <tr>
                                    <th>팀원 이름</th>
                                    <th>점수</th>
                                    <th>사유</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr className="evaluate_list">
                                    <td className="member_name">김솜솜</td>
                                    <td className="member_rating">5</td>
                                    <td className="member_evaluate_reason">이것이 사유입니다.</td>
                                </tr>
                                {/*{members.map((member) => (*/}
                                {/*    <tr className="evaluate_list">*/}
                                {/*        <td className="community_category">{}</td>*/}
                                {/*        <td className="community_nickname">{}</td>*/}
                                {/*        <td className="community_datetime">{}</td>*/}
                                {/*    </tr>*/}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MemberEvaluate;
