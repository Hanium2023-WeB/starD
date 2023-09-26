import React, { useState, useRef, useCallback, useEffect } from "react";
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
import { format, subMonths, addMonths } from "date-fns";
import Backarrow from "../../components/repeat_etc/Backarrow.js";
import Header from "../../components/repeat_etc/Header";
import { useLocation } from "react-router-dom";
const ToDoList = ({ sideheader }) => {
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [insertToggle, setInsertToggle] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date()); // 추가: 선택한 날짜 상태

  const Year = selectedDate.getFullYear();
  const Month = selectedDate.getMonth()+1;
  const Dates = selectedDate.getDate();
  const [studies, setStudy]= useState([]);

  const location = useLocation();


  useEffect(() => {
    const ParticipatedStudy = localStorage.getItem('MyParticipatedStudy');  //참여중인 스터디
    const parsedParticipatedStudy = JSON.parse(ParticipatedStudy);
    const StudyIdANDMember = localStorage.getItem("ParticipateState");
    const parsedStudyIdAndMember = JSON.parse(StudyIdANDMember);
    const openStudies = location.state;
    // const member = localStorage.getItem("acceptedMembers"); //모집 후 최종 멤버들
    // const StudyId = localStorage.getItem("ParticipatedStudyId");

    setStudy(parsedParticipatedStudy);
    console.log("개설된 스터디",openStudies);
    console.log("참여하는 스터디", parsedParticipatedStudy);
    // console.log("참여멤버", member);
    console.log("스터디별 참여 멤버들", parsedStudyIdAndMember);
  }, []);

  const onInsertToggle = () => {
    if (selectedTodo) {
      setSelectedTodo(null);
    }
    setInsertToggle((prev) => !prev);
  };

  const onChangeSelectedTodo = (todo) => {
    setSelectedTodo(todo);
  };

  const [todos, setTodos] = useState({});

  //새로운 일정 추가
  const nextId = useRef(1);

  useEffect(() => {
    // Load todos from localStorage when the component mounts
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  useEffect(() => {
    // Save todos to localStorage whenever todos change
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const onInsert = useCallback(
    (text) => {
      const dateKey = selectedDate.toDateString();
      const todo = {
        id: nextId.current,
        text,
        checked: false,
        date: dateKey,
      };
      setTodos((prevTodos) => ({
        ...prevTodos,
        [dateKey]: [...(prevTodos[dateKey] || []), todo],
      }));
      nextId.current++;
    },
    [selectedDate]
  );
  const dateKey = selectedDate.toDateString();
  console.log(`dateKey: ${dateKey}`);
  const filteredTodos = todos[dateKey] || [];

  const onRemove = useCallback(
    (id) => {
      alert("삭제하시겠습니까?");
      const updatedTodos = Object.keys(todos).reduce((acc, dateKey) => {
        const filteredTodos = todos[dateKey].filter((todo) => todo.id !== id);
        if (filteredTodos.length > 0) {
          acc[dateKey] = filteredTodos;
        }
        if (filteredTodos.length===0){
        }
        return acc;
      }, {});
      setTodos(updatedTodos);
    },
    [todos]
  );

  const onUpdate = (id, text) => {
    onInsertToggle();

    const updatedTodos = Object.keys(todos).reduce((acc, dateKey) => {
      const updatedTodosForKey = todos[dateKey].map((todo) =>
        todo.id === id ? { ...todo, text } : todo
      );
      acc[dateKey] = updatedTodosForKey;
      return acc;
    }, {});

    setTodos(updatedTodos);
  };
  const onToggle = useCallback(
    (id) => {
      const updatedTodos = Object.keys(todos).reduce((acc, dateKey) => {
        const updatedTodosForKey = todos[dateKey].map((todo) =>
          todo.id === id ? { ...todo, checked: !todo.checked } : todo
        );
        acc[dateKey] = updatedTodosForKey;
        return acc;
      }, {});

      setTodos(updatedTodos);
    },
    [todos]
  );

  const handleDateClick = (day) => {
    setSelectedDate(new Date(day));
    console.log(`선택한 날짜 : ${day}`);
  };

  return (
    <div>
      <Header showSideCenter={true}/>
      {/*<Backarrow subname={"투두 리스트 & 일정"}/>*/}
      <div className="container">
        <Category />
        <div className="main_container">
          <p id={"main-container-title"}>투두 리스트 & 일정</p>
          <div className="sub_container" id="todo_sub">
            <div className="todo_container">
              <div class="today">
                {" "}
                <span>{`오늘은 ${Year}년 ${Month}월 ${Dates}일입니다.`}</span>
              </div>
              <ToDoInsert onInsert={onInsert} />
              <ul className="TodoList">
              {filteredTodos.length == 0 && (
                <div className="alert_empty_todo">
                <span>할 일이 없습니다.<br/>  할 일을 입력해주세요.</span>
                </div>
              )}
                {filteredTodos.map((todo) => (
                  <ToDoListItem
                    todo={todo}
                    key={todo.id}
                    onRemove={onRemove}
                    onToggle={onToggle}
                    onChangeSelectedTodo={onChangeSelectedTodo}
                    onInsertToggle={onInsertToggle}
                  />
                ))}
              </ul>

              {insertToggle && (
                <ToDoEdit selectedTodo={selectedTodo} onUpdate={onUpdate} />
              )}
            </div>
            <Calender todo={todos} onDateClick={handleDateClick} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ToDoList;
