package com.web.stard.controller;

import com.web.stard.domain.Assignee;
import com.web.stard.domain.ToDo;
import com.web.stard.service.MemberService;
import com.web.stard.service.TodoService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Getter @Setter
@AllArgsConstructor
@RestController
@RequestMapping("/todo")
public class ToDoController {

    private final MemberService memberService;
    private final TodoService todoService;

    /* 사용자 TO DO 조회 (전체) */
    @GetMapping("/all")
    public List<Assignee> getAllToDoListByMember(Authentication authentication) {
        return todoService.getAllToDoListByMember(authentication);
    }

    /* 사용자 TO DO 조회 (스터디별) */
    @GetMapping("/user/{studyId}")
    public List<Assignee> getToDoListByMemberAndStudy(@PathVariable Long studyId, Authentication authentication) {
        return todoService.getToDoListByMemberAndStudy(authentication, studyId);
    }

    /* 스터디 내 모든 TO DO 조회 */
    @GetMapping("/{studyId}")
    public List<ToDo> getAllToDoListByStudy(@PathVariable Long studyId) {
        return todoService.getAllToDoListByStudy(studyId);
    }


    /* TO DO 등록 */
    @PostMapping
    public ToDo registerTodo(@RequestParam Long studyId, @RequestBody ToDo toDo,
                             @RequestParam String assigneeStr, Authentication authentication) {
        // TODO 권한 체크?

        return todoService.registerTodo(studyId, toDo, assigneeStr);
    }

    /* TO DO 수정 */
    @PostMapping("/{toDoId}")
    public ToDo updateTodo(@PathVariable Long toDoId, @RequestBody ToDo updateToDo,
                           @RequestParam String assigneeStr, Authentication authentication) {
        // TODO 권한 확인 (스터디원인지)

        return todoService.updateTodo(toDoId, updateToDo, assigneeStr);
    }

    /* TO DO 삭제 */
    @DeleteMapping("/{toDoId}")
    public boolean deleteTodo(@PathVariable Long toDoId, Authentication authentication) {
        // TODO 권한 확인 (스터디원인지)

        return todoService.deleteTodo(toDoId);
    }

    /* TO DO 상태 변화 (완료, 미완료) */
    @PostMapping("/{toDoId}/status")
    public Assignee updateTodoStatus(@PathVariable Long toDoId, boolean status, Authentication authentication) {
        return todoService.updateTodoStatus(toDoId, authentication, status);
    }
}
