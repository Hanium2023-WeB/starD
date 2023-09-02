import CommentForm from "./CommentForm";
import {useState} from "react";
import CommentList from "./CommentList";

const Comment = () => {
    const [comments, setComments] = useState([]);
    const addComment = (newComment) => {
        const commentWithInfo = {
            content: newComment,
            author: "닉네임",
            created_at: new Date().toLocaleString(),
        }
        setComments([...comments, commentWithInfo]);
    };
    return (
        <div className="comment_form">
            <div>
                <h2>댓글</h2>
                <CommentForm comments={comments} addComment={addComment}/>
                <CommentList comments={comments}/>
            </div>
        </div>
    );
}
export default Comment;