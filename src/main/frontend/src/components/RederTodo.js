import TodoList from "../pages/ToDoList.js";
import React, {useEffect} from "react";

// const RenderTodo=(todo)=>{
    // const {id, text, checked}= todo;
    //  return (
    //   <li className="TodoListItem">
    //     <div className={cn('checkbox',{checked})} onClick={()=>onToggle(id, checked)}>
    //         {checked ? <img src={checkbox} width="20px"/> : <img src={uncheckbox} width="20px"/>}
    //         <div className="text" >{text}</div>
    //         </div>
    //     <div className="Edit" onClick={()=>{onChangeSelectedTodo(todo); onInsertToggle();}}>
    //     <img src={editicon} width="20px"/> 
    //         </div>
          
    //         <div className="Remove" onClick={()=>onRemove(id)}> 
    //         <img src={removeicon} width="20px"/> 
    //         </div>
    //     </li>
   
//     );
// }
// export default RenderTodo;