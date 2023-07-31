package com.web.stard.dto;

import com.web.stard.domain.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MemberRequestDto {

    private String username;

    private String password;


    public Member toMember(PasswordEncoder passwordEncoder) {
        return Member.builder()
                .id(username)
                .password(passwordEncoder.encode(password))
                .build();
    }

//    public UsernamePasswordAuthenticationToken toAuthentication() {
//        return new UsernamePasswordAuthenticationToken(id, password);
//    }

}
