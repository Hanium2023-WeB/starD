package com.web.stard.controller;

import com.web.stard.domain.Member;
import com.web.stard.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class MemberController {

    private final MemberService memberService;

    @Autowired  //스프링 컨테이너에 있는 memberService를 가져다가 연결해줌
    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @Autowired
    private PasswordEncoder passwordEncoder;

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

        //db에 저장됨 (pw 암호화o / id 중복처리는 아직x. 함수 구현은 해둠)
        memberService.saveMember(member);
        return "redirect:/";
    }
}
