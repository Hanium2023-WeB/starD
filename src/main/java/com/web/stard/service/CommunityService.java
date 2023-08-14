package com.web.stard.service;

import com.web.stard.domain.Member;
import com.web.stard.domain.Post;
import com.web.stard.domain.PostType;
import com.web.stard.repository.PostRepository;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.awt.print.Pageable;
import java.util.List;
import java.util.Optional;

@Getter @Setter
@Service
public class CommunityService {

    MemberService memberService;
    PostRepository postRepository;

    /* 커뮤니티 게시글 조회 (페이지화 추가) */
    public List<Post> getAllCommunityPost(int page) {
//        return postRepository.findByTypeOrderByCreated_atDesc("Post"); // 페이지화 X (그냥 전체 조회)

        Sort sort = Sort.by(new Sort.Order(Sort.Direction.DESC, "created_at"));
        PageRequest pageReq = PageRequest.of(page-1, 10, sort);
        // page -> 배열 인덱스처럼 들어가서 -1 해야 함
        // 한 페이지에 Post 10개 (개수는 추후 수정)
        return postRepository.findByType(PostType.POST, (Pageable) pageReq);
    }

    /* 커뮤니티 게시글 세부 조회 */
    public Post getCommunityPost(Long id) {
        Optional<Post> result = postRepository.findByIdAndType(id, PostType.POST);
        if (result.isPresent()) {
            return result.get();
        }
        return null;
    }

    /* 커뮤니티 게시글 등록 */
    public Post registerCommPost(String userId, Post post) {
        Member member = memberService.find(userId);

        post.setMember(member);
        post.setType(PostType.POST);

        postRepository.save(post);

        return post;
    }
    
    /* 커뮤니티 게시글 수정 */
    public Post updateCommPost(Long id, Post requestPost) {
        Post post = getCommunityPost(id);

        post.setTitle(requestPost.getTitle());
        post.setContent(requestPost.getContent());
        post.setCategory(requestPost.getCategory());

        postRepository.save(post);

        return post;
    }
    
    /* 커뮤니티 게시글 삭제 */
    public boolean deleteCommPost(Long id) {
        Post post = getCommunityPost(id);
        postRepository.delete(post);

        if (getCommunityPost(id) == null) { // 삭제됨
            return true;
        } return false;
    }
}
