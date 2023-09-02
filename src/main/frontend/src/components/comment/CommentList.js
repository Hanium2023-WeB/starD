const CommentList = ({comments}) => {
    return (
        <div className="comment_list">
            <ul>
                {comments.map((comment, index) => (
                    <li key={index} className="comment">
                        <strong>{comment.author}</strong>
                        <p>{comment.content}</p>
                        <span>{comment.created_at}</span>
                        <span>&nbsp;&nbsp; | &nbsp;&nbsp;</span>
                        <span className="comment_report_btn">신고</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default CommentList;