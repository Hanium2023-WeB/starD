import { Link } from "react-router-dom";
import App from "../App.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../css/Mypage.css";
const category = () => {
	return (
		<div className="category">
			<div className="c_01">
				HOME
				<div class="sub_c">
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
				STUDY
				<div class="sub_c">
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
							<li>스터디 개설 내역</li>
							<li>스터디 신청 내역</li>
						</ul>
					</nav>
				</div>
			</div>
			<div className="c_03">
				MY
				<div class="sub_c">
					<nav>
						<ul>
							<li>내가 작성한 글</li>
							<li>내가 작성한 댓글</li>
						</ul>
					</nav>
				</div>
			</div>
			<div className="c_04">
				SCRAP
				<div class="sub_c">
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
