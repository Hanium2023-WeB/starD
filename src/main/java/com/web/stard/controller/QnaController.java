package com.web.stard.controller;

import com.web.stard.domain.Post;
import com.web.stard.service.MemberService;
import com.web.stard.service.QnaService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.persistence.PostRemove;
import javax.transaction.Transactional;

@Transactional
@Getter @Setter
@RequestMapping("/qna")
@AllArgsConstructor
@Controller
public class QnaController {

    private final MemberService memberService;
    private final QnaService qnaService;

    // qna 등록
    @PostMapping("/create")
    public Post createQna(@RequestBody Post post) {
        // 현재 로그인한 사용자 정보 가져오기
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null && authentication.isAuthenticated()) {
            String userId = authentication.getName();

            if (!userId.equals("anonymousUser")) {
                qnaService.createQna(userId, post);
            }
        }

        return post;
    }

    // qna 삭제
    @DeleteMapping("/delete/{postId}")
    public ResponseEntity<String> deleteQna(@PathVariable Long postId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userId = authentication.getName();

        qnaService.deleteQna(postId, userId);
        return ResponseEntity.ok("게시글 삭제 완료");
    }
}
