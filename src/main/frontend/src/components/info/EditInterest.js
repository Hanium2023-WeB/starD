import React, {useEffect, useState} from "react";
import edit from "../../css/mypage_css/edit.css";
const EditInterest=({mem})=>{
    const tagoptions = [
        { value: "웹 개발", name: "웹 개발" },
        { value: "앱 개발", name: "앱 개발" },
        { value: "머신러닝", name: "머신러닝" },
        { value: "데이터 분석", name: "데이터 분석" },
        { value: "게임 개발", name: "게임 개발" },
        { value: "블록체인", name: "블록체인" },
        { value: "네트워크 보안", name: "네트워크 보안" },
        { value: "클라우드 컴퓨팅", name: "클라우드 컴퓨팅" },
        { value: "인공지능", name: "인공지능" },
        { value: "사이버 보안", name: "사이버 보안" },
        { value: "소프트웨어 테스트", name: "소프트웨어 테스트" },
        { value: "로봇공학", name: "로봇공학" },
        { value: "사물인터넷 (IoT)", name: "사물인터넷 (IoT)" },
        { value: "데이터베이스 관리", name: "데이터베이스 관리" },
        { value: "UI/UX 디자인", name: "UI/UX 디자인" },
        { value: "프로젝트 관리", name: "프로젝트 관리" },
        { value: "빅데이터", name: "빅데이터" },
        { value: "컴퓨터 그래픽스", name: "컴퓨터 그래픽스" },
        { value: "자동화", name: "자동화" },
        { value: "블로그 운영", name: "블로그 운영" },
    ];


    const Tagoption = (props) => {
        const [tags, setTags] = useState(()=>{
            const storedTags=localStorage.getItem('tags');
            return storedTags ? storedTags.split(",") : [];
        });

                const handletagChange = (value) => {
                if (tags.includes(value)) {
                    setTags(tags.filter((tag) => tag !== value));
                } else {
                    if (tags.length < 3) { //최대 3개까지만 선택 가능하게
                        setTags([...tags, value]);

                    }
                    else{
                        alert("관심분야는 최대 3개까지 입니다.");
                    }
                }
                };




        console.log(tags)

          useEffect(() => {
              mem.tags = tags;
              localStorage.setItem('tags', tags);
          }, [tags])
          ;
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
  <div>
      <div id="title">
        관심분야<span id="sub_title">(최대 3개까지 선택 가능)</span>
      </div>
      <Tagoption editoptions={tagoptions} value="" />

  </div>
);

}
export default EditInterest;