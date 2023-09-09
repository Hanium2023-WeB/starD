const StudyInfo = ({ study, handleEditClick, handleStudyDelete }) => {
    const showregion = () => {
        if (study.onoff === "offline" || study.onoff === "both") {
            return (
            <li>
                <span>지역</span>
                <span>{study.sido} </span>
                <span>{study.gugun}</span>
            </li>
            )
        }
    }
    return (
        <>
            <div className="study_header">
                <h2 className="study_title">{study.title}</h2>
                <div>
                    <div className="study_author_info">
                        <p className="study_author">{study.author}</p>
                        <p className="study_created_date">{study.created_date}</p>
                    </div>
                    <div className="study_detail_btn">
                        <button className="study_edit" onClick={handleEditClick}>수정</button>
                        <button className="study_remove" onClick={handleStudyDelete}>삭제</button>
                    </div>
                </div>
            </div>
            <div className="study_content">
                <ul className="study_info">
                    <li>
                        <span>분야</span>
                        <span>{study.field}</span>
                    </li>
                    <li>
                        <span>스터디 태그</span>
                        <span>{study.tag}</span>
                    </li>
                    <li>
                        <span>모집 중</span>
                        <span>{study.number}</span>
                    </li>
                    <li>
                        <span>진행 방식</span>
                        <span>{study.onoff}</span>
                    </li>
                    {showregion()}
                    <li>
                        <span>모집 마감일</span>
                        <span>{study.deadline}</span>
                    </li>
                    <li>
                        <span>스터디 시작일</span>
                        <span>{study.startDate}</span>
                    </li>
                    <li>
                        <span>스터디 종료일</span>
                        <span>{study.endDate}</span>
                    </li>
                </ul>
            </div>
        </>
    );
};
export default StudyInfo;
