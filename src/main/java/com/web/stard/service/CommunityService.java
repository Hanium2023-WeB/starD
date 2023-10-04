package com.web.stard.service;

import com.web.stard.domain.*;
import com.web.stard.repository.PostRepository;
import com.web.stard.repository.StarScrapRepository;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Getter @Setter
@AllArgsConstructor
@Service
public class CommunityService {

    MemberService memberService;
    PostRepository postRepository;
    StarScrapRepository starScrapRepository;


    /* 커뮤니티 게시글 조회 (페이지화 X) */
    public List<Post> getAllCommunityPost() {
        List<Post> posts = postRepository.findByTypeOrderByCreatedAtDesc(PostType.COMM);

        for (Post p : posts) { // 스크랩 수, 공감 수
            List<StarScrap> allStarList = starScrapRepository.findAllByPostAndTypeAndTableType(p, ActType.STAR, PostType.COMM);
            List<StarScrap> allScrapList = starScrapRepository.findAllByPostAndTypeAndTableType(p, ActType.SCRAP, PostType.COMM);

            p.setStarCount(allStarList.size());
            p.setScrapCount(allScrapList.size());
        }

        return posts;
    }

//    /* 커뮤니티 게시글 조회 (페이지화 추가) */
//    public List<Post> getAllCommunityPost(int page) {
////        return postRepository.findByTypeOrderByCreatedAtDesc(PostType.POST); // 페이지화 X (그냥 전체 조회)
//
//        Sort sort = Sort.by(new Sort.Order(Sort.Direction.DESC, "createdAt"));
//        Pageable pageable = PageRequest.of(page-1, 10, sort);
//        // page -> 배열 인덱스처럼 들어가서 -1 해야 함
//        // 한 페이지에 Post 10개 (개수는 추후 수정)
//
//        List<Post> posts = postRepository.findByType(PostType.COMM, pageable);
//
//        for (Post p : posts) { // 스크랩 수, 공감 수
//            List<StarScrap> allStarList = starScrapRepository.findAllByPostAndTypeAndTableType(p, ActType.STAR, PostType.COMM);
//            List<StarScrap> allScrapList = starScrapRepository.findAllByPostAndTypeAndTableType(p, ActType.SCRAP, PostType.COMM);
//
//            p.setStarCount(allStarList.size());
//            p.setScrapCount(allScrapList.size());
//        }
//
//        return posts;
//    }

    /* 커뮤니티 게시글 세부 조회 */
    public Post getCommunityPost(Long id, String userId) {
        Optional<Post> result = postRepository.findByIdAndType(id, PostType.COMM);
        if (result.isPresent()) {
            Post post = result.get();

            if (userId != null) {
                if (!post.getMember().getId().equals(userId)) {
                    // 작성자 != 현재 로그인 한 유저
                    post.setViewCount(post.getViewCount()+1);
                    postRepository.save(post);
                }
            }

            List<StarScrap> allStarList = starScrapRepository.findAllByPostAndTypeAndTableType(post, ActType.STAR, PostType.COMM);
            List<StarScrap> allScrapList = starScrapRepository.findAllByPostAndTypeAndTableType(post, ActType.SCRAP, PostType.COMM);

            post.setStarCount(allStarList.size());
            post.setScrapCount(allScrapList.size());

            return post;
        }
        return null;
    }

    /* 커뮤니티 게시글 등록 */
    public Post registerCommPost(Post post, Authentication authentication) {
        Member member = memberService.find(authentication.getName());

        post.setMember(member);
        post.setType(PostType.COMM);

        postRepository.save(post);

        return post;
    }
    
    /* 커뮤니티 게시글 수정 */
    public Post updateCommPost(Long id, Post requestPost, Authentication authentication) {
        Member member = memberService.find(authentication.getName());
        Post post = getCommunityPost(id, null);

        if (!member.getId().equals(post.getMember().getId())) {
            // 작성자랑 사용자가 다르면
            return null;
        }

        post.setTitle(requestPost.getTitle());
        post.setContent(requestPost.getContent());
        post.setCategory(requestPost.getCategory());

        postRepository.save(post);

        return post;
    }
    
    /* 커뮤니티 게시글 삭제 */
    public boolean deleteCommPost(Long id, Authentication authentication) {
        Member member = memberService.find(authentication.getName());
        Post post = getCommunityPost(id, null);

        if (!member.getId().equals(post.getMember().getId())) {
            // 작성자랑 사용자가 다르면
            return false;
        }

        postRepository.delete(post);

        if (getCommunityPost(id, null) == null) { // 삭제됨
            return true;
        } return false;
    }
}
