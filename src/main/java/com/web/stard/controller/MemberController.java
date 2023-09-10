package com.web.stard.controller;

import com.web.stard.domain.Member;
import com.web.stard.domain.Profile;
import com.web.stard.service.MemberService;
import com.web.stard.service.ProfileService;
import com.web.stard.service.SignUpService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
    private final SignUpService signUpService;

    /*@GetMapping("/signup")
    public String signupForm(Model model) {
        model.addAttribute("member", new Member());
        return "sign_up";
    }*/

    // 회원 가입
    @PostMapping("/signup")
    public Member saveMember(@RequestBody Member member) {
        return signUpService.saveMember(member);
    }

    // 중복 아이디 검증 - client
    @GetMapping("/checkDuplicateID")
    public boolean checkDuplicateID(@RequestParam String id) {
        return signUpService.checkDuplicateMember(id);
    }

    // 중복 닉네임 검증 - client
    @GetMapping("/checkDuplicateNickname")
    public boolean checkDuplicateNickname(@RequestParam String nickname) {
        return signUpService.checkNickname(nickname);
    }

    // [R] 아이디 찾기
    @GetMapping("/member/find-id")
    private Member findId(@RequestParam(value = "email") String email, @RequestParam(value = "phone") String phone) {
        return memberService.findId(email, phone);
    }

}
