import React, { useEffect, useState, useRef, } from 'react';
 import { selectBOX } from '../../util/SelectBox.js';
 import edit from "../../css/mypage_css/edit.css";
 
function RealEstate () {  // 컴포넌트.

    useEffect(() => { 
        selectBOX();  // 시/도/군/구 selectBOX 생성함수를 컴포넌트가 로드 되자마자 실행해준다.
    
    }, []);

    return (
       <div class="select_estate">
      
          <select name="sido1" id="sido1"></select>
          <select name="gugun1" id="gugun1"></select>

       </div> 
    );
}
export default RealEstate;