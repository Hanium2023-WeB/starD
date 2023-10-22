import {Link, Route, Router, useParams, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import searchicon from "../../images/search.png";
import axios from "axios";


const CommSearchBar = () => {

	const [search, setSearch] = useState("");
	const [selectOption, setSelectOption] = useState("제목");
	const [categoryOption, setCategoryOption] = useState("전체");
	const navigate = useNavigate();


    const tagoptions = [
        { value: "전체", name: "전체"},
        { value: "취업", name: "취업" },
        { value: "자소서", name: "자소서" },
        { value: "면접", name: "면접" },
        { value: "취미", name: "취미" },
        { value: "영어 공부", name: "영어 공부" },
        { value: "프로그래밍", name: "프로그래밍" },
        { value: "음악", name: "음악" },
        { value: "미술", name: "미술" },
        { value: "스포츠", name: "스포츠" },
        { value: "요리", name: "요리" },
        { value: "건강", name: "건강" },
        { value: "여행", name: "여행" },
        { value: "독서", name: "독서" },
        { value: "투자", name: "투자" },
        { value: "사회봉사", name: "사회봉사" },
        { value: "뉴스", name: "뉴스" },
        { value: "기술 동향", name: "기술 동향" },
        { value: "건축", name: "건축" },
        { value: "환경", name: "환경" },
        {value: "블로그 운영", name: "블로그 운영"},
        // Add more categories as needed
    ];

	//엔터를 치면 해당 검색페이지로 넘어갑니다
	const handleKeyDown = (e) => {
		// 엔터 키의 키 코드는 13입니다.
		if (e.keyCode === 13) {
			// 엔터 키를 눌렀을 때 할 작업을 여기에 추가합니다.
			console.log("엔터 키를 눌렀습니다.");
			// 예시: 입력한 내용을 상태에 저장하고 폼을 제출합니다.
			setSearch(e.target.value);
			searchItem(e.target.value);
		}
	};
	const onChange=(e)=>{
		console.log("Search", e.target.value);
		setSearch(e.target.value)
	}

	const onHandleselect = (e)=>{
		setSelectOption(e.target.value);
		console.log(`value = ${e.target.value}`)
	}

	const onHandleCategory = (e) => {
        setCategoryOption(e.target.value);
	}

	//url 동적으로 바꾸기 선택한 옵션과 검색내용이 url안으로 들어갑니다
	const searchItem = (item)=>{
		console.log("타깃",item)
		setSearch(item);
		const queryParams = `?q=${encodeURIComponent(item)}&category=${encodeURIComponent(categoryOption)}&select=${encodeURIComponent(selectOption)}`;
		navigate(`/comm/search${queryParams}`);
	}

	return (
		<div className="Home_wrap">
			<div className="select_search">
			    <select id="sub" value={categoryOption} onChange={onHandleCategory}>
                    {tagoptions.map((category, idx) =>
                        <option value={category.value}>{category.name}</option>
                    )}
			    </select>
				<select id="sub" value={selectOption} onChange={onHandleselect}>
					<option value="제목">제목</option>
					<option value="내용">내용</option>
					<option value="작성자">작성자</option>
				</select>
			</div>

			<div className="searchbar">
				<div className="searchinput">
					<input className="input_padding"
						type="text"
						value={search}
						onChange={onChange}
						onKeyDown={handleKeyDown}
						placeholder={"검색어를 입력하세요."}
					/>
					<img src ={searchicon} width="20px"/>
				</div>
			</div>
		</div>
	);
};

export default CommSearchBar;
