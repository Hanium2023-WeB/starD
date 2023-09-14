package com.web.stard.repository;

import com.web.stard.domain.Applicant;
import com.web.stard.domain.Member;
import com.web.stard.domain.Study;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ApplicantRepository extends JpaRepository<Applicant, Long> {

    boolean existsByMemberAndStudy(Member member, Study study);

    Applicant findByMemberAndStudy(Member member, Study study);
}
