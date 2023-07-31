package com.web.stard.controller;

import com.web.stard.domain.Member;
import com.web.stard.service.MemberService;
import lombok.AllArgsConstructor;
import org.apache.catalina.security.SecurityUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

@RestController
@CrossOrigin(origins = "*")
@AllArgsConstructor
public class HomeController {

    private final MemberService memberService;

//    @RequestMapping("/")
//    public String Home() {
//        return "mainpage";
//    }
//
//    @RequestMapping("/main")
//    public String Home2() {
//        return "index";
//    }
//
//    @GetMapping("/test")
//    public String test() { return "hello";};
//
//    @GetMapping("/ttt")
//    public String testt() { return "hellot";};


}
