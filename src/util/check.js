export function isEmail(asValue) { //이메일 정규식
    var regExp = /^[a-zA-Z]+[a-zA-Z0-9]*@[a-zA-Z0-9]+\.[a-zA-Z]+$/;
    return regExp.test(asValue);  
}
export function isPassword(asValue){ //비밀번호 정규식 최소 8 자, 최소 하나의 문자, 하나의 숫자 및 하나의 특수 문자 
    var regExp =/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@!%*#?&])[A-Za-z\d@!%*#?&]{8,}$/;
  return regExp.test(asValue);  
}
