package com.web.stard.controller;

import com.web.stard.domain.Member;
import com.web.stard.service.MemberService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

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

    // 회원 정보를 데이터베이스에 저장
    @PostMapping("/signup")
    public String saveMember(@ModelAttribute Member member) {
        // 패스워드 인코딩
        String encodedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encodedPassword);

        System.out.println("이름: " + member.getName());
        System.out.println("아이디: " + member.getId());
        System.out.println("닉네임: " + member.getNickname());
        System.out.println("비밀번호: " + member.getPassword());
        System.out.println("이메일: " + member.getEmail());
        System.out.println("전화번호: " + member.getPhone());

        memberService.saveMember(member);
        return "redirect:/";
    }
}
