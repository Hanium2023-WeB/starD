import React, {useState, useRef, useCallback, useEffect} from "react";
import Category from "../../components/repeat_etc/Category.js";
import Backarrow from "../../components/repeat_etc/Backarrow.js";
import Header from "../../components/repeat_etc/Header";
import axios from "axios";
import TeamRenderScheduleCells from "../../components/teamschedules/TeamRenderScheduleCells";
import TeamAddSchedule from "../../components/teamschedules/TeamAddSchedule";
import TeamScheduleCalender from "../../components/teamschedules/TeamScheduleCalender";
import {useLocation} from "react-router-dom";

const TeamSchedule = () => {
    const [meetings, setMeetings] = useState({});
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [addToggle, setAddToggle] = useState(false);
    const accessToken = localStorage.getItem('accessToken');
    const location = useLocation();
    const {studyId, Member, selecteStudy} = location.state;

    const [studies, setStudy] = useState([]);
    const [studyTitles, setStudyTitles] = useState([]);
    const [studyIds, setStudyIds] = useState([]);
    const [studyMems, setStudyMems] = useState([]);
    const nextId = useRef(1);

    useEffect(() => {
        axios.get("http://localhost:8080/user/mypage/studying", {
            withCredentials: true, headers: {
                'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json',
            }
        })
            .then((res) => {
                console.log("모집완료된 스터디, 참여멤버 전송 성공 : ", res.data);
                const studyList = res.data.content;
                setStudy(studyList);
                //console.log("모집완료 ? :", studies);
                const studiesTitle = studyList.map(item => item.study.title);
                setStudyTitles(studiesTitle);
                const studiesIds = studyList.map(item => item.study.id);
                setStudyIds(studiesIds);
                const ParticipatedStudiesMem = studyList.map(item => item.member.id);
                setStudyMems(ParticipatedStudiesMem);

            })
            .catch((error) => {
                console.error("모집완료된 스터디, 참여멤버  가져오기 실패:", error);
            });
    }, [accessToken]);

    const [schedules, setSchedules] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:8080/schedule/${studyId}`, {
            params: {
                year: selectedDate.getFullYear(), month: selectedDate.getMonth() + 1,
            }, withCredentials: true, headers: {
                'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json'
            }
        }).then((response) => {
            console.log("스터디별 일정 가져오기 성공", response.data);
            setSchedules(response.data);
            const maxId = Math.max(...response.data.map(schedule => schedule.id));
            nextId.current = maxId + 1;
        }).catch((error) => {
            console.error("스터디별 일정 가져오기 실패", error.response.data);
        });
    }, [studyId]);

    const handleToggle = (day) => {
        setSelectedDate(new Date(day));
        setAddToggle((prev) => !prev);
    };


    useEffect(() => {
        console.log("sche", schedules);
    }, [schedules]);

    const onInsert = useCallback((start_date, title, color, studyIdAsNumber) => {
        const startDay = new Date(start_date);
        const formattedDate = `${startDay.getFullYear()}-${String(startDay.getMonth() + 1).padStart(2, '0')}-${String(startDay.getDate()).padStart(2, '0')}T${String(startDay.getHours()).padStart(2, '0')}:${String(startDay.getMinutes()).padStart(2, '0')}:${String(startDay.getSeconds()).padStart(2, '0')}`;

        const schedule = {
            id: nextId.current, title: title, startDate: formattedDate, color: color,
        };
        axios.post("http://localhost:8080/schedule", schedule, {
            params: {
                studyId: studyIdAsNumber
            }, withCredentials: true, headers: {
                'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json',
            }
        }).then((res) => {
            console.log("전송 성공", res.data);
            setSchedules([...schedules, res.data]);
        }).catch((error) => {
            console.error("전송 실패", error.response.data); // Log the response data
        });
        nextId.current += 1;
    }, [meetings, selectedDate]);

    //일정 수정 함수
    const onUpdate = useCallback((id, start_date, newTitle, newColor) => {
        console.log("title:", newTitle);
        console.log("COLOR:", newColor);

        axios.put(`http://localhost:8080/schedule/${id}`, {}, {
            params: {
                title: newTitle, color: newColor,
            }, withCredentials: true, headers: {
                'Authorization': `Bearer ${accessToken}`,
            }
        }).then((res) => {
            console.log("전송 성공", res.data);
            setSchedules((schedules) => {
                const updatedSchedules = schedules.map((schedule) => schedule.id === res.data.id ? res.data : schedule);
                return updatedSchedules;
            });
        }).catch((error) => {
            console.error("전송 실패", error);
        });

    }, [meetings, selectedDate]);


    const onRemove = (id) => {
        axios.delete(`http://localhost:8080/schedule/${id}`, {
            withCredentials: true, headers: {
                'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json',
            }
        }).then((res) => {
            console.log("삭제 성공", res.data);
            const data = schedules.filter((item) => item.id !== id)
            setSchedules(data);
        }).catch((error) => {
            console.error("삭제 실패", error);
        });

    };

    return (<div>
        <Header showSideCenter={true}/>

        <div className="container">
            <Category/>
            <div className="main_schedule_container">
                <p id={"entry-path"}> 스터디 참여내역 > 팀블로그 > 팀 스터디 일정</p>
                <Backarrow subname={"스터디 모임 일정"}/>
                <div className="sub_container" id="todo_sub">
                    <TeamScheduleCalender
                        studies={studies}
                        studyTitles={studyTitles}
                        onDateClick={handleToggle}
                        meetings={meetings}
                        schedules={schedules}
                        onUpdate={onUpdate}
                        onRemove={onRemove}
                    />
                </div>
                {addToggle && (<TeamAddSchedule
                    studies={studies}
                    studyTitles={studyTitles}
                    selectedDate={selectedDate}
                    onInsert={onInsert}
                    onClose={() => {
                        setAddToggle(false);
                    }}
                />)}
            </div>
        </div>
    </div>);
};
export default TeamSchedule;
