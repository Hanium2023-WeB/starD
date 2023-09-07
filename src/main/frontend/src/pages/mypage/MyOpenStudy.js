import React, {useState, useEffect, useRef, useCallback} from "react";
import { Link, useLocation } from "react-router-dom";
import Category from "../../components/repeat_etc/Category.js";

import "../../css/study_css/MyOpenStudy.css";
import Header from "../../components/repeat_etc/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const MyOpenStudy = ({ sideheader }) => {
	// const dataId = useRef(1);
	const [studies, setStudies] = useState([]);

	const location = useLocation();
	const studyState = location.state;

	useEffect(() => {
		const storedStudies = localStorage.getItem("studies");
		if (storedStudies) {
			setStudies(JSON.parse(storedStudies));
		}
	}, []);

	const mypartistudylist = () => {
		return (
			<div className="study_list">
				{studies.map((d) => (
					<div className="list" key={d.id}>
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
