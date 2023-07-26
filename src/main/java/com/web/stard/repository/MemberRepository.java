package com.web.stard.repository;

import com.web.stard.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, String> {

    Member save(Member member);
    Optional<Member> findByName(String name);

    Optional<Member> findById(String id);
}
