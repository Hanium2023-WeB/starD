export function isEmail(asValue) { //이메일 정규식
    var regExp = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return regExp.test(asValue);  
}
export function isPassword(asValue){ //비밀번호 정규식 8 ~ 15자 영문, 숫자, 특수문자 조합
    var regExp =/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;
  return regExp.test(asValue);  
}
