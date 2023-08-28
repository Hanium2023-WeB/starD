import React, { useState, useRef, useCallback} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ScheduleAdd from "../../css/schedule_css/ScheduleAdd.css";
import {CirclePicker} from 'react-color';

const AddSchedule = ({ selectedDate, onInsert, onClose}) => {
  const localDate = new Date(selectedDate);
  const localDateString = localDate.toLocaleDateString();
  const [startDate, setStartDate] = useState(new Date(selectedDate));
  const [endDate, setEndDate] = useState(new Date(selectedDate));
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [study, setStudy] = useState();
  const [color, setColor] = useState("");


  const onChangeTitle = useCallback((e) => {
    setTitle(e.target.value);
  }, []);
  const onChangeContent = useCallback((e) => {
    setContent(e.target.value);
  }, []);
  const onChangeStudy = useCallback((e) => {
    setStudy(e.target.value);
  }, []);
  const onChangeColor = useCallback((color) => {
    setColor(color.hex);
  }, []);
  const onSubmit = useCallback(
    //나중에 todos 배열에 새 데이터(객체)를 추가하는 함수를 추가해줄겁니다!
    (e) => {  
     
      if (title != "") {
        onInsert(endDate, title, content, study,color);
    } else {
        alert("모두 입력해주세요.");
       return;
      }
      setTitle("");
      setEndDate("");
      setContent("");
      setStudy("");//value 초기화 
      //기본이벤트(새로고침) 방지
      e.preventDefault();
    },
    [content, color]
  );

  return (
    // <div>
    // {showForm &&(
    <div className="background">
      <form className="todoedit_insert">
        <h2>{localDateString}</h2>
        <div className="selectstudy">
        <p>스터디 선택:</p>
        <select value={study} onChange={onChangeStudy}>
            <option value="">스터디 선택</option>
            <option value="study1">스터디 1</option>
            <option value="study2">스터디 2</option>
          </select>
        </div>
        <div className="selectDay">
        <div className="selectstartDay">
        <p>시작 날짜:</p>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          dateFormat="yyyy-MM-dd"
          placeholder="시작 날짜 선택"
        />
        </div>
        <div className="selectendDay">
        <p>끝나는 날짜:</p>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          dateFormat="yyyy-MM-dd"
          placeholder="끝나는 날짜 선택"
        />
        </div>
        </div>
        <div className="selecttitle">
        <p>일정 이름:</p>
        <input
          onChange={onChangeTitle}
          value={title}
          placeholder="일정 이름을 입력하세요"
        />
        </div>
        <div className="selectcontent">
        <p>일정 내용:</p>
        <textarea
          onChange={onChangeContent}
          value={content}
          placeholder="일정 내용을 입력하세요"
        />
        </div>
        <div className="selectcolor">
        <p>표시 색상:</p>
        <CirclePicker color = {color} onChange={onChangeColor}/>
        </div>
        <button type="submit" onClick={onSubmit}>
          일정 추가하기
        </button>
        <button type="button"onClick={onClose}>
          취소
        </button>
      </form>
      </div>
    // )}
    // </div>
  );
};
export default AddSchedule;
