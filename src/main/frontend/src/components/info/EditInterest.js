import React, { useState } from "react";
import edit from "../../css/mypage_css/edit.css";
const EditInterest=()=>{
    const tagoptions = [
        { value: "IT기획", name: "IT기획" },
        { value: "프론트", name: "프론트" },
        { value: "백엔드", name: "백엔드" },
        { value: "클라우드", name: "클라우드" },
        { value: "IT기", name: "IT기획" },
        { value: "프론", name: "프론트" },
        { value: "백엔", name: "백엔드" },
        { value: "클라우", name: "클라우드" },
        { value: "IT", name: "IT기획" },
        { value: "프", name: "프론트" },
        { value: "백", name: "백엔드" },
        { value: "클라", name: "클라우드" },
        { value: "I", name: "IT기획" },
        { value: "프드", name: "프론트" },
        { value: "백드", name: "백엔드" },
        { value: "클드", name: "클라우드" },
        { value: "I획", name: "IT기획" },
        { value: "트", name: "프론트" },
        { value: "백으드", name: "백엔드" },
        { value: "클우드", name: "클라우드" },
      ];

      
      const Tagoption = (props) => {
        const [tags, setTags] = useState([]);
    
        const handletagChange = (value) => {
          if (tags.includes(value)) {
            setTags(tags.filter((tag) => tag !== value));
          } else {
            if (tags.length < 3) { //최대 3개까지만 선택 가능하게
              setTags([...tags, value]);
            }else{
                alert("관심분야는 최대 3개까지 입니다.");
            }
          }
        };
        console.log(tags)

        return (
          <div className="tags">
            {props.editoptions.map((editoption) => (
              <button
                id="tag"
                name="TAG"
                onClick={() => handletagChange(editoption.value)}
            value={editoption.value}
            style={{
              backgroundColor: tags.includes(editoption.value)
                ? "lightpink"
                : "white",
            }}
                value={editoption.value}
              >
                {editoption.value}
              </button>
            ))}
          </div>
        );
      };
return(
    <div className="sub_container" id="interested">
    <div className="change_interest">
      <div id="title">
        관심분야<span id="sub_title">(최대 3개까지 선택 가능)</span>
      </div>
      <Tagoption editoptions={tagoptions} value="" />

      <button id="save">저장하기</button>
    </div>
  </div>
);

}
export default EditInterest;