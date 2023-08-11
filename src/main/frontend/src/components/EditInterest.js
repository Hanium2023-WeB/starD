import React, { useState } from "react";
import edit from "../css/edit.css";
import axios from "axios";
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

      const [tags, setTags] = useState([]);
      
      const Tagoption = (props) => {
    
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

const handleSaveTag = async () => {
    if (tags.length === 0) {
        alert("관심분야를 선택하세요.");
        return;
    }

//    const encodedTags = tags.map(tag => encodeURIComponent(tag));
    const interests = tags.join(",");

    axios.post("http://localhost:8080/user/mypage/update/interest", null, {
        params: { interestList: interests },
        withCredentials: true
    })
        .then(response => {
            if (response.status === 200) {
                console.log("관심분야 변경 성공");
                alert("관심분야가 변경되었습니다.");
            } else {
                console.error("관심분야 변경 실패");
                alert("관심분야 변경에 실패하였습니다.");
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("관심분야 변경에 실패하였습니다.");
        });
};

return(
    <div className="sub_container" id="interested">
    <div className="change_interest">
      <div id="title">
        관심분야<span id="sub_title">(최대 3개까지 선택 가능)</span>
      </div>
      <Tagoption editoptions={tagoptions} value="" />

      <button id="save" onClick={handleSaveTag}>저장하기</button>
    </div>
  </div>
);

}
export default EditInterest;