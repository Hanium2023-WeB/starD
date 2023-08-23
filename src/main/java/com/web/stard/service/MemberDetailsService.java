package com.web.stard.service;


import com.web.stard.domain.LoginTestEntity;
import com.web.stard.domain.Member;
import com.web.stard.domain.Role;
import com.web.stard.repository.MemberRepository;
import com.web.stard.repository.TestRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;

@Transactional
@Service
@AllArgsConstructor
public class MemberDetailsService implements UserDetailsService {

    private final MemberRepository memberRepository;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println("loadUserByUsername() 호출됨. username: " + username);

//        Member member = memberRepository.findById(username)
//                .orElseThrow(() -> new UsernameNotFoundException("userId: " + username + " not found"));

        Member member = memberRepository.findById(username)
                .orElseThrow(() -> {
                    System.out.println("UsernameNotFoundException 발생");
                    return new UsernameNotFoundException("userId: " + username + " not found");
                });

        return new User(member.getId(), member.getPassword(), getAuthorities(member));
    }

    private Collection<? extends GrantedAuthority> getAuthorities(Member member) {
        Role role = member.getRoles();
        return AuthorityUtils.createAuthorityList(role.getRoleValue());
    }
}
