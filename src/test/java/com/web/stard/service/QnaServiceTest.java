package com.web.stard.service;

import com.web.stard.domain.Authority;
import com.web.stard.domain.Member;
import com.web.stard.domain.Post;
import com.web.stard.domain.PostType;
import com.web.stard.repository.PostRepository;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.Assert.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;

@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
class QnaServiceTest {

    @Autowired
    private MemberService memberService;
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private QnaService qnaService;

    QnaServiceTest() {
    }

    @Rollback(false)
    @Test
    void qna_등록() {
        //given
        Member member = new Member();
        member.setId("testUser");
        Authority authority = new Authority("USER");
        member.setRoles(authority);
        memberService.saveMember(member);

        // 현재 사용자의 권한 이름을 SimpleGrantedAuthority 객체로 감싸서 리스트에 담긴다.
        List<GrantedAuthority> authorities = Collections.singletonList(new SimpleGrantedAuthority(member.getRoles().getAuthorityName()));
        Authentication authentication = new UsernamePasswordAuthenticationToken(member.getId(), null, authorities);

        Post post = new Post();
        post.setTitle("Test Title");
        post.setContent("Test Content");

        //when
        qnaService.createQna(post, authentication);

        //then
        List<Post> savedPosts = postRepository.findAll();
        assertEquals(1, savedPosts.size()); // 생성된 qna가 1개인지 확인

        Post savedPost = savedPosts.get(0);
        assertEquals(savedPost.getId(), savedPost.getId()); // 생성된 qna의 아이디와 검색된 게시글의 아이디가 같은지 확인
        assertEquals(PostType.QNA, savedPost.getType()); // 생성된 qna의 타입이 QNA인지 확인
        assertEquals(member.getId(), savedPost.getMember().getId()); // 생성된 qna의 작성자가 맞는지 확인
    }

    @Rollback(false)
    @Test
    void qna_리스트_조회() {
        //given
        Member member = new Member();
        member.setId("testUser");
        memberService.saveMember(member);

        List<GrantedAuthority> authorities = Collections.singletonList(new SimpleGrantedAuthority(member.getRoles().getAuthorityName()));
        Authentication authentication = new UsernamePasswordAuthenticationToken(member.getId(), null, authorities);

        Post post1 = new Post();
        post1.setTitle("Test Title1");
        post1.setContent("Test Content1");
        qnaService.createQna(post1, authentication);

        Post post2 = new Post();
        post2.setTitle("Test Title2");
        post2.setContent("Test Content2");
        qnaService.createQna(post2, authentication);

        //when
        List<Post> qnaList = qnaService.getAllQna(1);

        //then
        assertEquals(2, qnaList.size()); // 생성된 qna 게시글이 2개인지 확인
        assertEquals("Test Title2", qnaList.get(0).getTitle()); // 최근 순으로 조회되는지 확인(post2가 최근)

    }

    @Rollback(false)
    @Test
    void qna_상세_조회() {
        //given
        Member member = new Member();
        member.setId("testUser");
        memberService.saveMember(member);

        List<GrantedAuthority> authorities = Collections.singletonList(new SimpleGrantedAuthority(member.getRoles().getAuthorityName()));
        Authentication authentication = new UsernamePasswordAuthenticationToken(member.getId(), null, authorities);

        Post post1 = new Post();
        post1.setTitle("Test Title1");
        post1.setContent("Test Content1");
        qnaService.createQna(post1, authentication);

        //when
        Post detailQna = qnaService.getQnaDetail(post1.getId(), authentication);

        //then
        assertEquals("Test Title1", detailQna.getTitle()); // 제목이 맞는지 확인
        assertEquals("Test Content1", detailQna.getContent()); // 내용이 맞는지 확인
        assertEquals(member.getId(), detailQna.getMember().getId()); // 작성자가 맞는지 확인
    }

    @Rollback(false)
    @Test
    void qna_수정() {
        //given
        Member member = new Member();
        member.setId("testUser");
        memberService.saveMember(member);

        List<GrantedAuthority> authorities = Collections.singletonList(new SimpleGrantedAuthority(member.getRoles().getAuthorityName()));
        Authentication authentication = new UsernamePasswordAuthenticationToken(member.getId(), null, authorities);

        Post post = new Post();
        post.setTitle("Test Title");
        post.setContent("Test Content");
        qnaService.createQna(post, authentication);

        //when
        post.setTitle("Updated Title");
        post.setContent("Updated Content");
        qnaService.updateQna(post.getId(), post, authentication);

        //then
        List<Post> savedPosts = postRepository.findAll();
        assertEquals(1, savedPosts.size()); // 저장된 qna가 1개인지 확인

        Post updatedPost = savedPosts.get(0);
        assertEquals(post.getId(), updatedPost.getId()); // 수정된 qna의 아이디와 검색된 게시글의 아이디가 같은지 확인
        assertEquals(PostType.QNA, updatedPost.getType()); // 수정된 qna의 타입이 QNA인지 확인
        assertEquals(member.getId(), updatedPost.getMember().getId()); // 수정된 qna의 작성자가 맞는지 확인
    }
    
    @Rollback(false)
    @Test
    void qna_작성자_삭제() {
        //given
        Member member = new Member();
        member.setId("testUser");
        Authority authority = new Authority("user");
        member.setRoles(authority);
        memberService.saveMember(member);

        List<GrantedAuthority> authorities = Collections.singletonList(new SimpleGrantedAuthority(member.getRoles().getAuthorityName()));
        Authentication authentication = new UsernamePasswordAuthenticationToken(member.getId(), null, authorities);

        Post post = new Post();
        post.setTitle("Test Title2");
        post.setContent("Test Content2");
        qnaService.createQna(post, authentication);

        Long postId = post.getId();

        //when
        qnaService.deleteQna(postId, authentication);

        //then
        Optional<Post> deletedPost = postRepository.findById(postId);
        assertFalse(deletedPost.isPresent());   // 삭제한 qna가 존재하는지 확인
    }

    @Rollback(false)
    @Test
    void qna_관리자_삭제() {
        //given
        Member member = new Member();
        member.setId("testUser");
        Authority authority = new Authority("user");
        member.setRoles(authority);
        memberService.saveMember(member);

        Member adminMember = memberService.find("testAdmin");
        List<GrantedAuthority> adminAuthorities = Collections.singletonList(new SimpleGrantedAuthority(adminMember.getRoles().getAuthorityName()));

        List<GrantedAuthority> userAuthorities = Collections.singletonList(new SimpleGrantedAuthority(member.getRoles().getAuthorityName()));

        Authentication userAuth = new UsernamePasswordAuthenticationToken(member.getId(), null, userAuthorities);
        Authentication adminAuth = new UsernamePasswordAuthenticationToken(adminMember.getId(), null, adminAuthorities);

        Post post = new Post();
        post.setTitle("Test Title2");
        post.setContent("Test Content2");
        qnaService.createQna(post, userAuth);
        Long postId = post.getId();

        //when
        qnaService.deleteQna(postId, adminAuth);  // db에 수동으로 관리자 계정을 넣어줬다고 가정 (회원가입 시 모든 회원은 user로 설정됨)

        //then
        Optional<Post> deletedPost = postRepository.findById(postId);
        assertFalse(deletedPost.isPresent());   // 삭제한 qna가 존재하는지 확인
    }
}