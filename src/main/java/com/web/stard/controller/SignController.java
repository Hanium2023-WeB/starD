package com.web.stard.controller;

import com.web.stard.domain.Member;
import com.web.stard.dto.MemberRequestDto;
import com.web.stard.dto.SignInResultDto;
import com.web.stard.service.MemberDetailsService;
import com.web.stard.service.SignService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.AllArgsConstructor;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@AllArgsConstructor
public class SignController {

    private final SignService signService;
    private final MemberDetailsService memberDetailsService;

    @PostMapping("/sign-in2")
    public SignInResultDto signIn(@ApiParam(value = "ID", required = true) @RequestParam String id
            , @ApiParam(value = "PW", required = true) @RequestParam String pw) throws RuntimeException {

        SignInResultDto signInResultDto = signService.signIn(id, pw);
        System.out.println(signInResultDto);

        if (signInResultDto.getCode() == 0) {
            signInResultDto.getToken();
        }

        return signInResultDto;
    }

//    @GetMapping("/success")
//    public ResponseEntity<Map<String, String>> signIn_2(@ApiParam(value = "ID", required = true) @RequestParam String id
//            , @ApiParam(value = "PW", required = true) @RequestParam String pw) throws RuntimeException {
//
//        Member member = signService.signIn_2(id, pw);
//
//        HttpHeaders responseHeaders = new HttpHeaders();
//        HttpStatus httpStatus = HttpStatus.OK;
//        Map<String, String> map =new HashMap<>();
//        map.put("id", member.getId());
//        map.put("role", member.getRoles().getAuthorityName());
//
//        return new ResponseEntity<>(map, responseHeaders, httpStatus);
//
//    }

    @PostMapping("/sign-in")
    public ResponseEntity<String>  signIn_2(@RequestBody MemberRequestDto memberRequestDto) throws RuntimeException {
//    public Member signIn_2( @RequestParam(value = "username", required = true) String username
//            ,  @RequestParam(value = "password", required = true) String password) throws RuntimeException {

        Member member = signService.signIn_2(memberRequestDto.getUsername(), memberRequestDto.getPassword());

        System.out.println(memberRequestDto.getUsername());
        if (member != null) {
            return ResponseEntity.ok("로그인 성공!");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인 실패: 아이디 또는 비밀번호가 올바르지 않습니다.");
        }

    }

    @ExceptionHandler(value = RuntimeException.class)
    public ResponseEntity<Map<String, String>> ExceptionHandler(RuntimeException e) {
        HttpHeaders responseHeaders = new HttpHeaders();

        HttpStatus httpStatus = HttpStatus.BAD_REQUEST;

        Map<String, String> map =new HashMap<>();
        map.put("error type", httpStatus.getReasonPhrase());
        map.put("code", "400");
        map.put("message", "에러 발생");

        return new ResponseEntity<>(map, responseHeaders, httpStatus);
    }

//    @PostMapping(value = "/logout")
//    @ApiOperation(value = "로그아웃")
//    public ResponseEntity<Void> logout(HttpServletRequest servletRequest) {
//
//        signService.logout();
//        return ResponseEntity.ok().build();
//    }


//    @RequestMapping(value = "/login", method = RequestMethod.GET)
//    public String loginPage(HttpServletRequest request) {
//        String referrer = request.getHeader("Referer");
//        System.out.print("referrer: " + referrer);
//        request.getSession().setAttribute("prevPage", referrer);
//        return "login";
//    }

}
