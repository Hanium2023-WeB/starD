package com.web.stard.controller;

import com.web.stard.domain.Post;
import com.web.stard.domain.PostType;
import com.web.stard.domain.Reply;
import com.web.stard.service.ReplyService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@RestController
@RequestMapping("/replies")
public class ReplyController {

    private final ReplyService replyService;

    // Post(Community, Qna) 댓글 생성
    @PostMapping("/post")
    public Reply createPostReply(@RequestParam Long targetId, @RequestParam String replyContent, Authentication authentication) {
        return replyService.createPostReply(targetId, replyContent, authentication);
    }

    // ScrapStudySlide 댓글 생성
    @PostMapping("/study")
    public Reply createStudyReply(@RequestParam Long targetId, @RequestParam String replyContent, Authentication authentication) {
        return replyService.createStudyReply(targetId, replyContent, authentication);
    }

    // 댓글 수정 (Post, ScrapStudySlide 공통)
    @PostMapping("/{id}")
    public Reply updateReply(@PathVariable Long replyId, @RequestParam String replyContent, Authentication authentication) {
        return replyService.updateReply(replyId, replyContent, authentication);
    }

    // 댓글 삭제 (Post, ScrapStudySlide 공통)
    @DeleteMapping("/{id}")
    public void deleteReply(@PathVariable Long replyId, Authentication authentication) {
        replyService.deleteReply(replyId, authentication);
    }

    // 댓글 조회
    @GetMapping("/{id}")
    public Reply getReply(@PathVariable Long id){
        return replyService.getReply(id);
    }

    // 댓글 전체 조회 (최신순, 페이징)
    @GetMapping()
    public Page<Reply> findAllReplies(@RequestParam("page") int page) {
        return replyService.findAllReplies(page);
    }

    // post 게시글 아이디 별 댓글 조회 (생성일 순)
    @GetMapping("/post/{postId}")
    public List<Reply> findAllRepliesByPostId(@PathVariable Long postId) {
        return replyService.findAllRepliesByPostIdOrderByCreatedAtAsc(postId);
    }

    // study 게시글 아이디 별 댓글 조회 (생성일 순)
    @GetMapping("/study/{studyId}")
    public List<Reply> findAllRepliesByStudyId(@PathVariable Long studyId) {
        return replyService.findAllRepliesByStudyIdOrderByCreatedAtAsc(studyId);
    }

    // 댓글 작성하려는 게시글의 타입 조회
    @GetMapping("/type/{targetId}")
    public PostType findPostTypeById(@PathVariable Long targetId) {
        return replyService.findPostTypeById(targetId);
    }

}
