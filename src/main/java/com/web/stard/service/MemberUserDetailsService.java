package com.web.stard.service;

import com.web.stard.domain.Authority;
import com.web.stard.domain.Member;
import com.web.stard.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Collection;

@Transactional
@Service
public class MemberUserDetailsService implements UserDetailsService {

    @Autowired
    private MemberRepository memberRepository;

    // 아이디를 기준으로 데이터베이스에서 사용자 정보를 조회
    @Override
    public UserDetails loadUserByUsername(String id) throws UsernameNotFoundException {
        Member member = memberRepository.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("userId: " + id + " not found"));
        System.out.println("로그: loadUserByUsername 메서드");
        return new org.springframework.security.core.userdetails.User(
                member.getId(), member.getPassword(), getAuthorities(member));
    }

    private Collection<? extends GrantedAuthority> getAuthorities(Member member) {
        Authority role = member.getRoles();

        System.out.println("로그: getAuthorities 메서드");

        return AuthorityUtils.createAuthorityList(role.getAuthorityName());
    }
}
