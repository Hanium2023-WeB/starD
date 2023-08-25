import cn from 'classnames';
import ToDoList from "../../pages/mypage/ToDoList";
import checkbox from "../../images/check.png";
import uncheckbox from "../../images/unchecked.png";
import editicon from "../../images/edit.png";
import removeicon from "../../images/remove.png";
import ToDoListItems from "../../css/ToDoListItem.css";

const ToDoListItem = ({todo, onRemove,onToggle,onChangeSelectedTodo,onInsertToggle})=>{
    const {id, text, checked}= todo;
    
    return (
      <li className="TodoListItem">
        <div className={cn('checkbox',{checked})} onClick={()=>onToggle(id, checked)}>
            {checked ? <img src={checkbox} width="20px"/> : <img src={uncheckbox} width="20px"/>}
            <div className="text" >{text}</div>
            </div>
        <div className="Edit" onClick={()=>{onChangeSelectedTodo(todo); onInsertToggle();}}>
        <img src={editicon} width="20px"/> 
            </div>
          
            <div className="Remove" onClick={()=>onRemove(id)}> 
            <img src={removeicon} width="20px"/> 
            </div>
        </li>
   
    );
}
export default ToDoListItem;