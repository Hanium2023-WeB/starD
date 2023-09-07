import React, {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import Header from "../../components/repeat_etc/Header";
import RealEstate from "../../components/info/RealEstate";
import InputEstates from "../../css/user_css/InputEstates.css";
import EditInterest from "../../components/info/EditInterest";
import axios from "axios";


const InputSubSign =()=>{
    //거주지와 관심분야 선택한 사람 관리
    //mem을 props으로 넘기면서 상태를 관리하고 이를 서버에 넘긴다.
    const navigate = useNavigate();

    const [mem, setMem] = useState(
        {city:"",district:"", tags: []});
    const onClickNextBtn =()=>{
        navigate("/subinfo/signup",{state: {
            mem
                // city:mem.city,
                // district: mem.district,
                // tags: mem.tags
            }})

        localStorage.setItem("selectedSido", mem.city);
        localStorage.setItem("selectedGugun", mem.district);
        localStorage.setItem("tags", mem.tags);
        console.log("다음으로 넘어간 데이터: ",mem);
    }
    useEffect(() => {
        console.log("member상태", mem);
    }, []);
    const onClickSkipBtn=()=>{
            //건너뛰기 버튼 눌렀을때
            //입력을 안 하겠다는 의미이므로 기존 데이터 모두 초기화
            setMem({city:"",district:"",tags:[]});
            navigate("/subinfo/signup",{state: {
                    mem
                    // city:mem.city,
                    // district: mem.district,
                    // tags: mem.tags
                }})
            localStorage.removeItem('selectedSido');
            localStorage.removeItem('selectedGugun');
            localStorage.removeItem('tags');
        }

        //Todo 회원가입 입력 거주지 and 관심분야
    useEffect(() => {
        axios.post(URL,{ mem: mem})
            .then(response =>{
            console.log(response.data);
            })
            .catch(error => {
                console.error("Error sending meetings to the backend:", error);
            });
    }, []);
    return (
        <div>
            <Header showSideCenter={false}/>
            <div className="wrap">
            <div className="content">
                <div className="subcontent">
                    <div className="change_estates" id="estates">
                        <div id="title">거주지</div>
                        <div id="checkestate">
                          <RealEstate mem = {mem}/>
                        </div>
                        {/*<button id="save">저장하기</button>*/}
                    </div>
                    <div id="checkestates">
                        <EditInterest mem = {mem}/>
                    </div>
                <div className="next_btn">
                    <button id="next" onClick={onClickNextBtn}>다음</button>
                    <Link to ={"/signup"} style={{
                        textDecoration: "none",
                        color: "inherit",
                    }}><button id="next" onClick={onClickSkipBtn}>건너뛰기</button></Link>
                </div>
            </div>
            </div>
            </div>
        </div>
    )
}
export  default InputSubSign;