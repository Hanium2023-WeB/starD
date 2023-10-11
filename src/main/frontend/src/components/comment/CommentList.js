import React, {useState} from "react";
import Report from "../report/Report.js";

const formatDatetime = (datetime) => {
  const date = new Date(datetime);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const formattedDatetime = `${year}-${month}-${day} ${hours}:${minutes}`;
  return formattedDatetime;
};

const CommentList = ({ comments, onEditClick, onRemoveClick, onReplySubmit, userNickname }) => {
  const [showReportModal, setShowReportModal] = useState(false); // 모달 상태 변수 추가
  const [reportCommentId, setReportCommentId] = useState(null); // 신고할 댓글 ID 상태 변수 추가

  // 모달 열기 핸들러 함수
  const handleOpenReportModal = (commentId) => {
    setReportCommentId(commentId);
    setShowReportModal(true);
  };

  // 모달 닫기 핸들러 함수
  const handleCloseReportModal = () => {
    setReportCommentId(null);
    setShowReportModal(false);
  };

  // 모달에서 신고 사유를 처리하는 함수
  const handleReportSubmit = (reportReason) => {
    // reportReason을 처리하는 로직을 추가하세요.
    console.log("신고 사유:", reportReason);
  };

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
              {/* 댓글 작성자와 현재 로그인한 사용자를 비교하여 버튼 표시 여부 결정 */}
              {comment.author === userNickname && (
                <>
                  <span className="comment_edit_btn" onClick={() => onEditClick(comment.id)}>
                    수정
                  </span>
                  <span>&nbsp;&nbsp; | &nbsp;&nbsp;</span>
                  <span className="comment_remove_btn" onClick={() => onRemoveClick(comment.id)}>
                    삭제
                  </span>
                </>
              )}
            </div>
            <p>{comment.content}</p>
            <span>{formatDatetime(comment.createdAt)}</span>
            {comment.createdAt !== comment.updatedAt && ( // createdAt과 updatedAt이 다른 경우에만 표시
              <>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span>( 수정: {formatDatetime(comment.updatedAt)} )</span>
              </>
            )}
            {comment.author !== userNickname && (
              <>
                <span>&nbsp;&nbsp; | &nbsp;&nbsp;</span>
                <span className="comment_report_btn"
                      onClick={() => handleOpenReportModal(comment.id)}>신고</span>
              </>
            )}
          </li>
        ))}
      </ul>
      <Report
          show={showReportModal}
          handleClose={handleCloseReportModal}
          onReportSubmit={handleReportSubmit}
          targetId={reportCommentId} // targetId 전달
      />
    </div>
  );
};

export default CommentList;
