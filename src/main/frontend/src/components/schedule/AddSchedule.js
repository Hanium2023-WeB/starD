import React, {useState, useRef, useCallback, useEffect} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ScheduleAdd from "../../css/schedule_css/ScheduleAdd.css";
import { CirclePicker } from "react-color";

const AddSchedule = ({studies,studyTitles, selectedDate, onInsert, onClose }) => {
  const localDate = new Date(selectedDate);
  const localDateString = localDate.toLocaleDateString();
  const [startDate, setStartDate] = useState(new Date(selectedDate));
  const [endDate, setEndDate] = useState(new Date(selectedDate));
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  // const [study, setStudy] = useState("My");
  const [color, setColor] = useState("");
  const [InsertToDoTitle, setInsertToDoTitle] = useState("")
  const [InsertStudyId, setInsertStudyId] = useState(studies[0].study.id) // 초기값 : 첫 번째 스터디 (기본 선택값)
  const [InsertStudy, setInsertStudy] = useState([]); //선택한 스터디 객체
  const studyIdAsNumber = parseFloat(InsertStudyId);

  const [schedule, setSchedule] = useState({});
  const onChangeTitle = useCallback((e) => {
    setTitle(e.target.value);
  }, []);
  const onChangeContent = useCallback((e) => {
    setContent(e.target.value);
  }, []);
  // const onChangeStudy = useCallback((e) => {
  //   setStudy(e.target.value);
  //   console.log(e.target.value);
  // }, []);

  //스터디 고를 때
  const selectScehduleStudy = (e) => {
    setInsertToDoTitle(e.target.value)
    const selectedStudy = studies.find((study) => study.study.title === e.target.value);
    const selectedId = selectedStudy.study.id;
    setInsertStudyId(selectedId);
    setInsertStudy(selectedStudy.study);
    console.log(e.target.value);
    console.log("선택한 스터디 아이디", selectedId);
    console.log("선택한 스터디", selectedStudy.study);
  }

  const onChangeColor = useCallback((color) => {
    setColor(color.hex);
  }, []);


  const onSubmit = useCallback(
      //나중에 todos 배열에 새 데이터(객체)를 추가하는 함수를 추가해줄겁니다!
      (e) => {
        if (title != "") {
          console.log("addschedule:", endDate.toDateString());
          onInsert(startDate, endDate, title, content, color, studyIdAsNumber,InsertStudy);
        } else {
          alert("모두 입력해주세요.");
          // return;
        }
        setTitle("");
        setEndDate("");
        setContent("");
        // setStudy(""); //value 초기화
        //기본이벤트(새로고침) 방지
        e.preventDefault();
      },
      [content, color]
  );


  return (
      // <div>
      // {showForm &&(
      <div className="background">
        <form className="Scheduleedit_insert">
          <h2>{localDateString}</h2>
          <div className="selectstudy">
            <p>스터디 선택:</p>
            <select onChange={selectScehduleStudy}>
              {studyTitles.map((item, index) => (
                  <option key={index} value={item}>{item}</option>
              ))}
            </select>
          </div>
          <div className="selectDay">
            <div className="selectstartDay">
              <p>시작 날짜:</p>
              <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  dateFormat="yyyy-MM-dd"
                  // readOnly
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
                  minDate={startDate}
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
            <CirclePicker color={color} onChange={onChangeColor}/>
          </div>
          <ul className="meeting_btn">
            <li>
              <button id="add" type="submit" onClick={onSubmit}>
                생성
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
export default AddSchedule;
