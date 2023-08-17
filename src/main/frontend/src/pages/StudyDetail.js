import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

import "../css/StudyDetail.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const StudyDetail = ({ sideheader }) => {
	const { id } = useParams();
	console.log(id);
	const dataId = useRef(0);
	const [state, setState] = useState([]);
	const navigate = useNavigate();

	const studyDetail = state.filter((study) => study.id === Number(id));

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
				content: it.body,
			};
		});
		setState(initDate);
		console.log(initDate);
	};
	useEffect(() => {
		getData();
	}, []);
	const studydetail = () => {
		return (
			<div className="study_detail">
				{studyDetail.map((study) => (
					<div key={study.id}>
						<div className="study_header">
							<h2 className="study_title">{study.title}</h2>
							<div className="study_author_info">
								<p className="study_author">{study.author}</p>
								<p className="study_created_date">
									{study.created_date}
								</p>
							</div>
						</div>
						<div className="study_content">
							<ul className="study_info">
								<li>
									<span>분야</span>
									<span>{study.tag}</span>
								</li>
								<li>
									<span>모집 중</span>
									<span>{study.tag}</span>
								</li>
								<li>
									<span>진행 방식</span>
									<span>{study.tag}</span>
								</li>
								<li>
									<span>모집 마감일</span>
									<span>{study.tag}</span>
								</li>
								<li>
									<span>스터디 기간</span>
									<span>{study.tag}</span>
								</li>
							</ul>
							<div className="study_intro">
								<div>스터디 소개</div>
								<div>{study.content}</div>
							</div>
						</div>
					</div>
				))}
			</div>
		);
	};
	return (
		<div>
			{sideheader}
			<div className="study_detail_container">
				<h1>STAR TOUR STORY</h1>
				<div className="arrow_left">
					<FontAwesomeIcon
						icon={faArrowLeft}
						onClick={() => navigate(-1)}
					/>
				</div>
				{studydetail()}
			</div>
		</div>
	);
};
export default StudyDetail;
