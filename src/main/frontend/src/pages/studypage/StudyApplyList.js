import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import "../../css/study_css/ApplyList.css";
import Header from "../../components/repeat_etc/Header";
import Motive from "../../components/study/Motive";
import axios from "axios";

const StudyApplyList = () => {
    const [applyList, setApplyList] = useState([]);
    const [MotiveToggle, setMotiveToggle] = useState(false);
    const accessToken = localStorage.getItem('accessToken');
    const [MotiveToggleIndex, setMotiveToggleIndex] = useState(null);

    let {id} = useParams();

    useEffect(() => {
        // const ApplyStudy = localStorage.getItem("ApplyStudy");
        // if (ApplyStudy && ApplyStudy !== "") {
        //     const ParsedApplyStudy = JSON.parse(ApplyStudy);
        //     console.log(ParsedApplyStudy);
        //     setApplyList(ParsedApplyStudy);
        // }

        // TODO 서버에서 지원동기 가져오기
        axios.get(`http://localhost:8080/api/v2/studies/${id}/select`, {
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then((res) => {
                console.log("신청자 리스트 전송 성공 : ", res.data.data);
                setApplyList(res.data.data);

            })
            .catch((error) => {
                console.error("신청자 데이터 가져오기 실패:", error);
            });

    }, []);

    // console.log("담아온ApplyStudy", applyList);
    // //로컬스토리지에서 받아온 리스트에서 스터디의 아이디값과 같은 스터디의 멤버들만 보여주도록
    // const filteredApplyList = applyList.filter(item => item.study.id === parseInt(id));
    // console.log("나의 스터디에 신청한 사람들 조회리스트", filteredApplyList);

    const SeeMotivation = (index) => {
        setMotiveToggle(true);
        setMotiveToggleIndex(index);

    }
    const onClose = () => {
        setMotiveToggle(false);
        setMotiveToggleIndex(null);

    }
    const handleaccept = () => {
        alert("수락하시겠습니까?");
        //TODO db에서 받아오기 setApplyList로 상태 업데이트
    }
    const handlereturn = () => {
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
                        {applyList.map((item, index) => (
                            <tr key={index}>
                                <td>{item.member.nickname}</td>
                                <td>
                                    <button onClick={()=>SeeMotivation(index)}>보기</button>
                                    {MotiveToggle && MotiveToggleIndex === index &&(
                                        <Motive motive={item.applyReason} onClose={onClose}/>
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
            </div>
        </div>
    )
}
export default StudyApplyList;