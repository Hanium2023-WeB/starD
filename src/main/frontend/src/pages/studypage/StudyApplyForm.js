import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import "../../css/study_css/StudyDetail.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import StudyInfo from "../../components/study/StudyInfo";

const StudyApplyForm = ({ sideheader }) => {
    const { id } = useParams();
    const dataId = useRef(0);
    const contentRef = useRef();
    const [state, setState] = useState([]);
    const [content, setContent] = useState("");
    const navigate = useNavigate();
    const studyDetail = state.filter((study) => study.id === Number(id));

    const getData = async () => {
        const res = await fetch(
            "https://jsonplaceholder.typicode.com/comments"
        ).then((res) => res.json());
        const initDate = res.slice(0, 10).map((it) => {
            return {
                tag: it.email,
                author: it.email,
                day: it.postId,
                title: it.name,
                last: 5,
                created_date: new Date().getTime(),
                id: dataId.current++,
                content: it.body,
            };
        });
        setState(initDate);
        console.log(initDate);
    };
    useEffect(() => {
        getData();
    }, []);
    const handleSubmit = () => {
        if (content.length < 1) {
            contentRef.current.focus();
            return;
        }
        setState([...state, content]);
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
                                addState={{ state }}
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
            {sideheader}
            <div className="study_detail_container">
                <h1>STAR TOUR STORY</h1>
                <div className="arrow_left">
                    <FontAwesomeIcon
                        icon={faArrowLeft}
                        onClick={() => navigate(-1)}
                    />
                </div>
                {studyinfo()}
            </div>
        </div>
    );
};
export default StudyApplyForm;
