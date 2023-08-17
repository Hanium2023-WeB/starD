package com.web.stard.controller;

import com.web.stard.config.jwt.JwtTokenProvider;
import com.web.stard.config.lib.Helper;
import com.web.stard.dto.Response;
import com.web.stard.dto.request.MemberRequestDto;
import com.web.stard.service.SignService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/members")
@RestController
public class SignController {

    private final JwtTokenProvider jwtTokenProvider;
    private final SignService signService;
    private final Response response;


    @PostMapping("/login")
    public ResponseEntity<?> login(MemberRequestDto.Login login) {
        System.out.println("login() 컨트롤러 진입 1 : " + login.getMemberId() + login.getPassword());
        return signService.login(login);
    }

    @PostMapping("/reissue")
    public ResponseEntity<?> reissue(@Validated MemberRequestDto.Reissue reissue, Errors errors) {
        // validation check
        if (errors.hasErrors()) {
            return response.invalidFields(Helper.refineErrors(errors));
        }
        return signService.reissue(reissue);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@Validated MemberRequestDto.Logout logout, Errors errors) {
        // validation check
        if (errors.hasErrors()) {
            return response.invalidFields(Helper.refineErrors(errors));
        }
        return signService.logout(logout);
    }

    @GetMapping("/authority")
    public ResponseEntity<?> authority() {
        log.info("ADD ROLE_ADMIN");
        return signService.authority();
    }

    @GetMapping("/userTest")
    public ResponseEntity<?> userTest() {
        log.info("ROLE_USER TEST");
        return response.success();
    }

    @GetMapping("/adminTest")
    public ResponseEntity<?> adminTest() {
        log.info("ROLE_ADMIN TEST");
        return response.success();
    }
}
