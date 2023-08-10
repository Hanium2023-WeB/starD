import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import App from "../App.js";
import Slide from "../components/Slide.js";
import Scrap from "../components/Scrap.js";
import Category from "../components/Category.js";
import ToDoList from "../pages/ToDoList.js"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "../css/MyParticipateStudy.css";
import "../css/Mypage_Scrap.css";
//https://jsonplaceholder.typicode.com/comments

import "../css/Mypage.css";

const Mypage = ({ sideheader }) => {
	const dataId = useRef(0);
	const [state, setState] = useState([]);

	//api 사용하기
	const getData = async () => {
		const res = await fetch(
			"https://jsonplaceholder.typicode.com/comments"
		).then((res) => res.json());
		const initDate = res.slice(0, 10).map((it) => {
			return {
				tag: it.email,
				author: it.email,
				day: it.postId,
				title: it.name,
				last: 5,
				created_date: new Date().getTime(),
				id: dataId.current++,
			};
		});
		setState(initDate);
		console.log(initDate);
	};

	// const scrapstudy = () => {
	// 	return (
	// 		<div className="list">
	// 			{state.map((d) => (
	// 				<div className="list_detail">
	// 					<p>{d.author}</p>
	// 				</div>
	// 			))}
	// 		</div>
	// 	);
	// };
	const scrapstory = () => {
		return (
			<div className="list_story">
				{state.map((d) => (
					<div className="story_detail">
						<p>{d.author}</p>
					</div>
				))}
			</div>
		);
	};
	useEffect(() => {
		//페이지가 마운트 되자마자 api호출
		getData();
	}, []);
	return (
		<div>
			{sideheader}
			<div className="container">
				<Category />
				<div className="main_container">
					<div className="sub_container">
						<div className="reliability">
							<div className="tag">
								<p>개인 신뢰도</p>
								<button id="more">전체보기</button>
							</div>
							<div id="detail">디테일입니다.</div>
						</div>

						<div className="schedule">
							<div className="tag">
								<p>일정</p>
								<button id="more">전체보기</button>
							</div>
							<div id="detail">디테일입니다.</div>
						</div>

						<div className="todo">
							<div className="tag">
								<p>TO DO LIST</p>
								<Link to ={"/ToDoList"}
										style={{
											textDecoration: "none",
											color: "inherit"}}>
								<button id="more" >전체보기</button>
								</Link>
							</div>
							<div id="detail">디테일입니다.</div>
						</div>
					</div>

					<p>스크랩한 스터디</p>
					<Slide state={state} />
					{/* <div className="scrap_button">
        <button > {"<"} </button>
        <button> {">"} </button>
        </div>  */}
					{/* {scrapstudy()} */}
					<p>스크랩한 게시글</p>
					<div className="sub_container">
						{scrapstory()}
						{/* <Scrap/> */}
					</div>
				</div>
			</div>
		</div>
	);
};
export default Mypage;
