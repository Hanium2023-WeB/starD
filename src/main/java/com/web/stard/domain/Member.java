package com.web.stard.domain;

import com.sun.istack.NotNull;
import lombok.*;

import javax.persistence.*;

@Getter @Setter
@Entity
@NoArgsConstructor(force = true)
@Table(name="Member")
public class Member {

    @Id
    private String id;

    @NotNull
    private String nickname;

    @NotNull
    private String name;

    @NotNull
    private String password;

    @NotNull
    private String email;

    @NotNull
    private String phone;

    // 일단 필수 데이터만 정의

    @Builder
    public Member(String id, String name, String email, String password, String phone, String nickname) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.nickname = nickname;
    }

}
