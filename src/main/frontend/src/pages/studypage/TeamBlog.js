import Header from "../../components/repeat_etc/Header";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import BgImg from "../../images/blue-galaxy-wallpaper.jpg";
import Check from "../../images/unchecked.png";
import "../../css/study_css/TeamBlog.css";
import axios from "axios";
import {useParams} from "react-router-dom";

const TeamBlog = () => {

    const accessToken = localStorage.getItem('accessToken');
    const [ApplyMemberList, setApplyMemberList] = useState([]); //참여멤버
    const {id} = useParams();
    const navigate = useNavigate();
    console.log("팀 블로그 진입 : ", id);

    useEffect(() => {
        // TODO 서버에서 참여멤버 가져오기
        axios.get(`http://localhost:8080/api/v2/studies/${id}/study-member`, {
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then((res) => {
                console.log("모집완료된 참여 멤버 전송 성공 : ", res.data);

                setApplyMemberList(res.data);
            })
            .catch((error) => {
                console.error("모집완료된 참여 멤버 가져오기 실패:", error);
            });

    }, [accessToken]);
    //팀별 투두리스트 페이지로 넘어가게 하는 함수>>참여 멤버 가져오기
    const GoToTeamToDo=()=>{
        navigate(`/${id}/teamblog/TeamToDo`, {
            state: {
                ApplyMemberList: ApplyMemberList
            }
        })
    }
    return (
        <div style={{}}>
            <Header showSideCenter={true}/>
            <div className="team_blog">
                <h1 className="page_title">STUDY TEAM BLOG</h1>
                <div className="img_wrapper">
                    {/*<img src={BgImg}/>*/}
                    <div className="team_info">
                        <h2 className="study_title">[백엔드]더 쉽고 빠른 지식/정보 콘텐츠 요약 플랫폼</h2>
                        <h3 className="study_duration">2023. 09. 15 ~ 2023. 10. 14   30일간의 우주여행</h3>
                    </div>
                </div>
                <div className="gnb_bg">
                    <ul className="gnb">
                        <li>팀블로그 홈</li>
                        <li>TODO</li>
                        <li>일정</li>
                        <li>실시간 채팅</li>
                    </ul>
                </div>
                <div className="content">
                    <div className="left">
                        <div className="team_todo team">
                            <span onClick={GoToTeamToDo}><p>To Do&nbsp;&nbsp;<span>&gt;</span></p></span>
                            <div className="team_todo_content">
                                <div>
                                    <h4 className="manager">김솜솜</h4>
                                    <ul>
                                        <li>해야할 일 1</li>
                                        <li>해야할 일 2</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="manager">박솜솜</h4>
                                    <ul>
                                        <li>해야할 일 1</li>
                                        <li>해야할 일 2</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="team_schedule team">
                            <p>일정&nbsp;&nbsp;<span>&gt;</span></p>
                            <div className="team_schedule_content">
                                일정입니다
                            </div>
                        </div>
                        <div className="team_progress team">
                            <p>스터디 진행률&nbsp;&nbsp;<span>&gt;</span></p>
                            <div className="team_progress_content">
                                스터디 진행률입니다
                            </div>
                        </div>
                    </div>
                    <div className="team_chatting team">
                        <p>실시간 채팅&nbsp;&nbsp;<span>&gt;</span></p>
                        <div className="team_chatting_content">
                            <div className="chatting_title">솜솜이 채팅방</div>
                            <div className="chatting_content">
                                <div>
                                    <span className="nickname">김솜솜</span>
                                    <span className="chat">우리 오늘 할 일 정해보자</span>
                                </div>
                                <div style={{textAlign:"right"}}>
                                    <span className="chat me">ㅇㅋ 지금 어디까지 했지?</span>
                                </div>
                                <div>
                                    <span className="nickname">이솜솜</span>
                                    <span className="chat">기다려봐 내가 한번 보고 올게</span>
                                </div>
                            </div>
                            <div className="chat_input">
                                <input type="text" />
                                <button className="chat_submit_btn">전송</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default TeamBlog;