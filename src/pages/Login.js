import LogoButton from "../components/LogoButton";
import React, { useState, useRef } from "react";
import "../Log.css";

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
      <div className="containers">
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
        <div className="loginbtn">
          <button onClick={handleSubmit}>로그인</button>
        </div>
      </div>
      </div>
      </div>
  
  );
};
export default Login;
