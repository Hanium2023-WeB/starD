package com.web.stard.dto;

import com.sun.istack.NotNull;
import com.web.stard.domain.Member;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Id;

@Data
@NoArgsConstructor
public class MemberDto {

    private String id;
    private String nickname;
    private String name;
    private String password;
    private String email;
    private String phone;

    @Builder
    public MemberDto(String id, String password) {
        this.id = id;
        this.password = password;
    }

}
