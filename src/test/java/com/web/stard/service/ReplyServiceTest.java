package com.web.stard.service;

import com.web.stard.domain.*;
import com.web.stard.dto.StudyDto;
import com.web.stard.repository.PostRepository;
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
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.junit.jupiter.api.Assertions.*;

@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
class ReplyServiceTest {

    @Autowired
    private MemberService memberService;
    @Autowired
    private ReplyService replyService;
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private CommunityService communityService;
    @Autowired
    private QnaService qnaService;
    @Autowired
    private StudyService studyService;

    //@Rollback(false)
    @Test
    void Post_COMM_댓글_등록() {
        //given
        Member member = new Member();
        member.setId("testUser");
        memberService.saveMember(member);

        Member member2 = new Member();
        member2.setId("testUser2");
        memberService.saveMember(member2);

        Authentication authentication = new UsernamePasswordAuthenticationToken(member.getId(), null);
        Authentication authentication2 = new UsernamePasswordAuthenticationToken(member2.getId(), null);

        Post post = new Post();
        post.setTitle("community post 제목");
        post.setContent("community post 내용");
        Post createdPost = communityService.registerCommPost(post, authentication);

        Reply reply = new Reply();
        reply.setContent("community post에 대한 댓글");

        //when
        //replyService.createPostReply(post.getId(), reply.getContent(), authentication); // 작성자가 댓글 생성
        replyService.createPostReply(createdPost.getId(), reply.getContent(), authentication2);    // 다른 회원이 댓글 생성

        //then
        List<Reply> savedReplies = replyService.findAll();
        assertEquals(1, savedReplies.size()); // 생성된 댓글이 1개인지 확인

        Reply savedReply = savedReplies.get(0);

        assertEquals(savedReply.getPost().getId(), createdPost.getId()); // 댓글에 저장된 postId가 댓글 단 게시글의 아이디와 일치하는지 확인
        assertEquals(PostType.COMM, savedReply.getType()); // 댓글 단 게시글의 타입이 COMM인지 확인
    }

    //@Rollback(false)
    @Test
    void Post_QNA_댓글_등록() {
        //given
        Member member = new Member();
        member.setId("testUser");
        memberService.saveMember(member);

        Member member2 = new Member();
        member2.setId("testUser2");
        memberService.saveMember(member2);

        Authentication authentication = new UsernamePasswordAuthenticationToken(member.getId(), null);
        Authentication authentication2 = new UsernamePasswordAuthenticationToken(member2.getId(), null);

        Post post = new Post();
        post.setTitle("qna post 제목");
        post.setContent("qna post 내용");
        Post createdPost = qnaService.createQna(post, authentication);

        Reply reply = new Reply();
        reply.setContent("qna post에 대한 댓글");

        //when
        //replyService.createPostReply(post.getId(), reply.getContent(), authentication); // 작성자가 댓글 생성
        replyService.createPostReply(createdPost.getId(), reply.getContent(), authentication2);    // 다른 회원이 댓글 생성

        //then
        List<Reply> savedReplies = replyService.findAll();
        assertEquals(1, savedReplies.size()); // 생성된 댓글이 1개인지 확인

        Reply savedReply = savedReplies.get(0);

        assertEquals(savedReply.getPost().getId(), createdPost.getId()); // 댓글에 저장된 postId가 댓글 단 게시글의 아이디와 일치하는지 확인
        assertEquals(PostType.QNA, savedReply.getType()); // 댓글 단 게시글의 타입이 QNA인지 확인
    }

    @Rollback(false)
    @Test
    void Study_댓글_등록() {
        //given
        Member member = new Member();
        member.setId("testUser");
        memberService.saveMember(member);

        Member member2 = new Member();
        member2.setId("testUser2");
        memberService.saveMember(member2);

        Authentication authentication = new UsernamePasswordAuthenticationToken(member.getId(), null);
        Authentication authentication2 = new UsernamePasswordAuthenticationToken(member2.getId(), null);

        StudyDto studyDto = new StudyDto("study 제목", "study 내용", 5, member.getId(),
                null, null, null, "online", LocalDateTime.now().plusDays(7), LocalDateTime.now().plusDays(14),
                LocalDateTime.now(),LocalDateTime.now().plusDays(7), "모집중", 0);
        Study createdStudy = studyService.createStudy(studyDto, authentication);

        Reply reply = new Reply();
        reply.setContent("study에 대한 댓글");

        //when
        replyService.createStudyReply(createdStudy.getId(), reply.getContent(), authentication); // 작성자가 댓글 생성
        //replyService.createStudyReply(createdStudy.getId(), reply.getContent(), authentication2);    // 다른 회원이 댓글 생성

        //then
        List<Reply> savedReplies = replyService.findAll();
        assertEquals(1, savedReplies.size()); // 생성된 댓글이 1개인지 확인

        Reply savedReply = savedReplies.get(0);

        if (reply.getId() != null && savedReply.getId() != null) {
            assertEquals(reply.getId(), savedReply.getId());
        }
        assertEquals(PostType.STUDY, savedReply.getType()); // 댓글 단 게시글의 타입이 STUDY인지 확인
    }

    @Rollback(false)
    @Test
    void Post_댓글_수정_작성자() {

    }

    @Rollback(false)
    @Test
    void Study_댓글_수정_작성자() {

    }

    @Rollback(false)
    @Test
    void Post_댓글_수정_사용자_예외() {

    }

    @Rollback(false)
    @Test
    void Study_댓글_수정_사용자_예외() {

    }

    @Rollback(false)
    @Test
    void Post_댓글_삭제_작성자() {

    }

    @Rollback(false)
    @Test
    void Study_댓글_삭제_작성자() {

    }
    
    @Rollback(false)
    @Test
    void Post_댓글_삭제_사용자_예외() {

    }

    @Rollback(false)
    @Test
    void Study_댓글_삭제_사용자_예외() {

    }
}