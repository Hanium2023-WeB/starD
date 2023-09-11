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

    // 거주지, 관심분야 저장
    @PostMapping("/signup/option-data")
    public ResponseEntity<String> saveAddressAndInterest(@RequestBody Map<String, Object> requestData) {
        String id = (String) requestData.get("id");
        String city = (String) requestData.get("city");
        String district = (String) requestData.get("district");
        String interestList = (String) requestData.get("interestList");

        // 쉼표로 구분된 문자열을 배열로 분할
        String[] interestsArray = interestList.split(",");

        try {
            signUpService.saveAddressAndInterest(id, city, district, interestsArray);
            return ResponseEntity.ok("거주지, 관심분야가 저장되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("거주지, 관심분야 저장 중 오류가 발생했습니다.");
        }
    }

}
