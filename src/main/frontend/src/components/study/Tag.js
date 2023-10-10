// import React, {useCallback, useEffect, useState} from 'react'
//
//
// import "../../css/tag_css/Tag.css";
//
// const Tag = ({onTagChange, tags}) => {
//     const [hashtag, setHashtag] = useState('');
//     // 해시태그를 담을 배열
//     const [hashArr, setHashArr] = useState(tags);
//     const [tag, setHashTag] = useState(tags);
//     let newHashTag = "";
//
//     // 태그 초기 값 설정
//     useEffect(() => {
//         if (typeof tags === "string") {
//             setHashArr(tags);
//         }
//     }, [tags]);
//
//     //해시태그 변경상태관리함수
//     const onChangeHashtag = (e) => {
//         setHashtag(e.target.value);
//     }
//     const onKeyUp = useCallback(
//         (e) => {
//             /* 요소 불러오기, 만들기*/
//             const $HashWrapOuter = document.querySelector('.tag_wrapper');
//
//             /* 쉼표 키 코드 :188 */
//             if (e.keyCode === 188 && e.target.value.trim() !== '') {
//                 console.log('쉼표 Key 입력됨!', e.target.value);
//
//                 // 새로운 해시태그를 생성하고 추가합니다.
//                 const newHashTag = `${e.target.value.replace(/,/g, '').trim()}`; // 쉼표 다음의 모든 공백 제거
//                 setHashArr((prevTags) => prevTags + `,${newHashTag}`);
//                 console.log("newHashTag" + newHashTag);
//                 // console.log("hashArr " + hashArr);
//
//                 // 입력값과 배열 초기화
//                 setHashtag('');
//                 e.target.value = '';
//
//                 해시태그 목록을 화면에 표시
//                 const $HashWrapInner = document.createElement('div');
//                 $HashWrapInner.className = 'HashWrapInner';
//                 $HashWrapInner.innerHTML = "#" + newHashTag;
//
//                 // 클릭 이벤트 처리
//                 $HashWrapInner.addEventListener('click', () => {
//                     $HashWrapOuter?.removeChild($HashWrapInner);
//                     setHashArr(hashArr.filter((hashtag) => hashtag !== newHashTag));
//                 });
//
//                 // 화면에 추가
//                 $HashWrapOuter?.insertBefore($HashWrapInner, e.target);
//
//                 // setHashtag('');
//                 // setHashArr((hashArr) => [...hashArr, hashtag.trim().replace(/,/, "")]);
//                 // onTagChange(hashArr.join(', '));
//             }
//         }, []
//     )
//
//     useEffect(() => {
//         // 태그 정보가 변경될 때 콜백을 통해 부모 컴포넌트로 전달
//         onTagChange(hashArr); // 변경된 부분: tags 배열 그대로 전달
//     }, [hashArr, onTagChange]);
//
//     const tagArray = hashArr.split(',').map(tag => tag.trim());
//     return (
//         <div className="tag_wrapper">
//             {/* 초기 태그 목록 렌더링 */}
//             <div className="tag_list">
//                 {tagArray.map((tag, index) => (
//                     <div key={index} className="HashWrapInner">
//                         #{hashArr}
//                     </div>
//                 ))}
//             </div>
//             <input
//                 className="tag_input"
//                 type="text"
//                 name="tag"
//                 value={hashtag}
//                 onChange={onChangeHashtag}
//                 onKeyUp={onKeyUp}
//                 placeholder="해시태그 입력"
//             />
//
//         </div>
//     )
// }
//
// export default Tag;

import React, { useCallback, useEffect, useState } from 'react';

import '../../css/tag_css/Tag.css';

const Tag = ({ onTagChange, tags }) => {
    const [hashtag, setHashtag] = useState('');
    const [tagString, setTagString] = useState(tags);

    useEffect(() => {
        if (typeof tags === 'string') {
            setTagString(tags);
        }
    }, [tags]);

    const onChangeHashtag = (e) => {
        setHashtag(e.target.value);
    };

    const onKeyUp = useCallback(
        (e) => {
            const $HashWrapOuter = document.querySelector('.tag_wrapper');

            if (e.keyCode === 188 && e.target.value.trim() !== '') {
                const newHashTag = e.target.value.replace(/,/g, '').trim();
                setTagString((prevTagString) => prevTagString + `,${newHashTag}`);
                setHashtag('');
                e.target.value = '';
            }
        },
        []
    );

    const removeTag = (clickedTag) => {
        const updatedTagString = tagString
            .split(',')
            .map((tag) => tag.trim())
            .filter((tag) => tag !== clickedTag)
            .join(',');

        setTagString(updatedTagString || '');
    };

    useEffect(() => {
        onTagChange(tagString);
    }, [tagString, onTagChange]);

    const tagArray = tagString.length > 0 ? tagString.split(',').map((tag) => tag.trim()) : "";

    return (
        <div className="tag_wrapper">
            {tagArray.length > 0 && (
                <div className="tag_list">
                    {tagArray.map((tag, index) => (
                        <div
                            key={index}
                            className="HashWrapInner"
                            onClick={() => removeTag(tag)}
                        >
                            #{tag}
                        </div>
                    ))}
                </div>
            )}
            <input
                className="tag_input"
                type="text"
                name="tag"
                value={hashtag}
                onChange={onChangeHashtag}
                onKeyUp={onKeyUp}
                placeholder="해시태그 입력"
            />
        </div>
    );
};

export default Tag;

