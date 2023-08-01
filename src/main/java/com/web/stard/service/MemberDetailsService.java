package com.web.stard.service;


import com.web.stard.domain.Authority;
import com.web.stard.domain.LoginTestEntity;
import com.web.stard.domain.Member;
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
        Member member = memberRepository.findById(username)
                .orElseThrow(() -> new UsernameNotFoundException("userId: " + username + " not found"));

        return new User(member.getId(), member.getPassword(), getAuthorities(member));
    }

    private Collection<? extends GrantedAuthority> getAuthorities(Member member) {
        Authority role = member.getRoles();
        return AuthorityUtils.createAuthorityList(role.getAuthorityName());
    }
}
