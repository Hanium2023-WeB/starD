import React, {useState} from "react";

const PostEdit = ({post, onUpdatePost, onCancel}) => {
    const [updatedPost, setUpdatedPost] = useState(post);

    const [selectedCategory, setSelectedCategory] = useState(post.category);

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

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setUpdatedPost((prevPost) => ({
            ...prevPost,
            [name]: value,
        }));
    }

    const handleUpdateClick = () => {
        onUpdatePost(updatedPost);
    }

    return (
        <form className="new_post_form">
            <div>
                <span>제목</span>
                <input type="text" name="title" value={updatedPost.title} onChange={handleInputChange}/>
            </div>
            <div>
                <span>카테고리</span>
                <span className="field_wrapper">
                    <select name="category" value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
                        {tagoptions.map((interest, idx) =>
                            <option key={idx} value={interest.value}>{interest.name}</option>
                        )}
                    </select>
                </span>
            </div>
            <div style={{display:"flex"}}>
                <span style={{paddingLeft: "10px",marginTop:"5px"}}>상세 내용</span>
                <textarea name="content" value={updatedPost.content} onChange={handleInputChange}/>
            </div>
            <div className="btn">
                <button onClick={handleUpdateClick} className="register_btn">저장</button>
                <button onClick={onCancel} className="register_btn">취소</button>
            </div>
        </form>
    );
}
export default PostEdit;