package com.web.stard.service;

import com.web.stard.domain.Member;
import com.web.stard.domain.Post;
import com.web.stard.domain.PostType;
import com.web.stard.domain.Reply;
import com.web.stard.repository.ReplyRepository;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Transactional
@AllArgsConstructor
@Getter @Setter
public class ReplyService {

    MemberService memberService;
    CommunityService communityService;
    ReplyRepository replyRepository;


    // 댓글이 존재하는지 확인
    private Reply getExistingReply(Long replyId) {
        Optional<Reply> optionalReply = replyRepository.findById(replyId);

        if (!optionalReply.isPresent()) {
            throw new IllegalArgumentException("해당 댓글을 찾을 수 없습니다.");
        }

        return optionalReply.get();
    }

    // 댓글 작성자인지 확인
    private void checkAuth(Reply reply, Member replier) {
        if (!reply.getMember().equals(replier)) {
            throw new IllegalStateException("댓글 작성자만 접근할 수 있습니다.");
        }
    }


    // Post 댓글 생성
    public Reply createQnaReply(Long postId, String replyContent, Authentication authentication) {
        String userId = authentication.getName();
        Member replier = memberService.find(userId);
        Post targetPost = communityService.getCommunityPost(postId);

        Reply reply = Reply.builder()
                .member(replier)
                .post(targetPost)
                .content(replyContent)
                .type(targetPost.getType())
                .build();

        return replyRepository.save(reply);
    }

    // Post 댓글 수정
    public Reply updateQnaReply(Long replyId, String replyContent, Authentication authentication) {
        String userId = authentication.getName();
        Member replier = memberService.find(userId);

        Reply reply = getExistingReply(replyId);

        checkAuth(reply, replier);

        reply.setContent(replyContent);
        return replyRepository.save(reply);
    }

    // Post 댓글 삭제
    public void deleteQnaReply(Long replyId, Authentication authentication) {
        String userId = authentication.getName();
        Member replier = memberService.find(userId);

        Reply reply = getExistingReply(replyId);

        checkAuth(reply, replier);

        replyRepository.delete(reply);
    }

}
