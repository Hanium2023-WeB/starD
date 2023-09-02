package com.web.stard.service;

import com.web.stard.domain.*;
import com.web.stard.repository.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;

@Transactional
@Service
@AllArgsConstructor
@Getter
@Setter
public class ReportService {

    private ReportRepository reportRepository;
    private ReportDetailRepository reportDetailRepository;
    private MemberService memberService;
    private StudyRepository studyRepository;
    private PostRepository postRepository;
    private ReplyRepository replyRepository;

    // 특정 글에 회원이 이미 신고한 적 있는지 확인
    private Report isAlreadyReported(Long targetId, PostType postType, Member currentUser) {
        Report report = null;

        if (postType == PostType.COMM || postType == PostType.QNA) {
            report = reportRepository.findByPostAndMember(targetId, currentUser);
        }
        else if (postType == PostType.STUDY) {
            report = reportRepository.findByStudyAndMember(targetId, currentUser);
        }
        else if (postType == PostType.REPLY) {
            report = reportRepository.findByReplyAndMember(targetId, currentUser);
        }
        return report;
    }

    // 신고 생성 메서드
    private ReportDetail createReport(Report report, ReportReason reason, String customReason, Member currentUser) {
        ReportDetail reportDetail = ReportDetail.builder()
                .report(report)
                .reporter(currentUser)
                .reason(reason)
                .customReason(customReason)
                .build();

        return reportDetailRepository.save(reportDetail);
    }

    // Post 게시글 신고 (COMM/QNA)
    public ReportDetail createPostReport(Long postId, ReportReason reason, String customReason, Member writer, Authentication authentication) {
        String userId = authentication.getName();
        Member currentUser = memberService.find(userId);

        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new EntityNotFoundException("해당 post 게시글을 찾을 수 없습니다."));
        
        if (isAlreadyReported(postId, post.getType(), currentUser) != null) {
            throw new IllegalArgumentException("이미 신고한 post 게시글입니다.");
        }

        Report existingReport = reportRepository.findByPost(postId);

        // 신고 내역이 있는 경우 - 신고자 정보 추가
        if (existingReport != null) {
            return createReport(existingReport, reason, customReason, currentUser);
        } else {
            // 신고 내역이 없는 경우 - 신고 내역에 추가, 신고자 정보 추가
            Report report = Report.builder()
                    .member(writer)
                    .post(post)
                    .tableType(post.getType())
                    .build();

            reportRepository.save(report);

            return createReport(report, reason, customReason, currentUser);
        }
    }

    // Study 게시글 신고
    public ReportDetail createStudyReport(Long studyId, ReportReason reason, String customReason, Member writer, Authentication authentication) {
        String userId = authentication.getName();
        Member currentUser = memberService.find(userId);

        Study study = studyRepository.findById(studyId)
                .orElseThrow(() -> new EntityNotFoundException("해당 study 게시글을 찾을 수 없습니다."));

        // 모집 중인 스터디만 신고 가능
        if (study.getRecruitStatus() != RecruitStatus.RECRUITING) {
            throw new IllegalArgumentException("모집 중인 스터디만 신고 가능합니다.");
        }

        if (isAlreadyReported(studyId, PostType.STUDY, currentUser) != null) {
            throw new IllegalArgumentException("이미 신고한 study 게시글입니다.");
        }

        // 누가 신고한 내역이 있는지
        Report existingReport = reportRepository.findByStudy(studyId);

        // 신고 내역이 있는 경우 - 신고자 정보 추가
        if (existingReport != null) {
            return createReport(existingReport, reason, customReason, currentUser);
        }
        else {
            // 신고 내역이 없는 경우 - 신고 내역에 추가, 신고자 정보 추가
            Report report = Report.builder()
                    .member(writer)
                    .study(study)
                    .tableType(PostType.STUDY)
                    .build();

            reportRepository.save(report);

            return createReport(report, reason, customReason, currentUser);
        }
    }
    
    // 댓글 신고
    public ReportDetail createReplyReport(Long replyId, ReportReason reason, String customReason, Member writer, Authentication authentication) {
        String userId = authentication.getName();
        Member currentUser = memberService.find(userId);

        Reply reply = replyRepository.findById(replyId)
                .orElseThrow(() -> new EntityNotFoundException("해당 댓글을 찾을 수 없습니다."));

        if (isAlreadyReported(replyId, PostType.STUDY, currentUser) != null) {
            throw new IllegalArgumentException("이미 신고한 댓글입니다.");
        }

        // 누가 신고한 내역이 있는지
        Report existingReport = reportRepository.findByReply(replyId);

        // 신고 내역이 있는 경우 - 신고자 정보 추가
        if (existingReport != null) {
            return createReport(existingReport, reason, customReason, currentUser);
        }
        else {
            // 신고 내역이 없는 경우 - 신고 내역에 추가, 신고자 정보 추가
            Report report = Report.builder()
                    .member(writer)
                    .reply(reply)
                    .tableType(PostType.REPLY)
                    .build();

            reportRepository.save(report);

            return createReport(report, reason, customReason, currentUser);
        }
    }



}
