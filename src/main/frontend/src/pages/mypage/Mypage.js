import React, { useState, useEffect, useRef } from "react";
import { Link,useNavigate } from "react-router-dom";
import App from "../../App.js";
import Slide from "../../components/study/Slide.js";
import Category from "../../components/repeat_etc/Category.js";
import ToDoList from "../../pages/mypage/ToDoList.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "../../css/study_css/MyParticipateStudy.css";
import "../../css/mypage_css/Mypage_Scrap.css";
import { format } from "date-fns";
import cn from "classnames";
import checkbox from "../../images/check.png";
import uncheckbox from "../../images/unchecked.png";
import Schedule from "../mypage/Schedule.js";
import Header from "../../components/repeat_etc/Header";

//https://jsonplaceholder.typicode.com/comments

import "../../css/mypage_css/Mypage.css";
import Footer from "../../components/repeat_etc/Footer";
import axios from "axios";

const Mypage = ({ sideheader }) => {
  const dataId = useRef(0);
  const [state, setState] = useState([]);
  const [todos, setTodos] = useState({});
  const [today, setToday] = useState(new Date());
  const [parsedTodos, setParsedTodos] = useState({});
  const [parsedmeetings, setParsedMeetings] = useState({});
  const [meetings, setMeetings] = useState({});
  const [todayKey, setTodayKey] = useState("");
  const navigate = useNavigate();

  const [scrapedPosts, setScrapedPosts] = useState([]); //스크랩한 게시물을 보유할 상태 변수

  const Year = today.getFullYear();
  const Month = today.getMonth() + 1;
  const Dates = today.getDate()


  //todo
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

  //Schedule
  useEffect(() => {
    // Load todos from localStorage when the component mounts
    const todayKey = today.toDateString();
    setTodayKey(todayKey);

    const storedMeetings = localStorage.getItem("schedule");
    if (storedMeetings) {
      const parsed = JSON.parse(storedMeetings);
      setParsedMeetings(parsed);
      console.log("parsedsssss:", parsedmeetings[todayKey]);

      if (parsedmeetings.hasOwnProperty(todayKey)) {
        const todaySchedule = parsedmeetings[todayKey];

        // Extract study values from todaySchedule object
        const studyValues = Object.keys(todaySchedule);
        console.log("ScrapStudySlide Values:", studyValues);

        for (const studyKey in todaySchedule) {
          console.log(`Study: ${studyKey}`);
          todaySchedule[studyKey].forEach((meeting) => {
            console.log(`  id: ${meeting.id}, title: ${meeting.title}`);
          });
        }
      }
    }
  }, []);

  const getTodoItemClassName = (checked) => {
    return checked ? "checked" : "unchecked";
  };

  //스크랩 커뮤니티
  useEffect(() => {
    // API 또는 데이터 원본에서 스크랩한 게시물을 가져옵니다.
    const response = axios.post('')
        .then((res) => {
          console.log("전송 성공");
          console.log(res.data);
        })
        .then((data) => {
          // 가져온 데이터로 스크랩한 게시물 상태 변수를 업데이트합니다.
          setScrapedPosts(data);
        }).catch((error) => {
          console.error('스크랩한 게시물을 가져오는 중 오류 발생: ', error);
        });
  }, []);

  //api 사용하기
  // const getData = async () => {
  //   const res = await fetch(
  //     "https://jsonplaceholder.typicode.com/comments"
  //   ).then((res) => res.json());
  //
  //   const initDate = res.slice(0, 10).map((it) => {
  //     return {
  //       tag: it.email,
  //       author: it.email,
  //       day: it.postId,
  //       title: it.name,
  //       last: 5,
  //       created_date: new Date().getTime(),
  //       id: dataId.current++,
  //     };
  //   });
  //   setState(initDate);
  //   console.log(initDate);
  // };

  const scrapstory = () => {
    return (
        <>
        {(scrapedPosts.length === 0) && <p className="no_scrap">스크랩한 게시글이 없습니다.</p>}
          {(scrapedPosts.length !== 0) &&
            <table className="post_table">
              <th>카테고리</th>
              <th>제목</th>
              <th>닉네임</th>
              <th>날짜</th>
              <th>조회수</th>
              <th>공감수</th>
              <th>스크랩수</th>
              {scrapedPosts.map((post) => (
                  <tr className="post_list">
                    {/*<td className="community_category">{posts.category}</td>*/}
                    {/*<Link to={`/postdetail/${posts.id}`}*/}
                    {/*      style={{*/}
                    {/*        textDecoration: "none",*/}
                    {/*        color: "inherit",*/}
                    {/*      }}>*/}
                    {/*  <td className="community_title">{posts.title}</td>*/}
                    {/*</Link>*/}
                    {/*<td className="community_nickname">{posts.member.nickname}</td>*/}
                    {/*<td className="community_datetime">{formatDatetime(posts.createdAt)}</td>*/}
                    {/*<td>{posts.viewCount}</td>*/}
                    {/*<td>{posts.starCount}</td>*/}
                    {/*<td>{posts.scrapCount}</td>*/}
                  </tr>
              ))}
            </table>
          }
        </>
    );
  };

  const ShowAllToDo=()=>{
    navigate("/ToDoList", {
      state:{
        openStudy:state
      }
    })
  }

  return (
    <div>
     <Header showSideCenter={true}/>

      <div className="container">
        <Category />
        <div className="main_container">
          <p id={"main-container-title"}>마이페이지</p>
          <div className="sub_container">
            <div className="reliability">
              <div className="tag">
                <p>개인 신뢰도</p>
                <button id="more">전체보기</button>
              </div>
              <div id="detail">디테일입니다.</div>
            </div>

            <div className="schedule">
              <div className="tag">
                <p>일정</p>
                <Link
                  to={"/MyPage/Schedule"}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  <button id="more">전체보기</button>
                </Link>
              </div>
              <div id="detail">
                <span id="today">{`${Year}. ${Month}. ${Dates}`}</span>
                <hr />
                {parsedmeetings.hasOwnProperty(todayKey) ? (
                  <ul id="todocontent">
                    {Object.entries(parsedmeetings[todayKey]).map(
                      ([studyName, meetings]) => (
                        <li key={studyName}>
                          <div className="study-info">
                            <p className="study-name">{studyName}</p>
                            <ul className="meetings-list">
                              {meetings.map((meet) => (
                                <li key={meet.id}>
                                  <div className="meeting-info">
                                    <p className="meeting-id">{`ID: ${meet.id}`}</p>
                                    <p className="meeting-title">{`Title: ${meet.title}`}</p>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </li>
                      )
                    )}
                  </ul>
                ) : (
                  <div className="empty_today_todo">
                    <span>일정이 없습니다. 일정을 입력해주세요.</span>
                  </div>
                )}
              </div>
            </div>

            <div className="todo">
              <div className="tag">
                <p>TO DO LIST</p>
                <Link
                  to={"/ToDoList"}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  <button id="more" onClick={ShowAllToDo}>전체보기</button>
                </Link>
              </div>
              <div id="detail">
                <span id="today">{`${Year}. ${Month}. ${Dates}`}</span>
                <hr />
                {parsedTodos.hasOwnProperty(todayKey) ? (
                  <ul id="todocontent">
                    {parsedTodos[todayKey].map((todo) => (
                      <li
                        key={todo.id}
                        className={getTodoItemClassName(todo.checked)}
                      >
                        {todo.checked ? (
                          <img src={checkbox} alt="checked" width="20px" />
                        ) : (
                          <img src={uncheckbox} alt="unchecked" width="20px" />
                        )}
                        <div id="todotext">{todo.text}</div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="empty_today_todo">
                    <span>
                      할 일이 없습니다.
                      <br /> 할 일을 입력해주세요.
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <p>스크랩한 스터디</p>
          <Slide state={state} />
          <p>스크랩한 게시글</p>
          <div className="sub_container">
            {scrapstory()}
            {/* <Scrap/> */}
          </div>
        </div>
      </div>
    </div>

  );
};
export default Mypage;
