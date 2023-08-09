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
    public String saveMember(@RequestBody  Member member) {
        // 중복 아이디 검증
        boolean isDuplicateId = memberService.checkDuplicateMember(member.getId());
        if (isDuplicateId) {
            System.out.println("이미 존재하는 아이디입니다: " + member.getId());
            return "redirect:/signup";
        }

        // 중복 닉네임 검증
        boolean isDuplicateNickname = memberService.checkNickname(member.getNickname());
        if (isDuplicateNickname) {
            System.out.println("이미 존재하는 닉네임입니다: " + member.getNickname());
            return "redirect:/signup";
        }

        // 비밀번호 정규식 검증
        if (!isValidPassword(member.getPassword())) {
            System.out.println("유효하지 않은 비밀번호입니다: " + member.getPassword());
            return "redirect:/signup";
        }

        // 비밀번호 인코딩
        String encodedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encodedPassword);

        // 이메일 정규식 검증
        if (!isValidEmail(member.getEmail())) {
            System.out.println("유효하지 않은 이메일 주소입니다: " + member.getEmail());
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

        System.out.println("검증 아이디: " + id + " 중복 여부: " + isDuplicate);

        response.put("duplicate", isDuplicate);
        return ResponseEntity.ok(response);
    }

    // 중복 닉네임 검증 - client
    @GetMapping("/checkDuplicateNickname")
    public ResponseEntity<Map<String, Boolean>> checkDuplicateNickname(@RequestParam String nickname) {
        Map<String, Boolean> response = new HashMap<>();
        boolean isDuplicate = memberService.checkNickname(nickname);

        System.out.println("검증 닉네임: " + nickname + " 중복 여부: " + isDuplicate);

        response.put("duplicate", isDuplicate);
        return ResponseEntity.ok(response);
    }

    // 비밀번호 정규식 검증
    private boolean isValidPassword(String password) {
        String regex = "^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$";
        return password.matches(regex);
    }


    // 이메일 정규식 검증
    private boolean isValidEmail(String email) {
        String regex = "^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$";
        return email.matches(regex);
    }

}
