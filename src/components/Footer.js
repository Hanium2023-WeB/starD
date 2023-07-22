//공통 푸터
const Footer = () => {
  return (
    <footer>
      <div className="footer_info">
        <ul className="info_ul">
          <div className="item">
            <p classNam="project name">STAR D</p>
            <li className="introduce_progject">
              <span>STAR D 소개</span>
              <span>스터디 리스트 보기</span>
            </li>
          </div>
          <div className="item">
            <p className="customers_service">고객센터</p>
            <li className="service">
              <span>공지사항</span>
              <span>자주묻는 질문</span>
              <span>문의하기</span>
            </li>
          </div>
          <div className="item">
            <p className="front">프론트</p>
            <li className="dev_info">
              <span>김현수</span>
              <span>허민영</span>
            </li>
          </div>
          <div className="item">
            <p className="back">백엔드</p>
            <li className="dev_info">
              <span>강지륜</span>
              <span>이승연</span>
              <span>차은수</span>
            </li>
          </div>
          <div className="item">
            <p className="infra">인프라</p>
            <li className="dev_info">
              <span>강지륜</span>
              <span>허민영</span>
            </li>
          </div>
        </ul>
        <hr />
        <div className="subfooter_info">
          <ul>
            <div className="item_first">
              <li>STAR D</li>
            </div>{" "}
            |{" "}
            <div className="item1">
              <li>개인정보처리방침</li>{" "}
            </div>
            |{" "}
            <div className="item1">
              <li>이용약관</li>
            </div>
          </ul>
          <div className = "info_etc">
              (주)동덕 We B | 대표자: Gwang Lee | 사업자 번호 : 000-0000-0000
              <br/> 개인정보보호책임자: WeB(위비) | 이메일:
              hf23@gmail.com | 주소: 서울특별시 성북구 화랑로13길 60
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
