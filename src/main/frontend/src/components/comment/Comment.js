import CommentForm from "./CommentForm";
import {useRef, useState} from "react";
import CommentList from "./CommentList";
import CommentEdit from "./CommentEdit";

const Comment = () => {
    const [comments, setComments] = useState([]);
    const [editingComment, setEditingComment] = useState(null); // 수정 중인 댓글 상태 추가

    const nextId = useRef(1);

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

    return (
        <div className="comment_form">
            <div>
                <h2>댓글</h2>
                <CommentForm addComment={addComment}/>
                <CommentList comments={comments} onEditClick={handleEditClick} onRemoveClick={handleRemoveClick}/>
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