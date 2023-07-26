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
    private String password;
    @NotNull
    private String nickname;
    @NotNull
    private String name;
    @NotNull
    private String phone;
    @NotNull
    private String email;

    // 일단 필수 데이터만 정의

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "authority_id") // Member 테이블에 authority_id 컬럼 추가
    private Authority roles;

}