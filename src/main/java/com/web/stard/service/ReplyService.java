package com.web.stard.service;

import com.web.stard.domain.*;
import com.web.stard.repository.PostRepository;
import com.web.stard.repository.ReplyRepository;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;

@Transactional
@Service
@AllArgsConstructor
@Getter @Setter
public class ReplyService {

    MemberService memberService;
    CommunityService communityService;
    PostRepository postRepository;
    ReplyRepository replyRepository;
    StudyService studyService;

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


    // Post(Community, Qna) 댓글 생성
    public Reply createPostReply(Long postId, String replyContent, Authentication authentication) {
        String userId = authentication.getName();
        Member replier = memberService.find(userId);

        Optional<Post> optionalPost = postRepository.findById(postId);
        if (optionalPost.isEmpty()) {
            throw new EntityNotFoundException("게시물을 찾을 수 없습니다.");
        }

        Post targetPost = optionalPost.get();

        Reply reply = Reply.builder()
                .member(replier)
                .post(targetPost)
                .content(replyContent)
                .type(targetPost.getType())
                .build();

        return replyRepository.save(reply);
    }

    // Study 댓글 생성
    public Reply createStudyReply(Long studyId, String replyContent, Authentication authentication) {
        String userId = authentication.getName();
        Member replier = memberService.find(userId);
        Study targetStudy = studyService.findById(studyId);

        Reply reply = Reply.builder()
                .member(replier)
                .study(targetStudy)
                .content(replyContent)
                .type(PostType.STUDY)
                .build();

        return replyRepository.save(reply);
    }

    // 댓글 수정 (Post, Study 공통)
    public Reply updateReply(Long replyId, String replyContent, Authentication authentication) {
        String userId = authentication.getName();
        Member replier = memberService.find(userId);

        Reply reply = getExistingReply(replyId);

        checkAuth(reply, replier);

        reply.setContent(replyContent);
        return replyRepository.save(reply);
    }

    // 댓글 삭제 (Post, Study 공통)
    public void deleteReply(Long replyId, Authentication authentication) {
        String userId = authentication.getName();
        Member replier = memberService.find(userId);

        Reply reply = getExistingReply(replyId);

        if (replier.getRoles() != Role.ADMIN) {
            checkAuth(reply, replier);
        }

        replyRepository.delete(reply);
    }

    // 댓글 리스트로 조회
    public List<Reply> findAll(){
        List<Reply> replies = replyRepository.findAll();
        return replies;
    }

    // 댓글 조회
    public Reply getReply(Long id) {
        Optional<Reply> reply = replyRepository.findById(id);
        if (reply.isPresent()) {
            return reply.get();
        }
        return null;
    }
}
