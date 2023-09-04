import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faStar} from "@fortawesome/free-solid-svg-icons";
import Backarrow from "../../components/repeat_etc/Backarrow";
import StudyInsert from "../../components/study/StudyInsert";
import Header from "../../components/repeat_etc/Header";

const Study = () => {
    const navigate = useNavigate();
    const [studies, setStudies] = useState([]);
    const [showStudyInsert, setShowStudyInsert] = useState(false);

    useEffect(() => {
        const storedStudies = JSON.parse(localStorage.getItem("studies"));
        if (storedStudies) {
            setStudies(storedStudies);
        }
    }, []);

    const updateStudies = (updatedStudies) => {
        setStudies(updatedStudies);
    }
    const handleMoveToStudyInsert = (e) => {
        e.preventDefault();
        setShowStudyInsert(!showStudyInsert); // StudyInsert 컴포넌트를 보이도록 설정
    }

    const handleStudyInsertClose = () => {
        setShowStudyInsert(false); // StudyInsert 컴포넌트를 숨기도록 설정
    };

    const handleSideHeaderButtonClick = () => {
        // sideheader에 들어가는 버튼을 눌렀을 때 showStudyInsert 값을 변경합니다.
        setShowStudyInsert(!showStudyInsert);
    };

    return (
        <div>
            <Header showSideCenter={true}/>
            <div className="study_detail_container" style={{width:"70%"}}>
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
                            <div className="study_list" style={{justifyContent:"space-between"}}>
                                {studies.map((d) => (
                                    <div className="list" key={d.id}>
                                        <Link
                                            to={`/studydetail/${d.id}`}
                                            style={{
                                                textDecoration: "none",
                                                color: "inherit",
                                            }}
                                        >
                                            <div className="list_header">
                                                <div className="list_sub_header">
                                                    <div className="list_day">
                                                        {d.id}일간의 우주여행
                                                    </div>
                                                    <div className="list_status">진행중</div>
                                                </div>
                                                <div className="list_like">
                                                    <FontAwesomeIcon icon={faStar} />
                                                </div>
                                            </div>
                                            <div className="list_deadline">
                                                마감일 | {d.deadline}
                                            </div>
                                            <div className="list_title">{d.title}</div>
                                            <div className="list_tag">{d.tag}</div>
                                            <div className="list_onoff">{d.onoff}</div>
                                            <div className="stroke"></div>
                                            <div className="list_founder">{d.author}</div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {!showStudyInsert && (
                        studies.length === 0 && (
                            <h3>스터디 리스트가 비었습니다.</h3>
                        )
                    )}
                </div>

            </div>
        </div>);
}
export default Study;