package com.web.stard.domain;

import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter @Setter
@Entity
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

    private String city; // 시
    private String district; // 구

    @OneToOne @JoinColumn(name = "profile_id")
    private Profile profile; // 프로필
}
