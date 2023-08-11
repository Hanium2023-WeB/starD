import LogoButton from "../components/LogoButton";
import React, { useState, useRef } from "react";
import { isEmail, isPassword } from "../util/check";
import "../css/Log.css";

import axios from "axios";

const Signup = ({sideheader}) => {
  const inputID = useRef();
  const inputPW = useRef();
  const inputName = useRef();
  const inputNicname = useRef();
  const inputphone = useRef();
  const inputemail = useRef();

///변수명 변경
  const [state, setState] = useState({
    id: "",
    password: "",
    name: "",
    nickname:"",
    phone : "",
    email:"",
    isValidEmail: false,
    isValidPassword: false,
  });

  const [isIdDuplicate, setIsIdDuplicate] = useState(true); // id 중복 여부 상태 변수
  const [isNicknameDuplicate, setIsNicknameDuplicate] = useState(true); // nickname 중복 여부 상태 변수

  const onChange = (e) => {
      setState({
        ...state,
        [e.target.name]: e.target.value,
      });
      console.log(e.target.name);
      console.log(e.target.value);
    };

  // 이메일 핸들러
  const handleEditemailChange = (e) => {
      const Email = e.target.value;

      setState((prevState) => ({
        ...prevState,
        email: Email,
        isValidEmail: isEmail(Email), // 이메일 유효성 검사
      }));
  };

  // 비밀번호 핸들러
  const handleEditPasswordChange = (e) => {
      const PW = e.target.value;

      setState((prevState) => ({
        ...prevState,
        password: PW,
        isValidPassword: isPassword(PW), // 비밀번호 유효성 검사
      }));
   };

  const handleSubmit = async (e) => {
    e.preventDefault(); // 폼 기본 제출 이벤트 방지

    console.log("handleSubmit 함수 호출");
    console.log("isIdDuplicate 상태:", isIdDuplicate);
    console.log("isNicknameDuplicate 상태:", isNicknameDuplicate);

    // 입력 값 유효성 검사
    if (
          state.id.length < 1 &&
          state.password.length < 1 &&
          state.name.length < 1 &&
          state.nickname.length < 1 &&
          state.phone.length < 1 &&
          state.email.length < 1
        ) {

        alert("회원 정보를 입력해 주세요.");
        return;
    }

    if (state.id.length < 3) {
      inputID.current.focus();
      alert("아이디는 3자 이상이어야 합니다.");
      return;
    }

    if (state.password.length < 5) {
      inputPW.current.focus();
      alert("비밀번호는 8자 이상이어야 합니다.");
      return;
    }

    if (state.name.length < 2) {
      inputName.current.focus();
      alert("이름은 2자 이상이어야 합니다.");
      return;
    }

    if (state.nickname.length < 2) {
      inputNicname.current.focus();
      alert("닉네임은 2자 이상이어야 합니다.");
      return;
    }

    if (state.phone.length < 7) {
      inputphone.current.focus();
      alert("전화번호는 7자 이상이어야 합니다.");
      return;
    }

    if (state.email.length < 1) {
      inputemail.current.focus();
      alert("이메일을 입력해 주세요.");
      return;
    }


    // 비밀번호 정규식 검증
    if (!isPassword(state.password)) {
      inputPW.current.focus();
      alert("비밀번호는 8 ~ 15자 영문, 숫자, 특수문자 조합이어야 합니다.");
      return;
    }

    // 이메일 정규식 검증
    if (!isEmail(state.email)) {
      inputemail.current.focus();
      alert("유효한 이메일 주소를 입력해 주세요.");
      return;
    }

    // id 중복 확인을 안 한 경우, 중복인 경우 가입 처리하지 않음
    if (isIdDuplicate) {
      alert("아이디 중복 확인을 해주세요.");
      return;
    }

    // 닉네임 중복 확인을 안 한 경우, 중복인 경우 가입 처리하지 않음
    if (isNicknameDuplicate) {
      alert("닉네임 중복 확인을 해주세요.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/signup", {
        id: state.id,
        password: state.password,
        name: state.name,
        nickname: state.nickname,
        phone: state.phone,
        email: state.email,
      });

      if (response.status === 200) {
        console.log("회원가입 성공");
        window.location.href = "/";
      } else {
        console.error("회원가입 실패");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // 중복 아이디 검증
  const handleCheckDuplicateID = async () => {
    // 입력한 아이디 가져오기
    const id = state.id; // state에서 아이디 값을 가져오기

    // 입력 값이 없는 경우 요청을 보내지 않음
    if (!id) {
      alert("아이디를 입력해 주세요.");
      return;
    }

    try {
      // 서버에 아이디 중복 검증 요청 보내기
      const response = await axios.get("http://localhost:8080/checkDuplicateID", {
        params: { id: id },
      });

    // 서버로부터 받은 응답 확인
      const isDuplicate = response.data.duplicate;

      console.log("handleCheckDuplicateID 함수 호출");
      console.log("isDuplicate 상태:", isDuplicate);

      setIsIdDuplicate(isDuplicate);

      if (isDuplicate) {
        alert("이미 존재하는 아이디입니다.");
      } else {
        alert("사용 가능한 아이디입니다.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // 중복 닉네임 검증
  const handleCheckDuplicateNickname = async () => {
    // 입력한 닉네임 가져오기
    const nickname = state.nickname;

    // 입력 값이 없는 경우 요청을 보내지 않음
    if (!nickname) {
      alert("닉네임을 입력해 주세요.");
      return;
    }

    try {
      // 서버에 닉네임 중복 검증 요청 보내기
      const response = await axios.get("http://localhost:8080/checkDuplicateNickname", {
        params: { nickname: nickname },
      });

      // 서버로부터 받은 응답 확인
      const isDuplicate = response.data.duplicate;

      console.log("handleCheckDuplicateNickname 함수 호출");
      console.log("isDuplicate 상태:", isDuplicate);

      setIsNicknameDuplicate(isDuplicate);

      if (isDuplicate) {
        alert("이미 존재하는 닉네임입니다.");
      } else {
        alert("사용 가능한 닉네임입니다.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
      <div>
          {sideheader}

        <div className="containers" id="sign">
          <div className="login_info">
            <p>회원가입</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="input_info">
              <div className="subinfo">아이디</div>
              <div className="signup_id">
                <input
                  ref={inputID}
                  name={"id"} // Member 클래스의 필드 이름과 일치해야 함
                  value={state.id} // state에서 사용하는 이름도 Member 클래스의 필드 이름과 일치해야 함
                  onChange={onChange}
                  placeholder="아이디를 입력해주세요."
                />
                <button id="signup_nicname_btn" type="button" onClick={handleCheckDuplicateID}>
                    중복확인
                </button>
              </div>

              <div className="subinfo">비밀번호</div>
              <div className="inputpw">
                <input
                  ref={inputPW}
                  name={"password"}
                  type={"password"}
                  value={state.password}
                  onChange={handleEditPasswordChange}   // 비밀번호 핸들러 실행
                  placeholder="8 ~ 15자 영문, 숫자, 특수문자 조합"
                />
                {state.password !== "" ? (
                  state.isValidPassword ? (
                    <p style={{ color: "blue" }}>유효한 비밀번호입니다.</p>
                  ) : (
                    <p style={{ color: "red" }}>비밀번호는 8 ~ 15자 영문, 숫자, 특수문자 조합이어야 합니다.</p>
                  )
                ) : null}
              </div>

              {/* 이름 추가 */}
              <div className="subinfo">이름</div>
              <div>
                <input
                  ref={inputName}
                  name={"name"}
                  value={state.name}
                  onChange={onChange}
                  placeholder="이름을 입력해주세요."
                 />
              </div>

              <div className="subinfo">닉네임</div>
              <div className="signup_nicname">
                <input
                  ref={inputNicname}
                  name={"nickname"}
                  value={state.nickname}
                  onChange={onChange}
                  placeholder="닉네임을 입력해주세요."
                />
                 <button id="signup_nicname_btn" type="button" onClick={handleCheckDuplicateNickname}>
                    중복 확인
                </button>
              </div>

              <div className="subinfo">전화번호</div>
              <div>
                <input
                  ref={inputphone}
                  name={"phone"}
                  value={state.phone}
                  onChange={onChange}
                  placeholder="전화번호를 입력해주세요."
                />
              </div>

              <div className="subinfo">이메일</div>
              <div className="inputemail">
                <input
                  ref={inputemail}
                  name={"email"}
                  value={state.email}
                  onChange={handleEditemailChange}  // 이메일 핸들러 실행
                  placeholder="이메일을 입력해주세요."
                />
                {state.email !== "" ? (
                  state.isValidEmail ? (
                    <p style={{ color: "blue" }}>사용 가능한 email입니다.</p>
                  ) : (
                    <p style={{ color: "red" }}>유효하지 않은 email입니다.</p>
                  )
                ) : null}
              </div>
            </div>
            <div className="signbtn">
              <button type="submit">가입하기</button>
            </div>
          </form>
        </div>
      </div>
    );
  };
export default Signup;