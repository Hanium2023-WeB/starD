package com.web.stard.repository;

import com.web.stard.domain.Interest;
import com.web.stard.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InterestRepository extends JpaRepository<Interest, Long> {
    void deleteAllByMember(Member member);
}
