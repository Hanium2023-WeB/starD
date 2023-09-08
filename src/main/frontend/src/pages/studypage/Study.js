import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Backarrow from "../../components/repeat_etc/Backarrow";
import StudyInsert from "../../components/study/StudyInsert";
import Header from "../../components/repeat_etc/Header";
import ScrapButton from "../../components/repeat_etc/ScrapButton";
import LikeButton from "../../components/repeat_etc/LikeButton";

import "../../css/study_css/MyOpenStudy.css";
import "../../css/study_css/StudyDetail.css";

const Study = () => {
    const navigate = useNavigate();
    const [studies, setStudies] = useState([]);
    const [showStudyInsert, setShowStudyInsert] = useState(false);

    // 각 스터디 리스트 항목의 스크랩 상태를 저장하는 배열
    const [scrapStates, setScrapStates] = useState([]);
    const [likeStates, setLikeStates] = useState([]);

    let [isLoggedIn, setIsLoggedIn] = useState(false);

    // localStorage에 저장된 accessToken 추출
    let accessToken = localStorage.getItem('accessToken');

    // localStorage에 저장된 로그인한 사용자 Id 추출
    let isLoggedInUserId = localStorage.getItem('isLoggedInUserId');

    useEffect(() => {
        const storedStudies = JSON.parse(localStorage.getItem("studies"));
        if (storedStudies) {
            setStudies(storedStudies);
            // 각 스터디 리스트 항목의 스크랩 상태를 초기화
            setScrapStates(Array(storedStudies.length).fill(false));
            setLikeStates(Array(storedStudies.length).fill(false));
        }
    }, []);

    const updateStudies = (updatedStudies) => {
        setStudies(updatedStudies);
    };

    const handleMoveToStudyInsert = (e) => {
        // if(accessToken && isLoggedInUserId) {    // TODO 주석 제거 필요
            e.preventDefault();
            setShowStudyInsert(!showStudyInsert);
        // }
        // else{
        //     alert("로그인 해주세요");
        //     navigate("/login");
        // }

    };

    const handleStudyInsertClose = () => {
        setShowStudyInsert(false);
    };

    const handleSideHeaderButtonClick = () => {
        setShowStudyInsert(!showStudyInsert);
    };

    // 각 스터디 리스트 항목의 스크랩 상태를 토글하는 함수
    const toggleScrap = (index) => {
        const newScrapStates = [...scrapStates];
        newScrapStates[index] = !newScrapStates[index];
        setScrapStates(newScrapStates);
    };

    const toggleLike = (index) => {
        const newLikeStates = [...likeStates];
        newLikeStates[index] = !newLikeStates[index];
        setLikeStates(newLikeStates);
    };

    return (
        <div>
            <Header showSideCenter={true} />
            <div className="study_detail_container" style={{ width: "70%" }}>
                <h1>STAR TOUR STORY</h1>
                <div className="arrow_left">
                    <Backarrow />
                    {!showStudyInsert && (
                        <button onClick={handleMoveToStudyInsert} className="openStudy">
                            스터디 개설
                        </button>
                    )}
                </div>
                <div className="study">
                    {showStudyInsert && (
                        <StudyInsert
                            updateStudies={updateStudies}
                            onClose={handleStudyInsertClose}
                        />
                    )}
                    {!showStudyInsert && (
                        <div className="content_container">
                            <div className="study_list">
                                {studies.map((d, index) => (
                                    <div className="list" key={d.id}>
                                        <div className="list_header">
                                            <div className="list_sub_header">
                                                <div className="list_day">
                                                    {d.id}일간의 우주여행
                                                </div>
                                                <div className="list_status">진행중</div>
                                            </div>
                                            <div className="list_btn">
                                                <div className="list_like">
                                                    <LikeButton like={likeStates[index]} onClick={() => toggleLike(index)} />
                                                </div>
                                                <div className="list_scrap">
                                                    {/* 스크랩 버튼을 클릭하면 해당 스터디 리스트 항목의 스크랩 상태를 토글 */}
                                                    <ScrapButton scrap={scrapStates[index]} onClick={() => toggleScrap(index)} />
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
                                                마감일 | {d.deadline}
                                            </div>
                                            <div className="list_title">{d.title}</div>
                                            <div className="list_tag">{d.field}</div>
                                            <div className="list_onoff">{d.onoff}</div>
                                            <div className="stroke"></div>
                                            <div className="list_founder">{d.author}</div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {!showStudyInsert && studies.length === 0 && <h3>스터디 리스트가 비었습니다.</h3>}
                </div>
            </div>
        </div>
    );
};

export default Study;
