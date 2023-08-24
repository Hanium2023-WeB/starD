import React, { useState, useRef, useCallback, useEffect } from "react";
import Category from "../components/Category.js";
import ScheduleCalender from "../components/ScheduleCalender.js";
import Backarrow from "../components/Backarrow.js";
import AddSchedule from "../components/AddSchedule.js";

const Schedule = ({ sideheader }) => {
  const [meetings, setMeetings] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date()); // 추가: 선택한 날짜 상태
  const [addToggle, setAddToggle] = useState(false); //일정 추가 +토글버튼 상태

  const Year = selectedDate.getFullYear();
  const Month = selectedDate.getMonth() + 1;
  const Dates = selectedDate.getDate();

  const handleToggle = (day) => {
    setSelectedDate(new Date(day));
    console.log("클릭한 날짜11");
    console.log(selectedDate);
    setAddToggle((prev) => !prev);
  };
  const nextId = useRef(1);
  const onInsert = useCallback(
    (end_date, title, content, study, color) => {
      const dateKey = selectedDate.toDateString();
      const meeting = {
        id: nextId.current,
        start_date: dateKey,
        end_date,
        title,
        content,
        study,
        color,
      };
      setMeetings((prevMeetings) => ({
        ...prevMeetings,
        [dateKey]: {
          ...(prevMeetings[dateKey] || {}),
          [study]: [...(prevMeetings[dateKey]?.[study] || []), meeting],
        },
      }));
  
      nextId.current++;
      handleToggle(end_date);
    },
    [selectedDate]
  );
  useEffect(() => {
    console.log("meetings:", meetings);
  }, [meetings]);
  return (
    <div>
      {sideheader}
      <Backarrow subname={"스터디 모임 일정"} />
      <div className="container">
        <div className="main_container">
          <div className="sub_container" id="todo_sub">
            <Category />
            <ScheduleCalender onDateClick={handleToggle} meetings={meetings}/>
            {addToggle && (
              <AddSchedule selectedDate={selectedDate} onInsert = {onInsert} onClose={()=>{setAddToggle(false)}}/>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
