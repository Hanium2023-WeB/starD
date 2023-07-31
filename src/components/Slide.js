import React, { useState, useEffect, useRef } from "react";
import "../css/Mypage.css";
import Study from "./Study.js";

const Slide = ({ state }) => {
  const [slidePx, setSlidePx] = useState(0);
  console.log(slidePx);

  const toPrev = () => {
    slidePx < 0 && setSlidePx(slidePx + 300);
  };

  const toNext = () => {
    slidePx > -1980 && setSlidePx(slidePx - 300);
  };

  return (
    <div>
      <div className="sub_container" id="scrap_study">
        <div className="sub_wrap">
        <ul className="list">
          {state.map((d) => (
                <Study slide={slidePx} key={d.id} study={d}/>

          ))}
        </ul>
      </div>
      </div>
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
    </div>
  );
};

export default Slide;
