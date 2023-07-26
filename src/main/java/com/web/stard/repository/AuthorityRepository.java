package com.web.stard.repository;

import com.web.stard.domain.Authority;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthorityRepository extends JpaRepository<Authority, Long> {

    Authority save(Authority authority);
    Authority findByAuthorityName(String authorityName);
}
