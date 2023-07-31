package com.web.stard.service;

import com.web.stard.domain.Authority;
import com.web.stard.domain.Member;
import com.web.stard.repository.AuthorityRepository;
import com.web.stard.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Transactional
@Service
public class MemberService {
    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private AuthorityRepository authorityRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    public MemberService(MemberRepository memberRepository, AuthorityRepository authorityRepository, PasswordEncoder passwordEncoder) {
        this.memberRepository = memberRepository;
        this.authorityRepository = authorityRepository;
        this.passwordEncoder = passwordEncoder;
    }


    // 회원 정보 저장
    public void saveMember(Member member) {
        // 회원가입 시 기본적으로 'USER' 권한을 부여
        Authority userAuthority = authorityRepository.findByAuthorityName("USER");
        if (userAuthority == null) {
            // "USER" 값을 가진 권한 객체가 데이터베이스에 존재하지 않을 경우 새로 생성하여 저장합니다.
            userAuthority = new Authority("USER");
            authorityRepository.save(userAuthority);
        }
        member.setRoles(userAuthority);

        System.out.println("saveMember(): " + userAuthority.getAuthorityName());

        String encodedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encodedPassword);

        memberRepository.save(member);
    }

    // 중복 회원 검증
    private void validateDuplicateMember(Member member) {
        Optional<Member> findMembers = memberRepository.findById(member.getId());

        if (!findMembers.isEmpty()) {
            throw new IllegalStateException("이미 존재하는 회원입니다.");
        }
    }
}
