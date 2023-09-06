import {useCallback, useState} from "react";

const CommentEdit = ({comment, onCancel, onSave}) => {
    const [editedComment, setEditedComment] = useState(comment);

    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setEditedComment({
            ...editedComment,
            [name]: value,
        });
    }, [editedComment]);

    const handleSubmit = useCallback(
        (e) => {
            e.preventDefault();
            onSave(editedComment); // 수정된 댓글 저장
        },
        [editedComment, onSave]
    );
    return (
            <form onSubmit={handleSubmit} className="comment_edit_form">
                <input type="text" className="comment_input_edit" name="content"
                       value={editedComment.content}
                       onChange={handleInputChange}/>
                <input type="submit" value="저장" className="comment_submit_btn" />
                <input type="button" value="취소" className="comment_submit_btn" onClick={onCancel}/>
            </form>
    )
}
export default CommentEdit;