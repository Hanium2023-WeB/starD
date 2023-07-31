package com.web.stard.service;

import com.web.stard.config.security.JwtTokenProvider;
import com.web.stard.domain.Member;
import com.web.stard.dto.CommonResponse;
import com.web.stard.dto.SignInResultDto;
import com.web.stard.repository.MemberRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class SignService {

    private final MemberRepository memberRepository;

    private final JwtTokenProvider jwtTokenProvider;

    private final PasswordEncoder passwordEncoder;

    public SignInResultDto signIn(String id, String password) throws RuntimeException {

        Optional<Member> result = memberRepository.findById(id);

        if(!passwordEncoder.matches(password, result.get().getPassword()))
            throw new RuntimeException();

        Member member = result.get();

        SignInResultDto signInResultDto = SignInResultDto.builder()
                .token(jwtTokenProvider.createToken(member.getId(), member.getRoles())).build();

        setSuccessResult(signInResultDto);

        return signInResultDto;
    }

    public Member signIn_2(String id, String password) throws RuntimeException {

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
