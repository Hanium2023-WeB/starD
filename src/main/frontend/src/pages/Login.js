import LogoButton from "../components/LogoButton";
import { Link } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, {useState, useRef} from "react";
import "../css/Log.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Login = ({sideheader}) => {

    const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 함수를 가져옴

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
        console.log(e.target.name); // ID
        console.log(e.target.value); // PW
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

        axios
            .post('/sign-in', {
                    username: state.ID,
                    password: state.PW
            })
            .then((res) => {
                console.log('전송 성공');
                console.log(res.data);

                // 로그인 성공 시 메인 페이지로 리다이렉트
                navigate('/'); // useNavigate를 사용하여 페이지를 이동

                // console.log(res);
                // console.log("res.data.userId :: ", res.data.username);
                // console.log("res.data.msg :: ", res.data.msg);
                //
                // if (res.data.username === undefined) {
                //     // id 일치하지 않는 경우 userId = undefined, msg = '입력하신 id 가 일치하지 않습니다.'
                //     console.log("======================", res.data.msg);
                //     alert("입력하신 id 가 일치하지 않습니다.");
                // } else if (res.data.username === null) {
                //     // id는 있지만, pw 는 다른 경우 userId = null , msg = undefined
                //     console.log(
                //         "======================",
                //         "입력하신 비밀번호 가 일치하지 않습니다."
                //     );
                //     alert("입력하신 비밀번호 가 일치하지 않습니다.");
                // } else if (res.data.username === inputID) {
                //     // id, pw 모두 일치 userId = userId1, msg = undefined
                //     console.log("======================", "로그인 성공");
                //     sessionStorage.setItem("user_id", inputID); // sessionStorage에 id를 user_id라는 key 값으로 저장
                //     sessionStorage.setItem("name", res.data.name); // sessionStorage에 id를 user_id라는 key 값으로 저장
                // }
                // // 작업 완료 되면 페이지 이동(새로고침)
                // document.location.href = "/";
            })
            .catch(error => {
                console.log('전송 실패', error);
                console.log(state.ID);

                // 로그인 실패 시 현재 페이지 다시 로드
                window.location.reload();
            });
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
                            placeholder="아이디를 입력하세요."
                            value={state.ID}
                            onChange={onChange}
                        />
                    </div>

                    <div className="subinfo">비밀번호</div>
                    <div>
                        <input
                            ref={inputPW}
                            placeholder="비밀번호를 입력하세요."
                            name={"PW"}
                            type={"password"}
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
