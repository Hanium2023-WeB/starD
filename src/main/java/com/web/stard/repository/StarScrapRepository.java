package com.web.stard.repository;

import com.web.stard.domain.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface StarScrapRepository extends JpaRepository<StarScrap, Long> {

    /* 사용자가 해당 Post를 공감(스크랩)했는지 */
    Optional<StarScrap> findByMemberAndPostAndTypeAndPostType(Member member, Post post, ActType type, PostType postType);

    /* 사용자가 해당 Study를 공감(스크랩)했는지 */
    Optional<StarScrap> findByMemberAndStudyAndTypeAndPostType(Member member, Study study, ActType type, PostType postType);

    /* 사용자가 공감(스크랩)한 타입별 모든 게시글 */
    List<StarScrap> findAllByMemberAndTypeAndPostType(Member member, ActType type, PostType postType);

    /* 해당 Post의 공감(스크랩) 전체 조회 */
    List<StarScrap> findAllByPostAndTypeAndPostType(Post post, ActType actType, PostType postType);

    /* 해당 Study의 공감(스크랩) 전체 조회 */
    List<StarScrap> findAllByStudyAndTypeAndPostType(Study study, ActType actType, PostType postType);
}
