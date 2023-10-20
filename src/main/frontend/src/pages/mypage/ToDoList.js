import React, {useState, useRef, useCallback, useEffect} from "react";
import ToDoListItem from "../../components/todo/ToDoListItem";
import ToDoInsert from "../../components/todo/ToDoInsert";
import ToDoEdit from "../../components/todo/ToDoEdit.js";
import Category from "../../components/repeat_etc/Category";
import Mypage from "../../css/mypage_css/Mypage.css";
import Editcss from "../../css/todo_css/ToDoEdit.css";
import ToDo from "../../css/todo_css/ToDo.css";
import ToDoListItems from "../../css/todo_css/ToDoListItem.css";
import ToDoInserts from "../../css/todo_css/ToDoInsert.css";
import Calender from "../../components/calender/Calender.js";
import {format, subMonths, addMonths} from "date-fns";
import Backarrow from "../../components/repeat_etc/Backarrow.js";
import Header from "../../components/repeat_etc/Header";
import {useLocation} from "react-router-dom";
import axios from "axios";


const ToDoList = ({sideheader}) => {
    const [selectedTodo, setSelectedTodo] = useState(null);
    const [insertToggle, setInsertToggle] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date()); // 추가: 선택한 날짜 상태
    const accessToken = localStorage.getItem('accessToken');
    const Year = selectedDate.getFullYear();
    let Month = selectedDate.getMonth() + 1;
    const Dates = selectedDate.getDate();
    const [studies, setStudy] = useState([]);
    const [studyTitles, setStudyTitles] = useState([]); //참여 중인 스터디 제목
    const [studyIds, setStudyIds] = useState([]); //참여 중인 스터디 아이디
    const [studyMems, setStudyMems] = useState([]); //참여 멤버


    const [InsertToDoTitle, setInsertToDoTitle] = useState("")
    const [InsertToDoStudyId, setInsertToDoStudyId] = useState("0")
    const [InsertToDoStudy, setInsertToDoStudy] = useState([]); //선택한 스터디 객체
    const studyIdAsNumber = parseFloat(InsertToDoStudyId);

    useEffect(() => {
        axios.get("http://localhost:8080/user/mypage/studying", {
            withCredentials: true, headers: {
                'Authorization': `Bearer ${accessToken}`
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
                console.log("참여 스터디 아이디", studiesIds);
                console.log("참여 스터디 제목", studiesTitle);
                console.log("참여중인 스터디", studyList);
                console.log("참여멤버", ParticipatedStudiesMem);

            })
            .catch((error) => {
                console.error("모집완료된 스터디, 참여멤버  가져오기 실패:", error);
            });
    }, [accessToken]);


    const onInsertToggle = () => {
        if (selectedTodo) {
            setSelectedTodo(null);
        }
        setInsertToggle((prev) => !prev);
    };

    const onChangeSelectedTodo = (todo) => {
        setSelectedTodo(todo);
    };

    const [todoswithAssignee, setTodoswithAssignee] = useState({}); //투두랑 담당자 함친 객체 배열 state

    //새로운 일정 추가
    const nextId = useRef(1);

    //달력에서 선택한 날짜
    const dateKey = selectedDate.toDateString();


    //할일 추가 함수
    const onInsert = useCallback((title, task, studyId) => {
        const filteredObjects = studies.find((item) => item.study.id === studyId);
        //스터디 이름과 같은 스터디 객체를 찾는다
        if (!filteredObjects) {
            console.error("Study not found for studyId:", studyId);
            //전체를 골랐을 때 처리 studyId 0임.
            return;
        } else {
            console.log("filteredObjects", filteredObjects);
            console.log("title", title);
            const dateKey = selectedDate.toDateString();
            const todo = {
                id: nextId.current,
                study: filteredObjects.study,
                task: task,
                date: dateKey,
                assignees: filteredObjects.member,
            };
            const TodoWithAssign = {
                toDo: todo, member: filteredObjects.member, toDoStatus: false,
            }

            setTodoswithAssignee((prevTodos) => ({ //날짜 기준으로 세팅
                ...prevTodos, [dateKey]: [...(prevTodos[dateKey] || []), TodoWithAssign],
            }));

            nextId.current++;
        }
    }, [selectedDate, studies]);


    const filteredTodos = todoswithAssignee[dateKey] || [];
    // console.log("filteredTodos", filteredTodos);

    //삭제 함수
    const onRemove = useCallback( //todos.todo의 id
        async (id) => {
            console.log("id", id);
            alert("삭제하시겠습니까?");

            const deleteDataResponse = await axios.delete(`http://localhost:8080/todo/${id}`, {
                withCredentials: true, headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            console.log("삭제 성공:", deleteDataResponse.data);
            setTodoswithAssignee((prevTodos) => {
                const updatedTodos = {...prevTodos};
                Object.keys(updatedTodos).forEach((dateKey) => {
                    updatedTodos[dateKey] = updatedTodos[dateKey].filter((todo) => todo.toDo.id !== id);
                });
                return updatedTodos;
            });
        }, []);

    //수정 함수
    const onUpdate = useCallback(async (UpdatedToDo) => {
        console.log("selectedTodo..:", UpdatedToDo);
        onInsertToggle();
        const assigneeStr = studyMems.toString();
        console.log("assigneeStr..:", assigneeStr);
        const todoData = {
            task: UpdatedToDo.toDo.task, dueDate: UpdatedToDo.toDo.dueDate,
        };
        const postDataResponse = await axios.put(`http://localhost:8080/todo/${UpdatedToDo.toDo.id}`, todoData, {
            params: {
                studyId: UpdatedToDo.toDo.study.id, assigneeStr: assigneeStr,
            }, withCredentials: true, headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        console.log("전송 성공:", postDataResponse.data);
        const updatedTodos = {
            ...todoswithAssignee,
            [dateKey]: todoswithAssignee[dateKey].map((todo) =>
                todo.toDo.id === UpdatedToDo.toDo.id
                    ? {
                        toDo: {
                            ...todo.toDo,
                            study: {...todo.toDo.study, id: UpdatedToDo.toDo.study.id},
                            task: UpdatedToDo.toDo.task,
                        },
                        toDoStatus: todo.toDoStatus,
                    }
                    : todo
            ),
        };

        setTodoswithAssignee(updatedTodos);
        console.log("전송 성공t:", todoswithAssignee);

    }, [studyMems, selectedDate, studies]);


    //체크 버튼 바꾸는 함수
    const onToggle = useCallback(async (id, todo_status) => {
        console.log("체크 전 상태",todo_status);
        console.log("체크 후 상태",!todo_status);
        const postDataResponse = await axios.post(`http://localhost:8080/todo/${id}/status`, null, {
            params: {status: !todo_status},
            withCredentials: true, headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        console.log("체크 성공:", postDataResponse.data);
        setTodoswithAssignee((prevTodos) => {
            const updatedTodos = {...prevTodos};
            Object.keys(updatedTodos).forEach((dateKey) => {
                updatedTodos[dateKey] = updatedTodos[dateKey].map((todo) => todo.toDo.id === id ? {
                    ...todo,
                    toDo:{
                        ...todo.toDo,
                    },
                    toDoStatus: !todo.toDoStatus
                } : todo);
            });
            return updatedTodos;
        });
    }, []);

    const handleDateClick = (day) => {
        setSelectedDate(new Date(day));
        console.log(`선택한 날짜 : ${day}`);
    };

    useEffect(() => {
        //불러온 투두리스트
        console.log("setTodoswithAssignee_TODOLIST:", todoswithAssignee);
    }, [todoswithAssignee]);


    // 달력 다음달 저번달 옮기기
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const prevMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1));
    };
    const nextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1));
    };

    useEffect(() => {
        Month = format(currentMonth, "M")
    }, [currentMonth]);

    //전체 스터디의 투두 가져오기
    useEffect(() => {
        if (InsertToDoStudyId === "0") {
            axios.get(`http://localhost:8080/todo/all`, {
                params: {
                    year: Year, month: Month,
                }, headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }).then((response) => {
                console.log('전체 스터디 투두리스트 가져오기 성공:', response.data);

                const groupedTodos = {};
                response.data.forEach((todoItem) => {
                    const dueDate = new Date(todoItem.toDo.dueDate).toDateString();
                    if (!groupedTodos[dueDate]) {
                        groupedTodos[dueDate] = [];
                    }
                    groupedTodos[dueDate].push(todoItem);
                });

                setTodoswithAssignee((prevTodos) => ({
                    ...prevTodos, ...groupedTodos,
                }));
            }).catch((error) => {
                console.log('전체 스터디 투두리스트 가져오기 실패:', error);
            })
        } else {
            axios.get(`http://localhost:8080/todo/user/${studyIdAsNumber}`, {
                params: {
                    year: selectedDate.getFullYear(), month: selectedDate.getMonth() + 1,
                }, headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }).then((response) => {
                console.log('스터디별 투두리스트 가져오기 성공:', response.data);

                const groupedTodos = {};
                response.data.forEach((todoItem) => {
                    const dueDate = new Date(todoItem.toDo.dueDate).toDateString();
                    if (!groupedTodos[dueDate]) {
                        groupedTodos[dueDate] = [];
                    }
                    groupedTodos[dueDate].push(todoItem);
                });

                setTodoswithAssignee((prevTodos) => ({
                    ...prevTodos, ...groupedTodos,
                }));
            }).catch((error) => {
                console.log('스터디별 투두리스트 가져오기 실패:', error);
            })
        }
    }, [InsertToDoStudyId, studyIdAsNumber,currentMonth]);


    const selectStudy = (e) => {
        setInsertToDoTitle(e.target.value)
        if (e.target.value !== "전체") {
            const selectedStudy = studies.find((study) => study.study.title === e.target.value);
            const selectedId = selectedStudy.study.id;
            setInsertToDoStudyId(selectedId);
            setInsertToDoStudy(selectedStudy);
            console.log(e.target.value);
            console.log("선택한 스터디 아이디", selectedId);
        } else if (e.target.value === "전체") {
            const allselect = "0";
            setInsertToDoStudyId(allselect);
            console.log("전체 select: ", allselect);
        }
    }
    useEffect(() => {
        console.log("InsertToDoStudyId_투두리스트:::", InsertToDoStudyId);
        console.log("studyIdAsNumber_투두리스트:::", studyIdAsNumber);

    }, [InsertToDoStudyId, studyIdAsNumber]);




    return (<div>
        <Header showSideCenter={true}/>
        {/*<Backarrow subname={"투두 리스트 & 일정"}/>*/}
        <div className="container">
            <Category/>
            <div className="main_container">
                <Backarrow subname={"투두 리스트 & 일정"}/>
                {/*<p id={"main-container-title"}>투두 리스트 & 일정</p>*/}
                <div className="sub_container" id="todo_sub">
                    <div className="todo_container">
                        <div className="today">
                            {" "}
                            <span>{`오늘은 ${Year}년 ${Month}월 ${Dates}일입니다.`}</span>
                        </div>
                        <div>
                            <select id="todo-select" onChange={selectStudy} value={InsertToDoTitle}>
                                <option value="전체">전체보기</option>
                                {studyTitles.map((item, index) => (
                                    <option key={index} value={item}>{item}</option>

                                ))}
                            </select>
                        </div>
                        <ToDoInsert onInsert={onInsert} dueDate={selectedDate} Inserttodostudyid={InsertToDoStudyId}
                                    Inserttodotitle={InsertToDoTitle} Inserttodostudy={InsertToDoStudy}
                                    studyidasnumber={studyIdAsNumber}/>
                        <ul className="TodoList">
                            {filteredTodos.length === 0 && (<div className="alert_empty_todo">
                                <span>할 일이 없습니다.<br/>  할 일을 입력해주세요.</span>
                            </div>)}
                            {filteredTodos.map((todo => {
                                if (todo.toDo) {
                                    return (<ToDoListItem
                                        todos={todo}
                                        key={todo.toDo.id}
                                        onRemove={onRemove}
                                        onToggle={onToggle}
                                        onChangeSelectedTodo={onChangeSelectedTodo}
                                        onInsertToggle={onInsertToggle}
                                        selectedDate={selectedDate}
                                    />)
                                }
                            }))}
                        </ul>
                        {insertToggle && (<ToDoEdit selectedTodo={selectedTodo} onUpdate={onUpdate}
                                                    participatedstudies={studies}/>)}
                    </div>
                    <Calender todo={todoswithAssignee} onDateClick={handleDateClick} prevMonth={prevMonth} nextMonth={nextMonth} currentMonth={currentMonth}/>
                </div>
            </div>
        </div>
    </div>);
};
export default ToDoList;
