import React, { useState, useEffect, useRef } from "react";
import "../../css/mypage_css/Mypage.css";
import ScrapStudySlide from "./ScrapStudySlide.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "../../css/study_css/MyParticipateStudy.css";
import "../../css/mypage_css/Mypage_Scrap.css";

const Slide = ({ state }) => {
  const [slidePx, setSlidePx] = useState(0);
  const [scrapStudies, setScrapStudies] = useState([]); // 스크랩된 스터디 목록

  console.log(slidePx);

  useEffect(() => {
      // 로컬 스토리지에서 스크랩된 스터디 목록 가져오기
      const storedStudies = JSON.parse(localStorage.getItem("studies")) || [];
      setScrapStudies(storedStudies);
  }, []);

  const toPrev = () => {
    slidePx < 0 && setSlidePx(slidePx + 300);
  };

  const toNext = () => {
    slidePx > -1980 && setSlidePx(slidePx - 300);
  };

  return (
    <div>
      <div className="sub_container" id="scrap_study">
          {(scrapStudies.length === 0) && <p className="no_scrap">스크랩한 스터디가 없습니다.</p>}
          {(scrapStudies.length !== 0) &&
        <div className="sub_wrap">
        <ul className="study_list">
            {scrapStudies.map((d) => (
                // 스크랩된 스터디만 필터링
                d.scrap && <ScrapStudySlide slide={slidePx} key={d.id} study={d} />
            ))}
        </ul>
      </div>
          }
      </div>
        {(scrapStudies.length !== 0) &&
      <div className="scrap_button">
        <button
          className="prev_btn"
          onClick={toPrev}
          style={{ display: slidePx === 300 ? "none" : "" }}
        >
          {" "}
          {"<"}{" "}
        </button>
        <button
          className="next_btn"
          onClick={toNext}
          style={{ display: slidePx === -2100 ? "none" : "" }}
        >
          {" "}
          {">"}{" "}
        </button>
      </div>
        }
    </div>
  );
};

export default Slide;
