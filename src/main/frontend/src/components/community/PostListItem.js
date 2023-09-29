import {Link} from "react-router-dom";

const PostListItem = ({posts}) => {
    return (
        <tr className="post_list">
            <td className="community_category">자소서</td>
            <Link to={"/postdetail"}
                  style={{
                      textDecoration: "none",
                      color: "inherit",
                  }}>
                <td className="community_title">자소서 작성하는데 이런 문장 넣어도 될까요?</td>
            </Link>
            <td className="community_nickname">김솜솜</td>
            <td className="community_datetime">09.27 18:01</td>
            <td>3</td>
            <td>1</td>
            <td>0</td>
        </tr>
    )
}
export default PostListItem;