import CommentForm from "./CommentForm";
import {useRef, useState} from "react";
import CommentList from "./CommentList";
import CommentEdit from "./CommentEdit";
import ReplyForm from "./ReplyForm";

const Comment = () => {
    const [comments, setComments] = useState([]);
    const [editingComment, setEditingComment] = useState(null); // 수정 중인 댓글 상태 추가

    //댓글에 답글을 작성하는 중인지 여부와 어떤 댓글에 답글을 작성하는지를 추적하는 상태
    const [replyingTo, setReplyingTo] = useState({ commentId: null, author: null });
    const [replies, setReplies] = useState([]); // replies 배열 초기화

    const nextId = useRef(1);

    const setRepliesFun = (replies) => {
        setReplies(replies);
    }
    const addComment = (newComment) => {
        const commentWithInfo = {
            id: nextId.current++,
            content: newComment,
            author: "닉네임",
            created_at: new Date().toLocaleString(),
            isEditing:false,
        }
        setComments([...comments, commentWithInfo]);
    };

    const handleEditClick = (index) => {
        const updatedComments = [...comments];
        updatedComments[index].isEditing = !updatedComments[index].isEditing;
        setEditingComment(updatedComments[index].isEditing ? updatedComments[index] : null);
        setComments(updatedComments);
    };

    const handleCommentSave = (editedComment, index) => {
        // 수정한 댓글 저장
        const updatedComments = comments.map((c) =>
            c.id === editedComment.id ? editedComment : c
        );
        setComments(updatedComments);
        setEditingComment(null);
    };

    const handleRemoveClick = (id) => {
        const confirmDelete = window.confirm("댓글을 삭제하시겠습니까?");
        if (confirmDelete) {
            const updatedComment = comments.filter(comment => comment.id !== id);
            setComments(updatedComment);
        }
    }

    const handleReplyClick = (commentId, author) => {
        setReplyingTo({ commentId, author });
    };

    const handleCancelReply = () => {
        // 답글 작성 모드를 종료합니다.
        setReplyingTo({ commentId: null, author: null });
    };

    const handleReplySubmit = (commentId, replyContent) => {
        // commentId는 어떤 댓글에 대한 답글인지를 식별하는 데 사용합니다.
        // replyContent는 답글 내용입니다.

        // 여기에서 부모 컴포넌트로 답글을 전달하는 로직을 구현합니다.
        // 예를 들어, comments 배열을 업데이트하고 setComments를 호출하여 답글을 추가할 수 있습니다.
        // 답글 정보를 생성하고 comments 배열에 추가하는 방법은 이전에 구현한 addComment와 유사할 것입니다.

        const newReply = {
            id: nextId.current++, // 다음 ID 부여
            content: replyContent,
            author: "닉네임", // 작성자 이름 또는 정보 설정
            created_at: new Date().toLocaleString(),
            isEditing: false,
        };

        // 댓글 목록에 답글을 추가합니다.
        const updatedComments = comments.map((comment) => {
            if (comment.id === commentId) {
                if (!comment.replies) {
                    comment.replies = []; // replies 배열 초기화
                }
                comment.replies.push(newReply);
            }
            return comment;
        });

        // 상태를 업데이트합니다.
        setComments(updatedComments);
    };

    return (
        <div className="comment_form">
            <div>
                <h2>댓글</h2>
                <CommentForm addComment={addComment}/>
                <CommentList
                    comments={comments}
                    setRepliesFun={setRepliesFun}
                    onEditClick={handleEditClick}
                    onRemoveClick={handleRemoveClick}
                    onReplyClick={handleReplyClick}
                    onReplySubmit={handleReplySubmit}
                />
            </div>
            {editingComment && (
                <CommentEdit
                    comment={editingComment}
                    onCancel={() => setEditingComment(null)}
                    onSave={handleCommentSave}
                />
            )}
        </div>
    );
}
export default Comment;