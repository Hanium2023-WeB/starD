import React, {useState} from "react";
import {useNavigate, Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import Backarrow from "../../components/repeat_etc/Backarrow";

const Study = ({sideheader}) => {
    const navigate = useNavigate();
    const [studies, setStudies] = useState([]);

    const handleMoveToStudyInsert = (e) => {
        e.preventDefault();
        navigate("/studyopen");
    }

    return (
        <div>
        {sideheader}
        <div className="study_detail_container">
            <h1>STAR TOUR STORY</h1>
            <div className="arrow_left">
                <Backarrow />
                <button onClick={handleMoveToStudyInsert} className="openStudy">스터디 개설</button>
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