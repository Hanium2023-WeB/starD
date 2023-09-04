package com.web.stard.controller;

import com.web.stard.domain.Member;
import com.web.stard.domain.Report;
import com.web.stard.domain.ReportDetail;
import com.web.stard.domain.ReportReason;
import com.web.stard.service.ReportService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Getter
@Setter
@AllArgsConstructor
@RestController
@RequestMapping("/reports")
public class ReportController {

    private final ReportService reportService;

    // Post 글 신고
    @PostMapping("/post")
    public ReportDetail createStudyReply(@RequestParam Long postId, @RequestParam ReportReason reason, @RequestParam(required = false) String customReason, Authentication authentication) {
        return reportService.createPostReport(postId, reason, customReason, authentication);
    }

    // Study 글 신고
    @PostMapping("/study")
    public ReportDetail createStudyReport(@RequestParam Long studyId, @RequestParam ReportReason reason, @RequestParam(required = false) String customReason, Authentication authentication) {
        return reportService.createStudyReport(studyId, reason, customReason, authentication);
    }
    
    // 댓글 신고
    @PostMapping("/reply")
    public ReportDetail createPostReply(@RequestParam Long replyId, @RequestParam ReportReason reason, @RequestParam(required = false) String customReason, Authentication authentication) {
        return reportService.createReplyReport(replyId, reason, customReason, authentication);
    }

}
