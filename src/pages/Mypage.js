import React, { useState, useEffect, useRef } from "react";
//https://jsonplaceholder.typicode.com/comments

import "../css/Mypage.css";

const menu = () => {
  return (
    <div className="category">
      <div className="c_01">
        HOME
        <div class="sub_c">
          <nav>
            <ul>
              <li>개인정보 수정</li>
              <li>알림</li>
            </ul>
          </nav>
        </div>
      </div>
      <div className="c_02">
        STUDY
        <div class="sub_c">
          <nav>
            <ul>
              <li>스터디 참여 내역</li>
              <li>스터디 개설 내역</li>
              <li>스터디 신청 내역</li>
            </ul>
          </nav>
        </div>
      </div>
      <div className="c_03">
        MY
        <div class="sub_c">
          <nav>
            <ul>
              <li>내가 작성한 글</li>
              <li>내가 작성한 댓글</li>
            </ul>
          </nav>
        </div>
      </div>
      <div className="c_04">
        SCRAP
        <div class="sub_c">
          <nav>
            <ul>
              <li>스크랩한 스터디</li>
              <li>스크랩한 게시글</li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

const Mypage = ({ sideheader }) => {
  const dataId = useRef(0);
  const [state, setState] = useState([]);

  //api 사용하기
  const getData = async () => {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    ).then((res) => res.json());
    const initDate = res.slice(0, 4).map((it) => {
      return {
        author: it.email,
        content: it.body,
        last: 5,
        created_date: new Date().getTime(),
        id: dataId.current++,
      };
    });
    setState(initDate);
    // console.log(initDate);
  };

  const scrapstudy = () => {
   
    return (
  
        <div className="list">
          {state.map((d) => (
            <div className="list_detail">
              <p>{d.author}</p>
            </div>
          ))}
        </div>
    );
  };
  const scrapstory = () => {
   
    return (
  
        <div className="list_story">
          {state.map((d) => (
            <div className="story_detail">
              <p>{d.author}</p>
            </div>
          ))}
        </div>
    );
  };
  useEffect(() => {
    //페이지가 마운트 되자마자 api호출
    getData();
  }, []);
  

  return (
    <div>
      {sideheader}
      <div className="container">
        {menu()}
        <div className="main_container">
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
                <button id="more">전체보기</button>
              </div>
              <div id="detail">디테일입니다.</div>
            </div>

            <div className="todo">
              <div className="tag">
                <p>TO DO LIST</p>
                <button id="more">전체보기</button>
              </div>
              <div id="detail">디테일입니다.</div>
            </div>

          </div>
       
          <p>스크랩한 스터디</p>

          <div className="sub_container" id="scrap_study">
            {scrapstudy()}
              </div>
              <div className="scrap_button">
          <button> {"<"} </button>
          <button> {">"} </button>
          </div>

          <p>스크랩한 게시글</p>
          <div className="sub_container">
            {scrapstory()}
          </div>

        </div>
      </div>
    </div>
  );
};
export default Mypage;
