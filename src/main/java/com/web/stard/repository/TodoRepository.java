package com.web.stard.repository;

import com.web.stard.domain.Study;
import com.web.stard.domain.ToDo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TodoRepository extends JpaRepository<ToDo, Long> {

    /* 스터디 내 모든 TO DO */
    List<ToDo> findAllByStudy(Study study);
}
