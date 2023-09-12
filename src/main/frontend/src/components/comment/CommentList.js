import React, {useEffect, useState} from "react";
import ReplyForm from "./ReplyForm";

const CommentList = ({comments, onEditClick, onRemoveClick, onReplySubmit, setRepliesFun}) => {
    const [replyIndex, setReplyIndex] = useState(null);
    //const [replies, setReplies] = useState(Array(comments.length).fill([])); // 각 댓글에 대한 답글 리스트
    const [replies, setReplies] = useState(
        comments.map(() => [])
    );
    const handleReplyClick = (index) => {
        setReplyIndex(replyIndex === index ? null : index);
    };

    const handleReplyCancel = () => {
        setReplyIndex(null);
    };

    const handleReplySubmit = (index, replyContent) => {
        console.log("ggggggggggggggggggggggggggggg" + replies[index]);
        if (index >= 0 && index < comments.length) {
            const newReplies = [...replies];
            const comment = comments[index];
            if (!comment.replies) {
                comment.replies = []; // 해당 댓글에 대한 답글 배열이 없는 경우 초기화
            }
            const reply = {
                content: replyContent,
                author: "User", // 답글 작성자 설정
                created_at: new Date().toLocaleString(), // 현재 시간 저장
            };
            comment.replies.push(reply); // 해당 댓글에 답글 추가
            newReplies[index] = [...comment.replies]; // 답글 배열을 업데이트
            setReplies(newReplies); // 업데이트된 답글 배열로 설정

            // 부모 컴포넌트로 답글 전달
            // onReplySubmit(comment.id, replyContent);
            handleReplyCancel();
        }
        console.log("ddddggggggggggggg" + replies[index]);

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
                                author={comment.author}
                                onReplySubmit={(replyContent) => {
                                    handleReplySubmit(index, replyContent); // 댓글 인덱스와 답글 내용 전달
                                }}
                                onCancel={handleReplyCancel}
                            />
                        )}

                        {/* 아래에 해당 댓글에 대한 답글 목록을 렌더링 */}
                        {comment.replies && comment.replies.length > 0 && (
                            <ul>
                                {comment.replies.map((reply, replyIndex) => (
                                    <li key={replyIndex} className="reply">
                                        <span> └ &nbsp;&nbsp;</span>
                                        <strong>{comment.author}</strong>
                                        <div style={{ float: "right" }}>
                                            <span className="comment_edit_btn" onClick={() => onEditClick(index)}>수정</span>
                                            <span>&nbsp;&nbsp; | &nbsp;&nbsp;</span>
                                            <span className="comment_remove_btn" onClick={() => onRemoveClick(comment.id)}>삭제</span>
                                        </div>
                                        <div className="reply_content">
                                            <p>{reply.content}</p>
                                            <span>{reply.created_at}</span>
                                            <span>&nbsp;&nbsp; | &nbsp;&nbsp;</span>
                                            <span className="comment_report_btn">신고</span><br/>
                                        </div>
                                        {/*<button onClick={() => handleReplyClick(index)} style={{marginLeft:"20px"}}>답글</button>*/}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}

            </ul>
        </div>
    );
};
export default CommentList;