import React, {useState, useEffect, useRef} from "react";
import SearchBar from '../SearchBar';
import LogoButton from '../components/repeat_etc/LogoButton';
import {format} from "date-fns";
import cn from "classnames";
import axios from "axios";
import checkbox from "../images/check.png";
import uncheckbox from "../images/unchecked.png";
import {Link} from "react-router-dom";
import Header from "../components/repeat_etc/Header";
import LOGO from "../images/Logo.png";

const searchItems = [
    "back-end",
    "front-end",
    "cloud",
    "aws",
    "framework"
]


const Home = () => {
    const dataId = useRef(0);
    const [state, setState] = useState([]);
    const [todos, setTodos] = useState({});
    const [today, setToday] = useState(new Date());
    const [parsedTodos, setParsedTodos] = useState({});
    const [todayKey, setTodayKey] = useState("");
    const [isLogin, setIsLogin] = useState(""); // Login 여부 상태관리
    const [user, setUser] = useState(""); // 로그인 유저이름 상태관리
    const [tag, setTag] = useState([{id: 0, tagname: "백엔드"},
        {id: 1, tagname: "프론트"}, {id: 2, tagname: "파이썬"},
        {id: 3, tagname: "네트워크"}, {id: 4, tagname: "클라우드"}]);
    const [isTag, setIsTag] = useState("");

    const Year = today.getFullYear();
    const Month = today.getMonth() + 1;
    const Dates = today.getDate();
    const tags = tag;

    useEffect(() => {
        localStorage.removeItem('studies');
        localStorage.removeItem('todos');
        localStorage.removeItem('selectedSido');
        localStorage.removeItem('selectedGugun');
    }, []);

    useEffect(() => {
        // Load todos from localStorage when the component mounts
        const savedTodos = localStorage.getItem("todos");
        if (savedTodos) {
            const parsed = JSON.parse(savedTodos);
            setParsedTodos(parsed);
            console.log(parsedTodos);


            const todayKey = today.toDateString();
            setTodayKey(todayKey);

            console.log(todayKey);
            if (parsedTodos.hasOwnProperty(todayKey)) {
                const todayTodos = parsedTodos[todayKey];

                todayTodos.forEach((todo) => {
                    console.log(todo.text);
                    console.log(todo.checked);
                });
            }
        }
    }, []);

    useEffect(() => {
        // Load todos from localStorage when the component mounts
        const isLogin = localStorage.getItem("accessToken");
        const user = localStorage.getItem("isLoggedInUserId");
        //로그인 accessToken, user을 로컬스토리지에서 불러옴
        setIsLogin(isLogin);
        setUser(user);
        console.log(tags);
    }, []);

    //tag 서버 전달
    // TODO 태그 (로그인 전)
    useEffect(() => {
        axios.post("", {
            data: tag
        }).then((res) => {
            console.log("태그 전송");
            console.log(res.data);
        }).catch(error => {
            console.log('전송 실패', error);
            //태그 인기 순으로 5개 순위 매겨서 객체배열 형식으로
            // 프론트에 넘겨주시면 map을 사용해서 화면에 출력
        });


    }, []);


    const getTodoItemClassName = (checked) => {
        return checked ? "checked" : "unchecked";
    };

    const handleontag = (e) => {
        console.log(e.target.value);
        setIsTag(e.target.value);
        //해당 태그가 있는 스터디 리스트 링크로 넘어갈 수 있도록
    }
    return (
        <div className="main_wrap">
            {/*{sideheader}*/}
            <Header showSideCenter={true}/>
            <div className="subground">
                <div className="LOGO">
                    <img src={LOGO} alt="LOGO" width="80px"/>
                </div>
                <SearchBar searchItems={searchItems}/>
            </div>
            {/*로그인 했을 때 안했을 때 화면 바꾸기*/}
            {isLogin && user ?
                <div className="dashboard">
                    <div className="dashboard_detail">
                        참여하고있는 스터디 보여주기
                        <br/>
                        클릭 시 팀블로그로 넘어가도록
                    </div>
                    <div className="dashboard_todo">

                <span id="today">{`${Year}. ${Month}. ${Dates} / 오늘의 할 일`}
                    <Link to={"/ToDoList"}
                          style={{
                              textDecoration: "none",
                              color: "inherit",
                          }}> <button
                        id="todo_more">{`ToDoList Page >>`}</button></Link></span>
                        <hr/>
                        {parsedTodos.hasOwnProperty(todayKey) ? (
                            <ul id="todocontent">
                                {parsedTodos[todayKey].map((todo) => (
                                    <li key={todo.id}
                                        className={getTodoItemClassName(todo.checked)}>
                                        {todo.checked ? (
                                            <img src={checkbox} alt="checked" width="20px"/>
                                        ) : (
                                            <img src={uncheckbox} alt="unchecked" width="20px"/>
                                        )}
                                        <div id="todotext">
                                            {todo.text}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="empty_today_todo">
                                <span>할 일이 없습니다.<br/>  할 일을 입력해주세요.</span>
                            </div>
                        )}
                    </div>
                </div>
                : <div className="nouser_wrap">
                    <div className="tag_wrap">
                        <p>STAR_D의 요즘 뜨는 태그</p>
                        <div className="Tags">
                            {tags.map((item) => {
                                return (
                                    <div className={"tagname_wrap"}>
                                        <button id={"tagbtn"} value={item.tagname}
                                                onClick={handleontag}>{item.tagname}</button>
                                    </div>
                                )
                            })
                            }
                        </div>
                    </div>
                </div>
            }
        </div>

    );
};
export default Home;