package com.web.stard.repository;

import com.web.stard.domain.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AssigneeRepository extends JpaRepository<Assignee, AssigneeId> {

    /* 해당 TO DO의 담당자 조회 */
    List<Assignee> findByToDo(ToDo toDo);

    /* 해당 TO DO 담당자에 존재하는지 */
    boolean existsByToDoAndMember(ToDo toDo, Member member);
    /* 해당 TO DO 담당자 */
    Optional<Assignee> findByToDoAndMember(ToDo toDo, Member member);
}
