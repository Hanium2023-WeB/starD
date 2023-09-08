import React, {useCallback, useEffect, useState} from 'react'


import "../../css/tag_css/Tag.css";

const Tag = ({onTagChange, tags}) => {
    const [hashtag, setHashtag] = useState('');
    // 해시태그를 담을 배열
    const [hashArr, setHashArr] = useState([]);
    let newHashTag = "";

    const onChangeHashtag = (e) => {
        setHashtag(e.target.value);
    }

    const onKeyUp = useCallback(
        (e) => {
            /* 요소 불러오기, 만들기*/
            const $HashWrapOuter = document.querySelector('.tag_wrapper');

            /* 쉼표 키 코드 :188 */
            if (e.keyCode === 188 && e.target.value.trim() !== '') {
                console.log('쉼표 Key 입력됨!', e.target.value);

                // 새로운 해시태그를 생성하고 추가합니다.
                newHashTag = ('#' + e.target.value).replace(/,/, "");
                console.log("newHashTag" + newHashTag);
                setHashArr((hashArr) => [...hashArr, newHashTag]);
                // console.log("hashArr " + hashArr);

                // 입력값과 배열 초기화
                setHashtag('');
                e.target.value = '';

                // 해시태그 목록을 화면에 표시
                const $HashWrapInner = document.createElement('div');
                $HashWrapInner.className = 'HashWrapInner';
                $HashWrapInner.innerHTML = newHashTag;

                // 클릭 이벤트 처리
                $HashWrapInner.addEventListener('click', () => {
                    $HashWrapOuter?.removeChild($HashWrapInner);
                    setHashArr(hashArr.filter((hashtag) => hashtag !== newHashTag));
                });

                // 화면에 추가
                $HashWrapOuter?.insertBefore($HashWrapInner, e.target);

                onTagChange(hashArr);
                setHashtag('');
            }
        }, [hashtag, hashArr]
    )

    useEffect(() => {
        tags = hashArr;
        console.log("tags " , tags);
        console.log("hashArr " , hashArr);
    },[newHashTag, hashArr])

    return (
        <div className="tag_wrapper">
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

    )
}

export default Tag;