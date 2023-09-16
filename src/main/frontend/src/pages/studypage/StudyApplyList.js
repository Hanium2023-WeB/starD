import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import "../../css/study_css/ApplyList.css";
import Header from "../../components/repeat_etc/Header";
import Motive from "../../components/study/Motive";
import axios from "axios";

const StudyApplyList = () => {
    const [applyList, setApplyList] = useState([]);
    const [MotiveToggle, setMotiveToggle] = useState(false);
    const [openMotivationIndex, setOpenMotivationIndex] = useState(-1); // 각 신청자에 대한 상태를 추적하는 상태 추가
    const accessToken = localStorage.getItem('accessToken');

    let {id} = useParams();

    useEffect(() => {

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

    // const SeeMotivation = () => {
    //     setMotiveToggle(true);
    // }
    //
    // const onClose = () => {
    //     setMotiveToggle(false);
    // }

    const toggleMotivation = (index) => {
        if (openMotivationIndex === index) {
            setOpenMotivationIndex(-1); // 이미 열린 모티베이션 모달이라면 닫습니다.
        } else {
            setOpenMotivationIndex(index); // 선택한 신청자의 모티베이션 모달을 엽니다.
        }
    };

    const handleaccept = (memberId) => {
        window.confirm(memberId + "을(를) 수락하시겠습니까?");

        //TODO db에서 받아오기 setApplyList로 상태 업데이트
        axios.put(`http://localhost:8080/api/v2/studies/${id}/select`, {}, {
            params: {
                applicantId : memberId,
                isSelect : true
            },
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then((res) => {
                console.log("수락 전송 성공 : ", res.data);

                if (res.data !== "SUCCESS"){
                    window.confirm(memberId + "을(를) 수락 실패했습니다.");
                    console.log("수락 실패");
                } else {
                    window.confirm(memberId + "을(를) 수락했습니다.");
                }
                window.location.reload();

            })
            .catch((error) => {
                console.error("수락 실패:", error);
            });

    }
    const handlereturn = (memberId) => {
        window.confirm(memberId + "을(를) 거절하시겠습니까?");
        //TODO db에서 받아오기 setApplyList로 상태 업데이트
        axios.put(`http://localhost:8080/api/v2/studies/${id}/select`, {}, {
            params: {
                applicantId : memberId,
                isSelect : false
            },
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then((res) => {
                console.log("거절 전송 성공 : ", res.data);

                if (res.data !== "SUCCESS"){
                    window.confirm(memberId + "을(를) 거절 실패했습니다.");
                    console.log("거절 실패");
                } else {
                    window.confirm(memberId + "을(를) 거절했습니다.");
                }

                window.location.reload();

            })
            .catch((error) => {
                console.error("거절 실패:", error);
            });

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
                                    {/*<button onClick={SeeMotivation}>보기</button>*/}
                                    {/*{MotiveToggle && (*/}
                                    {/*    <Motive motive={item.applyReason} onClose={onClose}/>*/}
                                    {/*)}*/}
                                    <button onClick={() => toggleMotivation(index)}>보기</button>
                                    {openMotivationIndex === index && (
                                        <Motive motive={item.applyReason} onClose={() => setOpenMotivationIndex(-1)} />
                                    )}
                                </td>
                                <td>
                                    <span><button onClick={() => handleaccept(item.member.id)}>수락</button></span>
                                    <span><button onClick={() => handlereturn(item.member.id)}>거절</button></span>
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