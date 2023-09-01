import React, { useState, useRef, useCallback, useEffect } from "react";
import Category from "../../components/repeat_etc/Category.js";
import ScheduleCalender from "../../components/schedule/ScheduleCalender.js";
import Backarrow from "../../components/repeat_etc/Backarrow.js";
import AddSchedule from "../../components/schedule/AddSchedule.js";
import axios from "axios";

const Schedule = ({ sideheader }) => {
  const [meetings, setMeetings] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date()); // 추가: 선택한 날짜 상태
  const [addToggle, setAddToggle] = useState(false); //일정 추가 +토글버튼 상태

  const Year = selectedDate.getFullYear();
  const Month = selectedDate.getMonth() + 1;
  const Dates = selectedDate.getDate();
  //서버 요청
  const sendMeetingsToBackend = () => {
    const backendEndpoint = "https://your-backend-url.com/save-meetings";
  
    axios.post(backendEndpoint, { meetings })
      .then(response => {
        console.log("Meetings sent to the backend:", response.data);
      })
      .catch(error => {
        console.error("Error sending meetings to the backend:", error);
      });
  };

  const handleToggle = (day) => {
    setSelectedDate(new Date(day));
    console.log("클릭한 날짜11");
    console.log(selectedDate);
    setAddToggle((prev) => !prev);
  };
  const nextId = useRef(1);
  const onInsert = useCallback(
    (end_date, title, content, study, color) => {
      const startDay = new Date(selectedDate);
      const startDates = new Date(selectedDate);
      const endDay = new Date(end_date);
      const newMeetings = { ...meetings }; // Create a copy of the meetings object
      console.log("newMeetings: ", newMeetings);
      while (startDay <= endDay) {
        const dateKey = startDay.toDateString();
        const endKey = endDay.toDateString();
        const meeting = {
          id: nextId.current,
          start_date: dateKey,
          end_date: endKey, // Set the same end_date as start_date for each day
          title,
          content,
          study,
          color,
        };

        newMeetings[dateKey] = {
          ...(newMeetings[dateKey] || {}),
          [study]: [...(newMeetings[dateKey]?.[study] || []), meeting],
        };

        startDay.setDate(startDay.getDate() + 1); // Move to the next day
      }
      nextId.current += 1;
      setMeetings(newMeetings);
      console.log("setMeetings: ", meetings);
      handleToggle(end_date);
    },
    [meetings, selectedDate]
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
    const updatedMeetings = { ...meetings };
    const startDateKey = new Date(start_date).getTime();
    const newEndDateKey = new Date(newEndDate).getTime();

    for (
      let currentDateTimestamp = startDateKey;
      currentDateTimestamp <= newEndDateKey;
      currentDateTimestamp += 24 * 60 * 60 * 1000
    ) {
      const currentDate = new Date(currentDateTimestamp);
      const currentDateKey = currentDate.toDateString();

      if (!updatedMeetings[currentDateKey]) {
        updatedMeetings[currentDateKey] = {};
      }

      if (!updatedMeetings[currentDateKey][newStudy]) {
        updatedMeetings[currentDateKey][newStudy] = [];
      }

      const existingMeetingIndex = updatedMeetings[currentDateKey][
        newStudy
      ].findIndex((meeting) => meeting.id === id);

      if (existingMeetingIndex !== -1) {
        updatedMeetings[currentDateKey][newStudy][existingMeetingIndex] = {
          id: id,
          start_date: start_date.toDateString(),
          end_date: newEndDate.toDateString(),
          title: newTitle,
          content: newContent,
          study: newStudy,
          color: newColor,
        };
      } else {
        updatedMeetings[currentDateKey][newStudy].push({
          id: id,
          start_date: start_date.toDateString(),
          end_date: newEndDate.toDateString(),
          title: newTitle,
          content: newContent,
          study: newStudy,
          color: newColor,
        });
      }
    }

    for (const currentDateKey in updatedMeetings) {
      const currentDateTimestamp = new Date(currentDateKey).getTime();
      if (
        currentDateTimestamp >= startDateKey &&
        currentDateTimestamp <= newEndDateKey
      ) {
        for (const currentStudy in updatedMeetings[currentDateKey]) {
          if (newStudy !== currentStudy) {
            // delete updatedMeetings[currentDateKey][currentStudy];
            continue;
          }
        }
      } else {
        // 범위에 속하지 않는 경우 해당 스터디 데이터 삭제
        delete updatedMeetings[currentDateKey];
      }
    }

    setMeetings(updatedMeetings);
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
        }
      }
    }

    setMeetings(updatedMeetings);
  };

  useEffect(() => {
    console.log("meetings:", meetings);
  }, [meetings]);

  useEffect(() => {
    const storedMeetings = JSON.parse(localStorage.getItem("schedule"));
    console.log("Retrieved meetings from localStorage:", storedMeetings);

    if (storedMeetings) {
      setMeetings(storedMeetings);
    }
  }, []);

  useEffect(() => {
    //로컬스토리지에 저장
    localStorage.setItem("schedule", JSON.stringify(meetings));
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
