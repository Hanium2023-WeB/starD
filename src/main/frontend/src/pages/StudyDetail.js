import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import "../css/StudyDetail.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import StudyInfo from "../components/StudyInfo";

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
						<StudyInfo study={study} />
						<div className="study_intro">
							<div>스터디 소개</div>
							<div>{study.content}</div>
						</div>
						<div className="btn">
							<Link
								to={`/studyapplyform/${study.id}`}
								style={{
									textDecoration: "none",
									color: "inherit",
								}}
							>
								<button className="apply_btn">탑승하기</button>
							</Link>
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
