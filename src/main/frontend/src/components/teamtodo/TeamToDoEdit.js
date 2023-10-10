import React, {useState, useRef, useCallback, useEffect} from "react";
import Editcss from "../../css/todo_css/ToDoEdit.css";
import {useLocation} from "react-router-dom";
import axios from "axios";

const TeamToDoEdit = ({selectedTodo, onUpdate,Member,handleAddAssignees,handleRemoveAssignees,Assignees}) => {
    const accessToken = localStorage.getItem('accessToken');
    console.log("selectedTodo", selectedTodo);
    const [studyMems, setStudyMems] = useState(""); //참여 멤버
    const inputDate = new Date(selectedTodo.toDo.date);
    const [UpdatedToDo, setUpdatedToDo] = useState(selectedTodo);
// 로컬 시간대 고려
    const offset = inputDate.getTimezoneOffset();
    inputDate.setMinutes(inputDate.getMinutes() - offset);

    const formattedDate = inputDate;

    const [task, setTask] = useState('');

    const onChange = useCallback((e) => {
        console.log("task", e.target.value);
        setTask(e.target.value);
        setUpdatedToDo((prevState) => {
            return {
                ...prevState,
                toDo: {
                    ...prevState.toDo,
                    task: e.target.value,
                },
            };
        });
        console.log("setUpdatedToDo", UpdatedToDo);
    }, [task]);

    const onSubmit = useCallback(async (e) => {
        alert("수정되었습니다.");
        console.log("setUpdatedToDo?:", UpdatedToDo);
        onUpdate(UpdatedToDo);
    }, [onChange,studyMems]);

    useEffect(() => {
        if (selectedTodo) {
            setTask(selectedTodo.toDo.task);
        }
        console.log("selectedTodo,",selectedTodo);
    }, [selectedTodo]);


    return (
        <div className="background">
            <form onSubmit={onSubmit} className="todoedit_insert">
                <h2>수정하기</h2>
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
                            <button id={"delete_assignees"} value={item.member.name} onClick={handleRemoveAssignees}>x</button>
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
                <input
                    onChange={onChange}
                    value={task}
                    placeholder="할 일을 입력하세요"/>
                <button type="submit">수정하기</button>
            </form>

        </div>
    )
}
export default TeamToDoEdit;