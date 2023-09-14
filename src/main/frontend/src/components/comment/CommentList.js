import React from "react";

const CommentList = ({ comments, onEditClick, onRemoveClick, onReplySubmit }) => {
console.log("^comments: ",comments);
 // 댓글 목록이 비어있을 때 빈 배열로 대체
  if (!comments) {
    comments = [];
  }
  return (
    <div className="comment_list">
      <ul>
        {comments.map((comment, index) => (
          <li key={index} className="comment">
            <strong>{comment.author}</strong>
            <div style={{ float: "right" }}>
              <span className="comment_edit_btn" onClick={() => onEditClick(comment.id)}>수정</span>
              <span>&nbsp;&nbsp; | &nbsp;&nbsp;</span>
              <span className="comment_remove_btn" onClick={() => onRemoveClick(comment.id)}>삭제</span>
            </div>
            <p>{comment.content}</p>
            <span>{comment.createdAt}</span>
            <span>&nbsp;&nbsp; | &nbsp;&nbsp;</span>
            <span className="comment_report_btn">신고</span><br/>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentList;
