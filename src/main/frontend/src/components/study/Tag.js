import React, {useCallback, useState} from 'react'


import "../../css/tag_css/Tag.css";

const Tag = () => {
    const [hashtag, setHashtag] = useState('');
    // 해시태그를 담을 배열
    const [hashArr, setHashArr] = useState([]);

    const onChangeHashtag = (e) => {
        setHashtag(e.target.value);
    }
    const onKeyUp = useCallback(
        (e) => {
            /* 요소 불러오기, 만들기*/
            const $HashWrapOuter = document.querySelector('.tag_wrapper');

            /* enter 키 코드 :13 */
            if (e.keyCode === 13 && e.target.value.trim() !== '') {
                console.log('Enter Key 입력됨!', e.target.value);

                // 새로운 해시태그를 생성하고 추가합니다.
                const newHashTag = '#' + e.target.value;
                setHashArr((hashArr) => [...hashArr, newHashTag]);

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
            }
        }, [hashtag, hashArr]
    )

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