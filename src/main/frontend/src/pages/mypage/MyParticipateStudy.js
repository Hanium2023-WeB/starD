import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Category from "../../components/repeat_etc/Category.js";
import App from "../../App.js";
import "../../css/study_css/MyParticipateStudy.css";
import Header from "../../components/repeat_etc/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const MyParticipateStudy = ({ sideheader }) => {
	// const dataId = useRef(0);
	// const [state, setState] = useState([]);

	// const getData = async () => {
	// 	const res = await fetch(
	// 		"https://jsonplaceholder.typicode.com/comments"
	// 	).then((res) => res.json());
	// 	const initDate = res.slice(0, 10).map((it) => {
	// 		return {
	// 			tag: it.email,
	// 			author: it.email,
	// 			day: it.postId,
	// 			title: it.name,
	// 			last: 5,
	// 			created_date: new Date().getTime(),
	// 			id: dataId.current++,
	// 		};
	// 	});
	// 	setState(initDate);
	// 	console.log(initDate);
	// };
	// useEffect(() => {
	// 	getData();
	// }, []);
	const accessToken = localStorage.getItem('accessToken');
	const [ApplyMemberList, setApplyMemberList] = useState([]); //참여멤버
	const [ApplyStudyList, setApplyStudyList] = useState([]);

	//TODO 모집완료 시 참여내역 불러오기

	useEffect(() => {
		// TODO 서버에서 참여스터디와 참여멤버 가져오기
		axios.get(`url`, {
			withCredentials: true,
			headers: {
				'Authorization': `Bearer ${accessToken}`
			}
		})
			.then((res) => {
				console.log("모집완료된 스터디, 참여멤버 전송 성공 : ", res.data.data);
				// setApplyStudyList(res.data);
				//setApplyMemberList();

			})
			.catch((error) => {
				console.error("모집완료된 스터디, 참여멤버  가져오기 실패:", error);
			});

	}, []);

	const mypartistudylist = () => {
		return (
			<div className="study_list">
				{/*{state.map((d) => (*/}
				{/*	<div className="list">*/}
				{/*		<Link*/}
				{/*			to={`/studydetail/${d.id}`}*/}
				{/*			style={{*/}
				{/*				textDecoration: "none",*/}
				{/*				color: "inherit",*/}
				{/*			}}*/}
				{/*		>*/}
				{/*			<div className="list_header">*/}
				{/*				<div className="list_sub_header">*/}
				{/*					<div className="list_day">*/}
				{/*						{d.id}일간의 우주여행*/}
				{/*					</div>*/}
				{/*					<div className="list_status">진행중</div>*/}
				{/*				</div>*/}
				{/*				<div className="list_like">*/}
				{/*					<FontAwesomeIcon icon={faStar} />*/}
				{/*				</div>*/}
				{/*			</div>*/}
				{/*			<div className="list_deadline">*/}
				{/*				마감일 | {d.created_date}*/}
				{/*			</div>*/}
				{/*			<div className="list_title">{d.title}</div>*/}
				{/*			<div className="list_tag">{d.tag}</div>*/}
				{/*			<div className="list_onoff">{d.tag}</div>*/}
				{/*			<div className="stroke"></div>*/}
				{/*			<div className="list_founder">{d.author}</div>*/}
				{/*		</Link>*/}
				{/*	</div>*/}
				{/*))}*/}
			</div>
		);
	};
	return (
		<div>
			<Header showSideCenter={true}/>
			<div className="container">
				<Category />
				<div className="main_container">
					<h2>스터디 참여 내역</h2>
					<div className="content_container">
						{mypartistudylist()}
					</div>
				</div>
			</div>
		</div>
	);
};
export default MyParticipateStudy;
