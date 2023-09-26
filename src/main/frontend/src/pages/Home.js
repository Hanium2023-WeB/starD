import React, {useState, useEffect, useRef} from "react";
import SearchBar from '../SearchBar';
import LogoButton from '../components/repeat_etc/LogoButton';
import {format} from "date-fns";
import cn from "classnames";
import axios from "axios";
import checkbox from "../images/check.png";
import uncheckbox from "../images/unchecked.png";
import scheduleimg from "../images/schedule.png";
import checktodo from "../images/free-icon-to-do-list.png";
import mapicon from "../images/free-icon-map.png";
import chaticon from "../images/free-icon-chat.png";
import {Link} from "react-router-dom";
import Header from "../components/repeat_etc/Header";
import LOGO from "../images/Logo.png";
import HomeDashBoard from "../components/study/HomeDashBoard";

const searchItems = [
    "back-end",
    "front-end",
    "cloud",
    "aws",
    "framework"
]


const Home = () => {
    const dataId = useRef(0);
    const [state, setState] = useState([]);
    const [todos, setTodos] = useState({});
    const [today, setToday] = useState(new Date());
    const [parsedTodos, setParsedTodos] = useState({});
    const [todayKey, setTodayKey] = useState("");
    const [isLogin, setIsLogin] = useState(""); // Login 여부 상태관리
    const [user, setUser] = useState(""); // 로그인 유저이름 상태관리
    const [tag, setTag] = useState([{id: 1, tagname: "취업"},
        {id: 2, tagname: "자소서"}, {id: 3, tagname: "프로그래밍"},
        {id: 4, tagname: "독서"}, {id: 5, tagname: "여행"}]);
    const [isTag, setIsTag] = useState("");

    const Year = today.getFullYear();
    const Month = today.getMonth() + 1;
    const Dates = today.getDate();
    const tags = tag;
    //인기있는 태그 배치
    const firstRow = tags.slice(0, 3);
    const secondRow = tags.slice(3, 5);


    useEffect(() => {
        localStorage.removeItem('studies');
        // localStorage.removeItem('todos');
        localStorage.removeItem('selectedSido');
        localStorage.removeItem('selectedGugun');
    }, []);


    useEffect(() => {
        // Load todos from localStorage when the component mounts
        const savedTodos = localStorage.getItem("todos");
        if (savedTodos) {
            const parsed = JSON.parse(savedTodos);
            setParsedTodos(parsed);
            console.log(parsedTodos);


            const todayKey = today.toDateString();
            setTodayKey(todayKey);

            console.log(todayKey);
            if (parsedTodos.hasOwnProperty(todayKey)) {
                const todayTodos = parsedTodos[todayKey];

                todayTodos.forEach((todo) => {
                    console.log(todo.text);
                    console.log(todo.checked);
                });
            }
        }
    }, []);

    useEffect(() => {
        // Load todos from localStorage when the component mounts
        const isLogin = localStorage.getItem("accessToken");
        const user = localStorage.getItem("isLoggedInUserId");
        //로그인 accessToken, user을 로컬스토리지에서 불러옴
        setIsLogin(isLogin);
        setUser(user);
        console.log(tags);
    }, []);

    //tag 서버 전달
    // TODO 태그 (로그인 전)
    useEffect(() => {
        axios.post("", {
            data: tag
        }).then((res) => {
            console.log("태그 전송");
            console.log(res.data);
        }).catch(error => {
            console.log('전송 실패', error);
            //태그 인기 순으로 5개 순위 매겨서 객체배열 형식으로
            // 프론트에 넘겨주시면 map을 사용해서 화면에 출력
        });


    }, []);


    const getTodoItemClassName = (checked) => {
        return checked ? "checked" : "unchecked";
    };

    const handleontag = (e) => {
        console.log(e.target.value);
        setIsTag(e.target.value);
        //해당 태그가 있는 스터디 리스트 링크로 넘어갈 수 있도록
    }
    return (
        <div className="main_wrap">
            {/*{sideheader}*/}
            <Header showSideCenter={true}/>
            <div className="main_content_wrap">
            <div className="subground">
                <div className={"intro"}>
                <span id={"intro-main"}>
                    STAR D<br/>
                    한방에 모든 것을,<br/>
                    All In One 스터디 웹 플랫폼 <br/>
                </span>
                    <div className="LOGO">
                        <img src={LOGO} alt="LOGO" width="250px"/>
                    </div>

                </div>
                <div className={"below_intro"}>
                        <span id={"intro-sub"}>
                            “STAR D는 여러분의 모든 요구를 한 곳에서 해결하는 통합 온라인 플랫폼입니다.<br/>
                            스터디 그룹 구성부터 일정 관리에 이르기까지, 필요한 모든 기능을 한 곳에서 제공합니다.
                        </span>
                </div>
                <SearchBar searchItems={searchItems}/>
                <div className={"welcome"}>
                    <span id={"welcome-text"}>“STAR D는 당신의 앞날을 응원합니다.” </span>
                </div>
            </div>

            {/*로그인 했을 때 안했을 때 화면 바꾸기*/}
            {isLogin && user ?
                <div className={"wrap-01"}>
                    <div className="dashboard">
                        <div className="user_wrap">
                            <div className="dashboard_tag_wrap">
                                <p id={"tag-title"}>STAR_D의 요즘 뜨는 태그</p>
                                <p id={"tag-subtitle"}>TOP 5</p>
                                <div className="dashboard_Tags">
                                    {tags.map((item) => {
                                        return (
                                            <div className={"dashboard_tagname_wrap"}>
                                                <p id={"ranking"}>{item.id + 1}</p>
                                                <button id={"dashboard_tagbtn"} value={item.tagname}
                                                        onClick={handleontag}>{item.tagname}</button>
                                            </div>
                                        )
                                    })
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="dashboard_detail">
                            {/*참여하고있는 스터디 보여주기*/}
                            {/*<br/>*/}
                            {/*클릭 시 팀블로그로 넘어가도록*/}
                            <HomeDashBoard/>
                        </div>
                        <div className="dashboard_todo">

                <span id="today">{`${Year}. ${Month}. ${Dates} / 오늘의 할 일`}
                    <Link to={"/ToDoList"}
                          style={{
                              textDecoration: "none",
                              color: "inherit",
                          }}> <button
                        id="todo_more">{`ToDoList Page >>`}</button></Link></span>
                            <hr/>
                            {parsedTodos.hasOwnProperty(todayKey) ? (
                                <ul id="todocontent">
                                    {parsedTodos[todayKey].map((todo) => (
                                        <li key={todo.id}
                                            className={getTodoItemClassName(todo.checked)}>
                                            {todo.checked ? (
                                                <img src={checkbox} alt="checked" width="20px"/>
                                            ) : (
                                                <img src={uncheckbox} alt="unchecked" width="20px"/>
                                            )}
                                            <div id="todotext">
                                                {todo.text}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="empty_today_todo">
                                    <span>할 일이 없습니다.<br/>  할 일을 입력해주세요.</span>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
                : <div>
                    <div className="wrap-01">
                        <div className="tag_wrap">
                            <p>지금 가장 핫한 TOP 5 태그<br/>
                                한 눈에 확인해보세요!</p>
                            <div className="firstRow-tags">
                                {firstRow.map((item) => {
                                    return (
                                        <div className={"tagname_wrap"}>
                                            <span id={"tag-grade"}>TOP {item.id}</span>
                                            <button id={"tagbtn"} value={item.tagname}
                                                    onClick={handleontag}>{item.tagname}</button>
                                        </div>
                                    )
                                })
                                }
                            </div>
                            <div className="secondRow-tags">
                                {secondRow.map((item) => {
                                    return (
                                        <div className={"tagname_wrap"}>
                                            <span id={"tag-grade"}>TOP{item.id}</span>
                                            <button id={"tagbtn"} value={item.tagname}
                                                    onClick={handleontag}>{item.tagname}</button>
                                        </div>
                                    )
                                })
                                }
                            </div>

                        </div>
                    </div>
                    <div className="wrap-02">
                        <div className="wrap_content">
                            <div className={"content_show"}>
                                <p id={"content-title"}>올인원</p>
                                <p id={"content-detail"}>스터디의 A to Z까지<br/>
                                    STAR D가 함께합니다.</p>
                                <p id={"content-detail_info"}>
                                    스터디를 계획하고 실행하는 것이 이제는 어렵지 않습니다.<br/>
                                    스터디 모집부터 참여, 팀블로그 작성 및 채팅까지 한 번에 처리하세요.</p>
                                <div className={"introduce_content_detail"}>
                                    <div id={"detail-01"}>
                                        <div id={"detail-title"}>
                                            <p>스터디<br/>모집,신청,참여</p>
                                        </div>
                                        <div id={"detail-info"}>
                                            <p>STAR D와 함께<br/>
                                                스터디 모집부터 신청, 그리고 참여까지!<br/>
                                                당신의 이상적인 스터디를 찾아보세요.</p>
                                        </div>
                                        <div id={"detail-img-btn"}>
                                            <button>
                                                 스터디 모집하기
                                            </button>
                                        </div>

                                    </div>
                                    <div id={"detail-02"}>
                                        <div id={"detail-title"}>
                                            <p>일정, 투두 관리</p>
                                        </div>
                                        <div id={"detail-info"}>
                                    <p>일정부터 투두리스트까지,<br/>
                                        모든 것을 STAR D에서 한번에 관리하세요!<br/>
                                        우아하고 효율적인 학습 경험을 선사합니다.</p>
                                        </div>
                                        <div id={"detail-img-btn"}>
                                            <img src={scheduleimg} width={"41px"}/>
                                            <img src={checktodo} width={"50px"}/>
                                        </div>
                                    </div>
                                    <div id={"detail-03"}>
                                        <div id={"detail-title"}>
                                            <p>실시간 채팅 &<br/>
                                                중간장소 찾기</p>
                                        </div>
                                        <div id={"detail-info"}>
                                            <p>스터디원들과 실시간 채팅을 즐기며,<br/>
                                                중간장소 찾기로 각자의 거리를 고려한<br/>
                                                최적의 장소를 선택하세요!</p>
                                        </div>
                                        <div id={"detail-img-btn"}>
                                            <img src={mapicon} width={"41px"} height={"41px"}/>
                                            <img src={chaticon}width={"41px"} height={"41px"}/>
                                        </div>
                                    </div>
                                    <div id={"detail-04"}>
                                        <div id={"detail-title"}>
                                            <p>팀원 평가 &<br/>
                                                개인 신뢰도</p>
                                        </div>
                                        <div id={"detail-info"}>
                                            <p>팀원 평가를 통해 협업의 질을 높이고,<br/>
                                                개인 신뢰도를 통해<br/>
                                                안정적인 스터디 환경을 구축하세요.</p>
                                        </div>
                                        <div id={"detail-img-btn"}>
                                            <button>
                                                스터디 모집하기
                                            </button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="wrap-03">
                        <div className="tag_wrap">
                            <p>서로를 돕고 함께 성장하는<br/>
                                스터디 커뮤니티</p>
                            <div className="firstRow-tags">
                                {firstRow.map((item) => {
                                    return (
                                        <div className={"tagname_wrap"}>
                                            <span id={"tag-grade"}>TOP {item.id}</span>
                                            <button id={"tagbtn"} value={item.tagname}
                                                    onClick={handleontag}>{item.tagname}</button>
                                        </div>
                                    )
                                })
                                }
                            </div>
                        </div>
                    </div>
                    <div className="wrap-04">
                        <div className="tag_wrap">
                            <p>학습은 개인적인 여정이지만,<br/>
                                함께 나누면 그 가치가 배가 됩니다.</p>
                            <div className="firstRow-tags">
                                {firstRow.map((item) => {
                                    return (
                                        <div className={"tagname_wrap"}>
                                            <span id={"tag-grade"}>TOP {item.id}</span>
                                            <button id={"tagbtn"} value={item.tagname}
                                                    onClick={handleontag}>{item.tagname}</button>
                                        </div>
                                    )
                                })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            }
            </div>
        </div>

    );
};
export default Home;
// import React from 'react'
// import { View, Text, Image, StyleSheet } from 'react-native'
// import { Svg } from 'react-native-svg'
//
// const Home= ()=>{
//     return (
//       <div>
//             <Svg id='Rectangle9' />
//             <View style={Styles.Group24}>
//                 <Svg id='Rectangle1' />
//                 <Text>
//                     제목
//                 </Text>
//             </View>
//             <View style={Styles.Group23}>
//                 <View style={Styles.Rectangle1} />
//                 <Text style={Styles.}>
//                     원하는 스터디를 검색해보세요
//                 </Text>
//             </View>
//             <Text style={Styles.}>
//                 스터디　　 커뮤니티　　공지사항
//             </Text>
//             <Text style={Styles.}>
//                 로그인
//             </Text>
//             <Text style={Styles.}>
//                 회원가입
//             </Text>
//             <Svg id='Rectangle101' />
//             <Svg id='Rectangle102' />
//             <Text style={Styles.STARD}>
//                 STAR D
//             </Text>
//             <View style={Styles.Group82}>
//                 <View style={Styles.Ellipse11} />
//                 <View style={Styles.Rectangle65} />
//             </View>
//             <Svg id='Polygon2' />
//             <Svg id='Rectangle100' />
//             <View style={Styles.Rectangle105} />
//             <Text style={Styles.}>
//                 스터디
//                 모집,신청,참여
//             </Text>
//             <Text style={Styles.STARD}>
//                 STAR D와 함께
//                 스터디 모집부터 신청, 그리고 참여까지!
//                 당신의 이상적인 스터디를 찾아보세요.
//             </Text>
//             <View style={Styles.Rectangle106} />
//             <Text style={Styles}>
//                 일정, 투두 관리
//             </Text>
//             <Text style={Styles.STARD}>
//                 일정부터 투두리스트까지,
//                 모든 것을 STAR D에서 한번에 관리하세요!
//                 우아하고 효율적인 학습 경험을 선사합니다.
//             </Text>
//             <View style={Styles.Rectangle107} />
//             <Text style={Styles.}>
//                 실시간 채팅 &
//                 중간장소 찾기
//             </Text>
//             <Text style={Styles.}>
//                 스터디원들과 실시간 채팅을 즐기며,
//                 중간장소 찾기로 각자의 거리를 고려한
//                 최적의 장소를 선택하세요!
//             </Text>
//             <View style={Styles.Rectangle108} />
//             <Text style={Styles.}>
//                 팀원 평가 &
//                 개인 신뢰도
//             </Text>
//             <Text style={Styles.}>
//                 팀원 평가를 통해 협업의 질을 높이고,
//                 개인 신뢰도를 통해
//                 안정적인 스터디 환경을 구축하세요.
//             </Text>
//             <Text style={Styles.TOP5}>
//                 TOP 5
//             </Text>
//             <Text style={Styles.TOP4}>
//                 TOP 4
//             </Text>
//             <View style={Styles.Group83}>
//                 <View style={Styles.Rectangle7} />
//                 <Text style={Styles.}>
//                     #프론트엔드
//                 </Text>
//             </View>
//             <View style={Styles.Group84}>
//                 <View style={Styles.Rectangle7} />
//                 <Text style={Styles.}>
//                     #백엔드
//                 </Text>
//             </View>
//             <View style={Styles.Group85}>
//                 <View style={Styles.Rectangle7} />
//                 <Text style={Styles.}>
//                     #파이썬
//                 </Text>
//             </View>
//             <View style={Styles.Group86}>
//                 <View style={Styles.Rectangle7} />
//                 <Text style={Styles.}>
//                     #네트워크
//                 </Text>
//             </View>
//             <View style={Styles.Group87}>
//                 <View style={Styles.Rectangle7} />
//                 <Text style={Styles.}>
//                     #클라우드
//                 </Text>
//             </View>
//             <Text style={Styles.TOP5}>
//                 지금 가장 핫한 TOP 5 태그
//                 한 눈에 확인해보세요!
//             </Text>
//             <Text style={Styles.}>
//                 스터디를 계획하고 실행하는 것이 이제는 어렵지 않습니다.
//                 스터디 모집부터 참여, 팀블로그 작성 및 채팅까지 한 번에 처리하세요.
//             </Text>
//             <Text style={Styles.AtoZSTARD}>
//                 스터디의 A to Z까지
//                 STAR D가 함께합니다.
//
//             </Text>
//             <Text style={Styles.}>
//                 서로를 돕고 함께 성장하는
//                 스터디 커뮤니티
//             </Text>
//             <Text style={Styles.}>
//                 학습은 개인적인 여정이지만,
//                 함께 나누면 그 가치가 배가 됩니다
//             </Text>
//             <Text style={Styles.}>
//                 올인원
//             </Text>
//             <Text style={Styles.}>
//                 커뮤니티
//             </Text>
//             <Text style={Styles.}>
//                 팀블로그
//             </Text>
//             <Text style={Styles.STARDAllInOne}>
//                 STAR D
//                 한방에 모든 것을,
//                 All In One 스터디 웹 플랫폼
//             </Text>
//             <Text style={Styles.STARD}>
//                 “STAR D는 여러분의 모든 요구를 한 곳에서 해결하는 통합 온라인 플랫폼입니다
//                 스터디 그룹 구성부터 일정 관리에 이르기까지, 필요한 모든 기능을 한 곳에서 제공합니다.
//             </Text>
//             <Text style={Styles.TOP1}>
//                 TOP 1
//             </Text>
//             <Text style={Styles.TOP2}>
//                 TOP 2
//             </Text>
//             <Text style={Styles.TOP3}>
//                 TOP 3
//             </Text>
//             <View style={Styles.Rectangle109} />
//             <Text style={Styles.}>
//                 스터디 모집하기
//             </Text>
//             <View style={Styles.Rectangle112} />
//             <Text style={Styles.}>
//                 스터디 참여하러 가기
//             </Text>
//             <Text style={Styles.WeBGwangLee00000000000WeBhf23gmailcom1360}>
//                 (주)동덕 We B | 대표자:  Gwang Lee | 사업자 번호 : 000-0000-0000 사업자 정보 확인
//                 개인정보보호책임자: WeB(위비) | 이메일: hf23@gmail.com
//                 주소:  서울특별시 성북구 화랑로13길 60
//             </Text>
//             <Svg id='Rectangle48' />
//             <Svg id='Line18' />
//             <Text style={Styles.STARD}>
//                 STAR D
//             </Text>
//             <Svg id='Line19' />
//             <Svg id='Line20' />
//             <Text style={Styles.}>
//                 개인정보처리방침
//             </Text>
//             <Text style={Styles.}>
//                 이용약관
//             </Text>
//             <View style={Styles.Group61}>
//                 <Text style={Styles.STARD}>
//                     STAR D
//                 </Text>
//                 <Text style={Styles.STARD}>
//                     STAR D 소개
//
//                     스터디 리스트 보기
//                 </Text>
//                 <Text style={Styles.}>
//                     고객센터
//                 </Text>
//                 <Text style={Styles.}>
//                     공지사항
//
//                     자주묻는 질문
//
//                     문의하기
//                 </Text>
//             </View>
//             <View style={Styles.Group60}>
//                 <Text style={Styles.}>
//                     프론트
//                 </Text>
//                 <Text style={Styles.}>
//                     김현수
//
//                     허민영
//
//
//                 </Text>
//                 <Text style={Styles.}>
//                     백엔드
//                 </Text>
//                 <Text style={Styles.}>
//                     강지륜
//
//                     이승연
//
//                     차은수
//
//
//                 </Text>
//                 <Text style={Styles.}>
//                     인프라
//                 </Text>
//                 <Text style={Styles.}>
//                     강지륜
//
//                     허민영
//                 </Text>
//             </View>
//             <Image /* source={require('./Logo1.png')} */ />
//             <Image /* source={require('./Logo2.png')} */ />
//             <View style={Styles.schedule1} />
//             <Image /* source={require('./freeicontodolist1.png')} */ />
//             <Image /* source={require('./freeiconchat1.png')} */ />
//             <Image /* source={require('./freeiconmap1.png')} */ />
//             <View style={Styles.image26} />
//             <View style={Styles.image27} />
//             <Text style={Styles.}>
//                 다양한 관심사를 가진 사람들과
//                 풍부한 소통의 장을 열수 있어요
//             </Text>
//             <Text style={Styles.}>
//                 스터디원들과의 실시간 채팅과
//                 할 일, 일정들을 한 눈에 확인할 수 있어요
//             </Text>
//             <Text style={Styles.WeBGwangLee00000000000WeBhf23gmailcom1360}>
//                 (주)동덕 We B | 대표자:  Gwang Lee | 사업자 번호 : 000-0000-0000 사업자 정보 확인
//                 개인정보보호책임자: WeB(위비) | 이메일: hf23@gmail.com
//                 주소:  서울특별시 성북구 화랑로13길 60
//             </Text>
//             <Text style={Styles.STARD}>
//                 “STAR D는 당신의 앞날을 응원합니다.”
//             </Text>
//             <Text style={Styles.STARD}>
//                 “STAR D는 당신의 앞날을 응원합니다.”
//             </Text>
//       </div>
//     )
// }
// export default Home;
//
//
