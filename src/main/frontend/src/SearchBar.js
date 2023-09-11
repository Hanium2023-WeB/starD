import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import searchicon from "./images/search.png";
import axios from "axios";


const SearchBar = (props) => {
    const items = props.searchItems;
    const [search, setSearch] = useState("");
    const [selectsearch, setSelectSearch] = useState("");

    const [selectedOption, setSelectedOption] = useState('제목'); // 초기 선택값 설정

    const onChange = (e) => {
        setSearch(e.target.value);
        console.log(e.target.value);
    };

    const onHandleselect = (e) => {
        const selectedValue = e.target.value;
        setSelectedOption(selectedValue);
        console.log(`value = ${e.target.value}`)
    }

    const filterProducts = items.filter((item) => {
        return item.includes(search);
    });

    // TODO 스터디 검색
    useEffect(() => {
        try {
            if (selectsearch == "제목") {
                const response = axios.get("http://localhost:8080/api/v2/studies/search-by-title",
                    {params: {
                            keyword: search}})
                        .then((res)=>{
                            console.log("전송 성공");
                            console.log(res.data);

                        }).catch((error)=>{
                            console.log('전송 실패', error);
                        })
            }

            // const response = axios.get("http://localhost:8080/api/v2/studies/search-by-title", {
            //     state: {
            //         search: search,
            //         selectsearch: selectsearch,
            //     }
            // });
            //
            // if (response.status === 200) {
            //     console.log("검색 성공");
            //     window.location.href = "/";
            //
            // } else {
            //     console.error("검색 실패");
            // }
        } catch (error) {
            console.error("Error:", error);
        }
    }, []);

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
                    <img src={searchicon} width="20px"/>
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
