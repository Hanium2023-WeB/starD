import Slide from "../components/Slide.js";

const Study = ({ study, slide }) => {
    const { id, name, release_date, image_url } = study;
    return (
      <li
        className="list_detail"
        id={id}
        style={{
          transform: `translateX(${slide}px)`,
          transition: "0.5s ease",
        }}>
            <p>{id}</p>
        </li>
    )
};
export default Study;