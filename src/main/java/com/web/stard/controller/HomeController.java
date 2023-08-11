package com.web.stard.controller;

import com.web.stard.domain.Member;
import com.web.stard.service.MemberService;
import lombok.AllArgsConstructor;
import org.apache.catalina.security.SecurityUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

@RestController
@AllArgsConstructor
public class HomeController {

    private final MemberService memberService;

//    @GetMapping("/test")
//    public void currentUserName(Authentication authentication) {
//        System.out.println(authentication.getPrincipal().toString());
//
//        String memberEmail = authentication.getName();
//        System.out.println(memberEmail);
//    }

}
