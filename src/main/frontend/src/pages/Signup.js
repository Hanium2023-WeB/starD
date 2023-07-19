import LogoButton from "../components/LogoButton";
import React, { useState, useRef } from "react";

import "../Log.css";

const Signup = () => {
  const inputID = useRef();
  const inputPW = useRef();
  const inputNicname = useRef();
  const inputphone = useRef();
  const inputemail = useRef();

  const [state, setState] = useState({
    ID: "",
    PW: "",
    NICNAME:"",
    PHONE : "",
    EMAIL:""

  });
  const onChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.name);
    console.log(e.target.value);
  };

  const handleSubmit = () => {
    if (state.ID.length < 3) {
      inputID.current.focus();
      return;
    }
    if (state.PW.length < 5) {
      inputPW.current.focus();
      return;
    }
    if (state.NICNAME.length < 5) {
        inputNicname.current.focus();
        return;
      }
      if (state.PHONE.length < 7) {
        inputphone.current.focus();
        return;
      }
      if (state.EMAIL.length < 5) {
        inputemail.current.focus();
        return;
      }
  };
  return (
    <div>
      <LogoButton />
      <div className="containers">
        <div className="login_info">
          <p>회원가입</p>
        </div>
        <div className="input_info">
          <div className="subinfo">아이디</div>
          <div>
            <input
              ref={inputID}
              name={"ID"}
              value={state.ID}
              onChange={onChange}
            />
          </div>

          <div className="subinfo">비밀번호</div>
          <div>
            <input
              ref={inputPW}
              name={"PW"}
              value={state.PW}
              onChange={onChange}
            />
          </div>
          <div className="subinfo">닉네임</div>
          <div>
            <input
              ref={inputNicname}
              name={"NICNAME"}
              value={state.NICNAME}
              onChange={onChange}
            />
          </div>
          <div className="subinfo">전화번호</div>
          <div>
            <input
              ref={inputphone}
              name={"PHONE"}
              value={state.PHONE}
              onChange={onChange}
            />
          </div>
          <div className="subinfo">이메일</div>
          <div>
            <input
              ref={inputemail}
              name={"EMAIL"}
              value={state.EMAIL}
              onChange={onChange}
            />
          </div>
        </div>
        <div className="loginbtn">
          <button onClick={handleSubmit}>가입하기</button>
        </div>
      </div>
    </div>
  );
};
export default Signup;
