import React, {useState} from "react";
import { Link } from "react-router-dom";
import Header from "../../components/repeat_etc/Header";
import RealEstate from "../../components/info/RealEstate";
import InputEstates from "../../css/user_css/InputEstates.css";
import EditInterest from "../../components/info/EditInterest";
const InputSubSign =()=>{

    return (
        <div>
            <Header showSideCenter={false}/>
            <div className="wrap">
            <div className="content">
                <div className="subcontent">
                    <div className="change_estates">
                        <div id="title">거주지</div>
                        <div id="checkestate">
                          <RealEstate/>
                        </div>
                        <button id="save">저장하기</button>
                    </div>
                    <div id="checkestates">
                        <EditInterest/>
                    </div>
                <div className="next_btn">
                    <Link to ={"/signup"} style={{
                        textDecoration: "none",
                        color: "inherit",
                    }}><button id="next">다음</button></Link>
                    <Link to ={"/signup"} style={{
                        textDecoration: "none",
                        color: "inherit",
                    }}><button id="next">건너뛰기</button></Link>
                </div>
            </div>
            </div>
            </div>
        </div>
    )
}
export  default InputSubSign;