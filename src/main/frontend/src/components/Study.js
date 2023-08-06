import Slide from "../components/Slide.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "../css/MyParticipateStudy.css";
import "../css/Mypage_Scrap.css";

const Study = ({ study, slide }) => {
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
    </li>
  );
};
export default Study;
