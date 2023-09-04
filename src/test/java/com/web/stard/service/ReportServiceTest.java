package com.web.stard.service;

import com.web.stard.domain.*;
import com.web.stard.dto.StudyDto;
import com.web.stard.repository.*;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
class ReportServiceTest {

    @Autowired
    private ReportRepository reportRepository;
    @Autowired
    private ReportDetailRepository reportDetailRepository;
    @Autowired
    private MemberService memberService;
    @Autowired
    private StudyService studyService;
    @Autowired
    private PostRepository postRepository;
    @Autowired private CommunityService communityService;
    @Autowired private QnaService qnaService;
    @Autowired
    private ReplyService replyService;
    @Autowired
    private ReportService reportService;

    //@Rollback(false)
    @Test
    void post글_신고() {
        //given
        Member member = new Member();
        member.setId("testUser");
        memberService.saveMember(member);

        Authentication authentication = new UsernamePasswordAuthenticationToken(member.getId(), null);

        // 1. COMM post
/*
        Post post = new Post();
        post.setTitle("community post 제목");
        post.setContent("community post 내용");
        post.setMember(member);
        Post createdPost = communityService.registerCommPost(post, authentication);
*/

        // 2. QNA post
        Post post = new Post();
        post.setTitle("qna post 제목");
        post.setContent("qna post 내용");
        post.setMember(member);
        Post createdPost = qnaService.createQna(post, authentication);

        Member member2 = new Member();
        member2.setId("testUser2");
        memberService.saveMember(member2);
        Authentication authentication2 = new UsernamePasswordAuthenticationToken(member2.getId(), null);
/*
        ReportReason reason = ReportReason.SPAM;
        String customReason = null;
*/

        ReportReason reason = ReportReason.ETC;
        String customReason = "사용자 정의 사유";

        //when
        ReportDetail reportDetail = reportService.createPostReport(createdPost.getId(), reason, customReason, authentication2);  // member의 글을 member2가 신고

        //then
        assertNotNull(reportDetail);
        assertEquals(reason, reportDetail.getReason()); // 이유가 올바른지 확인
        //assertEquals(customReason, reportDetail.getCustomReason()); // 사용자 정의 사유가 올바른지 확인
        assertEquals("사용자 정의 사유", reportDetail.getCustomReason());
        assertEquals(member2.getId(), reportDetail.getMember().getId()); // 신고자가 올바른지 확인
    }

    //@Rollback(false)
    @Test
    void Reply_댓글신고() {
        //given
        Member member = new Member();
        member.setId("testUser");
        memberService.saveMember(member);

        Authentication authentication = new UsernamePasswordAuthenticationToken(member.getId(), null);

        // QNA post
        Post post = new Post();
        post.setTitle("qna post 제목");
        post.setContent("qna post 내용");
        post.setMember(member);
        Post createdPost = qnaService.createQna(post, authentication);

        // 댓글
        Reply reply = new Reply();
        reply.setContent("qna post에 대한 댓글");
        Reply createdReply = replyService.createPostReply(createdPost.getId(), reply.getContent(), authentication);

        Member member2 = new Member();
        member2.setId("testUser2");
        memberService.saveMember(member2);
        Authentication authentication2 = new UsernamePasswordAuthenticationToken(member2.getId(), null);

        ReportReason reason = ReportReason.SPAM;
        String customReason = null;

/*
        ReportReason reason = ReportReason.ETC;
        String customReason = "사용자 정의 사유";
*/

        //when
        ReportDetail reportDetail = reportService.createReplyReport(createdReply.getId(), reason, customReason, authentication2);  // member의 댓글을 member2가 신고

        //then
        assertNotNull(reportDetail);
        assertEquals(reason, reportDetail.getReason()); // 이유가 올바른지 확인
        assertEquals(customReason, reportDetail.getCustomReason()); // 사용자 정의 사유가 올바른지 확인
        //assertEquals("사용자 정의 사유", reportDetail.getCustomReason());
        assertEquals(member2.getId(), reportDetail.getMember().getId()); // 신고자가 올바른지 확인
    }

    //@Rollback(false)
    @Test
    void Study글_신고() {
        //given
        Member member = new Member();
        member.setId("testUser");
        memberService.saveMember(member);

        Authentication authentication = new UsernamePasswordAuthenticationToken(member.getId(), null);

        StudyDto studyDto = new StudyDto("study 제목", "study 내용", 5, member.getId(),
                null, null, null, "online", LocalDateTime.now().plusDays(7),
                LocalDateTime.now(),LocalDateTime.now().plusDays(7), RecruitStatus.RECRUITING, ProgressStatus.BEFORE_PROCEEDING, 0);
        Study createdStudy = studyService.createStudy(studyDto, authentication);

        Member member2 = new Member();
        member2.setId("testUser2");
        memberService.saveMember(member2);
        Authentication authentication2 = new UsernamePasswordAuthenticationToken(member2.getId(), null);

/*
        ReportReason reason = ReportReason.SPAM;
        String customReason = null;
*/

        ReportReason reason = ReportReason.ETC;
        String customReason = "사용자 정의 사유";

        //when
        ReportDetail reportDetail = reportService.createStudyReport(createdStudy.getId(), reason, customReason, authentication2);  // member의 댓글을 member2가 신고

        //then
        assertNotNull(reportDetail);
        assertEquals(reason, reportDetail.getReason()); // 이유가 올바른지 확인
        //assertEquals(customReason, reportDetail.getCustomReason()); // 사용자 정의 사유가 올바른지 확인
        assertEquals("사용자 정의 사유", reportDetail.getCustomReason());
        assertEquals(member2.getId(), reportDetail.getMember().getId()); // 신고자가 올바른지 확인
    }

    //@Rollback(false)
    @Test
    void 자신의post글_신고_예외() {
        //given
        Member member = new Member();
        member.setId("testUser");
        memberService.saveMember(member);

        Authentication authentication = new UsernamePasswordAuthenticationToken(member.getId(), null);
        
        Post post = new Post();
        post.setTitle("qna post 제목");
        post.setContent("qna post 내용");
        post.setMember(member);
        Post createdPost = qnaService.createQna(post, authentication);

        ReportReason reason = ReportReason.ETC;
        String customReason = "사용자 정의 사유";

        //when
        ReportDetail reportDetail = reportService.createPostReport(createdPost.getId(), reason, customReason, authentication);  // member가 자신의 글 신고

        //then
        assertNotNull(reportDetail);
        assertEquals(reason, reportDetail.getReason()); // 이유가 올바른지 확인
        assertEquals("사용자 정의 사유", reportDetail.getCustomReason());
        assertEquals(member.getId(), reportDetail.getMember().getId()); // 신고자가 올바른지 확인
    }


}