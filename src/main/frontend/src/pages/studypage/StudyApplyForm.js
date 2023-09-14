import React, {useState, useEffect, useRef} from "react";
import {useParams, useNavigate, Link} from "react-router-dom";
import Header from "../../components/repeat_etc/Header";
import "../../css/study_css/StudyDetail.css";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import StudyInfo from "../../components/study/StudyInfo";
import Backarrow from "../../components/repeat_etc/Backarrow";
import axios from "axios";

const StudyApplyForm = ({sideheader}) => {

    const {id} = useParams();
    // const dataId = useRef(0);
    const contentRef = useRef();
    const [studies, setStudies] = useState([]);
    const [studyDetail, setStudyDetail] = useState([]);
    const [content, setContent] = useState("");
    const accessToken = localStorage.getItem('accessToken');
    const navigate = useNavigate();

    // const studyDetail = studies.filter((study) => study.id === Number(id));
    const isLoggedInUserId = localStorage.getItem('isLoggedInUserId');

    useEffect(() => {

        // 백엔드 REST API 호출 코드
        axios.get(`http://localhost:8080/api/v2/studies/${id}`, {
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }).then((res) => {
            console.log("전송 성공 : ", res.data);
            setStudyDetail(res.data);

            if (res.data.recruiter.id === isLoggedInUserId) {
                console.log("자기 자신의 글");
            }
        })
            .catch((error) => {
                // alert("로그인 해 주세요.");
                // navigate('/login');
                console.error("데이터 가져오기 실패:", error);
            });

        // const storedStudies = localStorage.getItem("studies");
        // if (storedStudies) {
        //     setStudies(JSON.parse(storedStudies));
        // }

    }, [id]);

    const handleSubmit = () => {

        if (content.length < 1) {
            contentRef.current.focus();
            return;
        }

        console.log("지원 동기 : ", content);

        // 백엔드 REST API 호출 코드
        axios.post(`http://localhost:8080/api/v2/studies/${id}/apply`,{}, {
            params: {
                apply_reason: content},
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }).then((res) => {
            console.log("전송 성공 : ", res.data);
            setStudyDetail(res.data);

            navigate("/myapplystudy/");
        })
            .catch((error) => {
                // alert("로그인 해 주세요.");
                // navigate('/login');
                console.error("데이터 가져오기 실패:", error);
            });


        // const updatedStudies = studies.map(study => {
        //     if (study.id === Number(id)) {
        //         return {
        //             ...study,
        //             reason: content,
        //         };
        //     }
        //     return study;
        // });
        // setStudies(updatedStudies);
        // localStorage.setItem("studies", JSON.stringify(updatedStudies));
    };

    const studyinfo = () => {
        return (
            <div className="study_detail">
                <div key={studyDetail.id}>
                    {studyDetail.length > 0 && (
                        <StudyInfo study={studyDetail}/>
                    )}
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
                        {/*<Link*/}
                        {/*    to={`/myapplystudy/`}*/}
                        {/*    style={{*/}
                        {/*        textDecoration: "none",*/}
                        {/*        color: "inherit",*/}
                        {/*    }}*/}
                        {/*    // addState={{studies}}*/}
                        {/*>*/}
                        <button
                            className="apply_btn"
                            onClick={handleSubmit}
                        >
                            탑승하기
                        </button>
                        {/*</Link>*/}
                    </div>
                </div>

            </div>
        );
    };
    return (
        <div>
            <Header showSideCenter={true}/>
            <div className="study_detail_container">
                <h1>STAR TOUR STORY</h1>
                <div className="arrow_left">
                    <Backarrow/>
                </div>
                {studyinfo()}
            </div>
        </div>
    );
};
export default StudyApplyForm;
