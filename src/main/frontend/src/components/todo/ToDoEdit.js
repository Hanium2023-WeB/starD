import React, { useState, useRef, useCallback,useEffect } from "react";
import Editcss from "../../css/ToDoEdit.css";

const ToDoEdit=({selectedTodo, onUpdate})=>{
    const [value,setValue] =useState('');
    const onChange=useCallback((e)=>{
        setValue(e.target.value);
    },[]);

    const onSubmit=useCallback((e)=>{
    alert("수정하시겠습니까?");
    onUpdate(selectedTodo.id, value);
      setValue(''); //value 초기화
      //기본이벤트(새로고침) 방지
      e.preventDefault();
    },
    [onUpdate, value],
    );
    useEffect(() => {
        if (selectedTodo) {
          setValue(selectedTodo.text);
        }
      }, [selectedTodo]);
    
return (
    <div className="background">
        <form onSubmit={onSubmit} className="todoedit_insert">
            <h2>수정하기</h2>
            <input 
                onChange={onChange}
                value={value}
                placeholder="할 일을 입력하세요"/>
                <button type="submit">수정하기</button>
            </form>

        </div>
)
}
export default ToDoEdit;