import LogoButton from "../components/LogoButton";
import React, { useState, useRef } from "react";
import axios from "axios";
import { getCsrfTokenFromCookie } from "../csrfUtils";

import "../css/Log.css";

const Signup = () => {
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
    email:""

  });

  const [isIdDuplicate, setIsIdDuplicate] = useState(true); // 중복 여부 상태 변수

  const onChange = (e) => {
      setState({
        ...state,
        [e.target.name]: e.target.value
      });
    };


  const handleSubmit = async (e) => {
    e.preventDefault(); // 폼 기본 제출 이벤트 방지

    console.log("handleSubmit 함수 호출");
    console.log("isIdDuplicate 상태:", isIdDuplicate);

    // 입력 값 유효성 검사
    if (
          state.id.length < 3 &&
          state.password.length < 5 &&
          state.name.length < 3 &&
          state.nickname.length < 2 &&
          state.phone.length < 7 &&
          state.email.length < 5
        ) {

        alert("회원 정보를 입력해 주세요.");
        return;
    }

    if (state.id.length < 3) {
      alert("아이디는 3자 이상이어야 합니다.");
      return;
    }

    if (state.password.length < 5) {
      alert("비밀번호는 5자 이상이어야 합니다.");
      return;
    }

    if (state.name.length < 3) {
      alert("이름은 3자 이상이어야 합니다.");
      return;
    }

    if (state.nickname.length < 2) {
      alert("닉네임은 2자 이상이어야 합니다.");
      return;
    }

    if (state.phone.length < 7) {
      alert("전화번호는 7자 이상이어야 합니다.");
      return;
    }

    if (state.email.length < 5) {
      alert("이메일은 5자 이상이어야 합니다.");
      return;
    }

    // 중복 확인을 안 한 경우, 가입 처리하지 않음
    if (isIdDuplicate) {
      alert("중복 확인을 해주세요.");
      return;
    }

    try {
      const csrfToken = getCsrfTokenFromCookie();

      const response = await axios.post("http://localhost:8080/signup", null, {
        params: {
          id: state.id,
          password: state.password,
          name: state.name,
          nickname: state.nickname,
          phone: state.phone,
          email: state.email,
        },
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": csrfToken,
        },
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
        params: { id: id }, // 쿼리 매개변수로 아이디를 전달
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

  return (
      <div>
        <LogoButton />
        <div className="containers">
          <div className="login_info">
            <p>회원가입</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="input_info">
              <div className="subinfo">아이디</div>
              <div>
                <input
                  ref={inputID}
                  name={"id"} // Member 클래스의 필드 이름과 일치해야 함
                  value={state.id} // state에서 사용하는 이름도 Member 클래스의 필드 이름과 일치해야 함
                  onChange={onChange}
                />
                <button type="button" onClick={handleCheckDuplicateID}>
                    중복확인
                </button>
              </div>

              <div className="subinfo">비밀번호</div>
              <div>
                <input
                  ref={inputPW}
                  name={"password"}
                  value={state.password}
                  onChange={onChange}
                />
              </div>

              {/* 이름 추가 */}
              <div className="subinfo">이름</div>
              <div>
                <input
                  ref={inputName}
                  name={"name"}
                  value={state.name}
                  onChange={onChange}
                 />
              </div>

              <div className="subinfo">닉네임</div>
              <div>
                <input
                  ref={inputNicname}
                  name={"nickname"}
                  value={state.nickname}
                  onChange={onChange}
                />
              </div>

              <div className="subinfo">전화번호</div>
              <div>
                <input
                  ref={inputphone}
                  name={"phone"}
                  value={state.phone}
                  onChange={onChange}
                />
              </div>
              <div className="subinfo">이메일</div>
              <div>
                <input
                  ref={inputemail}
                  name={"email"}
                  value={state.email}
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="loginbtn">
              <button type="submit">가입하기</button>
            </div>
          </form>
        </div>
      </div>
    );
  };
export default Signup;