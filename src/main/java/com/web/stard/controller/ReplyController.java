package com.web.stard.controller;

import com.web.stard.domain.Reply;
import com.web.stard.service.ReplyService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
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
    public Reply createPostReply(@RequestParam Long postId, @RequestParam String replyContent, Authentication authentication) {
        return replyService.createPostReply(postId, replyContent, authentication);
    }

    // Study 댓글 생성
    @PostMapping("/study")
    public Reply createStudyReply(@RequestParam Long studyId, @RequestParam String replyContent, Authentication authentication) {
        return replyService.createStudyReply(studyId, replyContent, authentication);
    }

    // 댓글 수정 (Post, Study 공통)
    @PostMapping("/{id}")
    public Reply updateReply(@PathVariable Long replyId, @RequestParam String replyContent, Authentication authentication) {
        return replyService.updateReply(replyId, replyContent, authentication);
    }

    // 댓글 삭제 (Post, Study 공통)
    @DeleteMapping("/{id}")
    public void deleteReply(@PathVariable Long replyId, Authentication authentication) {
        replyService.deleteReply(replyId, authentication);
    }

    // 댓글 리스트로 조회
    @GetMapping
    public List<Reply> findAllReply(){
        return replyService.findAll();
    }

    // 댓글 조회
    @GetMapping("/{id}")
    public Reply getReply(@PathVariable Long id){
        return replyService.getReply(id);
    }

}
