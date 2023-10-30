package com.web.stard.repository;

import com.web.stard.domain.Study;
import com.web.stard.domain.StudyPost;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StudyPostRepository extends JpaRepository<StudyPost, Long> {

    /* 게시글 전체 조회 (업로드 순) */
    List<StudyPost> findByStudyOrderByCreatedAtDesc(Study study);
}