import Slide from "./Slide.js";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "../../css/study_css/MyParticipateStudy.css";
import "../../css/mypage_css/Mypage_Scrap.css";

const ScrapStudySlide = ({ study, slide }) => {
  const { tag, author, day, title, last, created_date, id} = study;
  return (
    <li
      className="list_detail"
      id={id}
      style={{
        transform: `translateX(${slide}px)`,
        transition: "0.5s ease",
      }}
    >
      <Link
          to={`/studydetail/${id}`}
          style={{
            textDecoration: "none",
            color: "inherit",
          }}
      >
      <div className="list_header">
        <div className="list_sub_header">
          <div className="list_day">{id}일간의 우주여행</div>
          <div className="list_status">진행중</div>
        </div>
        <div className="list_like">
          <FontAwesomeIcon icon={faStar} />
        </div>
      </div>
      <div className="list_deadline">마감일 | {created_date}</div>
      <div className="list_title">{title}</div>
      <div className="list_tag">{tag}</div>
      <div className="list_onoff">{tag}</div>
      <div className="stroke"></div>
      <div className="list_founder">{author}</div>
      </Link>
    </li>
  );
};
export default ScrapStudySlide;
