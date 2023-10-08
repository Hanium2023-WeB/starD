import React, {useState} from "react";

const PostEdit = ({post, onUpdatePost, onCancel}) => {
    const [updatedPost, setUpdatedPost] = useState(post);

    const [selectedCategory, setSelectedCategory] = useState(post.category);

    const tagoptions = [
        { value: "웹 개발", name: "웹 개발" },
        { value: "앱 개발", name: "앱 개발" },
        { value: "머신러닝", name: "머신러닝" },
        { value: "데이터 분석", name: "데이터 분석" },
        { value: "게임 개발", name: "게임 개발" },
        { value: "블록체인", name: "블록체인" },
        { value: "네트워크 보안", name: "네트워크 보안" },
        { value: "클라우드 컴퓨팅", name: "클라우드 컴퓨팅" },
        { value: "인공지능", name: "인공지능" },
        { value: "사이버 보안", name: "사이버 보안" },
        { value: "소프트웨어 테스트", name: "소프트웨어 테스트" },
        { value: "로봇공학", name: "로봇공학" },
        { value: "사물인터넷 (IoT)", name: "사물인터넷 (IoT)" },
        { value: "데이터베이스 관리", name: "데이터베이스 관리" },
        { value: "UI/UX 디자인", name: "UI/UX 디자인" },
        { value: "프로젝트 관리", name: "프로젝트 관리" },
        { value: "빅데이터", name: "빅데이터" },
        { value: "컴퓨터 그래픽스", name: "컴퓨터 그래픽스" },
        { value: "자동화", name: "자동화" },
        { value: "블로그 운영", name: "블로그 운영" },
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