import Header from "../../components/repeat_etc/Header";
import React, {useEffect, useState} from "react";
import BgImg from "../../images/blue-galaxy-wallpaper.jpg";
import Check from "../../images/unchecked.png";
import "../../css/study_css/TeamBlog.css";
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import TeamBlogcss from  "../../css/study_css/TeamBlog.css";
import {useLocation} from "react-router-dom";
import TeamToDoList from "../../components/teamtodo/TeamToDoList";
import MapNaverDefault from "../../components/map/MapNaverDefault";
const TeamBlog = () => {
    const accessToken = localStorage.getItem('accessToken');
    const study = useLocation();
    const {studyId} = study.state;
    console.log("받아온 Study",study);

    if (studyId !== undefined) {
        console.log("Study ID:", studyId);
    } else {
        console.log("Study ID is undefined.");
    }

    const id = parseFloat(studyId);
    const [Member,setMember]= useState([]);
    const [studyItem, setStudyItem] = useState([]);

    //TODO 참여멤버 리스트 가지고오기
    useEffect(() => {
        axios.get(`http://localhost:8080/api/v2/studies/${id}/study-member`, {
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then((res) => {
                console.log("참여멤버 get 성공 : ", res.data);

                const studymemberList = res.data;

                setMember(studymemberList.data);

            })
            .catch((error) => {
                console.error("참여멤버 get 실패:", error);
            });

        // 스터디 id로 스터디 객체 가져오기
        axios.get(`http://localhost:8080/api/v2/studies/${id}`, {
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }).then((res) => {
            setStudyItem(res.data);
        })
            .catch((error) => {
                console.error("스터디 세부 데이터 가져오기 실패:", error);
            });
        
    }, [accessToken]);

    return (
        <div style={{}}>
            <Header showSideCenter={true}/>
            <div className="team_blog">
                <h1 className="page_title">STUDY TEAM BLOG</h1>
                <div className="img_wrapper">
                    {/*<img src={BgImg}/>*/}
                    <div className="team_info">
                        <h2 className="study_title">{studyItem.title}</h2>
                        <h3 className="study_duration">2023. 09. 15 ~ 2023. 10. 14</h3>
                    </div>
                </div>
                <div className="gnb_bg">
                    <ul className="gnb">
                        <li>팀블로그 홈</li>
                        <li>TODO</li>
                        <li>일정</li>
                        <li>
                            <Link to={`/chat?studyId=${studyId}`}>실시간 채팅</Link>
                        </li>
                    </ul>
                </div>
                <div className="content">
                    <div>
                        <TeamToDoList studyId={studyId} Member={Member} selectStudy={studyItem}/>
                    </div>
                    <div>
                        <MapNaverDefault studyId={studyId}/>
                    </div>
            {/*        <div className="left">*/}
            {/*            <div className="team_todo team">*/}
            {/*                <p>오늘의 할 일&nbsp;&nbsp;<span>&gt;</span></p>*/}
            {/*                <div className="team_todo_content">*/}
            {/*                    <div>*/}
            {/*                        <h4 className="manager">김솜솜</h4>*/}
            {/*                        <ul>*/}
            {/*                            <li>해야할 일 1</li>*/}
            {/*                            <li>해야할 일 2</li>*/}
            {/*                        </ul>*/}
            {/*                    </div>*/}
            {/*                    <div>*/}
            {/*                        <h4 className="manager">박솜솜</h4>*/}
            {/*                        <ul>*/}
            {/*                            <li>해야할 일 1</li>*/}
            {/*                            <li>해야할 일 2</li>*/}
            {/*                        </ul>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*            <div className="team_schedule team">*/}
            {/*                <p>일정&nbsp;&nbsp;<span>&gt;</span></p>*/}
            {/*                <div className="team_schedule_content">*/}
            {/*                    일정입니다*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*            <div className="team_progress team">*/}
            {/*                <p>스터디 진행률&nbsp;&nbsp;<span>&gt;</span></p>*/}
            {/*                <div className="team_progress_content">*/}
            {/*                    스터디 진행률입니다*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*        <div className="team_chatting team">*/}
            {/*            <p>실시간 채팅&nbsp;&nbsp;<span>&gt;</span></p>*/}
            {/*            <div className="team_chatting_content">*/}
            {/*                <div className="chatting_title">솜솜이 채팅방</div>*/}
            {/*                <div className="chatting_content">*/}
            {/*                    <div>*/}
            {/*                        <span className="nickname">김솜솜</span>*/}
            {/*                        <span className="chat">우리 오늘 할 일 정해보자</span>*/}
            {/*                    </div>*/}
            {/*                    <div style={{textAlign:"right"}}>*/}
            {/*                        <span className="chat me">ㅇㅋ 지금 어디까지 했지?</span>*/}
            {/*                    </div>*/}
            {/*                    <div>*/}
            {/*                        <span className="nickname">이솜솜</span>*/}
            {/*                        <span className="chat">기다려봐 내가 한번 보고 올게</span>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*                <div className="chat_input">*/}
            {/*                    <input type="text" />*/}
            {/*                    <button className="chat_submit_btn">전송</button>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
                </div>
            </div>
        </div>
    );
}
export default TeamBlog;