import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Category from "../../components/repeat_etc/Category.js";
import "../../css/study_css/MyParticipateStudy.css";
import Header from "../../components/repeat_etc/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const MyApplyStudy = ({ sideheader }) => {
    const [studies, setStudies] = useState([]);

    useEffect(() => {
        const storedStudies = localStorage.getItem("studies");
        if (storedStudies) {
            const parsedStudies = JSON.parse(storedStudies);
            const applyStudies = parsedStudies.filter(study => study.reason);
            setStudies(applyStudies);
        }
    }, []);

    const myapplystudylist = () => {
        return (
            <div className="study_list">
                {studies.map((d) => (
                    <div className="list">
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
                            <div className="list_tag">{d.field}</div>
                            <div className="list_onoff">{d.onoff}</div>
                            <div className="stroke"></div>
                            <div className="list_founder">{d.author}</div>
                        </Link>
                    </div>
                ))}
            </div>
        );
    };
    return (
        <div>
           <Header showSideCenter={true}/>
            <div className="container">
                <Category />
                <div className="main_container">
                    <h2>스터디 신청 내역</h2>
                    <div className="content_container">
                        {myapplystudylist()}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default MyApplyStudy;
