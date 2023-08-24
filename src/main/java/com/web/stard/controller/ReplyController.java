package com.web.stard.controller;

import com.web.stard.domain.Post;
import com.web.stard.domain.Reply;
import com.web.stard.service.ReplyService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
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
        return replyService.createQnaReply(postId, replyContent, authentication);
    }

    // Post 댓글 수정
    @PostMapping("/post/{id}")
    public Reply updatePostReply(@PathVariable Long replyId, @RequestParam String replyContent, Authentication authentication) {
        return replyService.updateQnaReply(replyId, replyContent, authentication);
    }

    // Post 댓글 삭제
    @DeleteMapping("/post/{id}")
    public void deletePostReply(@PathVariable Long replyId, Authentication authentication) {
        replyService.deleteQnaReply(replyId, authentication);
    }

}
