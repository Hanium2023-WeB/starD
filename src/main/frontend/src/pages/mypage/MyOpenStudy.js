import React, {useState, useEffect, useRef, useCallback} from "react";
import { Link, useLocation } from "react-router-dom";
import Category from "../../components/repeat_etc/Category.js";

import "../../css/study_css/MyOpenStudy.css";
import Header from "../../components/repeat_etc/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import LikeButton from "../../components/repeat_etc/LikeButton";
import ScrapButton from "../../components/repeat_etc/ScrapButton";

const MyOpenStudy = ({ sideheader }) => {
	// const dataId = useRef(1);
	const [studies, setStudies] = useState([]);
	const [scrapStates, setScrapStates] = useState(studies.scrap);
	const [likeStates, setLikeStates] = useState(studies.like);

	const location = useLocation();
	const studyState = location.state;
	const [studiesChanged, setStudiesChanged] = useState(false);

	useEffect(() => {
		if (studiesChanged) {
			localStorage.setItem("studies", JSON.stringify(studies));
			localStorage.setItem("ScrapStudies", JSON.stringify(scrapStates));
			localStorage.setItem("LikeStates", JSON.stringify(likeStates));
			// Reset studiesChanged to false
			setStudiesChanged(false);
		}
	}, [studiesChanged, studies, scrapStates, likeStates]);


	useEffect(() => {
		const storedStudies = localStorage.getItem("studies");
		if (storedStudies) {
			setStudies(JSON.parse(storedStudies));
		}
	}, []);
	const toggleScrap = (index) => {
		setStudies((prevStudies) => {
			const newStudies = [...prevStudies];
			newStudies[index] = { ...newStudies[index], scrap: !newStudies[index].scrap };
			setStudiesChanged(true); // Mark studies as changed
			return newStudies;
		});
	};

	const toggleLike = (index) => {
		setStudies((prevStudies) => {
			const newStudies = [...prevStudies];
			newStudies[index] = { ...newStudies[index], like: !newStudies[index].like };
			setStudiesChanged(true); // Mark studies as changed
			return newStudies;
		});
	};

	const mypartistudylist = () => {
		return (
			<div className="study_list">
				{studies.map((d ,index) => (
					<div className="list" key={d.id}>

							<div className="list_header">
								<div className="list_sub_header">
									<div className="list_day">
										{d.id}일간의 우주여행
									</div>
									<div className="list_status">진행중</div>
								</div>
								<div className="list_btn">
									<div className="list_like">
										<LikeButton like={studies[index].like}
													onClick={() => toggleLike(index)}/>
									</div>
									<div className="list_scrap">
										{/* 스크랩 버튼을 클릭하면 해당 스터디 리스트 항목의 스크랩 상태를 토글 */}
										<ScrapButton scrap={studies[index].scrap}
													 onClick={() => toggleScrap(index)}/>
									</div>
								</div>
							</div>
						<Link
							to={`/studydetail/${d.id}`}
							style={{
								textDecoration: "none",
								color: "inherit",
							}}
						>
							<div className="list_deadline">
								마감일 | {d.deadline}
							</div>
							<div className="list_title">{d.title}</div>
							<div className="list_tag">{d.field}</div>
							<div className="list_onoff">{d.onoff}</div>
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
			<Header showSideCenter={true}/>
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
