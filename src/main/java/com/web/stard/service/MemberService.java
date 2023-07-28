package com.web.stard.service;

import com.web.stard.domain.Member;
import com.web.stard.domain.Role;
import com.web.stard.repository.MemberRepository;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
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
@Getter @Setter
public class MemberService implements UserDetailsService {

    @Autowired
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

    /* 비밀번호 확인 */
    public boolean checkPw(String id, String password) {
        Member m = memberRepository.findPasswordById(id); // 사용자 pw
        if (m.getPassword().equals(password)) // 입력한 비밀번호와 사용자 비밀번호 같음
            return true;
        return false;
    }

    /* 닉네임 중복 확인 */
    public boolean checkNickname(String nickname) {
        return memberRepository.existsByNickname(nickname); // true -> 있음 (사용불가)
    }

    /* 정보 수정 */
    public void updateMember(String id, String nickname, String password, String city, String district) {
        Member member = find(id);

        if (nickname != null) {
            member.setNickname(nickname);
        }
        if (city != null && district != null) {
            member.setCity(city);
            member.setDistrict(district);
        }
        if (password != null) {
            member.setPassword(password);
        }

        memberRepository.save(member);
    }

    /* 관심분야 수정 */
    @Transactional
    public void updateInterest(List<String> interests) {
        // 기존 관심분야 delete 후 새로 insert

    }
}
