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
    const Month = selectedDate.getMonth() + 1;
    const Dates = selectedDate.getDate();
    const [studies, setStudy] = useState([]);

    // const[ToDos,setToDos] = useState([]);
    const location = useLocation();
    const [studyTitles, setStudyTitles] = useState([]); //참여 중인 스터디 제목
    const [studyIds, setStudyIds] = useState([]); //참여 중인 스터디 아이디
    const [studyMems, setStudyMems] = useState([]); //참여 멤버

    useEffect(() => {
        axios.get("http://localhost:8080/user/mypage/studying", {
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then((res) => {
                console.log("모집완료된 스터디, 참여멤버 전송 성공 : ", res.data);

                const studyList = res.data.content;
                setStudy(studyList);
                // console.log("모집완료 ? :", studies);
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

    const [todos, setTodos] = useState({}); //투두만
    const [todoswithAssignee, setTodoswithAssignee] = useState({}); //투두랑 담당자 함친 객체 배열 state

    //새로운 일정 추가
    const nextId = useRef(1);

    //백엔드 연동 전- 로컬 스토리지에서 할 일 리스트 불러오기
    useEffect(() => {
        // Load todos from localStorage when the component mounts
        const savedTodos = localStorage.getItem("todos");
        if (savedTodos) {
            setTodos(JSON.parse(savedTodos));
        }
    }, []);

    //전체 투두 가져오기
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Step 1: 먼저 필요한 데이터를 서버에서 가져옵니다.
                const response = await axios.get('http://localhost:8080/todo/all', {
                    params: {
                        year: Year.toString(),
                        month: Month.toString(),
                    },
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                // Handle the response data here if needed
                console.log('가져오기 성공:', response.data);
                setStudy(response.data);

            } catch (error) {
                console.error("에러:", error);
            }
        };
        // fetchData 함수 호출
        fetchData();
    }, [Year, Month, accessToken]);


    //백엔드 연동 전- 로컬 스토리지에서 할 일 리스트 잠시 저장
    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
        // const response = axios.post("http://localhost:8080/todo/all",
        //     {
        //           toDo:todoswithAssignee.todo,
        //           toDoStatus: todoswithAssignee.toDoStatus,
        //     }
        // ).then(function (response){
        //   console.log("할 일 전송 성공 :",response)
        // })
        //     .catch(function (error){
        //       console.log(error);
        //     })
    }, [todoswithAssignee]);

    //할일 추가 함수
    const onInsert = useCallback(
        (studyId, task) => {
            const dateKey = selectedDate.toDateString();
            const todo = {
                id: nextId.current,
                title: studyId,
                task: task,
                date: dateKey,
            };
            const assignee = {
                todo: todo,
                toDoStatus: false,
            }
            // axios.post(`http://localhost:8080/todo/user/${todo.title}`, {
            //     // Data to send to the server
            //     title: todo.title,
            //     task: todo.task,
            //     // Include other data if needed
            // })
            //     .then((response) => {
            //         // Handle the response from the server if needed
            //         console.log("Insert request successful:", response.data);
            //
            //         // Update the local state (if needed) with the newly created to-do item
            //         setTodoswithAssignee((prevTodos) => ({
            //             ...prevTodos,
            //             [dateKey]: [...(prevTodos[dateKey] || []), assignee],
            //         }));
            //
            //         nextId.current++;
            //     })
            //     .catch((error) => {
            //         // Handle any errors that occur during the request
            //         console.error("Insert request error:", error);
            //     });
            setTodoswithAssignee((prevTodos) => ({
                ...prevTodos,
                [dateKey]: [...(prevTodos[dateKey] || []), assignee],
            }));

            nextId.current++;

        },
        [selectedDate]
    );

    const dateKey = selectedDate.toDateString();
    console.log(`dateKey: ${dateKey}`);

    const filteredTodos = todoswithAssignee[dateKey] || [];
    console.log("todoswithAssignee", filteredTodos);

    //삭제 함수
    const onRemove = useCallback( //todos.todo의 id
        (id) => {
            console.log("id", id);
            alert("삭제하시겠습니까?");
            const updatedTodos = {...todoswithAssignee};
            Object.keys(updatedTodos).forEach((dateKey) => {
                updatedTodos[dateKey] = updatedTodos[dateKey].filter((todo) => todo.todo.id !== id);
            });
            setTodoswithAssignee(updatedTodos);
            // console.log("RemovetodoswithAssignee",todoswithAssignee);
        }, [todoswithAssignee]
    );

    //수정 함수
    const onUpdate = useCallback((id, title, task) => {
        onInsertToggle();
        setTodoswithAssignee((prevTodos) => {
            const updatedTodos = {...prevTodos};
            Object.keys(updatedTodos).forEach((dateKey) => {
                updatedTodos[dateKey] = updatedTodos[dateKey].map((todo) =>
                    todo.todo.id === id ? {todo: {...todo.todo, title, task}, toDoStatus: todo.toDoStatus} : todo
                );
            });
            return updatedTodos;
        });
    }, []);
    // todo.id === id ? { ...todo, checked: !todo.checked } : todo

    //체크 버튼 바꾸는 함수
    const onToggle = useCallback(
        (id) => {
            setTodoswithAssignee((prevTodos) => {
                const updatedTodos = {...prevTodos};
                Object.keys(updatedTodos).forEach((dateKey) => {
                    updatedTodos[dateKey] = updatedTodos[dateKey].map((todo) =>
                        todo.todo.id === id ? {...todo, toDoStatus: !todo.toDoStatus} : todo
                    );
                });
                return updatedTodos;
            });
        }, []);

    const handleDateClick = (day) => {
        setSelectedDate(new Date(day));
        console.log(`선택한 날짜 : ${day}`);
    };

    return (
        <div>
            <Header showSideCenter={true}/>
            {/*<Backarrow subname={"투두 리스트 & 일정"}/>*/}
            <div className="container">
                <Category/>
                <div className="main_container">
                    <p id={"main-container-title"}>투두 리스트 & 일정</p>
                    <div className="sub_container" id="todo_sub">
                        <div className="todo_container">
                            <div className="today">
                                {" "}
                                <span>{`오늘은 ${Year}년 ${Month}월 ${Dates}일입니다.`}</span>
                            </div>
                            <ToDoInsert onInsert={onInsert} dueDate={selectedDate}/>
                            <ul className="TodoList">
                                {filteredTodos.length === 0 && (
                                    <div className="alert_empty_todo">
                                        <span>할 일이 없습니다.<br/>  할 일을 입력해주세요.</span>
                                    </div>
                                )}
                                {filteredTodos.map((todo) => (
                                    <ToDoListItem
                                        todos={todo}
                                        key={todo.id}
                                        onRemove={onRemove}
                                        onToggle={onToggle}
                                        onChangeSelectedTodo={onChangeSelectedTodo}
                                        onInsertToggle={onInsertToggle}
                                        selectedDate={selectedDate}
                                    />
                                ))}
                            </ul>
                            {insertToggle && (
                                <ToDoEdit selectedTodo={selectedTodo} onUpdate={onUpdate}/>
                            )}
                        </div>
                        <Calender todo={todos} onDateClick={handleDateClick}/>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ToDoList;
