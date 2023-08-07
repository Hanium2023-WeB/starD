import React, { useState } from "react";
import Category from "../components/Category";
import { ReactComponent as Arrow } from "../images/Arrow.svg";
import edit from "../css/edit.css";
import arrowdown from "../images/arrowdown.png";
import arrowup from "../images/arrowup.png";
import Signout from "../components/Signout.js";

import {isEmail, isPassword} from "../util/check.js";

const options = [
  { value: "+82", name: "대한민국" },
  { value: "+81", name: "일본" },
  { value: "+1", name: "미국,캐나다" },
  { value: "+49", name: "독일" },
  { value: "+61", name: "오스트레일리아" },
  { value: "+233", name: "가나" },
  { value: "+241", name: "가봉" },
];

const tagoptions = [
  { value: "IT기획", name: "IT기획" },
  { value: "프론트", name: "프론트" },
  { value: "백엔드", name: "백엔드" },
  { value: "클라우드", name: "클라우드" },
  { value: "IT기획", name: "IT기획" },
  { value: "프론트", name: "프론트" },
  { value: "백엔드", name: "백엔드" },
  { value: "클라우드", name: "클라우드" },
  { value: "IT기획", name: "IT기획" },
  { value: "프론트", name: "프론트" },
  { value: "백엔드", name: "백엔드" },
  { value: "클라우드", name: "클라우드" },
  { value: "IT기획", name: "IT기획" },
  { value: "프론트", name: "프론트" },
  { value: "백엔드", name: "백엔드" },
  { value: "클라우드", name: "클라우드" },
  { value: "IT기획", name: "IT기획" },
  { value: "프론트", name: "프론트" },
  { value: "백엔드", name: "백엔드" },
  { value: "클라우드", name: "클라우드" },
];


const Tagoption = (props) => {
  const [Tag, setTag] = useState("");

  const handletagChange = (e) => { ///태그 핸들러
    // event handler
    setTag({
      ...Tag,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.value);
  };
  return (
    <div className="tags">
      {props.editoptions.map((editoption) => (
        <button
          id="tag"
          name="TAG"
          onClick={handletagChange}
          value={editoption.value}
        >
          {editoption.value}
        </button>
      ))}
    </div>
  );
};

const SelectBox = (props) => { //전화번호 나라 선택 
  const handleChange = (e) => {
    // event handler
    console.log(e.target.value);
  };
  return (
    <select onChange={handleChange}>
      {props.options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          defaultValue={props.defaultValue}
        >
          <span>{option.value}  {option.name}</span>
        </option>
      ))}
    </select>
  );
};

const Editinfo = ({ sideheader }) => {
  const [state, setState] = useState({
    NICNAME: "",
    EMAIL: "",
    PW: "",
    NEWPW: "",
    CHECKNEWPW: "",
    PHONE: "",
    isValidEmail: false,
  });
  const checkValidEmail = () =>{ //일정 시간이 지난 후 유효성 검사 및 state 변경 
     let timer;
    if (timer){
      clearTimeout(timer);
    }
     timer = setTimeout(() => {
      if(!isEmail(state.EMAIL)){
        setState({isValidEmail:false});
      }else{
        setState({isValidEmail:true});
      }
     }, 300);
  };
  

  const handleEditChange = (e) => { //핸들러 나누기
    // event handler
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.name);
    console.log(e.target.value);
  };
  const handleEditemailChange = (e) => { //이메일 정규식 핸들러
    // event handler
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
    checkValidEmail(); //함수 실행
    console.log(e.target.name);
    console.log(e.target.value);
  };

  return (
    <div>
      {sideheader}
      <div className="backarrow">
        <Arrow />
        <p>개인정보 수정</p>
      </div>
      <div className="container">
        <Category />
        <div className="main_container" id="edit_main">
          <div className="sub_container">
            <div className="change_nicname">
              <div id="title">닉네임</div>
              <div id="checkname"> 
              <input
                id="content"
                name={"NICNAME"}
                value={state.NICNAME}
                onChange={handleEditChange}
                placeholder="닉네임을 입력하세요."
              />
              <button id="check_double_nicname">증복확인</button>
              </div>

        
              <button id="save">저장하기</button>
            </div>
          </div>
          <div className="sub_container" id="c_email">
            <div className="change_email">
              <div id="title">
                이메일<span id="sub_title">(이메일 변경 후 재인증 필요)</span>
              </div>
              <input
                id="content"
                name={"EMAIL"}
                value={state.EMAIL}
                onChange={handleEditemailChange}
                placeholder="이메일을 입력하세요."
              />
              {state.EMAIL !="" ? (
                state.isValidEmail ?(
                  <p style={{ color: "blue" }}>사용가능한 email입니다.</p>
                ):(
                  <p style={{ color: "red" }}>유효하지 않은 email입니다.</p>
                )
              ): null}
              <button id="save">저장하기</button>
            </div>
          </div>
          <div className="sub_container" id="interested">
            <div className="change_interest">
              <div id="title">
                관심분야<span id="sub_title">(최대 3개까지 선택 가능)</span>
              </div>
              <Tagoption editoptions={tagoptions} value="" />

              <button id="save">저장하기</button>
            </div>
          </div>
          <div className="sub_container" id="password">
            <div className="change_pw">
              <div id="title">
                비밀번호
                {/* <span id="sub_title">(현재 비밀번호를 입력해주세요)</span> */}
              </div>
              <input
                id="content"
                name={"PW"}
                value={state.PW}
                onChange={handleEditChange}
                placeholder="현재 비밀번호를 입력하세요."
              ></input>
              <input
                id="content"
                name={"NEWPW"}
                value={state.NEWPW}
                onChange={handleEditChange}
                placeholder="새로운 비밀번호를 입력하세요."
              ></input>
              <input
                id="content"
                name={"CHECKNEWPW"}
                value={state.CHECKNEWPW}
                onChange={handleEditChange}
                placeholder="비밀번호 확인"
              ></input>
              <button id="save">저장하기</button>
            </div>
          </div>
          <div className="sub_container" id="phone_number">
            <div className="change_phone">
              <div id="title">
                전화번호
                <span id="sub_title">(-없이 전화번호만 입력)</span>
              </div>
           
              <input
                id="content"
                name={"PHONE"}
                value={state.PHONE}
                onChange={handleEditChange}
                placeholder="전화번호를 입력해주세요."
              ></input>
              <div className="select_country">
                <SelectBox options={options} defaultValue="       " />
              </div>

              <button id="save">저장하기</button>
            </div>
          </div>
          <Signout/>
        </div>
      </div>
    </div>
  );
};
export default Editinfo;
