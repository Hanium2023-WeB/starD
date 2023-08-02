package com.web.stard.controller;

import com.web.stard.domain.Member;
import com.web.stard.service.MemberService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@Controller
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
    private final PasswordEncoder passwordEncoder;


    @GetMapping("/signup")
    public String signupForm(Model model) {
        model.addAttribute("member", new Member());
        return "sign_up";
    }

    // 회원 가입
    @PostMapping("/signup")
    public String saveMember(@ModelAttribute Member member) {
        // 패스워드 인코딩
        String encodedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encodedPassword);

/*
        System.out.println("이름: " + member.getName());
        System.out.println("아이디: " + member.getId());
        System.out.println("닉네임: " + member.getNickname());
        System.out.println("비밀번호: " + member.getPassword());
        System.out.println("이메일: " + member.getEmail());
        System.out.println("전화번호: " + member.getPhone());
*/

        // 중복 아이디 검증 - server
        boolean isDuplicate = memberService.checkDuplicateMember(member.getId());
        if (isDuplicate) {
            System.out.println("이미 존재하는 아이디입니다.");
            return "redirect:/signup";
        }

        memberService.saveMember(member);
        return "redirect:/";
    }

    // 중복 아이디 검증 - client
    @GetMapping("/checkDuplicateID")
    public ResponseEntity<Map<String, Boolean>> checkDuplicateID(@RequestParam String id) {
        Map<String, Boolean> response = new HashMap<>();
        boolean isDuplicate = memberService.checkDuplicateMember(id);

        System.out.println("검증 아이디: " + id);
        System.out.println("중복 여부: " + isDuplicate);

        response.put("duplicate", isDuplicate);
        return ResponseEntity.ok(response);
    }

}
