package com.web.stard.service;

import com.web.stard.domain.Authority;
import com.web.stard.domain.Interest;
import com.web.stard.domain.Member;
import com.web.stard.domain.Role;
import com.web.stard.repository.AuthorityRepository;
import com.web.stard.repository.InterestRepository;
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
import org.springframework.security.crypto.password.PasswordEncoder;
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

    @Autowired
    private AuthorityRepository authorityRepository;

    @Autowired
    private InterestRepository interestRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

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

    // 회원 정보 저장
    @Transactional
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

    /* 비밀번호 확인 */
    public boolean checkPw(String id, String password) {
        Member m = memberRepository.findPasswordById(id); // 사용자 pw
        String encodedPassword = passwordEncoder.encode(password);
        if (m.getPassword().equals(encodedPassword)) // 입력한 비밀번호와 사용자 비밀번호 같음
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
            String encodedPassword = passwordEncoder.encode(password);
            member.setPassword(encodedPassword);
        }

        memberRepository.save(member);
    }

    /* 관심분야 수정 */
    @Transactional
    public void updateInterest(String id, List<String> interests) {
        Member member = find(id);

        // 기존 관심분야 delete 후 새로 insert
        interestRepository.deleteAllByMember(member);

        List<Interest> interestList = new ArrayList<>();
        for (String s : interests) {
            Interest interest = new Interest();
            interest.setMember(member);
            interest.setField(s);
            interestList.add(interest);
        }
        interestRepository.saveAll(interestList);
    }
}
