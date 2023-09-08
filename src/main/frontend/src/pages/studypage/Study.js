import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";

import Backarrow from "../../components/repeat_etc/Backarrow";
import StudyInsert from "../../components/study/StudyInsert";
import Header from "../../components/repeat_etc/Header";
import ScrapButton from "../../components/repeat_etc/ScrapButton";
import LikeButton from "../../components/repeat_etc/LikeButton";

import "../../css/study_css/MyOpenStudy.css";
import "../../css/study_css/StudyDetail.css";
import SearchBar from "../../SearchBar";
import axios from "axios";

const Study = () => {
    const navigate = useNavigate();
    const [studies, setStudies] = useState([]);
    const [showStudyInsert, setShowStudyInsert] = useState(false);

    // 각 스터디 리스트 항목의 스크랩 상태를 저장하는 배열
    const [scrapStates, setScrapStates] = useState(false);
    const [likeStates, setLikeStates] = useState(false);

    const [studiesChanged, setStudiesChanged] = useState(false);
    let [isLoggedIn, setIsLoggedIn] = useState(false);

    // localStorage에 저장된 accessToken 추출
    let accessToken = localStorage.getItem('accessToken');

    // localStorage에 저장된 로그인한 사용자 Id 추출
    let isLoggedInUserId = localStorage.getItem('isLoggedInUserId');

    useEffect(() => {
        if (studiesChanged) {
            localStorage.setItem("studies", JSON.stringify(studies));
            localStorage.setItem("ScrapStudies", JSON.stringify(scrapStates));
            localStorage.setItem("LikeStates", JSON.stringify(likeStates));
            // Reset studiesChanged to false

            setStudiesChanged(false);
        }

    }, [studiesChanged, studies, scrapStates, likeStates]);

    //TODO 스크랩, 공감 서버 전송
    useEffect(() => {
        const response = axios.post("url",
            {
                scrap: studies.scrap,
                like:studies.like,
            })
            .then((res)=>{
                console.log("전송 성공");
                console.log(res.data);


            }).catch((error)=>{
                console.log('전송 실패', error);
            })

    }, [scrapStates, likeStates]);


    useEffect(() => {
        const storedStudies = JSON.parse(localStorage.getItem("studies"));
        if (storedStudies) {
            setStudies(storedStudies);
        }
    }, []);

    const updateStudies = (updatedStudies) => {
        setStudies(updatedStudies);
    };

    const handleMoveToStudyInsert = (e) => {
        if (accessToken && isLoggedInUserId) {
            e.preventDefault();
            setShowStudyInsert(!showStudyInsert);
        } else {
            alert("로그인 해주세요");
            navigate("/login");
        }

    };

    const handleStudyInsertClose = () => {
        setShowStudyInsert(false);
    };

    const handleSideHeaderButtonClick = () => {
        setShowStudyInsert(!showStudyInsert);
    };

    // 각 스터디 리스트 항목의 스크랩 상태를 토글하는 함수

    const toggleScrap = (index) => {
        setStudies((prevStudies) => {
            const newStudies = [...prevStudies];
            newStudies[index] = { ...newStudies[index], scrap: !newStudies[index].scrap };
            setStudiesChanged(true); // Mark studies as changed
            return newStudies;
        });
    };

    const toggleLike = (index) => {
        setStudies((prevStudies) => {
            const newStudies = [...prevStudies];
            newStudies[index] = { ...newStudies[index], like: !newStudies[index].like };
            setStudiesChanged(true); // Mark studies as changed
            return newStudies;
        });
    };

    const searchItems = [
        "back-end",
        "front-end",
        "cloud",
        "aws",
        "framework"
    ]

    return (
        <div>
            <Header showSideCenter={true}/>
            <div className="study_detail_container" style={{width: "70%"}}>
                <h1>STAR TOUR STORY</h1>
                <div className="arrow_left">
                    <Backarrow/>
                    {!showStudyInsert && (
                        <button onClick={handleMoveToStudyInsert} className="openStudy">
                            스터디 개설
                        </button>
                    )}
                </div>
                <SearchBar searchItems={searchItems}/>
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
