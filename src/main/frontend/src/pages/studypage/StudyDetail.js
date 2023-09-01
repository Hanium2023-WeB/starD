import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import "../../css/study_css/StudyDetail.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import StudyInfo from "../../components/study/StudyInfo";

const StudyDetail = ({ sideheader }) => {
	const { id } = useParams();
	console.log(id);
	const dataId = useRef(0);
	const [state, setState] = useState([]);
	const navigate = useNavigate();

	const [studies, setStudies] = useState([]);

	const studyDetail = studies.filter((study) => study.id === Number(id));

	useEffect(() => {
		const storedStudies = localStorage.getItem("studies");
		if (storedStudies) {
			setStudies(JSON.parse(storedStudies));
		}
	}, []);

	const studydetail = () => {
		return (
			<div className="study_detail">
				{studyDetail.map((study) => (
					<div key={study.id}>
						<StudyInfo study={study} />
						<div className="study_intro">
							<div>스터디 소개</div>
							<div>{study.description}</div>
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
