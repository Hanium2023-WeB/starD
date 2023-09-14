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
import StudyListItem from "../../components/study/StudyListItem";
import Paging from "../../components/repeat_etc/Paging";

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
    // useEffect(() => {
    //     const response = axios.post("url",
    //         {
    //             scrap: studies.scrap,
    //             like:studies.like,
    //         })
    //         .then((res)=>{
    //             console.log("전송 성공");
    //             console.log(res.data);
    //
    //
    //         }).catch((error)=>{
    //             console.log('전송 실패', error);
    //         })
    //
    // }, [scrapStates, likeStates]);


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

    //페이징관련 코드
    const [page, setPage] = useState(1);
    const [count, setCount]=useState(0);
    const [itemsPerPage, setItemsPerPage]= useState(9);
    const handlePageChange = ({page,itemsPerPage,totalItemsCount}) => {
        setPage(page);
        setItemsPerPage(itemsPerPage); //한페이지 당 아이템 개수
        setCount(totalItemsCount); //전체 아이템 개수
    };


    useEffect(() => {
        // TODO: 전체 리스트 값 가져오기
        // 여기서 백엔드에게 데이터 요청
        axios.get("http://localhost:8080/api/v2/studies/all")
            .then((res) => {
                console.log("전송 성공");
                console.log(res.data);
                // 데이터를 받아오면 전체 아이템 개수를 Paging.js에게 Props으로 넘길 예정,
                // 서버에서 받아온 스터디 리스트를 setStudies를 통해 업데이트
                setStudies(res.data.content);
                localStorage.setItem("studies", JSON.stringify(studies));
                console.log(res.data.content);
                // 서버에서 받아온 페이지 정보를 setPageInfo를 통해 업데이트합니다.
                handlePageChange({
                    itemsPerPage: res.data.pageable.pageSize, // 페이지 당 아이템 수
                    totalItemsCount: res.data.totalElements, // 전체 아이템 수
                });
            })
            .catch((error) => {
                console.error("데이터 가져오기 실패:", error);
            });
    }, []); // 의존성 배열 비워두기



        return (
        <div className={"main_wrap"} id={"study"}>
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

                <div className="study">
                    {showStudyInsert && (
                        <StudyInsert
                            updateStudies={updateStudies}
                            onClose={handleStudyInsertClose}
                        />
                    )}
                    {!showStudyInsert && (
                        <div>
                        <div>  <SearchBar searchItems={searchItems}/>
                        </div>
                        <div className="content_container">

                            <div className="study_list">
                                {studies.map((d, index) => (
                                    <StudyListItem studies={d} toggleLike={toggleLike} toggleScrap={toggleScrap} d={d} index={index} key={d.id}/>
                                ))}
                            </div>
                        </div>
                        </div>
                    )}
                    {!showStudyInsert && studies.length === 0 && <h3>스터디 리스트가 비었습니다.</h3>}
                </div>
            </div>
            <div className={"paging"}>
                <Paging  page={page} totalItemCount={count} itemsPerPage={itemsPerPage} handlePageChange={handlePageChange}/>
            </div>
        </div>
    );
};

export default Study;