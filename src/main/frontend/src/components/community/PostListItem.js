import {Link} from "react-router-dom";

const PostListItem = ({posts}) => {
    return (
        <tr className="post_list">
            <td className="community_category">{posts.category}</td>
            <Link to={"/postdetail"}
                  style={{
                      textDecoration: "none",
                      color: "inherit",
                  }}>
                <td className="community_title">{posts.title}</td>
            </Link>
            <td className="community_nickname">{posts.author}</td>
            <td className="community_datetime">{posts.created_date}</td>
            <td>3</td>
            <td>1</td>
            <td>0</td>
        </tr>
    )
}
export default PostListItem;