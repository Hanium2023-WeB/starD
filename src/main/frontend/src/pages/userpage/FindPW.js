import Header from "../../components/repeat_etc/Header";
import React, {useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";


/*
2023-10-30 by jiruen 수정 중
 */

const FindID = () => {

    const [state, setState] = useState({
            Email: "",
            phone: "",
        }
    );

    const [findId, setFindId] = useState();
    const inputemail = useRef();
    const inputphone = useRef();

    const navigate = useNavigate();
    const handleEditChange = (e) => { //핸들러 나누기
        // event handler
        setState({
            ...state,
            [e.target.name]: e.target.value.toString(),
        });
    };

    const receiveCertificate = () => {

        if (state.phone.length < 7) {
            inputphone.current.focus();
            alert("전화번호는 7자 이상이어야 합니다.");
            return;
        }
        try {
            axios.get("http://localhost:8080/member/find-id", {
                params: {
                    "email": state.Email,
                    "phone": state.phone,
                }
            }).then((response) => {

                console.log("인증번호 받기 성공: ", response.data);
                setFindId(response.data.id);

                navigate("/login/findedID", {
                    state: {
                        findId: response.data.id
                    }
                })

            }).catch((error) => {
                console.log("인증번호 받기 실패", error);
            })

        } catch (error) {
            console.error("Error:", error);
        }
    }


    return (
        <div>
            <Header showSideCenter={false}/>
            <div className={"page_title"}>
                <p id={"find-id"}>비밀번호 찾기</p>
            </div>
            <div className="findwrap">
                <div className={"container_findwrap"}>
                    <div className="container_find" id="logs">
                        <div className="input_infos">
                            <div className="subinfos">이메일</div>
                            <div className="subinfos2">
                                <input
                                    ref={inputemail}
                                    name={"Email"}
                                    placeholder="이메일을 입력해주세요"
                                    value={state.Email}
                                    onChange={handleEditChange}
                                />
                                <div className={"Certification_Number1"}><button>전송</button></div>
                            </div>
                        </div>
                    </div>
                    <div className="container_find" id="phone">
                        <div className="input_phone">
                            <div className="subinfos">
                                인증번호
                            </div>
                            <div className={"inputform"}>
                                <input
                                    ref={inputphone}
                                    id="phonecontent"
                                    name={"phone"}
                                    value={state.phone}
                                    onChange={handleEditChange}
                                    placeholder={"인증번호를 입력해주세요."}
                                ></input>
                            </div>
                            <div className={"Certification_Number"}>
                                <button onClick={receiveCertificate}>비밀번호 찾기</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};
export default FindID;