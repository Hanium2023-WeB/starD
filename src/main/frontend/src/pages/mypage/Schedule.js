import React, { useState, useRef, useCallback, useEffect } from "react";
import Category from "../../components/repeat_etc/Category.js";
import ScheduleCalender from "../../components/schedule/ScheduleCalender.js";
import Backarrow from "../../components/repeat_etc/Backarrow.js";
import AddSchedule from "../../components/schedule/AddSchedule.js";

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
        ...prevMeetings, // 기존의 meetings 객체를 복사하여 유지
        [dateKey]: {
          ...(prevMeetings[dateKey] || {}), // 선택한 날짜를 키로 하는 객체 생성 또는 기존 객체 유지
          [study]: [...(prevMeetings[dateKey]?.[study] || []), meeting], // 해당 스터디의 배열에 새로운 meeting 추가
        },
      }));

      nextId.current++;
      handleToggle(end_date);
    },
    [selectedDate]
  );

  const onUpdate = (
    id,
    start_date,
    newEndDate,
    newTitle,
    newContent,
    newStudy,
    newColor
  ) => {
    console.log("Start_Date: ", start_date.toDateString());
    console.log("End_Date: ", newEndDate.toDateString());
    console.log("newTitle: ", newTitle);
    console.log("newContent: ", newContent);
    console.log("newStudy: ", newStudy);
    console.log("newColor: ", newColor);
    
    const updatedMeetings = {
      ...meetings,
      [start_date.toDateString()]: {
        ...meetings[start_date.toDateString()],
        [newStudy]: (meetings[start_date.toDateString()]?.[newStudy] || []).map((meeting) =>
          meeting.id === id
            ? {
                ...meeting,
                end_date: newEndDate.toDateString(),
                title: newTitle,
                content: newContent,
                study: newStudy,
                color: newColor,
              }
            : meeting
        ),
      },
    };
    
    setMeetings((prevMeetings) => ({
      ...prevMeetings,
      [start_date.toDateString()]: {
        ...prevMeetings[start_date.toDateString()],
        [newStudy]: updatedMeetings[start_date.toDateString()][newStudy],
      },
    }));
  };

  useEffect(() => {
    console.log("수정함", meetings);
  }, [meetings]);

  const onRemove = (id) => {
    const updatedMeetings = { ...meetings };

    // Iterate through each date key in the meetings
    for (const dateKey in updatedMeetings) {
      // Iterate through each study key in the date
      for (const studyKey in updatedMeetings[dateKey]) {
        // Find the index of the meeting with the provided id
        const meetingIndex = updatedMeetings[dateKey][studyKey].findIndex(
          (meeting) => meeting.id === id
        );

        if (meetingIndex !== -1) {
          // Remove the meeting from the array
          updatedMeetings[dateKey][studyKey].splice(meetingIndex, 1);

          // If the array is now empty, delete the study key
          if (updatedMeetings[dateKey][studyKey].length === 0) {
            delete updatedMeetings[dateKey][studyKey];
          }

          // If the date key is now empty, delete it
          if (Object.keys(updatedMeetings[dateKey]).length === 0) {
            delete updatedMeetings[dateKey];
          }

          // Update the state with the updated meetings
          setMeetings(updatedMeetings);
          return; // Exit the function after removing the meeting
        }
      };
    }
  };

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
            <ScheduleCalender
              onDateClick={handleToggle}
              meetings={meetings}
              onUpdate={onUpdate}
              onRemove={onRemove}
            />
          </div>
          {addToggle && (
            <AddSchedule
              selectedDate={selectedDate}
              onInsert={onInsert}
              onClose={() => {
                setAddToggle(false);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default Schedule;
