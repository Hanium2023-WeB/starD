import React, {useState, useRef, useCallback, useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import {CirclePicker} from "react-color";
import {parseISO} from 'date-fns';
import studyList from "../../pages/studypage/StudyList";

const TeamEditSchedule = ({studies, studyTitles, editdata, onUpdate, onRemove, onClose}) => {

    //   const localDate = new Date(editdata.start_date);
    //   const localDateString = localDate.toLocaleDateString();
    //
    const [startDate, setStartDate] = useState(editdata.start_date);
    //
    const [isDisabled, setIsDisabled] = useState(true); // 초기 비활성화 상태

    // const [study, setStudy] = useState(editdata.study);
    const [title, setTitle] = useState(editdata.title);
    const [color, setColor] = useState(editdata.color);

    //   //수정하기 전의 스터디 저장
    //   const cloneStudy = editdata.study;
    //
    //   // const handleStartDateChange = useCallback((date) => {
    //   //     setStartDate(date);
    //   //     console.log(startDate);
    //   // }, []);
    //
    //
    const onChangeTitle = useCallback((e) => {
        setTitle(e.target.value);
    }, []);
    //
    //   // const onChangeStudy = useCallback((e) => {
    //   //   setStudy(e.target.value);
    //   // }, []);
    const onChangeColor = useCallback((color) => {
        setColor(color.hex);
    }, []);
    const onSubmit = useCallback(
        //나중에 todos 배열에 새 데이터(객체)를 추가하는 함수를 추가해줄겁니다!
        (e) => {
            if (title !== "") {
                onUpdate(
                    editdata.id,
                    startDate,
                    title,
                    color
                );
            } else {
                alert("모두 입력해주세요.");
            }
            setTitle("");
            //기본이벤트(새로고침) 방지
            onClose();
            e.preventDefault();
        },
        [ title, color]
    );
    const onDelete = useCallback(
        //나중에 todos 배열에 새 데이터(객체)를 추가하는 함수를 추가해줄겁니다!
        (e) => {
            onRemove(editdata.id);
            onClose();
        },
        []
    );
    //
    return (
        <div className="background">
            <form className="Scheduleedit_insert">
                <h2>{editdata.title}</h2>
                {/*<div className="selectstudy">*/}
                {/*    <p>스터디 선택:</p>*/}
                {/*    <select defaultValue={editdata.study.title} disabled={isDisabled}>*/}
                {/*        {studyTitles.map((item, index) => (*/}
                {/*            <option key={index} value={item}>{item}</option>*/}
                {/*        ))}*/}
                {/*    </select>*/}
                {/*</div>*/}
                {/*<div className="selectDay">*/}
                {/*    <div className="selectstartDay">*/}
                {/*        <p>시작 날짜:</p>*/}
                {/*        <DatePicker*/}
                {/*            selected={startDate}*/}
                {/*            dateFormat="yyyy-MM-dd"*/}
                {/*            placeholder="시작 날짜 선택"*/}
                {/*            disabled={isDisabled}*/}
                {/*        />*/}
                {/*    </div>*/}
                {/*</div>*/}
                <div className="selecttitle">
                    <p>일정 이름:</p>
                    <input
                        onChange={onChangeTitle}
                        value={title}
                        placeholder="일정 이름을 입력하세요"
                    />
                </div>

                <div className="selectcolor">
                    <p>표시 색상:</p>
                    <CirclePicker color={color} onChange={onChangeColor}/>
                </div>
                <ul className="meeting_btn">
                    <li>
                        <button id="add" type="submit" onClick={onSubmit}>
                            수정
                        </button>
                    </li>
                    <li>
                        <button id="del" type="button" onClick={onDelete}>
                            삭제
                        </button>
                    </li>
                    <li>
                        <button id="cancel" type="button" onClick={onClose}>
                            취소
                        </button>
                    </li>
                </ul>
            </form>
        </div>
    );
};
export default TeamEditSchedule;
