import LogoButton from "../../components/repeat_etc/LogoButton";
import React, { useState, useRef } from "react";
import "../../css/user_css/Log.css";

const Login = ({sideheader}) => {
  
  const inputID = useRef();
  const inputPW = useRef();

  const [state, setState] = useState({
    ID: "",
    PW: "",
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
  };
  return (
    <div>
 
      {/* <LogoButton /> */}
      {/* <div className ="Logo"> STAR D </div> */}
      {sideheader}
      <div className="containers" id="log">
      <div className="login_info">
          <p>로그인</p>
        </div>
      <div className="input_info">
          <div className="subinfo">아이디</div>
          <div>
            <input
              ref={inputID}
              name={"ID"}
              value={state.ID}
              onChange={onChange}
              placeholder="아이디를 입력해주세요"
            />
          </div>

          <div className="subinfo">비밀번호</div>
          <div>
            <input
              ref={inputPW}
              name={"PW"}
              value={state.PW}
              onChange={onChange}
              placeholder="비밀번호를 입력해주세요"
            />
          </div>
        <div className="loginbtn">
          <button onClick={handleSubmit}>로그인</button>
        </div>
      </div>
      </div>
      </div>
  
  );
};
export default Login;
