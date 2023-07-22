import { Link } from "react-router-dom";
import React, { useState } from "react";
import searchicon from "./images/search.png";


const SearchBar = (props) => {
	const items = props.searchItems;
	const [search, setSearch] = useState("");

	const onChange = (e) => {
		setSearch(e.target.value);
		console.log(e.target.value);
	};

	const filterProducts = items.filter((item) => {
		return item.includes(search);
	});

	return (
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
	);
};

export default SearchBar;
