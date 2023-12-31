package com.web.stard.service;

import com.web.stard.domain.*;
import com.web.stard.repository.PostRepository;
import com.web.stard.repository.StarScrapRepository;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Transactional
@Getter @Setter
@AllArgsConstructor
@Service
public class NoticeService {

    MemberService memberService;
    PostRepository postRepository;
    StarScrapRepository starScrapRepository;

    // Notice 등록
    public Post createNotice(Post post, Authentication authentication) {
        String userId = authentication.getName();
        Member member = memberService.find(userId);

        post.setMember(member);
        post.setType(PostType.NOTICE);

        return postRepository.save(post);
    }

    // Notice 리스트 조회 (페이지화x)
    public List<Post> getAllNotice() {
        List<Post> posts = postRepository.findByTypeOrderByCreatedAtDesc(PostType.NOTICE);

        for (Post p : posts) { // 스크랩 수, 공감 수
            List<StarScrap> allStarList = starScrapRepository.findAllByPostAndTypeAndTableType(p, ActType.STAR, PostType.NOTICE);
            List<StarScrap> allScrapList = starScrapRepository.findAllByPostAndTypeAndTableType(p, ActType.SCRAP, PostType.NOTICE);

            p.setStarCount(allStarList.size());
            p.setScrapCount(allScrapList.size());
        }

        return posts;
    }

    public List<Post> getAllNotice(int page) {

        Sort sort = Sort.by(new Sort.Order(Sort.Direction.DESC, "createdAt"));
        Pageable pageable = PageRequest.of(page-1, 10, sort);
        // page -> 배열 인덱스처럼 들어가서 -1 해야 함
        // 한 페이지에 Post 10개 (개수는 추후 수정)

        List<Post> posts = postRepository.findByType(PostType.NOTICE, pageable);

        for (Post p : posts) { // 스크랩 수, 공감 수
            List<StarScrap> allStarList = starScrapRepository.findAllByPostAndTypeAndTableType(p, ActType.STAR, PostType.NOTICE);
            List<StarScrap> allScrapList = starScrapRepository.findAllByPostAndTypeAndTableType(p, ActType.SCRAP, PostType.NOTICE);

            p.setStarCount(allStarList.size());
            p.setScrapCount(allScrapList.size());
        }

        return posts;
    }

    // Notice 상세 조회 (회원도 상세 조회 가능)
    public Post getNoticeDetail(Long id) {
        Optional<Post> result = postRepository.findByIdAndType(id, PostType.NOTICE);
        if (result.isPresent()) {
            return result.get();
        }
        return null;
    }

    // Notice 수정
    public Post updateNotice(Long id, Post requestPost, Authentication authentication) {
        Member member = memberService.find(authentication.getName());
        Post post = getNoticeDetail(id);

        post.setTitle(requestPost.getTitle());
        post.setContent(requestPost.getContent());
        post.setMember(member);

        postRepository.save(post);

        return post;
    }

    // Notice 삭제
    public void deleteNotice(Long id, Authentication authentication) {
        String userId = authentication.getName();
        Role userRole = memberService.find(userId).getRoles();

        Optional<Post> optionalPost = postRepository.findById(id);

        optionalPost.ifPresent(post -> {
            if (userRole == Role.ADMIN ) {   // 관리자일때만
                postRepository.deleteById(id);
            }
        });
    }

    // id로 타입 찾기
    public Optional<Post> findTypeById(Long id, Authentication authentication) {
        return postRepository.findById(id);
    }

    // Notice, FAQ 최신 순 전체 보기
    public List<Post> getAllNoticesAndFaqs() {
        List<PostType> types = Arrays.asList(PostType.NOTICE, PostType.FAQ);
        return postRepository.findByTypeInOrderByCreatedAtDesc(types);
    }

}
