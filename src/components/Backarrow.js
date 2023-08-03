//뒤로가기 컴포넌트
import { useNavigate } from 'react-router-dom';
import edit from "../css/edit.css";
import { ReactComponent as Arrow } from "../images/Arrow.svg";

const Backarrow=()=>{
    const navigate = useNavigate();
    const handleSVGClick =()=>{
     navigate(-1);
    }
    return(
        <div className="backarrow">
        <svg
        onClick={handleSVGClick}
        xmlns="../images/Arrow.svg"
        width="100"
        height="100"
      ><Arrow/>
      </svg>
          <p>개인정보 수정</p>
        </div>
    )
    };
export default Backarrow;