import {useState} from "react";
import "../../css/study_css/StudyDetail.css";
const StudyApplyList = () => {
    // const [applyList, setApplyList] = useState([]);
    return (
        <table className="study_apply_list">
            <th>신청자 이름</th>
            <th>지원동기 및 각오</th>
            <th>상태</th>
            {/*{applyList.map((d, index) => (*/}
                <tr>
                    <td>김솜솜</td>
                    <td>
                        <button>보기</button>
                    </td>
                    <td>
                        <span><button>수락</button></span>
                        <span><button>거절</button></span>
                    </td>
                </tr>
            {/*))}*/}
        </table>
    )
}
export default StudyApplyList;