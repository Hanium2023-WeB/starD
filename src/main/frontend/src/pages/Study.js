import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import "../css/StudyDetail.css";

const Study = ({sideheader}) => {
    const navigate = useNavigate();

    const [showStudyInsert, setShowStudyInsert] = useState(false);
    const [studies, setStudies] = useState([]);
    const [selectedStudy, setSelectedStudy] = useState(null);

    const handleMoveToStudyInsert = (e) => {
        e.preventDefault();
        navigate("/studyopen");
    }
    const onInsertStudy = (study) => {
        const newStudy = {
            id: Date.now(),
            title: study.title,
            tag: study.tag,
            author:study.author,
            number: study.number,
            onoff: study.onoff,
            deadline: study.deadline,
            duration: study.duration,
            description: study.description,
            created_date: new Date().toISOString(),
        };
        setStudies([...studies, newStudy]);
    };
    return (
        <div>
        {sideheader}
        <div className="study_detail_container">
            <h1>STAR TOUR STORY</h1>
            <div className="arrow_left">
                <FontAwesomeIcon
                    icon={faArrowLeft}
                    onClick={() => navigate(-1)}
                />
                <button className="openStudy" onClick={handleMoveToStudyInsert}>스터디 개설</button>
            </div>
            <div className="study">
                {studies.length == 0 && (
                    <h3>스터디 리스트가 비었습니다.</h3>
                )}

            </div>

        </div>
    </div>);
}
export default Study;