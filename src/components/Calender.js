//달력 컴포넌트
import React, {useState} from 'react'; 
import {format, subMonths, addMonths} from "date-fns"
import RenderHeader from "./RenderHeader";
import RenderDays from "./RenderDays";
import RenderCells from "./RenderCells";
import Calender_css from "../css/Calender.css";

export const Calender = ({todo}) => {
    const[currentMonth, setCurrentMonth] =useState(new Date());
    const[selectedDate, setSelectedDate] =useState(new Date());

    const prevMonth=()=>{
        setCurrentMonth(subMonths(currentMonth, 1));

    };
    const nextMonth=()=>{
        setCurrentMonth(addMonths(currentMonth, 1));

    };
    const onDateClick = (day)=>{
        setSelectedDate(day);
        console.log("클릭한 날짜");
        console.log(selectedDate);
    };
    return (
        <div className= "calendar">
                <RenderHeader 
                    currentMonth={currentMonth}
                    prevMonth={prevMonth}
                    nextMonth={nextMonth}
                    />
            <RenderDays/>
          <RenderCells 
          currentMonth ={currentMonth}
          selectedDate={selectedDate}
          onDateClick={onDateClick}/>
          </div>
    );
};
export default Calender;