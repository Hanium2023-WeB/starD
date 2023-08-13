package com.web.stard.repository;

import com.web.stard.domain.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.awt.print.Pageable;
import java.util.List;
import java.util.Optional;

public interface PostRepository extends JpaRepository<Post, Long> {
    /* 타입 별 게시글 전체 조회 (최근 순) */
    //List<Post> findByTypeOrderByCreated_atDesc(String type);

    /* 타입 별 게시글 전체 조회 (최근 순 + 페이징) */
    //List<Post> findByType(String type, Pageable pageable);

    /* 타입 별 게시글 세부 조회 */
    //Optional<Post> findByIdAndType(Long id, String type);
}
