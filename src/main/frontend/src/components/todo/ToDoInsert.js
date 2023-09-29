import React, {useState, useRef, useCallback, useEffect} from "react";
import ToDoInserts from "../../css/todo_css/ToDoInsert.css";
import axios from "axios";
import {useLocation} from "react-router-dom";

//투두 리스트 추가 함수
//추가할 부분: 서버에서 참여 중인 스터디 내역, 참여 멤버 가지고 오기
//투두리스트 데이터 구조 변경 -> 아이디,스터디 ,할 일,날짜, 담당자

const ToDoInsert = ({onInsert, dueDate}) => {
    const accessToken = localStorage.getItem('accessToken');
    const [studies, setStudy] = useState([]);//참여 중인 스터디 리스트
    const [studyTitles, setStudyTitles] = useState([]); //참여 중인 스터디 제목
    const [studyIds, setStudyIds] = useState([]); //참여 중인 스터디 아이디
    const [studyMems, setStudyMems] = useState([]); //참여 멤버

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
                setStudyMems(ParticipatedStudiesMem);

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
    const studyIdAsNumber = parseInt(InsertToDoStudyId, 10); // 10진수로 파싱
    //투두 객체 배열 상태
    const [InsertToDo, setInsertToDo] = useState({
            title: studyIdAsNumber,
            task: TaskValue,
            dueDate: dueDate,
        }
    )

    const onChange = useCallback(e => {
        setTaskValue(e.target.value);
    }, [])

    //할 일 추가 버튼 함수
    const onSubmit = useCallback(
        e => {
            if (TaskValue !== '') {
                onInsert(InsertToDoTitle, TaskValue);
            } else {
                alert("할 일을 입력해 주세요.");
                return;
            }
            setTaskValue(''); //value 초기화
            //기본이벤트(새로고침) 방지
            e.preventDefault();
        }
        , [TaskValue])
    // const onSubmit = useCallback(
    //     (e) => {
    //         e.preventDefault();
    //
    //         // 데이터 전송 요청
    //         axios
    //             .post("http://localhost:8080/todo",{
    //                 headers: {
    //                     Authorization: `Bearer ${accessToken}`,
    //                 },
    //                 params: {
    //                     year: dueDate.getFullYear(),
    //                     month: dueDate.getMonth()+1,
    //                     Authorization: `Bearer ${accessToken}`,
    //                 },
    //
    //             })
    //             .then((response) => {
    //                 console.log("Task created successfully:", response.data);
    //
    //                 // Call the onInsert function to update your component's state with the new task
    //                 onInsert(InsertToDoTitle, TaskValue);
    //
    //                 // Clear the input field
    //                 setTaskValue("");
    //             })
    //             .catch((error) => {
    //                 console.error("Error creating task:", error);
    //             });
    //     },
    //     [InsertToDoTitle, TaskValue, dueDate, onInsert]
    // );

    // const onSubmit = useCallback(
    //     async (e) => {
    //         e.preventDefault();
    //         //Prepare the data to send in the request body
    //         axios.get('http://localhost:8080/todo/all', {
    //             params: {
    //                 year: dueDate.getFullYear(),
    //                 month: dueDate.getMonth() + 1,
    //             },
    //             headers: {
    //                 Authorization: `Bearer ${accessToken}`,
    //             },
    //         })
    //             .then((response) => {
    //                 // Handle the response data here (e.g., update your component's state)
    //                 console.log('가져오기 성공:', response.data);
    //             })
    //             .catch((error) => {
    //                 // Handle any errors that occur during the request
    //                 console.error('가져오기 실패:', error);
    //             });
    //
    //         //Make a POST request to your backend
    //         const todopostrespose = await axios
    //             .post("http://localhost:8080/todo", {
    //                 studyId: InsertToDoStudyId, // Replace with the actual studyId
    //                 toDo: {
    //                     title: InsertToDoTitle,
    //                     task: TaskValue,
    //                 },
    //                 assigneeStr: studyMems.toString(), // Replace with the actual assigneeStr
    //             }, {
    //                 headers: {
    //                     Authorization: `Bearer ${accessToken}`,
    //                 },
    //             })
    //             .then((response) => {
    //                 console.log("전송 성공:", response.data);
    //                 onInsert(InsertToDoTitle, TaskValue);
    //                 setTaskValue("");
    //             })
    //             .catch((error) => {
    //                 console.error("전송 실패", error);
    //             });
    //
    //     },
    //     [InsertToDoTitle, TaskValue, studyIds, studyMems, accessToken, onInsert]
    // );
    // 찐
    // const onSubmit = useCallback(
    //     async (e) => {
    //         e.preventDefault();
    //
    //         try {
    //             // Step 1: 먼저 필요한 데이터를 서버에서 가져옵니다.
    //             const fetchDataResponse = await axios.get(`http://localhost:8080/todo/all`, {
    //                 params: {
    //                     year: dueDate.getFullYear(),
    //                     month: dueDate.getMonth() + 1,
    //                 },
    //                 headers: {
    //                     Authorization: `Bearer ${accessToken}`,
    //                 },
    //             });
    //
    //             // Handle the response data here if needed
    //             console.log('가져오기 성공:', fetchDataResponse.data);
    //
    //             // Step 2: 가져온 데이터와 사용자 입력 데이터를 사용하여 POST 요청을 보냅니다.
    //             const postData = {
    //                 studyId:InsertToDoStudyId,
    //                 toDo: {
    //                     title: InsertToDoTitle,
    //                     task: TaskValue,
    //                     dueDate: dueDate,
    //                 },
    //                 assigneeStr: studyMems.join(','), // Convert studyMems to a comma-separated string
    //             };
    //
    //             const postDataResponse = await axios.post("http://localhost:8080/todo", postData, {
    //                 withCredentials: true,
    //                 headers: {
    //                     'Authorization': `Bearer ${accessToken}`
    //                 }
    //             });
    //
    //             console.log("전송 성공:", postDataResponse.data);
    //
    //             // Call the onInsert function to update your component's state with the new task
    //             onInsert(InsertToDoTitle, TaskValue);
    //             // Clear the input field
    //             setTaskValue("");
    //         } catch (error) {
    //             console.error("에러:", error);
    //         }
    //     },
    //     [InsertToDoTitle, TaskValue, InsertToDoStudyId, dueDate, accessToken, onInsert]
    // );


    //전체 투두 가져오기
    // useEffect(() => {
    //     axios.get('http://localhost:8080/todo/all', {
    //         params: {
    //             year: dueDate.getFullYear(),
    //             month: dueDate.getMonth() + 1,
    //         },
    //         headers: {
    //             Authorization: `Bearer ${accessToken}`,
    //         },
    //     })
    //         .then((response) => {
    //             // Handle the response data here (e.g., update your component's state)
    //             console.log('가져오기 성공:', response.data);
    //         })
    //         .catch((error) => {
    //             // Handle any errors that occur during the request
    //             console.error('가져오기 실패:', error);
    //         });
    // }, []);


    const selectStudy = (e) => {
        setInsertToDoTitle(e.target.value)
        const selectedStudy = studies.find((study) => study.study.title === e.target.value);
        const selectedId = selectedStudy.study.id;
        setInsertToDoStudyId(selectedId);

        console.log(e.target.value);
        console.log(selectedId);

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