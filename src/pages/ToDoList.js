import React, { useState, useRef, useCallback } from "react";
import ToDoListItem from "../components/ToDoListItem";
import ToDoInsert from "../components/ToDoInsert";
import ToDoEdit from "../components/ToDoEdit.js";
import Category from "../components/Category";
import Mypage from "../css/Mypage.css";
import Editcss from "../css/ToDoEdit.css";
import ToDo from "../css/ToDo.css";
import ToDoListItems from "../css/ToDoListItem.css";
import ToDoInserts from "../css/ToDoInsert.css";
import Calender from "../components/Calender.js";

const ToDoList = ({ sideheader }) => {
  const[selectedTodo, setSelectedTodo] = useState(null); 
  const [insertToggle, setInsertToggle] =useState(false);


  const onInsertToggle =()=>{
    if(selectedTodo){
      setSelectedTodo(null);
    }
    setInsertToggle((prev) => !prev);
  };


  const onChangeSelectedTodo = (todo) => {
    setSelectedTodo(todo);
  };

  const [todos, setTodos] = useState(
    //useState를 사용하여 todos기본값 정하기
    [
      { id: 1, text: "투두리스트 만들기", checked: true },
      { id: 2, text: "투두리스트 만들기2", checked: true },
      { id: 3, text: "투두리스트 만들기3", checked: false },
    ]
  );
  
  //새로운 일정 추가
  const nextId = useRef(4);
  const onInsert = useCallback(
    (text) => {
      const todo = {
        id: nextId.current,
        text,
        checked: false,
      };
      setTodos(todos.concat(todo));
      nextId.current++;
    },
    [todos],
  );

  const onRemove = useCallback(
    (id) =>{
      alert("삭제하시겠습니까?");
      setTodos(todos.filter((todo)=> todo.id !== id));
    },
    [todos],
  );

  const onToggle = useCallback(
    (id)=>{
      setTodos(
        todos.map((todo)=>
        todo.id === id ? {...todo, checked: !todo.checked} : todo
      ),
      );
    },[todos],
  );
 
  const onUpdate = (id, text) => {
    onInsertToggle();
    
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, text } : todo)));
  };

  return (
    <div>
      {sideheader}
      <p>투두리스트 페이지입니다.</p>
      <div className="container">
        <div className="main_container">
      <div className="sub_container" id="todo_sub">
        <Category />
        <div className="todo_container">
      <ToDoInsert onInsert={onInsert}/>
      <ul className="TodoList">
        {todos.map((todo) => (
          <ToDoListItem todo={todo} key={todo.id} 
          onRemove={onRemove} onToggle ={onToggle}
          onChangeSelectedTodo={onChangeSelectedTodo} onInsertToggle={onInsertToggle}/>
        ))}
      </ul>
    
      {insertToggle &&(<ToDoEdit selectedTodo={selectedTodo} onUpdate={onUpdate}/>)}
      </div>
    <Calender todo={todos}/>
      </div>
    </div>
    </div>
    </div>
  );
};
export default ToDoList;
