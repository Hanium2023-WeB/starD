package com.web.stard.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {

    @RequestMapping("/")
    public String Home() {
        return "mainpage";
    }

    @RequestMapping("/main")
    public String Home2() {
        return "index";
    }

}
