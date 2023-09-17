import React, { useState, useEffect, useRef } from "react";
import {Link, useLocation} from "react-router-dom";
import Category from "../../components/repeat_etc/Category.js";
import App from "../../App.js";
import "../../css/study_css/MyParticipateStudy.css";
import Header from "../../components/repeat_etc/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import LikeButton from "../../components/repeat_etc/LikeButton";
import ScrapButton from "../../components/repeat_etc/ScrapButton";
import Paging from "../../components/repeat_etc/Paging";

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
	const [studies, setStudies] = useState([]);

	const [scrapStates, setScrapStates] = useState(studies.scrap);
	const [likeStates, setLikeStates] = useState(studies.like);
	const location = useLocation();
	const studyState = location.state;
	const [studiesChanged, setStudiesChanged] = useState(false);

	//페이징관련 코드
	const [page, setPage] = useState(1);
	const [count, setCount] = useState(0);
	const [itemsPerPage, setItemsPerPage] = useState(9);

	function calculateDateDifference(startDate, endDate) {
		const start = new Date(startDate);
		const end = new Date(endDate);

		const timeDifference = end - start;
		const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));

		return daysDifference;
	}

	const toggleScrap = (index) => {
		setStudies((prevStudies) => {
			const newStudies = [...prevStudies];
			newStudies[index] = {...newStudies[index], scrap: !newStudies[index].scrap};
			setStudiesChanged(true); // Mark studies as changed
			return newStudies;
		});
	};

	const toggleLike = (index) => {
		setStudies((prevStudies) => {
			const newStudies = [...prevStudies];
			newStudies[index] = {...newStudies[index], like: !newStudies[index].like};
			setStudiesChanged(true); // Mark studies as changed
			return newStudies;
		});
	};

	const handlePageChange = ({page, itemsPerPage, totalItemsCount}) => {
		setPage(page);

		// 백엔드에 데이터를 요청합니다.
		axios.get("http://localhost:8080/user/mypage/studying", {
			params: {
				page: page,
			}, withCredentials: true,
			headers: {
				'Authorization': `Bearer ${accessToken}`
			}
		})
			.then((res) => {
				// 데이터를 받아온 후 스터디 리스트를 업데이트합니다.
				setStudies(res.data.content);

				// 페이지 정보를 업데이트합니다.
				setItemsPerPage(res.data.pageable.pageSize);
				setCount(res.data.totalElements);
			})
			.catch((error) => {
				console.error("데이터 가져오기 실패:", error);
			});

		setItemsPerPage(itemsPerPage); //한페이지 당 아이템 개수
		setCount(totalItemsCount); //전체 아이템 개수
	};

	//TODO 모집완료 시 참여내역 불러오기

	useEffect(() => {
		// TODO 서버에서 참여스터디와 참여멤버 가져오기
		axios.get("http://localhost:8080/user/mypage/studying", {
			withCredentials: true,
			headers: {
				'Authorization': `Bearer ${accessToken}`
			}
		})
			.then((res) => {
				console.log("모집완료된 스터디, 참여멤버 전송 성공 : ", res.data);
				setStudies(res.data.content);

				// 페이지 정보를 업데이트합니다.
				setItemsPerPage(res.data.pageable.pageSize);
				setCount(res.data.totalElements);

				// setApplyStudyList(res.data);
				//setApplyMemberList();

			})
			.catch((error) => {
				console.error("모집완료된 스터디, 참여멤버  가져오기 실패:", error);
			});

	}, [accessToken]);

	const mypartistudylist = () => {
		return (
			<div className="study_list">
				{studies.map((d, index) => (
					<div className="list" key={d.study.id}>

						<div className="list_header">
							<div className="list_sub_header">
								<div className="list_day">
									{calculateDateDifference(d.study.activityStart, d.study.activityDeadline)}일간의 우주여행
								</div>
								{d.study.recruitStatus === "RECRUITING" ? (
									<div className="list_status">모집중</div>
								) : (<div className="list_status">진행중</div>)}

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
							to={`/studydetail/${d.study.id}`}
							style={{
								textDecoration: "none",
								color: "inherit",
							}}
						>
							<div className="list_deadline">
								마감일 | {d.study.recruitmentDeadline}
							</div>
							<div className="list_title">{d.study.title}</div>
							<div className="list_tag">{d.study.field}</div>
							<div className="list_onoff">{d.study.onOff}</div>
							<div className="stroke"></div>
							<div className="list_founder">{d.study.recruiter.nickname}</div>
						</Link>
					</div>
				))}



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
			<div className={"paging"}>
				<Paging page={page} totalItemCount={count} itemsPerPage={itemsPerPage}
						handlePageChange={handlePageChange}/>
			</div>
		</div>
	);
};
export default MyParticipateStudy;
