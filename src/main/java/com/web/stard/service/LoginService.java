package com.web.stard.service;

import com.web.stard.config.security.JwtTokenProvider;
import com.web.stard.domain.Member;
import com.web.stard.dto.CommonResponse;
import com.web.stard.dto.SignInResultDto;
import com.web.stard.repository.MemberRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class LoginService {

    private final MemberRepository memberRepository;

    private final JwtTokenProvider jwtTokenProvider;

    private final PasswordEncoder passwordEncoder;

    public Member login(String id, String password) throws RuntimeException {

        Optional<Member> result = memberRepository.findById(id);

        if(!passwordEncoder.matches(password, result.get().getPassword()))
            throw new RuntimeException();

        return result.get();

    }

    private void setSuccessResult(SignInResultDto result) {
        result.setSuccess(true);
        result.setCode(CommonResponse.SUCCESS.getCode());
        result.setMsg(CommonResponse.SUCCESS.getMsg());
    }

    private void setFailResult(SignInResultDto result) {
        result.setSuccess(false);
        result.setCode(CommonResponse.FAIL.getCode());
        result.setMsg(CommonResponse.FAIL.getMsg());
    }



}
