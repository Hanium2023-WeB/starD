import {Link} from "react-router-dom";

const PostListItem = ({posts, setPosts}) => {

    // 날짜, 시간 포맷팅("yyyy-MM-dd HH:mm" 형식)
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

    return (
        <tr className="post_list">
            <td className="community_category">{posts.category}</td>
            <Link to={`/postdetail/${posts.id}`}
                  style={{
                      textDecoration: "none",
                      color: "inherit",
                  }}>
                <td className="community_title">{posts.title}</td>
            </Link>
            <td className="community_nickname">{posts.member.nickname}</td>
            <td className="community_datetime">{formatDatetime(posts.createdAt)}</td>
            <td>{posts.viewCount}</td>
            <td>{posts.starCount}</td>
            <td>{posts.scrapCount}</td>
        </tr>
    )
}
export default PostListItem;