package com.web.stard.repository;

import com.web.stard.domain.Member;
import com.web.stard.domain.ReportDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReportDetailRepository extends JpaRepository<ReportDetail, Long> {
    ReportDetail findByReportAndMember(Long id, Member currentUser);
}
