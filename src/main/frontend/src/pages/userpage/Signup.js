import LogoButton from "../../components/repeat_etc/LogoButton";
import React, { useState, useRef } from "react";
import {isEmail, isPassword} from "../../util/check.js";
import "../../css/user_css/Log.css";

const Signup = ({sideheader}) => {
  const inputID = useRef();
  const inputPW = useRef();
  const inputNicname = useRef();
  const inputphone = useRef();
  const inputemail = useRef();

  const [state, setState] = useState({
    ID:"",
    NICNAME: "",
    EMAIL: "",
    NEWPW: "",
    CHECKNEWPW: "",
    PHONE: "",
    isValidEmail: false,

  });
  const [statepw, setStatepw] = useState({
    PW: "",
    isValidPassword:false,
  });

  const onChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.name);
    console.log(e.target.value);
  };

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
   const checkValidPassword = () =>{ //일정 시간이 지난 후 유효성 검사 및 state 변경 
    let timer;
   if (timer){
     clearTimeout(timer);
   }
    timer = setTimeout(() => {
     if(!isPassword(statepw.PW)){
       setStatepw({isValidPassword:false});
     }else{
       setStatepw({isValidPassword:true});
     }
    }, 300);
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

  const handleEditpwChange = (e) => { //비밀번호 정규식 핸들러
    // event handler
    setStatepw({
      ...statepw,
      [e.target.name]: e.target.value,
    });
    checkValidPassword(); //함수 실행
    console.log(e.target.name);
    console.log(e.target.value);
  };

  const handleSubmit = () => {
    // if (state.ID.length < 3) {
    //   inputID.current.focus();
    //   return;
    // }
    if (statepw.isValidPassword === false) {
      inputPW.current.focus();
      return;
    }
    // if (state.NICNAME.length < 5) {
    //     inputNicname.current.focus();
    //     return;
    //   }
      // if (state.PHONE.length < 7) {
      //   inputphone.current.focus();
      //   return;
      // }
      if ( state.isValidEmail ===false) {
        inputemail.current.focus();
        return;
      }
  };
  return (
    <div>
      {sideheader}
     
      <div className="containers" id="sign">
        <div className="login_info">
          <p>회원가입</p>
        </div>
        <div className="input_info">
          <div className="subinfo">아이디</div>
          <div className="signup_id">
            <input
              ref={inputID}
              name={"ID"}
              value={state.ID}
              onChange={onChange}
              placeholder="아이디를 입력해주세요."
            />
             <button id="signup_nicname_btn">중복 확인</button>
          </div>

          <div className="subinfo">비밀번호</div>
          <div className="inputpw">
            <input
              ref={inputPW}
              name={"PW"}
              value={statepw.PW}
              onChange={handleEditpwChange}
              placeholder=" 8 ~ 12자 영문, 숫자 조합"
            />
             {statepw.PW !="" ? (
                statepw.isValidPassword ?(
                  <p style={{ color: "blue" }}>사용 가능한 비밀번호입니다.</p>
                ):(
                  <p style={{ color: "red" }}>유효하지 않은 비밀번호 형식입니다.</p>
                )
              ): null}
          </div>
          <div className="subinfo">닉네임</div>
          <div className="signup_nicname">
            <input
              ref={inputNicname}
              name={"NICNAME"}
              value={state.NICNAME}
              onChange={onChange}
              placeholder="닉네임을 입력해주세요."
            />
            <button id="signup_nicname_btn">중복 확인</button>
          </div>
          <div className="subinfo">전화번호</div>
          <div>
            <input
              ref={inputphone}
              name={"PHONE"}
              value={state.PHONE}
              onChange={onChange}
              placeholder="전화번호를 입력해주세요."
            />
          </div>
          <div className="subinfo">이메일</div>
          <div className="inputemail">
            <input
              ref={inputemail}
              name={"EMAIL"}
              value={state.EMAIL}
              onChange={handleEditemailChange}
              placeholder="이메일을 입력해주세요."
            />
            {state.EMAIL !="" ? (
                state.isValidEmail ?(
                  <p style={{ color: "blue" }}>사용가능한 email입니다.</p>
                ):(
                  <p style={{ color: "red" }}>유효하지 않은 email입니다.</p>
                )
              ): null}
          </div>
        </div>
        <div className="signbtn">
          <button onClick={handleSubmit}>가입하기</button>
        </div>
      </div>
      </div>
  );
};
export default Signup;
