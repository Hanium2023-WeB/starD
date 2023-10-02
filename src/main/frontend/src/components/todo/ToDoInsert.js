import React, {useState, useRef, useCallback, useEffect} from "react";
import ToDoInserts from "../../css/todo_css/ToDoInsert.css";
import axios, {post} from "axios";
import {useLocation} from "react-router-dom";

//투두 리스트 추가 함수
//추가할 부분: 서버에서 참여 중인 스터디 내역, 참여 멤버 가지고 오기
//투두리스트 데이터 구조 변경 -> 아이디,스터디 ,할 일,날짜, 담당자

const ToDoInsert = ({onInsert, dueDate}) => {
    const accessToken = localStorage.getItem('accessToken');
    const [studies, setStudy] = useState([]);//참여 중인 스터디 리스트
    const [studyTitles, setStudyTitles] = useState([]); //참여 중인 스터디 제목
    const [studyIds, setStudyIds] = useState([]); //참여 중인 스터디 아이디
    const [studyMems, setStudyMems] = useState(""); //참여 멤버
    const [responseData , setResponseData] = useState([]);



    // TODO 서버에서 참여스터디와 참여멤버 가져오기
    useEffect(() => {
        axios.get("http://localhost:8080/user/mypage/studying", {
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then((res) => {
                console.log("모집완료된 스터디, 참여멤버 전송 성공 : ", res.data);

                const studyList = res.data.content;
                setStudy(studyList);
                // console.log("모집완료 ? :", studies);
                const studiesTitle = studyList.map(item => item.study.title);
                setStudyTitles(studiesTitle);
                const studiesIds = studyList.map(item => item.study.id);
                setStudyIds(studiesIds);
                const ParticipatedStudiesMem = studyList.map(item => item.member.id);
                setStudyMems(ParticipatedStudiesMem[0]);

                console.log("참여 스터디 아이디", studiesIds);
                console.log("참여 스터디 제목", studiesTitle);
                console.log("참여중인 스터디", studyList);
                console.log("참여멤버", ParticipatedStudiesMem);


            })
            .catch((error) => {
                console.error("모집완료된 스터디, 참여멤버  가져오기 실패:", error);
            });

    }, [accessToken]);

    //할 일 state
    const [TaskValue, setTaskValue] = useState('');

    //어떤 스터디의 할 일인지 상태
    const [InsertToDoTitle, setInsertToDoTitle] = useState("")
    const [InsertToDoStudyId, setInsertToDoStudyId] = useState("")
    const [InsertToDoStudy, setInsertToDoStudy] = useState([]); //선택한 스터디 객체
    const studyIdAsNumber = parseFloat(InsertToDoStudyId);
    const nextId = useRef(1);
    const onChange = useCallback(e => {
        setTaskValue(e.target.value);
    }, [])

    //할 일 추가 버튼 함수
    const onSubmit = useCallback(
        async (e) => {
            if (TaskValue !== '') {
                onInsert(InsertToDoTitle, TaskValue, InsertToDoStudyId);
            } else {
                alert("할 일을 입력해 주세요.");
                return;
            }
            setTaskValue(''); //value 초기화
            //기본이벤트(새로고침) 방지

            e.preventDefault();

            try {
                // Step 1: 먼저 필요한 데이터를 서버에서 가져옵니다.
                const fetchDataResponse = await axios.get(`http://localhost:8080/todo/all`, {
                    params: {
                        year: dueDate.getFullYear(),
                        month: dueDate.getMonth() + 1,
                    },
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                // Handle the response data here if needed
                console.log('가져오기 성공:', fetchDataResponse.data);
                setResponseData(fetchDataResponse.data);
                console.log("studyIdAsNumber:", studyIdAsNumber);

                const studyId = studyIdAsNumber;
                const assigneeStr = studyMems;
                const task = TaskValue;
                const study = InsertToDoStudy;
                // const year = dueDate.getFullYear();
                // const month = String(dueDate.getMonth() + 1).padStart(2, '0');
                // const day = String(dueDate.getDate()).padStart(2, '0');
                // const hours = String(dueDate.getHours()).padStart(2, '0');
                // const minutes = String(dueDate.getMinutes()).padStart(2, '0');
                // const seconds = String(dueDate.getSeconds()).padStart(2, '0');
                //
                // const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
                // Step 2: 가져온 데이터와 사용자 입력 데이터를 사용하여 POST 요청을 보냅니다.
                const postData = {
                    studyId: studyId,
                    toDo: {
                        id:nextId.current,
                        study: study,
                        task: task,
                        dueDate: dueDate,
                        assigneeStr: assigneeStr,
                    },
                    assigneeStr: assigneeStr,  // Convert studyMems to a comma-separated string
                };

                const postDataResponse = await axios.post(`http://localhost:8080/todo`,postData,{
                    params:{
                        studyId: studyId,
                        assigneeStr: assigneeStr,
                    },
                    withCredentials: true,
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });

                console.log("전송 성공:", postDataResponse.data);

                // Call the onInsert function to update your component's state with the new task
                onInsert(InsertToDoTitle, TaskValue,InsertToDoStudyId);
                // Clear the input field
                setTaskValue("");
            } catch (error) {
                console.error("에러:", error);
            }

        },
        [InsertToDoTitle, TaskValue, InsertToDoStudyId, dueDate, accessToken, onInsert]
    );

    useEffect(()=>{
        console.log('투두리스트:', responseData);
    },[responseData]);

    const selectStudy = (e) => {
        setInsertToDoTitle(e.target.value)
        if (e.target.value !== "전체") {
            const selectedStudy = studies.find((study) => study.study.title === e.target.value);
            const selectedId = selectedStudy.study.id;
            setInsertToDoStudyId(selectedId);
            setInsertToDoStudy(selectedStudy);
            console.log(e.target.value);
            console.log(selectedId);
        }
    }
    return (
        <form className="TodoInsert">
            <select id="todo-select" onChange={selectStudy} value={InsertToDoTitle}>
                <option value="전체">전체</option>
                {studyTitles.map((item, index) => (
                    <option key={index} value={item}>{item}</option>

                ))}
            </select>
            <input id={"insert-input"} onChange={onChange}
                   value={TaskValue}
                   placeholder="할 일을 입력하세요"/>
            <button type="submit" onClick={onSubmit}>입력</button>
        </form>
    );
};
export default ToDoInsert;