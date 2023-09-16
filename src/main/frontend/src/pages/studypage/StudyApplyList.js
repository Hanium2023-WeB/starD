import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import "../../css/study_css/ApplyList.css";
import Header from "../../components/repeat_etc/Header";
import Motive from "../../components/study/Motive";
const StudyApplyList = () => {
     const [applyList, setApplyList] = useState([]);
     const [MotiveToggle, setMotiveToggle]=useState(false);

    let {id} = useParams();
    console.log({id});

    useEffect(() => {
        const ApplyStudy =localStorage.getItem("ApplyStudy");
        if(ApplyStudy && ApplyStudy !== ""){
            const ParsedApplyStudy =JSON.parse(ApplyStudy);
            console.log(ParsedApplyStudy);
            setApplyList(ParsedApplyStudy);
        }
        // TODO 서버에서 지원동기 가져오기

    }, []);
    console.log("담아온ApplyStudy", applyList);
    //로컬스토리지에서 받아온 리스트에서 스터디의 아이디값과 같은 스터디의 멤버들만 보여주도록
    const filteredApplyList = applyList.filter(item => item.study.id === parseInt(id));

    console.log("나의 스터디에 신청한 사람들 조회리스트",filteredApplyList);

    const SeeMotivation=()=>{

        setMotiveToggle(true);

    }
    const onClose=()=>{
        setMotiveToggle(false);

    }
    const handleaccept=()=>{
        alert("수락하시겠습니까?");
        //TODO db에서 받아오기 setApplyList로 상태 업데이트
    }
    const handlereturn=()=>{
        alert("거절하시겠습니까?");
        //TODO db에서 받아오기 setApplyList로 상태 업데이트
    }
    return (
        <div className={"ListWrap"}>
            <Header showSideCenter={true}/>
            <div className={"applylist"}>
            <div className={"ListContent"}>
        <table className="study_apply_list">
            <th>신청자 이름</th>
            <th>지원동기 및 각오</th>
            <th>상태</th>
            {filteredApplyList.map((item, index) => (
                <tr key={index}>
                    <td>{item.member.name}</td>
                    <td>
                        <button onClick={SeeMotivation}>보기</button>
                        {MotiveToggle &&(
                            <Motive motive={item.apply_reason} onClose={onClose}/>
                        )}
                    </td>
                    <td>
                        <span><button onClick={handleaccept}>수락</button></span>
                        <span><button onClick={handlereturn}>거절</button></span>
                    </td>
                </tr>
            ))}

            {/*))}*/}
        </table>
            </div>
                <div className={"openStudy"}>
                    <button id={"open-btn"}>스터디 열기</button>
                </div>
            </div>
        </div>
    )
}
export default StudyApplyList;