import {useState} from "react";

const StudyApplyList = () => {
    // const [applyList, setApplyList] = useState([]);
    return (
        <table>
            <th>신청자 이름</th>
            <th>지원동기 및 각오</th>
            <th>상태</th>
            {/*{applyList.map((d, index) => (*/}
                <tr>
                    <td></td>
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