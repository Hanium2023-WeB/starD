package com.web.stard.repository;

import com.web.stard.domain.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ScrapRepository extends JpaRepository<Scrap, Long> {

    /* 사용자가 해당 Post를 스크랩했는지 */
    Optional<Scrap> findByMemberAndPostAndType(Member member, Post post, PostType postType);

    /* 사용자가 해당 Study를 스크랩했는지 */
    Optional<Scrap> findByMemberAndStudyAndType(Member member, Study study, PostType postType);

    /* 사용자가 공감한 타입별 모든 게시글 */
    List<Scrap> findAllByMemberAndType(Member member, PostType postType);
}
