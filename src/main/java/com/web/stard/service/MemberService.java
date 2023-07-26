package com.web.stard.service;

import com.web.stard.domain.Member;
import com.web.stard.domain.Role;
import com.web.stard.repository.MemberRepository;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.ArrayList;
import java.util.Optional;

@Service
@AllArgsConstructor
public class MemberService implements UserDetailsService {

    private final MemberRepository memberRepository;


    public Member find(String id) {
        Optional<Member> result = memberRepository.findById(id);

        if(result.isPresent())
            return result.get();
        return null;
    }

    @Transactional
    public String join(Member member) {

        // 비밀번호 암호화
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        member.setPassword(passwordEncoder.encode(member.getPassword()));

        return memberRepository.save(member).getId();
    }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Member> result = memberRepository.findById(username);
        Member member = result.get();

        List<GrantedAuthority> authorities = new ArrayList<>();

        if (("admin@example.com").equals(username)) {
            authorities.add(new SimpleGrantedAuthority(Role.ADMIN.getRoleValue()));
        } else {
            authorities.add(new SimpleGrantedAuthority(Role.MEMBER.getRoleValue()));
        }

        return new User(member.getEmail(), member.getPassword(), authorities);
    }
}
