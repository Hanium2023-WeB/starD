import React, { useState, useEffect, useRef } from "react";
import "../../css/mypage_css/Mypage.css";
import ScrapStudySlide from "./ScrapStudySlide.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "../../css/study_css/MyParticipateStudy.css";
import "../../css/mypage_css/Mypage_Scrap.css";
import StudyListItem from "./StudyListItem";

const Slide = ({ state }) => {
  const [slidePx, setSlidePx] = useState(0);
  const [scrapStudies, setScrapStudies] = useState([]); // 스크랩된 스터디 목록
    const [scrapStates, setScrapStates] = useState(scrapStudies.scrap);
    const [likeStates, setLikeStates] = useState(scrapStudies.like);
    const [studiesChanged, setStudiesChanged] = useState(false);

  console.log(slidePx);

  useEffect(() => {
      // 로컬 스토리지에서 스크랩된 스터디 목록 가져오기
      const storedStudies = JSON.parse(localStorage.getItem("studies")) || [];
      setScrapStudies(storedStudies);
  }, []);

    useEffect(() => {
        if (studiesChanged) {
            localStorage.setItem("studies", JSON.stringify(scrapStudies));
            localStorage.setItem("ScrapStudies", JSON.stringify(scrapStates));
            localStorage.setItem("LikeStates", JSON.stringify(likeStates));
            // Reset studiesChanged to false
            setStudiesChanged(false);
        }
    }, [studiesChanged, scrapStudies, scrapStates, likeStates]);

    const toggleScrap = (index) => {
        setScrapStudies((prevStudies) => {
            const newStudies = [...prevStudies];
            newStudies[index] = { ...newStudies[index], scrap: !newStudies[index].scrap };
            setStudiesChanged(true); // Mark studies as changed
            return newStudies;
        });
    };

    const toggleLike = (index) => {
        setScrapStudies((prevStudies) => {
            const newStudies = [...prevStudies];
            newStudies[index] = { ...newStudies[index], like: !newStudies[index].like };
            setStudiesChanged(true); // Mark studies as changed
            return newStudies;
        });
    };

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
            {scrapStudies.map((d, index) => (
                // 스크랩된 스터디만 필터링
                d.scrap && <ScrapStudySlide studies={scrapStudies} toggleLike={toggleLike} toggleScrap={toggleScrap} d={d} index={index} slide={slidePx}/>
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
