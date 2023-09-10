import { Link } from "react-router-dom";
import React, {useEffect, useState} from "react";
import searchicon from "./images/search.png";
import axios from "axios";


const SearchBar = (props) => {
	const items = props.searchItems;
	const [search, setSearch] = useState("");
	const [selectsearch ,setSelectSearch] =useState("");

	const onChange = (e) => {
		setSearch(e.target.value);
		console.log(e.target.value);
	};
	const onHandleselect = (e)=>{
		setSelectSearch(e.target.value);
		console.log(`value = ${e.target.value}`)
	}

	const filterProducts = items.filter((item) => {
		return item.includes(search);
	});
	//TODO 검색바
	// useEffect(() => {
	// 	try {
	// 	const response = axios.post("URL", {
	// 		state: {
	// 			search:search,
	// 			selectsearch:selectsearch,
	// 		}
	// 	});
	//
	// 	// if (response.status === 200) {
	// 	// 	console.log("검색 성공");
	// 	// 	window.location.href = "/";
	// 	// } else {
	// 	// 	console.error("검색 실패");
	// 	// }
	// } catch (error) {
	// 	console.error("Error:", error);}
	//
	// }, []);

	return (
		<div className="Home_wrap">
		<div className="select_search">
				<select id="sub" onClick={onHandleselect}>
					<option value="제목">제목</option>
					<option value="내용">내용</option>
					<option value="주제">작성자</option>
					</select>
				</div>
		<div className="searchbar">
			<div className="searchinput">
			<input
				type="text"
				value={search}
				onChange={onChange}
				placeholder="원하는 스터디를 검색해보세요"
			/>
			<img src ={searchicon} width="20px"/>
			</div>
			<div className="showfilter">
				{search !== "" && filterProducts.length === 0 ? (
					<p>해당 키워드를 가진 스터디가 없습니다.</p>
				) : null}
				{search !== "" && filterProducts.length > 0 ? (
					<ul>
						{filterProducts.map((item) => {
							return (
								<li key={item}>
									<Link
										to={`/${item}`}
										style={{
											textDecoration: "none",
											color: "inherit",
										}}
									>
										{item}
									</Link>
								</li>
							);
						})}
					</ul>
				) : null}
			</div>
		</div>
		</div>
	);
};

export default SearchBar;
