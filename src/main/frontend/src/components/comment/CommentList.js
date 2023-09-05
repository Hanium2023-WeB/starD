import React, {useState} from "react";
import ReplyForm from "./ReplyForm";

const CommentList = ({comments, onEditClick, onRemoveClick}) => {
    const [replyIndex, setReplyIndex] = useState(null);
    const [replies, setReplies] = useState(Array(comments.length).fill([])); // 각 댓글에 대한 답글 리스트

    const handleReplyClick = (index) => {
        setReplyIndex(index);
    };

    const handleReplyCancel = () => {
        setReplyIndex(null);
    };

    const handleReplySubmit = (index, replyContent) => {
        const newReplies = [...replies];
        newReplies[index] = [...newReplies[index], replyContent];
        setReplies(newReplies);
        setReplyIndex(null);
    };

    return (
        <div className="comment_list">
            <ul>
                {comments.map((comment, index) => (
                    <li key={index} className="comment">
                        <strong>{comment.author}</strong>
                        <div style={{ float: "right" }}>
                            <span className="comment_edit_btn" onClick={() => onEditClick(index)}>수정</span>
                            <span>&nbsp;&nbsp; | &nbsp;&nbsp;</span>
                            <span className="comment_remove_btn" onClick={() => onRemoveClick(comment.id)}>삭제</span>
                        </div>
                        <p>{comment.content}</p>
                        <span>{comment.created_at}</span>
                        <span>&nbsp;&nbsp; | &nbsp;&nbsp;</span>
                        <span className="comment_report_btn">신고</span><br/>
                        <button onClick={() => handleReplyClick(index)}>답글</button>
                        {replyIndex === index && (
                            // 답글 입력 폼 표시
                            <ReplyForm
                                onReplySubmit={(replyContent) => handleReplySubmit(index, replyContent)}
                                onCancel={handleReplyCancel}
                                author={comment.author}
                            />
                        )}
                    </li>
                ))}

            </ul>
        </div>
    );
};
export default CommentList;