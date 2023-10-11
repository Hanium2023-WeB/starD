import React, {useState, useRef, useCallback, useEffect} from "react";
import Editcss from "../../css/todo_css/ToDoEdit.css";
import {useLocation} from "react-router-dom";
import axios from "axios";

const TeamToDoEdit = ({selectedTodo, onUpdate,Member,Assignees}) => {
    const accessToken = localStorage.getItem('accessToken');
    console.log("selectedTodo", selectedTodo);
     const [todoassignees,setTodoAssignees] = useState(Assignees);
    const [studyMems, setStudyMems] = useState(""); //참여 멤버;
    const inputDate = new Date(selectedTodo.dueDate);
     const [UpdatedToDo, setUpdatedToDo] = useState({});
// 로컬 시간대 고려
    const offset = inputDate.getTimezoneOffset();
    inputDate.setMinutes(inputDate.getMinutes() - offset);

    const formattedDate = inputDate;

    const [task, setTask] = useState('');

    //담당자 선택 함수
    const handleAddAssignees = (e) => {
        const assignName = e.target.getAttribute('data-assign-name');
        const updatedAssignees = [...todoassignees, assignName];
        setTodoAssignees(updatedAssignees);
    };
    //담당자 삭제 함수
    const handleRemoveAssignees = (e) => {
        const removeAssignName = Assignees.filter((item) => item !== e.target.value);
        setTodoAssignees(removeAssignName);
        console.log("삭제 완료: ", Assignees);
    };

    const onChange = useCallback((e) => {
        setTask(e.target.value);
        setUpdatedToDo((prevState) => {
            return {
                ...prevState,
                assignees:todoassignees,
                toDo: {
                    ...prevState.toDo,
                    id: selectedTodo.id,
                    task: e.target.value,
                    study:{id:selectedTodo.study.id},
                    dueDate: selectedTodo.dueDate,
                },
            };
        });
        // console.log("setUpdatedToDo", UpdatedToDo);
    }, [todoassignees,handleAddAssignees]);

    const onSubmit = useCallback(async (e) => {
        // alert("수정되었습니다.");
         console.log("setUpdatedToDo?:", UpdatedToDo);
        onUpdate(UpdatedToDo);
    }, [onChange,todoassignees,handleAddAssignees]);

    useEffect(() => {
        if (selectedTodo) {
            setTask(selectedTodo.task);
        }
        console.log("selectedTodotask,",selectedTodo.task);
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
                        {todoassignees.map((assignee, index) => (
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