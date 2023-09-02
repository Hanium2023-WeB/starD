package com.web.stard.repository;

import com.web.stard.domain.Member;
import com.web.stard.domain.Report;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReportRepository extends JpaRepository<Report, Long> {
    Report findByPostAndMember(Long postId, Member member);

    Report findByStudyAndMember(Long postId, Member member);

    Report findByReplyAndMember(Long postId, Member member);

    Report findByPost(Long postId);

    Report findByStudy(Long studyId);

    Report findByReply(Long replyId);

}
