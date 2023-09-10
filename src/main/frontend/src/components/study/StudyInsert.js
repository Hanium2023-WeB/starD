import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {useNavigate, useLocation} from "react-router-dom";
import "../../css/study_css/StudyOpenForm.css";
import StudyRegion from "./StudyRegion";
import Tag from "./Tag";
import axios from "axios";

const StudyInsert = ({updateStudies, onClose}) => {

    const [dataId, setDataId] = useState(0);
    const navigate = useNavigate();

    const [showSelect, setShowSelect] = useState(false); //온 오프 선택 지역 컴포넌트 호출 여부 관리 상태
    const [selectedOption, setSelectedOption] = useState(null);
    const [studies, setStudies] = useState([]);
    const value = "*스터디 주제: \n*스터디 목표: \n*예상 스터디 일정(횟수): \n*예상 커리큘럼 간략히: \n*스터디 소개와 개설 이유: \n*스터디 관련 주의사항: ";
    const [tags, setTags] = useState([]);
    const [city, setCity]= useState("");
    const[district, setDistrict] = useState("");
    const [current, setCurrent] = useState("Recruiting");
    //폼 데이터
    const [formData, setFormData] = useState({
        title: "",
        field: "웹 개발",
        author: "",
        number: "",
        onoff: "",
        sido:"",
        gugun:"",
        deadline: "",
        startDate: "",
        endDate: "",
        description: "",
        tag: "",
        created_date: new Date(),
        current:current,
        scrap: false,
        like: false,

    });
//관심분야 옵션들
    const tagoptions = [
        { value: "웹 개발", name: "웹 개발" },
        { value: "앱 개발", name: "앱 개발" },
        { value: "머신러닝", name: "머신러닝" },
        { value: "데이터 분석", name: "데이터 분석" },
        { value: "게임 개발", name: "게임 개발" },
        { value: "블록체인", name: "블록체인" },
        { value: "네트워크 보안", name: "네트워크 보안" },
        { value: "클라우드 컴퓨팅", name: "클라우드 컴퓨팅" },
        { value: "인공지능", name: "인공지능" },
        { value: "사이버 보안", name: "사이버 보안" },
        { value: "소프트웨어 테스트", name: "소프트웨어 테스트" },
        { value: "로봇공학", name: "로봇공학" },
        { value: "사물인터넷 (IoT)", name: "사물인터넷 (IoT)" },
        { value: "데이터베이스 관리", name: "데이터베이스 관리" },
        { value: "UI/UX 디자인", name: "UI/UX 디자인" },
        { value: "프로젝트 관리", name: "프로젝트 관리" },
        { value: "빅데이터", name: "빅데이터" },
        { value: "컴퓨터 그래픽스", name: "컴퓨터 그래픽스" },
        { value: "자동화", name: "자동화" },
        { value: "블로그 운영", name: "블로그 운영" },
    ];

    //입력데이터 상태관리
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // const handleFieldChange = (e) => {
    //     const selectedValue = e.target.value;
    //     const newValue = selectedValue !== "" ? selectedValue : tagoptions[0].value;
    //
    //     setFormData({
    //         ...formData,
    //         [e.target.name]: newValue,
    //     });
    // };
    //시,도 추가
    const handleRegionCityChange = (newCity) => {
        setCity(newCity);
        setFormData({
       ...formData,
            sido : newCity,
      })
  };
    //구,군 추가
    const handleRegionDistrictChange = (newDistrict) => {
        setDistrict(newDistrict);
        setFormData({
            ...formData,
            gugun : newDistrict,
        })
    };


//on off 선택 라디오 버튼
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
        const {title, field, author, number, onoff,sido, gugun, deadline, startDate, endDate, description, tag, created_date, current} = study;
        console.log("study::::::::::: " , tag);
        const selectedField = document.querySelector('select[name="field"]').value;

        let selectedSido="";
        let selectedGugun = "";
        if(showSelect) {
            //온라인을 택하지 않았을 때만 값을 받아오고 온라인을 택했을 때는 그냥 "" 처리
            const selectedSido = document.querySelector('select[name="sido1"]').value;
            const selectedGugun = document.querySelector('select[name="gugun1"]').value;
        }

        const newData = {
            title,
            field: selectedField,
            author,
            number,
            onoff,
            sido:selectedSido,
            gugun:selectedGugun,
            deadline,
            startDate,
            endDate,
            description,
            tag,
            created_date,
            current:current,
            id: dataId,
            scrap: false,
            like: false,
        };

        console.log("id : " + newData.id);
        console.log("tag : " + newData.tag);
        setStudies((prevStudies) => [...prevStudies, newData]);
        const updatedStudies = [...studies, newData];
        localStorage.setItem("studies", JSON.stringify(updatedStudies));

        console.log("update임 : " + JSON.stringify(updatedStudies));
        updateStudies(updatedStudies);

        setDataId((prevDataId) => prevDataId + 1);

        return newData;

    }, [studies, dataId]);

    const handleTagChange = (selectedTag) => {
        setTags(selectedTag); // 변경된 부분: 태그 정보를 배열로 변환하여 설정
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
            formData.field.trim() === null ||
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

        // const tagsArray = tags.map((tag) => tag.trim());
        // const tagsJson = JSON.stringify(tagsArray);

        const studyWithTags = {
            ...formData,
            tag: tags.join(','), // 변경된 부분: 태그 정보를 쉼표로 구분된 문자열로 저장
        };

        setFormData(onInsertStudy(studyWithTags));
        console.log(`formData: ${JSON.stringify(formData)}`)

        const accessToken = localStorage.getItem('accessToken');

        //TODO 스터디 개설 서버 전송 (스크랩, 공감 제외)
        const response = axios.post("http://localhost:8080/api/v2/studies",
            {
                title:studyWithTags.title,
                field:studyWithTags.field,
                capacity: studyWithTags.number,
                onOff:studyWithTags.onoff,
                city:studyWithTags.sido,
                district:studyWithTags.gugun,
                recruitmentDeadline: studyWithTags.deadline,
                activityStart: studyWithTags.startDate,
                activityDeadline:studyWithTags.endDate,
                content: studyWithTags.description,
                tags: studyWithTags.tag,
                // scrap: studies.scrap,
                // like:studies.like,
            },
            {withCredentials: true,
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }})
            .then((res)=>{
                console.log("전송 성공");
                console.log(res.data);
                //성공하면
                // navigate("/myopenstudy", {state: formData});

            }).catch((error)=>{
                console.log('전송 실패', error);
            })

        //JSON.stringify(formData) 이렇게 안해주고 그냥 formData만 넘겨주게 되면 Object Object 가 뜸
        console.log("response : ",response);
        // console.log(`formData: ${JSON.stringify(formData)}`)
        // console.log(`studies: ${JSON.stringify(studies)}`)
        //myopenstudy에 navigate로 데이터 넘기기

        e.preventDefault();
        // navigate("/myopenstudy", {state: formData});
        navigate("/");
    }, [formData, navigate, tags, onInsertStudy]);

    // e.preventDefault();
    // // 여기서 formData를 사용하여 데이터 처리하거나 API 호출 등을 수행합니다.
    // // 예를 들어 navigate("/other-page", { state: formData })와 같이 사용할 수 있습니다.
    // console.log('Form data submitted:', formData);
    // navigate("/myopenstudy", {state: formData});

    //스터디 개설 폼
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
                            {/*<input type="text" name="field" value={formData.field} onChange={handleInputChange}*/}
                            {/*       className="inputbox" placeholder="사용할 태그를 입력해주세요"/>*/}
                            <select name="field" value={formData.field} onChange={handleInputChange}>
                                {tagoptions.map((interest,idx) =>
                                    <option key={idx} value={interest.value} >{interest.name}</option>
                                )}
                            </select>
                        </div>
                        <div>
                            <span className="onoff_title">진행 방식</span>
                            <div className="onoff">
                                <input type="radio" value="online" name="onoff" onChange={handleRadioChange}/>온라인
                                <input type="radio" value="offline" name="onoff" onChange={handleRadioChange}/>오프라인
                                <input type="radio" value="both" name="onoff" onChange={handleRadioChange}/>무관
                                {showSelect && (
                                    <StudyRegion formData={formData} city={formData?.sido} district={formData?.gugun}  handleRegionCityChange={handleRegionCityChange} handleRegionDistrictChange={handleRegionDistrictChange} />
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
                    <Tag onTagChange={handleTagChange} tags={tags}/>
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