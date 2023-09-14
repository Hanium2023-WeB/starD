import React, {useState} from "react";
import RealEstate from "../info/RealEstate";
import StudyRegion from "./StudyRegion";

const StudyEdit = ({study, onUpdateStudy, onCancel}) => {

    console.log("StudyEdit :", study);
    const [updatedStudy, setUpdatedStudy] = useState(study);

    const [showSelect, setShowSelect] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const handleRadioChange = (e) => {
        const selectedValue = e.target.value;
        setSelectedOption(selectedValue);
        setUpdatedStudy((prevStudy) => ({
            ...prevStudy,
            onoff: selectedValue,
        }));
        setShowSelect(selectedValue === "offline");
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setUpdatedStudy((prevStudy) => ({
            ...prevStudy,
            [name]: value,
        }));
    }

    const handleUpdateClick = () => {
        onUpdateStudy(updatedStudy);
    }

    const studyeditform = () => {
        return (
            <form className="study_open_form">
                <div>
                    <div className="left">
                        <div>
                            <span>제목</span>
                            <input type="text" name="title" value={updatedStudy.title} onChange={handleInputChange}
                                   className="inputbox"/>
                        </div>
                        <div>
                            <span>모집 인원</span>
                            <input type="text" name="number" value={updatedStudy.capacity} onChange={handleInputChange}
                                   className="inputbox"/>
                        </div>
                        <div>
                            <span>모집 마감일</span>
                            <input type="date" name="deadline" value={updatedStudy.recruitmentDeadline} onChange={handleInputChange}
                                   className="inputbox"/>
                        </div>
                    </div>
                    <div className="right">
                        <div>
                            <span>분야</span>
                            <input type="text" name="tag" value={updatedStudy.tags} onChange={handleInputChange}
                                   className="inputbox"/>
                        </div>
                        <div>
                            <span className="onoff_title">진행 방식</span>
                            <div className="onoff">
                                <input type="radio" value="online" name="onoff" onChange={handleRadioChange}/>온라인
                                <input type="radio" value="offline" name="onoff" onChange={handleRadioChange}/>오프라인
                                <input type="radio" value="offline" name="onoff" onChange={handleRadioChange}/>무관
                                {showSelect && (
                                    <StudyRegion/>
                                )}
                            </div>
                        </div>
                        <div>
                            <span>스터디 기간</span>
                            <input type="date" name="duration" value={updatedStudy.duration} onChange={handleInputChange}
                                   className="inputbox"/>
                        </div>

                    </div>
                </div>
                <div className="study_open_detail">
                    <span>상세 내용</span>
                    <textarea name="description" onChange={handleInputChange}
                              defaultValue={updatedStudy.content}/>
                </div>
                <div className="btn">
                    <button onClick={handleUpdateClick} className="recruit_btn">저장</button>
                    <button onClick={onCancel} className="recruit_btn">취소</button>
                </div>
            </form>
        )
    }
    return (<div>
        {studyeditform()}
    </div>);
}
export default StudyEdit;