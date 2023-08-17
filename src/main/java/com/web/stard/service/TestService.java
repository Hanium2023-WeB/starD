package com.web.stard.service;

import com.web.stard.domain.Authority;
import com.web.stard.domain.LoginTestEntity;
import com.web.stard.domain.Member;
import com.web.stard.repository.MemberRepository;
import com.web.stard.repository.TestRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

//@Transactional
//@Service
//@AllArgsConstructor
//public class TestService implements UserDetailsService {
//
//
//    private final TestRepository testRepository;
//
//    @Transactional
//    public void save() {
//        // 테스트를 위해 가상의 사용자 정보를 생성합니다.
//        String id = "test";
//        String rawPassword = "testtest";
//        String auth = "USER";
//
//        String id2 = "test2";
//        String rawPassword2 = "testtest";
//        String auth2 = "USER";
//
//        // 가상 사용자 정보를 저장합니다.
//        LoginTestEntity member1 = new LoginTestEntity(id, new BCryptPasswordEncoder().encode(rawPassword), auth);
//        testRepository.save(member1);
//
//        LoginTestEntity member2 = new LoginTestEntity(id2, new BCryptPasswordEncoder().encode(rawPassword2), auth2);
//        testRepository.save(member2);
//    }
//
//    @Override
//    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//
//        save();
//
//        LoginTestEntity member = testRepository.findById(username)
//                .orElseThrow(() -> new UsernameNotFoundException("userId: " + username + " not found"));
//
//
//        List<GrantedAuthority> authorities = new ArrayList<>();
//
//        if (("admin@example.com").equals(username)) {
//            authorities.add(new SimpleGrantedAuthority("ADMIN"));
//        } else {
//            authorities.add(new SimpleGrantedAuthority("USER"));
//        }
//
//        return new User(member.getUsername(), member.getPassword(), authorities);
//    }
//
//}
