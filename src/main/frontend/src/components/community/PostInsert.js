import React, {useCallback, useState} from "react";
import axios from "axios";

const PostInsert = () => {
    const [dataId, setDataId] = useState(0);
    const [posts, setPosts] = useState([]);
    const [formData, setFormData] = useState({
        title:"",
        category:"",
        content:"",
        created_date:new Date(),
    })

    //관심분야 옵션들
    const tagoptions = [
        { value: "취업", name: "취업" },
        { value: "자소서", name: "자소서" },
        { value: "면접", name: "면접" },
        { value: "취미", name: "취미" },
        { value: "영어 공부", name: "영어 공부" },
        { value: "프로그래밍", name: "프로그래밍" },
        { value: "음악", name: "음악" },
        { value: "미술", name: "미술" },
        { value: "스포츠", name: "스포츠" },
        { value: "요리", name: "요리" },
        { value: "건강", name: "건강" },
        { value: "여행", name: "여행" },
        { value: "독서", name: "독서" },
        { value: "투자", name: "투자" },
        { value: "사회봉사", name: "사회봉사" },
        { value: "뉴스", name: "뉴스" },
        { value: "기술 동향", name: "기술 동향" },
        { value: "건축", name: "건축" },
        { value: "환경", name: "환경" },
        {value: "블로그 운영", name: "블로그 운영"},
        // Add more categories as needed
    ];

    //입력데이터 상태관리
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const onInsertPost = useCallback((post) => {
        const {
            title,
            field,
            content,
            created_date
        } = post;

        const selectedCategory = document.querySelector('select[name="category"]').value;

        const newData = {
            title,
            category: selectedCategory,
            content,
            created_date,
            id: dataId,
        };
        setPosts((prevPosts) => [...prevPosts, newData]);

        setDataId((prevDataId) => prevDataId + 1);
        return newData;
    }, [posts, dataId]);

    const handleSubmit = useCallback(e => {
        e.preventDefault();

        if (
            formData.title.trim() === '' &&
            formData.content.trim() === ''
        ) {
            // 하나라도 비어있으면 알림을 표시하거나 다른 처리를 수행할 수 있습니다.
            alert('게시글 정보를 입력해주세요.');

            return; // 창이 넘어가지 않도록 중단
        }
        if (formData.title.trim() === '') {
            alert("제목을 입력해주세요.");
            return;
        }
        if (formData.content.trim() === '') {
            alert("내용을 입력해주세요.");
            return;
        }

        setFormData(onInsertPost(formData));
        console.log(`ffffffffformData: ${JSON.stringify(formData)}`)

        const accessToken = localStorage.getItem('accessToken');

        //TODO 게시글 작성 서버 전송 (스크랩, 공감 제외)
        const response = axios.post("",
            {
                title:formData.title,
                category:formData.category,
                content:formData.content,
            },
            {
                withCredentials: true,
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
            .then((res) => {
                // console.log("전송 성공");
                // console.log(res.data);
                //성공하면
                // navigate("/myopenstudy", {state: formData});

            }).catch((error) => {
                console.log('전송 실패', error);
            })
    }, [formData])

    return (
        <form className="new_post_form" onSubmit={handleSubmit}>
            <div>
                <span>제목</span>
                <input type="text" name="title" value={formData.title} onChange={handleInputChange}/>
            </div>
            <div>
                <span>카테고리</span>
                <span className="field_wrapper">
                    <select name="category" value={formData.category} onChange={handleInputChange}>
                        {tagoptions.map((interest, idx) =>
                            <option key={idx} value={interest.value}>{interest.name}</option>
                        )}
                    </select>
                </span>
            </div>
            <div style={{display:"flex"}}>
                <span style={{paddingLeft: "10px",marginTop:"5px"}}>상세 내용</span>
                <textarea name="content" value={formData.content} onChange={handleInputChange}/>
            </div>
            <div className="btn">
                <input type="submit" value="등록하기" className="register_btn"/>
            </div>
        </form>
    )
}
export default PostInsert;