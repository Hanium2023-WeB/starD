import {useLocation} from "react-router-dom";
import Header from "../../components/repeat_etc/Header";
import Backarrow from "../../components/repeat_etc/Backarrow";
import React from "react";
import TeamToDoList from "../../css/todo_css/TeamToDoList.css"
const TeamToDo=()=>{
    const location = useLocation();
    const members =  location.state;
    console.log("참여 멤버",members);
    return(
        <div className={"main_wrap"} id={"team-todo"}>
            <Header showSideCenter={true}/>
            <div className="TeamTodo_container" style={{width: "70%"}}>
                <h1>TeamBlog ToDo</h1>
                <div className="arrow_left">
                    <Backarrow/>
                </div>
            </div>
        </div>
      
    )
}
export default TeamToDo;