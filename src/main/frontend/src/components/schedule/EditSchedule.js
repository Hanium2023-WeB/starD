import React, { useState, useRef, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import { CirclePicker } from "react-color";
const EditSchedule = ({ editScheduleData, onUpdate, onRemove, onClose }) => {
  //   const location = useLocation();
  //   const meetinginfo = {...location.state};
  //   const ggg =()=>{
  //     console.log('일정 정보', editScheduleData.meeting.title);
  //     console.log('End Date:', editScheduleData.meeting.end_date);
  // console.log('End Date Type:', typeof editScheduleData.meeting.end_date);
  // console.log('Start Date Type:', typeof editScheduleData.meeting.start_date);
  //     console.log(`일정 시작일 정보: ${editScheduleData.meeting.start_date}`);
  //     console.log(`일정 끝나는 일 정보: ${editScheduleData.meeting.end_date}`);

  // }
  // const formatDate = (date) => {
  //   const options = { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' };
  //   return date.toLocaleDateString(undefined, options);
  // };
  const localDate = new Date(editScheduleData.meeting.start_date);
  const localDateString = localDate.toLocaleDateString();
  const [startDate, setStartDate] = useState(new Date(editScheduleData.meeting.start_date));
  const [endDate, setEndDate] = useState(new Date(editScheduleData.meeting.end_date));
  const [title, setTitle] = useState(editScheduleData.meeting.title);
  const [content, setContent] = useState(editScheduleData.meeting.content);
  const [study, setStudy] = useState(editScheduleData.meeting.study);
  const [color, setColor] = useState(editScheduleData.meeting.color);

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };
  const handleEndDateChange = (date) => {
    setEndDate(date);
  };
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
        console.log("Start_Dateas: ", editScheduleData.meeting.start_date);
        onUpdate(
          editScheduleData.meeting.id,startDate, endDate, title,content, study,color
        );
      } else {
        alert("모두 입력해주세요.");
        return;
      }
      setTitle("");
      setEndDate("");
      setContent("");
      setStudy(""); //value 초기화
      //기본이벤트(새로고침) 방지
      onClose();
      e.preventDefault();
    },
    [startDate,endDate,title,content, color,study]
  );

  return (
    <div className="background">
      <form className="todoedit_insert">
        <h2>{editScheduleData.meeting.title}</h2>
        <div className="selectstudy">
          <p>스터디 선택:</p>
          <select
            value={study}
            default={editScheduleData.meeting.study}
            onChange={onChangeStudy}
          >
            <option value="">스터디 선택</option>
            <option value="study1">스터디 1</option>
            <option value="study2">스터디 2</option>
          </select>
        </div>
        <div className="selectDay">
          <div className="selectstartDay">
            <p>시작 날짜:</p>
            <DatePicker
              selected={new Date(editScheduleData.meeting.start_date)}
              onChange={handleStartDateChange}
              dateFormat="yyyy-MM-dd"
              placeholder="시작 날짜 선택"
            
            />
          </div>
          <div className="selectendDay">
            <p>끝나는 날짜:</p>
            <DatePicker
              selected={new Date(editScheduleData.meeting.end_date)}
              onChange={handleEndDateChange}
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
          <CirclePicker color={color} onChange={onChangeColor} />
        </div>
        <button type="submit" onClick={onSubmit}>
          일정 수정하기
        </button>
        {/* <button type="button" onClick={onRemove(id)}>
          일정 수정하기
        </button> */}
        <button type="button" onClick={onClose}>
          취소
        </button>
      </form>
    </div>
  );
};
export default EditSchedule;
