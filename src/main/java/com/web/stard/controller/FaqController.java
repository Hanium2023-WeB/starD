package com.web.stard.controller;

import com.web.stard.domain.Post;
import com.web.stard.service.FaqService;
import com.web.stard.service.MemberService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
@Getter
@Setter
@RequestMapping("/faq")
@AllArgsConstructor
@RestController
public class FaqController {
    private final MemberService memberService;
    private  final FaqService faqService;

    // faq 등록
    @PostMapping("")
    public Post createFaq(@RequestBody Post post, Authentication authentication) {
        faqService.createFaq(post, authentication);
        return post;
    }

    // faq 리스트 조회
    @GetMapping
    public List<Post> getAllFaq(@RequestParam("page") int page) {
        return faqService.getAllFaq(page);
    }


    // faq 상세 조회
    @GetMapping("/{id}")
    public Post getFaqDetail(@PathVariable Long id) {
        return faqService.getFaqDetail(id);
    }

    // faq 수정
    @PostMapping("/{id}")
    public Post updateFaq(@PathVariable Long id, @RequestBody Post requestPost, Authentication authentication) {
        Post post = faqService.updateFaq(id, requestPost, authentication);
        return post;
    }

    // faq 삭제
    @DeleteMapping("/{id}")
    public void deleteFaq(@PathVariable Long id, Authentication authentication) {
        faqService.deleteFaq(id, authentication);
    }
}
