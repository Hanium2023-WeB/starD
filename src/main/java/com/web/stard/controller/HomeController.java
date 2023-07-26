package com.web.stard.controller;

import com.web.stard.domain.Member;
import com.web.stard.service.MemberService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@AllArgsConstructor
public class HomeController {

    private final MemberService memberService;

//    @RequestMapping("/")
//    public String Home(@AuthenticationPrincipal Member member) {
//
//        return "index";
//    }

    @GetMapping("hello")
    public List<String> Hello(){
            return Arrays.asList("서버 포트는 8080", "리액트 포트는 3000");
    }
}
