// import React, { useState, useEffect, useRef } from "react";
// import "../css/Mypage.css";

// const Scrap = () => {
//   const dataId = useRef(0);
//   const [state, setState] = useState([]);

//   //api 사용하기
//   const getData = async () => {
//     const res = await fetch(
//       "https://jsonplaceholder.typicode.com/comments"
//     ).then((res) => res.json());
//     const initDate = res.slice(0, 4).map((it) => {
//       return {
//         author: it.email,
//         content: it.body,
//         last: 5,
//         created_date: new Date().getTime(),
//         id: dataId.current++,
//       };
//     });
//     setState(initDate);
//     // console.log(initDate);
//   };

//   useEffect(() => {
//     //페이지가 마운트 되자마자 api호출
//     getData();
//   }, []);

//   return (
//     <div className="list_story">
//       {state.map((d) => (
//         <div className="story_detail">
//           <p>{d.author}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Scrap;
