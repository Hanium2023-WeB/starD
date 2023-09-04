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

    // 해당 글이 이미 신고되었는지 확인
    private Report isTargetPostAlreadyReported(Long targetId, PostType postType) {
        Report report = null;

        if (postType == PostType.COMM || postType == PostType.QNA) {
            report = reportRepository.findByPostId(targetId);
        }
        else if (postType == PostType.STUDY) {
            report = reportRepository.findByStudyId(targetId);
        }
        else if (postType == PostType.REPLY) {
            report = reportRepository.findByReplyId(targetId);
        }

        return report;
    }

    // 회원이 이미 신고했는지 확인
    private boolean isUserAlreadyReported(Report report, Member currentUser) {
        ReportDetail reportDetail = null;
        if (report != null) {   // 신고 내역 존재
            reportDetail = reportDetailRepository.findByReportAndMember(report.getId(), currentUser);
            if (reportDetail != null) { // 회원이 신고
                return true;
            }
        }
        return false;
    }

    // 신고 생성 메서드
    private ReportDetail createReportDetail(Report report, ReportReason reason, String customReason, Member currentUser) {
        ReportDetail reportDetail = ReportDetail.builder()
                .report(report)
                .member(currentUser)
                .reason(reason)
                .customReason(customReason)
                .build();

        return reportDetailRepository.save(reportDetail);
    }

    // Post 게시글 신고 (COMM/QNA)
    public ReportDetail createPostReport(Long postId, ReportReason reason, String customReason, Authentication authentication) {
        String userId = authentication.getName();
        Member currentUser = memberService.find(userId);

        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new EntityNotFoundException("해당 post 게시글을 찾을 수 없습니다."));

        if (post.getMember() == currentUser) {
            throw new IllegalArgumentException("내가 작성한 글은 신고할 수 없습니다.");
        }

        Report existingReport = isTargetPostAlreadyReported(postId, post.getType());

        if (isUserAlreadyReported(existingReport, currentUser)) {
            throw new IllegalArgumentException("이미 신고한 post 게시글입니다.");
        }

        // 신고 내역이 있는 경우 - 신고자 정보 추가
        if (existingReport != null) {
            return createReportDetail(existingReport, reason, customReason, currentUser);
        } else {
            // 신고 내역이 없는 경우 - 신고 내역에 추가, 신고자 정보 추가
            Report report = Report.builder()
                    .post(post)
                    .tableType(post.getType())
                    .build();

            reportRepository.save(report);

            return createReportDetail(report, reason, customReason, currentUser);
        }
    }

    // Study 게시글 신고
    public ReportDetail createStudyReport(Long studyId, ReportReason reason, String customReason, Authentication authentication) {
        String userId = authentication.getName();
        Member currentUser = memberService.find(userId);

        Study study = studyRepository.findById(studyId)
                .orElseThrow(() -> new EntityNotFoundException("해당 study 게시글을 찾을 수 없습니다."));

        // TODO - 스터디에 게시글 작성자를 저장할 수 있어야 구현 가능
/*        if (study.getMember() == currentUser) {
            throw new IllegalArgumentException("내가 작성한 글은 신고할 수 없습니다.");
        }*/

        // 모집 중인 스터디만 신고 가능
        if (study.getRecruitStatus() != RecruitStatus.RECRUITING) {
            throw new IllegalArgumentException("모집 중인 스터디만 신고 가능합니다.");
        }

        Report existingReport = isTargetPostAlreadyReported(studyId, PostType.STUDY);

        if (isUserAlreadyReported(existingReport, currentUser)) {
            throw new IllegalArgumentException("이미 신고한 study 게시글입니다.");
        }

        // 신고 내역이 있는 경우 - 신고자 정보 추가
        if (existingReport != null) {
            return createReportDetail(existingReport, reason, customReason, currentUser);
        }
        else {
            // 신고 내역이 없는 경우 - 신고 내역에 추가, 신고자 정보 추가
            Report report = Report.builder()
                    .study(study)
                    .tableType(PostType.STUDY)
                    .build();

            reportRepository.save(report);

            return createReportDetail(report, reason, customReason, currentUser);
        }
    }

    // 댓글 신고
    public ReportDetail createReplyReport(Long replyId, ReportReason reason, String customReason, Authentication authentication) {
        String userId = authentication.getName();
        Member currentUser = memberService.find(userId);

        Reply reply = replyRepository.findById(replyId)
                .orElseThrow(() -> new EntityNotFoundException("해당 댓글을 찾을 수 없습니다."));

        if (reply.getMember() == currentUser) {
            throw new IllegalArgumentException("내가 작성한 댓글은 신고할 수 없습니다.");
        }
        
        Report existingReport = isTargetPostAlreadyReported(replyId, PostType.REPLY);

        if (isUserAlreadyReported(existingReport, currentUser)) {
            throw new IllegalArgumentException("이미 신고한 댓글입니다.");
        }

        // 신고 내역이 있는 경우 - 신고자 정보 추가
        if (existingReport != null) {
            return createReportDetail(existingReport, reason, customReason, currentUser);
        }
        else {
            // 신고 내역이 없는 경우 - 신고 내역에 추가, 신고자 정보 추가
            Report report = Report.builder()
                    .reply(reply)
                    .tableType(PostType.REPLY)
                    .build();

            reportRepository.save(report);

            return createReportDetail(report, reason, customReason, currentUser);
        }
    }



}