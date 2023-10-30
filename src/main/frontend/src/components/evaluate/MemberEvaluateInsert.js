import React, {useCallback, useEffect, useState} from "react";
import { FaStar } from "react-icons/fa";
import styled from 'styled-components';
import axios from "axios";
import {useNavigate} from "react-router-dom";

const MemberEvaluateInsert = ({studyId}) => {
    const navigate = useNavigate();
    const [members, setMembers] = useState([]); // State to store members
    const [formData, setFormData] = useState({
        name:"",
        rating:0,
        reason:""
    })
    const [evaluation, setEvaluation] = useState([]);
    const ARRAY = [0, 1, 2, 3, 4];
    let score = null;
    // 별점 기본값 설정
    const [clicked, setClicked] = useState([false, false, false, false, false]);

    useEffect(() => {
        //study_member 받아오는 axios 코드
    }, [studyId]);

    const handleStarClick = index => {
        let clickStates = [...clicked];
        for (let i = 0; i < 5; i++) {
            clickStates[i] = i <= index ? true : false;
        }
        setClicked(clickStates);
    };

    useEffect(() => {
        sendReview();
    }, [clicked]);

    const sendReview = () => {
        score = clicked.filter(Boolean).length;
        console.log("starsssssss : " + score);
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const onInsertEvaluate = useCallback((eva) => {
        const {
            name,
            rating,
            reason,
        } = eva;

        setEvaluation(prevFormData => ({
            ...prevFormData,
            name,
            rating,
            reason,
        }));
    }, [evaluation]);

    const handleSubmit = useCallback(e => {
        e.preventDefault();

        formData.rating = score;
        onInsertEvaluate(evaluation);

        console.log(formData);
        const accessToken = localStorage.getItem('accessToken');

        const response = axios.post("http://localhost:8080/com",
            {
                name:formData.name,
                rating:score,
                reason:formData.reason,
            },
            {
                withCredentials: true,
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
            .then((res) => {
                console.log(res.data);
            }).catch((error) => {
                console.log('전송 실패', error);
            })
        e.preventDefault();
        // navigate("/");
    }, [formData])

    return (
        <form onSubmit={handleSubmit} style={{width:"100%"}}>
            <table className="evaluate_table">
                <thead>
                <tr>
                    <th>팀원 이름</th>
                    <th>점수</th>
                    <th>사유</th>
                </tr>
                </thead>
                <tbody>
                <tr className="evaluate_list">
                    <td className="member_name">김솜솜</td>
                    <td className="member_rating">
                        <Wrap>
                            <Stars>
                                {ARRAY.map((el, idx) => {
                                    return (
                                        <FaStar
                                            style={{alignItems:"center"}}
                                            key={idx}
                                            size="20"
                                            onClick={() => handleStarClick(el)}
                                            className={clicked[el] && 'yellowStar'}
                                        />
                                    );
                                })}
                            </Stars>
                        </Wrap>
                    </td>
                    <td className="member_evaluate_reason">
                        <textarea name="reason" value={formData.reason} onChange={handleInputChange}/>
                    </td>
                </tr>
                {/*{members.map((member) => (*/}
                {/*    <tr className="evaluate_list">*/}
                {/*        <td className="community_category">{}</td>*/}
                {/*        <td className="community_nickname">{}</td>*/}
                {/*        <td className="community_datetime">{}</td>*/}
                {/*    </tr>*/}
                {/*))}*/}
                </tbody>
            </table>
            <input type="submit" value="등록하기" className="register_btn"/>
        </form>
    )
}
export default MemberEvaluateInsert;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const Stars = styled.div`
display: flex;

& svg {
  color: gray;
  cursor: pointer;
}

:hover svg {
  color: #fcc419;
}

& svg:hover ~ svg {
  color: gray;
}

.yellowStar {
  color: #fcc419;
}
`;