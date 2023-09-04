package com.web.stard.service;

import com.web.stard.domain.*;
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
    private StudyRepository studyRepository;
    @Autowired
    private PostRepository postRepository;
    @Autowired private CommunityService communityService;
    @Autowired
    private ReplyRepository replyRepository;
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

        Post post = new Post();
        post.setTitle("community post 제목");
        post.setContent("community post 내용");
        post.setMember(member);
        Post createdPost = communityService.registerCommPost(post, authentication);

        Member member2 = new Member();
        member2.setId("testUser");
        memberService.saveMember(member2);
        Authentication authentication2 = new UsernamePasswordAuthenticationToken(member2.getId(), null);

        ReportReason reason = ReportReason.SPAM;
        String customReason = null;

        //when
        ReportDetail reportDetail = reportService.createPostReport(createdPost.getId(), reason, customReason, authentication2);  // member의 글을 member2가 신고

        //then
        assertNotNull(reportDetail);
        assertEquals(reason, reportDetail.getReason()); // 이유가 올바른지 확인
        assertEquals(customReason, reportDetail.getCustomReason()); // 사용자 정의 이유가 올바른지 확인
        assertEquals(member2.getId(), reportDetail.getMember().getId()); // 신고자가 올바른지 확인
    }
}