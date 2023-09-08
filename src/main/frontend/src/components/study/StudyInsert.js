import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {useNavigate, useLocation} from "react-router-dom";
import "../../css/study_css/StudyOpenForm.css";
import StudyRegion from "./StudyRegion";
import Tag from "./Tag";

const StudyInsert = ({updateStudies, onClose}) => {
    const [dataId, setDataId] = useState(0);
    const navigate = useNavigate();

    const [showSelect, setShowSelect] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [studies, setStudies] = useState([]);
    const value = "*스터디 주제: \n*스터디 목표: \n*예상 스터디 일정(횟수): \n*예상 커리큘럼 간략히: \n*스터디 소개와 개설 이유: \n*스터디 관련 주의사항: ";
    const [formData, setFormData] = useState({
        title: "",
        field: "",
        author: "",
        number: "",
        onoff: "",
        deadline: "",
        startDate: "",
        endDate: "",
        description: "",
        tag: "",
        created_date: new Date(),
        scrap: false,
        like: false,
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
        setShowSelect(selectedValue === "offline" || selectedValue === "both");
    }

    const onInsertStudy = useCallback((study) => {
        const {
            title,
            field,
            author,
            number,
            onoff,
            deadline,
            startDate,
            endDate,
            description,
            tag,
            created_date
        } = study;
        const newData = {
            title,
            field,
            author,
            number,
            onoff,
            deadline,
            startDate,
            endDate,
            description,
            tag,
            created_date,
            id: dataId,
            scrap: false,
            like: false,
        };

        console.log("id : " + newData.id);
        setStudies((prevStudies) => [...prevStudies, newData]);
        const updatedStudies = [...studies, newData];
        localStorage.setItem("studies", JSON.stringify(updatedStudies));
        updateStudies(updatedStudies);

        setDataId((prevDataId) => prevDataId + 1);
    }, [studies, dataId]);

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            // e.preventDefault(); // 엔터 키 이벤트를 기본 동작으로 전파하지 않도록 방지
        }
    };

    useEffect(() => {
        const storedStudies = JSON.parse(localStorage.getItem("studies") || "[]");
        setStudies(storedStudies);
        // dataId 값을 로컬 스토리지에서 가져와서 설정
        const lastDataId = storedStudies.length > 0 ? storedStudies[storedStudies.length - 1].id : 0;
        setDataId(lastDataId + 1);
    }, []);

    const handleSubmit = useCallback(e => {
        e.preventDefault(); // 기본 이벤트 방지

        if (
            formData.title.trim() === '' ||
            formData.field.trim() === '' ||
            formData.number.trim() === '' ||
            formData.deadline.trim() === '' ||
            formData.startDate.trim() === '' ||
            formData.endDate.trim() === '' ||
            formData.description.trim() === ''
        ) {
            // 하나라도 비어있으면 알림을 표시하거나 다른 처리를 수행할 수 있습니다.
            alert('모든 필드를 입력해주세요.');
            return; // 창이 넘어가지 않도록 중단
        }

        const tagElement = document.querySelector(".HashWrapInner");
        if (!tagElement) {
            alert('해시태그를 입력해주세요.');
            return; // 창이 넘어가지 않도록 중단
        }
//추가
        onInsertStudy(formData);
        setFormData({
            title: "",
            field: "",
            author: "",
            number: "",
            onoff: "",
            deadline: "",
            startDate: "",
            endDate: "",
            tag: "",
            description: "",
            created_date: new Date(),
            scrap: false,
            like: false,
        });
        //JSON.stringify(formData) 이렇게 안해주고 그냥 formData만 넘겨주게 되면 Object Object 가 뜸
        console.log(`formData: ${JSON.stringify(formData)}`)
        // console.log(`studies: ${JSON.stringify(studies)}`)
        //myopenstudy에 navigate로 데이터 넘기기
        e.preventDefault();
        // navigate("/myopenstudy", {state: formData}); // TODO 주석 제거 필요
    }, [formData, navigate]);

    // e.preventDefault();
    // // 여기서 formData를 사용하여 데이터 처리하거나 API 호출 등을 수행합니다.
    // // 예를 들어 navigate("/other-page", { state: formData })와 같이 사용할 수 있습니다.
    // console.log('Form data submitted:', formData);
    // navigate("/myopenstudy", {state: formData});

    const studyinsertform = () => {
        return (
            <form className="study_open_form" onSubmit={handleSubmit}>
                <div>
                    <div className="left">
                        <div>
                            <span>제목</span>
                            <input type="text" name="title" value={formData.title} onChange={handleInputChange}
                                   className="inputbox" placeholder="제목을 입력해주세요" maxLength={100}/>
                        </div>
                        <div>
                            <span>모집 인원</span>
                            <input type="number" name="number" value={formData.number} onChange={handleInputChange}
                                   className="inputbox" placeholder="모집 인원을 입력해주세요"/>
                        </div>
                        <div>
                            <span>스터디 시작일</span>
                            <input type="date" name="startDate" value={formData.startDate}
                                   onChange={handleInputChange}
                                   className="inputbox" placeholder="스터디 시작일을 선택해주세요"/>
                        </div>
                        <div>
                            <span>모집 마감일</span>
                            <input type="date" name="deadline" value={formData.deadline}
                                   onChange={handleInputChange}
                                   className="inputbox" placeholder="스터디 모집 마감일을 선택해주세요"/>
                        </div>
                    </div>
                    <div className="right">
                        <div>
                            <span>분야</span>
                            <input type="text" name="field" value={formData.field} onChange={handleInputChange}
                                   className="inputbox" placeholder="사용할 태그를 입력해주세요"/>
                        </div>
                        <div>
                            <span className="onoff_title">진행 방식</span>
                            <div className="onoff">
                                <input type="radio" value="online" name="onoff" onChange={handleRadioChange}/>온라인
                                <input type="radio" value="offline" name="onoff" onChange={handleRadioChange}/>오프라인
                                <input type="radio" value="both" name="onoff" onChange={handleRadioChange}/>무관
                                {showSelect && (
                                    <StudyRegion/>
                                )}
                            </div>
                        </div>
                        <div>
                            <span>스터디 종료일</span>
                            <input type="date" name="endDate" value={formData.endDate} onChange={handleInputChange}
                                   className="inputbox" placeholder="스터디 종료일을 선택해주세요"/>
                        </div>

                    </div>
                </div>
                <div className="study_open_detail">
                    <span>상세 내용</span>
                    <textarea value={formData.description} name="description" onChange={handleInputChange}
                              placeholder={value} defaultValue={value}/>
                </div>
                <div className="study_tag">
                    <span>스터디 태그</span>
                    <Tag/>
                </div>
                <div className="btn">
                    <input type="submit" value="모집하기" className="recruit_btn"/>
                </div>
            </form>
        )
    }

    return (<div>
        {studyinsertform()}
    </div>);
}
export default StudyInsert;