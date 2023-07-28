package com.web.stard.controller;

import com.web.stard.domain.Member;
import com.web.stard.service.MemberService;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Getter @Setter
@RestController
@RequestMapping("/user/mypage")
public class MyPageController {

    @Autowired
    private MemberService memberService;


    /* 정보 반환 */
    @GetMapping("/update")
    public Member getMember(@RequestParam("id") String id) {
        Member member = memberService.getMember(id);
        return member;
    }

    /* 닉네임 중복 확인 (필요할 경우 사용) */
    @PostMapping("/check/nickname")
    public boolean checkNickname(@RequestParam("nickname") String nickname) {
        return memberService.checkNickname(nickname);
        // true -> 이미 존재 (사용 불가), false -> 없음 (사용 가능)
    }

    /* 정보 수정 처리 (닉네임, 비밀번호, 거주지(시, 구)) */
    @PostMapping("/update")
    public ResponseEntity<String> update(@RequestParam("id") String id,
                                         @RequestParam("nickname") String nickname,
                                         @RequestParam("password") String password,
                                         @RequestParam("newPassword") String newPassword,
                                         @RequestParam("city") String city,
                                         @RequestParam("district") String district) {
        // 비밀번호는 따로 빼는 게 나을지?, RequestParam으로 각각 받지 말고 커맨드 객체를 추가할지? -> 일단 고민,,

        Member member = memberService.getMember(id);

        // 닉네임 중복 확인
        if (!member.getNickname().equals(nickname)) {
            // 기존 닉네임 != 변경할 닉네임 => 중복 확인
            if (memberService.checkNickname(nickname)) { // 닉네임 이미 존재함
                return ResponseEntity.status(HttpStatus.CONFLICT).body("이미 존재하는 닉네임입니다.");
            }
        }

        // 패스워드 일치 여부 확인
        if (!member.getPassword().equals(password)) {
            // 기존 패스워드 != 입력한 패스워드
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("비밀번호가 일치하지 않습니다.");
        }

        // 정보 수정
        memberService.updateMember(id, nickname, newPassword, city, district);

        return ResponseEntity.ok().build();
    }

    /* 관심분야 수정 */
    @PostMapping("/update/interest")
    public void updateInterest(@RequestParam("interestList")List<String> interests) {
        memberService.updateInterest(interests);
    }
}
