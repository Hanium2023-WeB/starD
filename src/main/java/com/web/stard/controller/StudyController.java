package com.web.stard.controller;

import com.web.stard.domain.Study;
import com.web.stard.dto.StudyDto;
import com.web.stard.service.StudyService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/studies")
public class StudyController {

    private final StudyService studyService;


    @GetMapping     // [R] 스터디 게시글 전체 조회
    public List<Study> getAllStudies(){
        return studyService.findAll();
    }

    @GetMapping("/{id}")    // [R] 스터디 게시글 세부 조회
    public Study getStudy(@PathVariable Long id){
        Study result = studyService.findById(id);

        return result;
    }

    @PostMapping       // [C] 스터디 게시글 생성
    public Study createStudy(StudyDto studyDto, Authentication authentication){
        Study result = studyService.createStudy(studyDto, authentication);

        return result;
    }


    @DeleteMapping("/{id}")      // [D] 스터디 게시글 삭제
    public void deleteStudy(@PathVariable long id){
        Study result = studyService.findById(id);
        studyService.deleteStudy(result);
    }

    @PutMapping("/{id}")     // [U] 스터디 게시글 수정
    public Study updateStudy(@PathVariable long id, @RequestBody StudyDto studyDto, Authentication authentication){
        Study result = studyService.updateStudy(id, studyDto, authentication);

        return result;
    }
}
