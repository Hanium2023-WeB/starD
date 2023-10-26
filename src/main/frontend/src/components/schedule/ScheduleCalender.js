import React, {useState, useEffect, useCallback} from "react";
import { format, subMonths, addMonths } from "date-fns";
import RenderHeader from "../calender/RenderHeader";
import RenderDays from "../calender/RenderDays";
import RenderScheduleCells from "./RenderScheduleCells";
import ScheduleCalender_CSS from "../../css/schedule_css/ScheduleCalender.css";

const ScheduleCalender = ({studies, studyTitles,onDateClick ,meetings, schedules,onUpdate,onRemove}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
 
  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

    const handleToggle= useCallback((day)=>{
    setSelectedDate(new Date(day));
    onDateClick(new Date(day));
  },[selectedDate]);
 
  return (
    <div className="Schedulecalendar">
      <RenderHeader
        currentMonth={currentMonth}
        prevMonth={prevMonth}
        nextMonth={nextMonth}
      />
      <RenderDays/>
      <RenderScheduleCells
          studies={studies}
          studyTitles={studyTitles}
        currentMonth={currentMonth}
        selectedDate={selectedDate}
        onDateClick={handleToggle}
        meetings={meetings}
        schedules={schedules}
        onUpdate={onUpdate}
        onRemove ={onRemove}
      />
    </div>
  );
};
export default ScheduleCalender;
