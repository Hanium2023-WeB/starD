import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Header from "../../components/repeat_etc/Header";
import "../../css/study_css/StudyDetail.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import StudyInfo from "../../components/study/StudyInfo";
import Backarrow from "../../components/repeat_etc/Backarrow";

const StudyApplyForm = ({ sideheader }) => {
    const { id } = useParams();
    const dataId = useRef(0);
    const contentRef = useRef();
    const [studies, setStudies] = useState([]);
    const [content, setContent] = useState("");

    const studyDetail = studies.filter((study) => study.id === Number(id));


    useEffect(() => {
        const storedStudies = localStorage.getItem("studies");
        if (storedStudies) {
            setStudies(JSON.parse(storedStudies));
        }
    }, []);
    const handleSubmit = () => {
        if (content.length < 1) {
            contentRef.current.focus();
            return;
        }
        const updatedStudies = studies.map(study => {
            if (study.id === Number(id)) {
                return {
                    ...study,
                    reason: content,
                };
            }
            return study;
        });
        setStudies(updatedStudies);
        localStorage.setItem("studies", JSON.stringify(updatedStudies));
    };
    const studyinfo = () => {
        return (
            <div className="study_detail">
                {studyDetail.map((study) => (
                    <div key={study.id}>
                        <StudyInfo study={study} />
                        <div className="study_apply_reason">
                            <div>지원 동기 및 각오</div>
                            <textarea
                                placeholder="지원 동기 및 각오를 입력해주세요."
                                ref={contentRef}
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </div>
                        <div className="btn">
                            <Link
                                to={`/myapplystudy/`}
                                style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                }}
                                addState={{ studies }}
                            >
                                <button
                                    className="apply_btn"
                                    onClick={handleSubmit}
                                >
                                    탑승하기
                                </button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        );
    };
    return (
        <div>
            <Header showSideCenter={true}/>
            <div className="study_detail_container">
                <h1>STAR TOUR STORY</h1>
                <div className="arrow_left">
                    <Backarrow />
                </div>
                {studyinfo()}
            </div>
        </div>
    );
};
export default StudyApplyForm;
