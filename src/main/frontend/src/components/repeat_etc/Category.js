import { Link } from "react-router-dom";
import App from "../../App.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../../css/mypage_css/Mypage.css";
const category = () => {
	return (
		<div className="category">
			<div className="c_01">
				<div id={"c_title"}>
				<Link
					to={"/"}
					style={{
						textDecoration: "none",
						color: "inherit",
					}}
				>
				HOME
				</Link>
				</div>
				<div className="sub_c">
					<nav>
						<ul>
							<Link
								to={"/editinfo"}
								style={{
									textDecoration: "none",
									color: "inherit",
								}}
							>
								<li>개인정보 수정</li>
							</Link>
							<li>알림</li>
						</ul>
					</nav>
				</div>
			</div>
			<div className="c_02">
				<div id={"c_title"}>
				<Link
					to={"/study"}
					style={{
						textDecoration: "none",
						color: "inherit",
					}}
				>
				STUDY
				</Link>
				</div>
				<div className="sub_c">
					<nav>
						<ul>
							<Link
								to={"/myparticipatestudy"}
								style={{
									textDecoration: "none",
									color: "inherit",
								}}
							>
								<li>스터디 참여 내역</li>
							</Link>
							<Link
								to={"/myopenstudy"}
								style={{
									textDecoration: "none",
									color: "inherit",
								}}
							>
								<li>스터디 개설 내역</li>
							</Link>
							<Link
								to={"/myapplystudy"}
								style={{
									textDecoration: "none",
									color: "inherit",
								}}
							>
								<li>스터디 신청 내역</li>
							</Link>
						</ul>
					</nav>
				</div>
			</div>
			<div className="c_03">
				<div id={"c_title"}>
				<Link
					to={"/mypage"}
					style={{
						textDecoration: "none",
						color: "inherit",
					}}
				>
				MY
				</Link>
				</div>
				<div className="sub_c">
					<nav>
						<ul>
							<li>내가 작성한 글</li>
							<li>내가 작성한 댓글</li>
						</ul>
					</nav>
				</div>
			</div>
			<div className="c_04">
				<div id={"c_title"}>
				SCRAP
				</div>
				<div className="sub_c">
					<nav>
						<ul>
							<li>스크랩한 스터디</li>
							<li>스크랩한 게시글</li>
						</ul>
					</nav>
				</div>
			</div>
		</div>
	);
};

export default category;
