package com.web.stard.controller;

import com.web.stard.domain.Post;
import com.web.stard.service.CommunityService;
import com.web.stard.service.MemberService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Getter @Setter
@AllArgsConstructor
@RestController("/com")
public class CommunityController {

    private final MemberService memberService;
    private final CommunityService comService;

    /* 커뮤니티 게시글 조회 (페이지화 추가) */
    @GetMapping
    public List<Post> getAllCommunityPost(@RequestParam("page") int page) {
//        return comService.getAllCommunityPost(); // 페이지화 X (그냥 전체 조회)
        return comService.getAllCommunityPost(page);
    }

    /* 커뮤니티 게시글 세부 조회 */
    @GetMapping("/{id}")
    public Post getCommunityPost(@PathVariable Long id) {
        return comService.getCommunityPost(id);
    }

    /* 커뮤니티 게시글 등록 */
    @PostMapping
    public Post registerCommPost(@RequestBody Post requestPost) {
        Post post = null;

        // 현재 로그인한 사용자 정보 가져오기
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            String userId = authentication.getName(); // 사용자 아이디

            if (userId.equals("anonymousUser")) {
                return null;
            }

            // 등록 처리
            post = comService.registerCommPost(userId, requestPost);
        }
        return post;
    }

    /* 커뮤니티 게시글 수정 */
    @PostMapping("/{id}")
    public Post updateCommPost(@PathVariable Long id, @RequestBody Post requestPost) {
        Post post = null;
        String writer = comService.getCommunityPost(id).getMember().getId();

        // 현재 로그인한 사용자 정보 가져오기
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            String userId = authentication.getName(); // 사용자 아이디

            if (userId.equals("anonymousUser")) {
                return null;
            }

            if (!userId.equals(writer)) {
                // 작성자와 사용자가 다른 경우 (프론트에서 넘어 올 일 없을 거 같지만.. 혹시나)
                return null;
            }

            // 수정 처리
            post = comService.updateCommPost(id, requestPost);
        }
        return post;
    }

    /* 커뮤니티 게시글 삭제 */
    @DeleteMapping("/{id}")
    public boolean deleteCommPost(@PathVariable Long id) {
        String writer = comService.getCommunityPost(id).getMember().getId();

        // 현재 로그인한 사용자 정보 가져오기
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            String userId = authentication.getName(); // 사용자 아이디

            if (userId.equals("anonymousUser")) {
                return false;
            }

            if (!userId.equals(writer)) {
                // 작성자와 사용자가 다른 경우
                return false;
            }

            return comService.deleteCommPost(id);
        }
        return false;
    }
}
