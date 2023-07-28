package com.web.stard.service;

import com.web.stard.domain.Member;
import com.web.stard.repository.MemberRepository;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Getter @Setter
@Service
public class MemberService {

    @Autowired
    private MemberRepository memberRepository;

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

    /* 기존 회원 정보 가져오기 */
    public Member getMember(String id) {
        Optional<Member> member = memberRepository.findById(id);
        if (member.isPresent()) return member.get();
        return null;
    }

    /* 정보 수정 */
    public void updateMember(String id, String nickname, String password, String city, String district) {
        Member member = getMember(id);

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
