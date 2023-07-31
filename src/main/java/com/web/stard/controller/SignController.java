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
    @PostMapping("/sign-in")
    public ResponseEntity<String>  signIn_(@RequestBody MemberRequestDto memberRequestDto) throws RuntimeException {

        Member member = signService.signIn(memberRequestDto.getUsername(), memberRequestDto.getPassword());

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

}
