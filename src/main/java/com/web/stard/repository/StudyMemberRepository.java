package com.web.stard.repository;

import com.web.stard.domain.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StudyMemberRepository extends JpaRepository<StudyMember, Long> {

    /* 특정 스터디에 특정 회원이 있는지 */
    boolean existsByStudyAndMember(Study study, Member member);

    /* 특정 회원으로 검색 */
    List<StudyMember> findByMember(Member member);
}
