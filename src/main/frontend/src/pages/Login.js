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

        console.log(state.ID, state.PW);

        axios
            .post("http://localhost:8080/login", {
                username: state.ID,
                password: state.PW
            }, {params: {
                    username: state.ID,
                    password: state.PW},
                withCredentials: true
            })
            .then((res) => {
                console.log('전송 성공');
                console.log(res.data);

                // 로그인 성공 시 메인 페이지로 리다이렉트
                navigate('/'); // useNavigate를 사용하여 페이지를 이동

            })
            .catch(error => {
                console.log('전송 실패', error);
                // 로그인 실패 시 현재 페이지 다시 로드
                // window.location.reload();
                alert("입력값을 확인해주세요. \n 로그인 실패");
            });
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
                            placeholder="아이디를 입력해주세요"
                            value={state.ID}
                            onChange={onChange}
                        />
                    </div>

                    <div className="subinfo">비밀번호</div>
                    <div>
                        <input
                            ref={inputPW}
                            placeholder="비밀번호를 입력해주세요"
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
