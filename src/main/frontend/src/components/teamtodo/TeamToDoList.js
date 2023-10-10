import React, {useState, useRef, useCallback, useEffect} from "react";
import Calender from "../../components/calender/Calender.js";
import {format, subMonths, addMonths} from "date-fns";
import Backarrow from "../../components/repeat_etc/Backarrow.js";
import Header from "../../components/repeat_etc/Header";
import {useLocation} from "react-router-dom";
import axios from "axios";
import TeamToDoInsert from "../../components/teamtodo/TeamToDoInsert";
import TeamToDoEdit from "../../components/teamtodo/TeamToDoEdit";
import TeamToDoListItem from "../../components/teamtodo/TeamToDoListItem";
import TeamToDoList_css from "../../css/todo_css/TeamToDoList.css";


const TeamToDoList = ({studyId, Member, selectStudy}) => {
    const [selectedTodo, setSelectedTodo] = useState(null);
    const [insertToggle, setInsertToggle] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date()); // 추가: 선택한 날짜 상태
    const accessToken = localStorage.getItem('accessToken');
    const Year = selectedDate.getFullYear();
    const Month = selectedDate.getMonth() + 1;
    const Dates = selectedDate.getDate();
    const [studies, setStudy] = useState([]);
    const [studyTitles, setStudyTitles] = useState([]); //참여 중인 스터디 제목
    const [studyIds, setStudyIds] = useState([]); //참여 중인 스터디 아이디
    const [studyMems, setStudyMems] = useState([]); //참여 멤버

    const [assignandtodoid, setAssignandToDoid] = useState({}); //투두 id와 담당자 저장하기

    const [Assignees, setAssignees] = useState([]); //담당자
    const studyIdAsNumber = parseFloat(studyId);

    const onInsertToggle = () => {
        if (selectedTodo) {
            setSelectedTodo(null);
        }
        setInsertToggle((prev) => !prev);
    };

    const onChangeSelectedTodo = (todo) => {
        setSelectedTodo(todo);
    };

    // const [todos, setTodos] = useState({}); //투두만
    const [todoswithAssignee, setTodoswithAssignee] = useState({}); //투두랑 담당자 함친 객체 배열 state

    //새로운 일정 추가
    const nextId = useRef(1);

    //달력에서 선택한 날짜
    const dateKey = selectedDate.toDateString();
    // console.log(`dateKey: ${dateKey}`);

    //담당자 선택 함수
    const handleAddAssignees = (e) => {
        const assignName = e.target.getAttribute('data-assign-name');
        const updatedAssignees = [...Assignees, assignName];
        setAssignees(updatedAssignees);
    };
    //담당자 삭제 함수
    const handleRemoveAssignees = (e) => {
        const removeAssignName = Assignees.filter((item) => item !== e.target.value);
        setAssignees(removeAssignName);
        console.log("삭제 완료: ", Assignees);
    };

    useEffect(() => {
        console.log("선택 담당자:", Assignees.toString());
    }, [Assignees]);


    //할일 추가 함수
    const onInsert = useCallback((task, studyId) => {
        const StringAssignees = Assignees.toString();
        const assign = Assignees;
        const dateKey = selectedDate.toDateString();
        const todo = {
            id: nextId.current,
            study: selectStudy,
            task: task,
            date: dateKey,
            assignees: StringAssignees,
        };
        const TodoWithAssign = {
            toDo: todo, member: StringAssignees, toDoStatus: false,
        }

        setTodoswithAssignee((prevTodos) => ({ //날짜 기준으로 세팅
            ...prevTodos, [dateKey]: [...(prevTodos[dateKey] || []), TodoWithAssign],
        }));
        setAssignandToDoid((prevState) => ({
            ...prevState,
            todoid: todoswithAssignee,
            assign: assign,
        }));
        nextId.current++;

    }, [selectedDate, studies, todoswithAssignee]);


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
        const postDataResponse = await axios.post(`http://localhost:8080/todo/${id}/status`, {
            status: !todo_status
        }, {
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
        console.log("setTodoswithAssignee_Member:", Member);
        console.log("담당자있는 투두:", assignandtodoid);
    }, [todoswithAssignee, Member, assignandtodoid]);

    //해당 스터디의 투두 가져오기
    useEffect(() => {
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
    }, [studyIdAsNumber]);


    return (<div>
        <div className="container">
            <div className="main_container">
                <p id={"main-container-title"}>투두 리스트 & 일정</p>
                <div className="sub_container" id="todo_sub">
                    <div className="todo_container">
                        <div className="today">
                            {" "}
                            <span>{`오늘은 ${Year}년 ${Month}월 ${Dates}일입니다.`}</span>
                        </div>
                        {/*담당자 선택*/}
                        <div className={"select_assignee"}>
                            <p>담당자</p>
                            {Array.isArray(Member) && Member.length > 0 && Member.map((item, index) => (
                                <div className={"assignees"} key={index}>
                                    <div
                                        className="assignee-name"
                                        data-assign-name={item.member.name}
                                        onClick={handleAddAssignees}
                                    >
                                        {item.member.name}
                                    </div>
                                    <button id={"delete_assignees"} value={item.member.name}
                                            onClick={handleRemoveAssignees}>x
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className={"selected-assignees"}>
                            <p>선택한 담당자</p>
                            <ul>
                                {Assignees.map((assignee, index) => (
                                    <li key={index}>{assignee}</li>
                                ))}
                            </ul>
                        </div>
                        <TeamToDoInsert onInsert={onInsert} dueDate={selectedDate} Inserttodostudyid={studyId}
                                        studyidasnumber={studyIdAsNumber} Assignees={Assignees}/>
                        <ul className="TodoList">
                            {filteredTodos.length === 0 && (<div className="alert_empty_todo">
                                <span>할 일이 없습니다.<br/>  할 일을 입력해주세요.</span>
                            </div>)}
                            {filteredTodos.map((todo => {
                                if (todo.toDo) {
                                    return (<TeamToDoListItem
                                        todos={todo}
                                        key={todo.toDo.id}
                                        onRemove={onRemove}
                                        onToggle={onToggle}
                                        onChangeSelectedTodo={onChangeSelectedTodo}
                                        onInsertToggle={onInsertToggle}
                                        selectedDate={selectedDate}
                                        Assignees={Assignees}
                                    />)
                                }
                            }))}
                        </ul>
                        {insertToggle && (<TeamToDoEdit selectedTodo={selectedTodo} onUpdate={onUpdate} Member={Member}
                                                        handleAddAssignees={handleAddAssignees}
                                                        handleRemoveAssignees={handleRemoveAssignees}
                                                        Assignees={Assignees}/>)}
                    </div>
                    <Calender todo={todoswithAssignee.todo} onDateClick={handleDateClick}/>
                </div>
            </div>
        </div>
    </div>);
};
export default TeamToDoList;
