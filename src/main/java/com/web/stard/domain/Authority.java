package com.web.stard.domain;

import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;

@Getter @Setter
@Entity
@Table(name="Authority")
public class Authority implements GrantedAuthority {

    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private Long id;

    @NotNull
    private String authorityName;

    public Authority() {}

    public Authority(String authorityName) {
        this.authorityName = authorityName;
    }

    @Override
    public String getAuthority() {
        return authorityName;
    }
}