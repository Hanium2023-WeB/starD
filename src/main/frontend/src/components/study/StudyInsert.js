import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {useParams, useNavigate, Link, useLocation} from "react-router-dom";
import "../../css/study_css/StudyOpenForm.css";
import RealEstate from "../info/RealEstate";

const StudyInsert = ({sideheader}) => {
    // const dataId = useRef(0);
    const [dataId, setDataId] = useState(0);
    const navigate = useNavigate();

    const [showSelect, setShowSelect] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [studies, setStudies] = useState([]);

    const [formData, setFormData] = useState({
        title: "",
        tag: "",
        author:"",
        number: "",
        onoff: "",
        deadline: "",
        duration: "",
        description: "",
        created_date: new Date(),
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    };


    const handleRadioChange = (e) => {
        const selectedValue = e.target.value;
        setSelectedOption(selectedValue);
        setFormData({
            ...formData,
            onoff: e.target.value,
        })
        setShowSelect(selectedValue === "offline");
    }

    const onInsertStudy = useCallback((study) => {
        const { title, tag, author, number, onoff, deadline, duration, description, created_date } = study;
        const newData = {
            title,
            tag,
            author,
            number,
            onoff,
            deadline,
            duration,
            description,
            created_date,
            id: dataId,
        };
        console.log("id : "+ newData.id );
        setStudies((prevStudies) => [...prevStudies, newData]);
        const updatedStudies = [...studies, newData];
        localStorage.setItem("studies", JSON.stringify(updatedStudies));

        setDataId((prevDataId) => prevDataId + 1);
    }, [studies, dataId]);

    useEffect(() => {
        const storedStudies = JSON.parse(localStorage.getItem("studies") || "[]");
        setStudies(storedStudies);
        // dataId 값을 로컬 스토리지에서 가져와서 설정
        const lastDataId = storedStudies.length > 0 ? storedStudies[storedStudies.length - 1].id : 0;
        setDataId(lastDataId + 1);
    }, []);

    const handleSubmit = useCallback(e => {
        if (formData.title.trim() !== '' && formData.tag.trim() !== '' 
        && formData.number.trim() !== '' && formData.deadline.trim() !== '' 
        && formData.duration.trim() !== '' && formData.description.trim() !== '') {
            onInsertStudy(formData);
            setFormData({
                title: "",
                tag: "",
                author: "",
                number: "",
                onoff: "",
                deadline: "",
                duration: "",
                description: "",
                created_date: new Date(),
            });
            //JSON.stringify(formData) 이렇게 안해주고 그냥 formData만 넘겨주게 되면 Object Object 가 뜸
            console.log(`formData: ${JSON.stringify(formData)}`)
            // console.log(`studies: ${JSON.stringify(studies)}`)
            //myopenstudy에 navigate로 데이터 넘기기
            e.preventDefault();
            navigate("/myopenstudy",{state: formData});
        }
    },[formData, navigate]);

    const studyinsertform = () => {
        return (
            <form className="study_open_form" onSubmit={handleSubmit}>
                <div>
                    <div className="left">
                        <div>
                            <span>제목</span>
                            <input type="text" name="title" value={formData.title} onChange={handleInputChange}
                                   className="inputbox" placeholder="제목을 입력해주세요"/>
                        </div>
                        <div>
                            <span>모집 인원</span>
                            <input type="text" name="number" value={formData.number} onChange={handleInputChange}
                                   className="inputbox" placeholder="모집 인원을 입력해주세요"/>
                        </div>
                        <div>
                            <span>모집 마감일</span>
                            <input type="date" name="deadline" value={formData.deadline} onChange={handleInputChange}
                                   className="inputbox" placeholder="스터디 모집 마감일을 선택해주세요"/>
                        </div>
                    </div>
                    <div className="right">
                        <div>
                            <span>분야</span>
                            <input type="text" name="tag" value={formData.tag} onChange={handleInputChange}
                                   className="inputbox" placeholder="사용할 태그를 입력해주세요"/>
                        </div>
                        <div>
                            <span className="onoff_title">진행 방식</span>
                            <div className="onoff">
                                <input type="radio" value="online" name="onoff" onChange={handleRadioChange}/>온라인
                                <input type="radio" value="offline" name="onoff" onChange={handleRadioChange}/>오프라인
                                {showSelect && (
                                    <RealEstate/>
                                )}
                            </div>
                        </div>
                        <div>
                            <span>스터디 기간</span>
                            <input type="date" name="duration" value={formData.duration} onChange={handleInputChange}
                                   className="inputbox" placeholder="스터디 진행 기간을 선택해주세요"/>
                        </div>

                    </div>
                </div>
                <div className="study_open_detail">
                    <span>상세 내용</span>
                    <textarea placeholder="상세 내용을 입력해주세요" name="description" onChange={handleInputChange}
                              defaultValue={formData.description}/>
                </div>
                <div className="btn">
                    <input type="submit" value="모집하기" className="recruit_btn"/>
                </div>
            </form>
        )
    }

    return (<div>
        {sideheader}
        <div className="study_detail_container">
            <h1>STAR TOUR STORY</h1>
            <div className="arrow_left">
                <FontAwesomeIcon
                    icon={faArrowLeft}
                    onClick={() => navigate(-1)}
                />
            </div>
            {studyinsertform()}
        </div>
    </div>);
}
export default StudyInsert;