import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../../components/repeat_etc/Header";
import "../../css/study_css/StudyDetail.css";
import "../../css/comment_css/Comment.css";

import StudyInfo from "../../components/study/StudyInfo";
import StudyEdit from "../../components/study/StudyEdit";
import Backarrow from "../../components/repeat_etc/Backarrow";
import Comment from "../../components/comment/Comment";

const StudyDetail = ({ sideheader }) => {
	const { id } = useParams();
	console.log(id);

	const [studies, setStudies] = useState([]);
	const [editing, setEditing] = useState(false);
	const [studyDetail, setStudyDetail] = useState([]);// 스터디 상세 정보를 상태로 관리
	const [isApply, setIsApply] = useState(false);

	const handleEditClick = () => {
		setEditing(true);
	}

	const handleCancelEdit = () => {
		setEditing(false);
	}

	const handleStudyUpdate = (updatedStudy) => {
		setEditing(false);
		setStudyDetail([updatedStudy]);
		const updatedStudies = studies.map(study =>
			study.id === updatedStudy.id ? updatedStudy : study
		);
		setStudies(updatedStudies);
	}

	const handleStudyDelete = () => {
		const confirmDelete = window.confirm("정말로 스터디를 삭제하시겠습니까?");
		if (confirmDelete) {
			const updatedStudies = studies.filter(study => study.id !== studyDetail[0].id);
			setStudies(updatedStudies);
			localStorage.setItem("studies", JSON.stringify(updatedStudies));
			window.location.href = "/myopenstudy";
		}
	}

	useEffect(() => {
		const storedStudies = localStorage.getItem("studies");
		if (storedStudies) {
			setStudies(JSON.parse(storedStudies));
		}
	}, []);

	useEffect(() => {
		const filteredStudyDetail = studies.filter(study => study.id == Number(id));
		setStudyDetail(filteredStudyDetail); //해당 페이지의 스터디 상세 정보 랜더링에 사용
	}, [studies, id]);

	useEffect(() => {
		if (studyDetail.length > 0 && studyDetail[0].reason) {
			setIsApply(true);
		} else {
			setIsApply(false);
		}
	}, [studyDetail]);

	return (
		<div>
			<Header showSideCenter={true}/>
			<div className="study_detail_container">
				<h1>STAR TOUR STORY</h1>
				<div className="arrow_left">
					<Backarrow />
				</div>
				{editing ? (
					<StudyEdit
						study={studyDetail[0]}
						onUpdateStudy={handleStudyUpdate}
						onCancel={handleCancelEdit}
					/>
				) : (
					<div className="study_detail">
						{studyDetail.map((study) => (
							<div key={study.id}>
								<StudyInfo study={study} handleEditClick={handleEditClick} handleStudyDelete={handleStudyDelete}/>
								<div className="study_intro">
									<div>스터디 소개</div>
									<div dangerouslySetInnerHTML={{ __html: study.description.replace(/\n/g, "<br>") }} />
								</div>
								{isApply && (
									<div className="study_apply_reason">
										<div>나의 지원동기 및 각오</div>
										<div>{study.reason}</div>
									</div>
								)}
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
				)}
			</div>
			<div className="comment_container">
				<Comment />
			</div>
		</div>
	);
};
export default StudyDetail;
