import React, { useState, useEffect, useRef } from "react";
import SearchBar from '../SearchBar';
import LogoButton from '../components/LogoButton';
import { format } from "date-fns";
import cn from "classnames";
import checkbox from "../images/check.png";
import uncheckbox from "../images/unchecked.png";
import { Link } from "react-router-dom";

const searchItems=[
    "back-end",
    "front-end",
    "cloud",
    "aws",
    "framework"
  ]

  
const Home = ({sideheader}) => {
  const dataId = useRef(0);
  const [state, setState] = useState([]);
  const [todos, setTodos] = useState({});
  const [today, setToday] = useState(new Date());
  const [parsedTodos, setParsedTodos] = useState({});
  const [todayKey, setTodayKey] = useState("");

  const Year = today.getFullYear();
  const Month = today.getMonth() + 1;
  const Dates = today.getDate();

  useEffect(() => {
    // Load todos from localStorage when the component mounts
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      const parsed = JSON.parse(savedTodos);
      setParsedTodos(parsed);
      console.log(parsedTodos);

      // 오늘의 날짜를 키로 사용하여 해당 ToDo 항목 배열을 가져옴
      const todayKey = today.toDateString();
      setTodayKey(todayKey);

      console.log(todayKey);
      if (parsedTodos.hasOwnProperty(todayKey)) {
        const todayTodos = parsedTodos[todayKey];
        // 오늘의 ToDo 항목 배열이 존재하면 해당 항목의 text 값을 출력
        todayTodos.forEach((todo) => {
          console.log(todo.text);
          console.log(todo.checked);
        });
      }
    }
  }, []);

  const getTodoItemClassName = (checked)=>{
	return checked? "checked" :"unchecked";
  };

  return (
    <div class="main_wrap">
    {sideheader}
    <div className="subground">
    <SearchBar searchItems={searchItems}/>
  </div>
  <div className="dashboard">
  <div className="dashboard_detail">
    대시보드 넣을 자리 width:650?
    <br/>
    할 일의 완료 정도에 따라서 대시보드의 화면이 바뀜
    </div>
  <div className="dashboard_todo">

                <span id="today">{`${Year}. ${Month}. ${Dates} / 오늘의 할 일`} <Link  to={"/ToDoList"}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                  }}> <button id="todo_more">{`ToDoList Page >>`}</button></Link></span>
                <hr />
                {parsedTodos.hasOwnProperty(todayKey) ? (
                  <ul id="todocontent">
                    {parsedTodos[todayKey].map((todo) => (
                      <li key={todo.id}
					  className={getTodoItemClassName(todo.checked)}>
                        {todo.checked ? (
                          <img src={checkbox} alt="checked" width="20px" />
                        ) : (
                          <img src={uncheckbox} alt="unchecked" width="20px" />
                        )}
						<div id="todotext">
                        {todo.text}
						</div>
                      </li>
                    ))}
                  </ul>
                ):(
					<div className="empty_today_todo">
                <span>할 일이 없습니다.<br/>  할 일을 입력해주세요.</span>
                </div>
				)}
              </div>
              </div>
            </div>
    
  );
};
export default Home;
