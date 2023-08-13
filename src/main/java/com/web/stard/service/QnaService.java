package com.web.stard.service;

import com.web.stard.domain.Member;
import com.web.stard.domain.Post;
import com.web.stard.domain.PostType;
import com.web.stard.repository.PostRepository;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;


@Transactional
@Getter @Setter
@Service
public class QnaService {

    @Autowired
    MemberService memberService;
    @Autowired
    PostRepository postRepository;

    // qna 등록
    public void createQna(String userId, Post post) {
        Member member = memberService.find(userId);

        post.setMember(member);
        post.setType(PostType.QNA);

        postRepository.save(post);
    }

    // qna 삭제
    public void deleteQna(Long postId, String userId) {
        Optional<Post> optionalPost = postRepository.findById(postId);

        String auth = memberService.find(userId).getRoles().getAuthorityName();

        optionalPost.ifPresent(post -> {
            if ("ADMIN".equals(auth)    // 관리자이거나
                    || post.getMember().getId().equals(userId)) {       // 작성자일 때
                postRepository.deleteById(postId);
            }
        });
    }


}
