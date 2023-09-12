import React, {useState, useEffect} from "react";
import {useParams, Link, useNavigate} from "react-router-dom";
import Header from "../../components/repeat_etc/Header";
import "../../css/study_css/StudyDetail.css";
import "../../css/comment_css/Comment.css";

import StudyInfo from "../../components/study/StudyInfo";
import StudyEdit from "../../components/study/StudyEdit";
import Backarrow from "../../components/repeat_etc/Backarrow";
import Comment from "../../components/comment/Comment";
import {useLocation} from "react-router-dom";
import axios from "axios";

const StudyDetail = ({sideheader}) => {

    const location = useLocation();
    const studyId = location.state;     // StudyListItem.js 파일에서 스터디 id 값을 get
    const [studyItem, setStudyItem] = useState();
    const navigate = useNavigate();

    const {id} = useParams();

    const [studies, setStudies] = useState([]);
    const [editing, setEditing] = useState(false);
    const [studyDetail, setStudyDetail] = useState([]);// 스터디 상세 정보를 상태로 관리
    const [isApply, setIsApply] = useState(false);
    const accessToken = localStorage.getItem('accessToken');
    const isLoggedInUserId = localStorage.getItem('isLoggedInUserId');

    useEffect(() => {
        // 백엔드 REST API 호출 코드
        axios.get(`http://localhost:8080/api/v2/studies/${studyId}`, {
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }).then((res) => {
            console.log("전송 성공 : ", res.data);
            setStudyItem(res.data);

            if (res.data.recruiter.id === isLoggedInUserId ) {
                console.log("자기 자신의 글");
            }
        })
            .catch((error) => {
                alert("로그인 해 주세요.");
                navigate('/login');

                console.error("데이터 가져오기 실패:", error);
            });
    }, []); // 빈 종속성 배열을 사용하여 컴포넌트가 처음 렌더링될 때만 실행


    // axios.get(`http://localhost:8080/api/v2/studies/${studyId}`, {
    //     withCredentials: true,
    //     headers: {
    //         'Authorization': `Bearer ${accessToken}`
    //     }
    // }).then((res) => {
    //     console.log("전송 성공 : ", res.data);
    //     setStudyItem(res.data.content);
    // })
    //     .catch((error) => {
    //         console.error("데이터 가져오기 실패:", error);
    //     });



    const handleEditClick = () => {
        setEditing(true);
    }

    const handleCancelEdit = () => {
        setEditing(false);
    }

    const handleStudyUpdate = (updatedStudy) => {
        setEditing(false);
        setStudyDetail([updatedStudy]);
        const updatedStudies = studies.map(study =>
            study.id === updatedStudy.id ? updatedStudy : study
        );
        setStudies(updatedStudies);
    }

    const handleStudyDelete = () => {
        const confirmDelete = window.confirm("정말로 스터디를 삭제하시겠습니까?");
        if (confirmDelete) {
            const updatedStudies = studies.filter(study => study.id !== studyDetail[0].id);
            setStudies(updatedStudies);
            localStorage.setItem("studies", JSON.stringify(updatedStudies));
            window.location.href = "/myopenstudy";
        }
    }

    // useEffect(() => {
    //     const storedStudies = localStorage.getItem("studies");
    //     if (storedStudies) {
    //         setStudies(JSON.parse(storedStudies));
    //     }
    // }, []);
    //
    // useEffect(() => {
    //     const filteredStudyDetail = studies.filter(study => study.id == Number(id));
    //     setStudyDetail(filteredStudyDetail); //해당 페이지의 스터디 상세 정보 랜더링에 사용
    // }, [studies, id]);
    //
    // useEffect(() => {
    //     if (studyDetail.length > 0 && studyDetail[0].reason) {
    //         setIsApply(true);
    //     } else {
    //         setIsApply(false);
    //     }
    // }, [studyDetail]);


    return (
        <div>
            <Header showSideCenter={true}/>
            <div className="study_detail_container">
                <h1>STAR TOUR STORY</h1>
                <div className="arrow_left">
                    <Backarrow/>
                </div>
                {editing ? (
                    <StudyEdit
                        study={studyDetail[0]}
                        onUpdateStudy={handleStudyUpdate}
                        onCancel={handleCancelEdit}
                    />
                ) : (
                    <div className="study_detail">
                        {studyItem && (
                            <div key={studyItem.id}>
                                <StudyInfo
                                    study={studyItem}
                                    handleEditClick={handleEditClick}
                                    handleStudyDelete={handleStudyDelete}
                                />
                                <div className="study_intro">
                                    <div>스터디 소개</div>
                                    {studyItem && (
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: studyItem.content.replace(/\n/g, "<br>"),
                                            }}
                                        />
                                    )}
                                </div>
                                {/*{isApply && (*/}
                                {/*    <div className="study_apply_reason">*/}
                                {/*        <div>나의 지원동기 및 각오</div>*/}
                                {/*        <div>{studyItem.reason}</div>*/}
                                {/*    </div>*/}
                                {/*)}*/}
                                {/*<div className="btn">*/}
                                {/*    <Link*/}
                                {/*        to={`/studyapplyform/${studyItem.id}`}*/}
                                {/*        style={{*/}
                                {/*            textDecoration: "none",*/}
                                {/*            color: "inherit",*/}
                                {/*        }}*/}
                                {/*    >*/}
                                {/*        <button className="apply_btn">탑승하기</button>*/}
                                {/*    </Link>*/}
                                {/*</div>*/}
                            </div>
                        )}
                    </div>
                )}
            </div>
            <div className="comment_container">
                <Comment/>
            </div>
        </div>
    );
};

export default StudyDetail;