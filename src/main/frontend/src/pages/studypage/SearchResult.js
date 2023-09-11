import { useLocation } from "react-router-dom";
import Header from "../../components/repeat_etc/Header";
import React from "react";
import StudyListItem from "../../components/study/StudyListItem";
import Study from "./Study";

function SearchResult() {
    const location = useLocation();
    const searchQuery = new URLSearchParams(location.search).get("q");
    const selectOption = new URLSearchParams(location.search).get("select");
    console.log("searchQuery:", searchQuery);
    console.log("selectOption:", selectOption);

    const studies = localStorage.getItem("studyWithTags");
    console.log(studies);
    return (
        <div>
            {/*<Header showSideCenter={true}/>*/}
            <h1>Search Results for: {searchQuery}</h1>
            <p>Selected Option: {selectOption}</p>
            <Study/>
        </div>
    );
}

export default SearchResult;