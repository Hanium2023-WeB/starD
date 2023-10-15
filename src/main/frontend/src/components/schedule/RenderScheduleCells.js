import React, {useState, useRef, useCallback, useEffect} from "react";
import {startOfMonth, endOfMonth, startOfWeek, endOfWeek} from "date-fns";
import {isSameMonth, isSameDay, addDays, parse, format} from "date-fns";
import {CgAddR} from "react-icons/cg";
import {Link} from "react-router-dom";
import EditSchedule from "./EditSchedule.js";
import {useNavigate} from "react-router-dom";
import {parseISO} from 'date-fns';

// import { EditSchedule } from "./EditSchedule.js";
const RenderScheduleCells = ({
                                 studies, studyTitles,
                                 currentMonth,
                                 selectedDate,
                                 onDateClick,
                                 meetings,
                                 schedules,
                                 onUpdate,
                                 onRemove,
                             }) => {
    const monthStart = startOfMonth(currentMonth); //오늘이 속한 달의 시작일
    const monthEnd = endOfMonth(monthStart); //오늘이 속한 달의 마지막일
    const startDate = startOfWeek(monthStart); //monthStart가 속한 주의 시작일
    const endDate = endOfWeek(monthEnd); //monthEnd가 속한 주의 마지막일

    const rows = []; //일월화수목금토(한 주) * 4주 or 5주
    let days = []; //일월화수목금토 (한 주)
    let day = startDate;
    let formattedDate = "";
    const [editScheduleData, setEditScheduleData] = useState("");
    const [editdata, setEditDate]= useState({});
    const navigate = useNavigate();

    const openEditSchedule = (id,item) => {
        console.log("edit", id);
        setEditScheduleData(id);
        setEditDate(item);
    };
    useEffect(()=>{
        console.log("sss:",editdata );
    },[editdata]);

    while (day <= endDate) {
        for (let i = 0; i < 7; i++) {
            formattedDate = format(day, "d");
            const cloneDay = new Date(
                day.getFullYear(),
                day.getMonth(),
                day.getDate()
            );

            days.push(
                <div
                    className={`col cell ${
                        !isSameMonth(day, monthStart) //두개의 날짜가 같은 달에 속하는지 확인하는 함수
                            ? "disabled"
                            : isSameDay(day, selectedDate) //두개의 날짜 같은지 확인하는 함수
                                ? "selected"
                                : format(currentMonth, "M") !== format(day, "M")
                                    ? "not-valid"
                                    : "valid"
                    }`}
                    key={day}
                >
          <span
              className={
                  format(currentMonth, "M") !== format(day, "M")
                      ? "text not-valid"
                      : ""
              }
          >
            <CgAddR onClick={() => onDateClick(cloneDay)}/>
              {formattedDate}
          </span>
                    <div className="meeting_wrap">
                        {Array.isArray(schedules) && schedules
                            .filter((item) => isSameDay(parseISO(item.startDate), cloneDay))
                            .map((item) => (
                                <div key={item.id} className="event" style={{backgroundColor: item.color}}
                                     onClick={() => {
                                         openEditSchedule(item.id, item)
                                     }}>
                                    <div id="meeting_detail">
                                        {item.study && <p>{item.study.title}</p>}
                                        <p>{item.title}</p>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            );
            day = addDays(day, 1);
        }
        rows.push(
            <div className="Schedulerow" key={day}>
                {days}
            </div>
        );
        days = [];
    }
    return (
        <div className="SchedulerContainer">
            {rows}
            {editScheduleData && (
                <EditSchedule
                    studies={studies}
                    studyTitles={studyTitles}
                    editdata={editdata}
                    onUpdate={onUpdate}
                    onRemove={onRemove}
                    onClose={() => {
                        setEditScheduleData(null);
                    }}
                />
            )}
        </div>
    );
};

export default RenderScheduleCells;
