//페이징
import {useState} from "react";
// import Pagination from "./Pagination";
import Pagination from "react-js-pagination";
const Paging = ({totalItemCount,itemsPerPage,handlePageChange}) => {
    const [page, setPage] = useState(1);

    return (
        <Pagination
            activePage={page} // 현재 페이지
            itemsCountPerPage={itemsPerPage} // 한 페이지랑 보여줄 아이템 갯수
            totalItemsCount={totalItemCount} // 총 아이템 갯수
            pageRangeDisplayed={10} // paginator의 페이지 범위
            prevPageText={"‹"} // "이전"을 나타낼 텍스트
            nextPageText={"›"} // "다음"을 나타낼 텍스트
            onChange={handlePageChange}/> // 페이지 변경을 핸들링하는 함수
    );
};
export default Paging;