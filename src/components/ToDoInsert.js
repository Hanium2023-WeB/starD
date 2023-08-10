import React, { useState, useRef, useCallback } from "react";
import ToDoInserts from "../css/ToDoInsert.css";

const ToDoInsert = ({onInsert})=>{
    const [value, setValue] = useState('');
    const onChange = useCallback(e=>{
        setValue(e.target.value);
    },[])
    const onSubmit = useCallback(
    //나중에 todos 배열에 새 데이터(객체)를 추가하는 함수를 추가해줄겁니다1!
        e => {
            if(value != ''){
            onInsert(value);
            }else{
                alert("할 일을 입력해주세요.");
                return;
            }
            setValue(''); //value 초기화
            //기본이벤트(새로고침) 방지
            e.preventDefault();
        }
    ,[value])
return(
<form className="TodoInsert">
   <input onChange={onChange} 
   value={value} 
   placeholder="할 일을 입력하세요"/>
   <button type="submit" onClick={onSubmit}>입력</button>
    </form>
);    
};
export default ToDoInsert;