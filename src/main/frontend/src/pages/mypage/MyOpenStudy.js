import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import Category from "../../components/repeat_etc/Category.js";

import "../../css/MyOpenStudy.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const MyOpenStudy = ({ sideheader }) => {
	const dataId = useRef(0);
	const [state, setState] = useState([]);

	const location = useLocation();
	console.log("state: " + JSON.stringify(location.state));

	const getData = async () => {
		const res = await fetch(
			"https://jsonplaceholder.typicode.com/comments"
		).then((res) => res.json());
		const initDate = res.slice(0, 10).map((it) => {
			return {
				title: it.name,
				tag: it.email,
				author: it.email,
				number: it.email,
				onoff: it.email,
				deadline: new Date(),
				duration:it.email,
				description:"",
				created_date: new Date().getTime(),
				id: dataId.current++,
			};
		});
		setState(initDate);
		console.log(initDate);
	};
	useEffect(() => {
		getData();
	}, []);
	const mypartistudylist = () => {
		return (
			<div className="study_list">
				{state.map((d) => (
					<div className="list">
						<Link
							to={`/studydetail/${d.id}`}
							style={{
								textDecoration: "none",
								color: "inherit",
							}}
						>
							<div className="list_header">
								<div className="list_sub_header">
									<div className="list_day">
										{d.id}일간의 우주여행
									</div>
									<div className="list_status">진행중</div>
								</div>
								<div className="list_like">
									<FontAwesomeIcon icon={faStar} />
								</div>
							</div>
							<div className="list_deadline">
								마감일 | {d.created_date}
							</div>
							<div className="list_title">{d.title}</div>
							<div className="list_tag">{d.tag}</div>
							<div className="list_onoff">{d.tag}</div>
							<div className="stroke"></div>
							<div className="list_founder">{d.author}</div>
						</Link>
					</div>
				))}
			</div>
		);
	};
	return (
		<div>
			{sideheader}
			<div className="container">
				<Category />
				<div className="main_container">
					<h2>스터디 개설 내역</h2>
					<div className="content_container">
						{mypartistudylist()}
					</div>
				</div>
			</div>
		</div>
	);
};
export default MyOpenStudy;