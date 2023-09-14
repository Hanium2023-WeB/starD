package com.web.stard.controller;

import com.web.stard.domain.Applicant;
import com.web.stard.domain.RecruitStatus;
import com.web.stard.domain.Study;
import com.web.stard.dto.StudyDto;
import com.web.stard.service.StudyService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v2/studies")
public class StudyController {

    private final StudyService studyService;


//    @GetMapping     // [R] 스터디 게시글 전체 조회
//    public Page<ScrapStudySlide> getStudies(@RequestParam(value = "page", defaultValue = "1", required = false) int page) {
//        return studyService.findAll(page);
//    }

    @GetMapping("/all")     // [R] 스터디 게시글 전체 조회 ( 모집 중 / 모집 완료 순으로)
    public Page<Study> getAllStudies(@RequestParam(value = "page", defaultValue = "1", required = false) int page) {
        return studyService.findAllByOrderByRecruitStatus(page);
    }


    @GetMapping("/{id}")    // [R] 스터디 게시글 세부 조회
    public Study getStudy(@PathVariable Long id){
        System.out.println("세부 조회");
        return studyService.findById(id);
    }

    // [R] 키워드로 스터디 게시글 검색 ( 모집 중, 모집 완료 순으로 )

    @GetMapping("/search-by-title")     // [R] 키워드(제목)로 스터디 게시글 검색
    public Page<Study> getStudiesByTitle(@RequestParam("keyword") String keyword, @RequestParam(value = "page", defaultValue = "1", required = false) int page) {
        System.out.println("진입 1 : " + keyword);
        return studyService.findByTitleContainingOrderByRecruitStatus(keyword, page);
    }

    @GetMapping("/search-by-content")     // [R] 키워드(내용)로 스터디 게시글 검색
    public Page<Study> getStudiesByContent(@RequestParam("keyword") String keyword, @RequestParam(value = "page", defaultValue = "1", required = false) int page) {
        return studyService.findByContentContainingOrderByRecruitStatus(keyword, page);
    }

    @GetMapping("/search-by-recruiter")     // [R] 키워드(작성자)로 스터디 게시글 검색
    public Page<Study> getStudiesByRecruiter(@RequestParam("keyword") String keyword, @RequestParam(value = "page", defaultValue = "1", required = false) int page) {
        return studyService.findByRecruiterContainingOrderByRecruitStatus(keyword, page);
    }

    // [R] 모집 중인 게시글 중에서 키워드 검색
    @GetMapping("/search-by-title-in-recruiting-studies")     // [R] 키워드(제목)로 스터디 게시글 검색
    public Page<Study> getRecruitingStudiesByTitle(@RequestParam("keyword") String keyword, @RequestParam(value = "page", defaultValue = "1", required = false) int page) {
        RecruitStatus recruitStatus = RecruitStatus.valueOf("RECRUITING");
        return studyService.findByTitleContainingAndRecruitStatus(keyword, recruitStatus, page);
    }

    @GetMapping("/search-by-content-in-recruiting-studies")     // [R] 키워드(내용)로 스터디 게시글 검색
    public Page<Study> getRecruitingStudiesByContent(@RequestParam("keyword") String keyword, @RequestParam(value = "page", defaultValue = "1", required = false) int page) {
        RecruitStatus recruitStatus = RecruitStatus.valueOf("RECRUITING");
        return studyService.findByContentContainingAndRecruitStatus(keyword, recruitStatus, page);
    }

    @GetMapping("/search-by-recruiter-in-recruiting-studies")     // [R] 키워드(작성자)로 스터디 게시글 검색
    public Page<Study> getRecruitingStudiesByRecruiter(@RequestParam("keyword") String keyword, @RequestParam(value = "page", defaultValue = "1", required = false) int page) {
        RecruitStatus recruitStatus = RecruitStatus.valueOf("RECRUITING");
        return studyService.findByRecruiterContainingAndRecruitStatus(keyword, recruitStatus, page);
    }


    // [R] 모집 완료된 게시글 중에서 키워드 검색

    @GetMapping("/search-by-title-in-recruited-studies")     // [R] 키워드(제목)로 스터디 게시글 검색
    public Page<Study> getRecruitedStudiesByTitle(@RequestParam("keyword") String keyword, @RequestParam(value = "page", defaultValue = "1", required = false) int page) {
        RecruitStatus recruitStatus = RecruitStatus.valueOf("RECRUITMENT_COMPLETE");
        return studyService.findByTitleContainingAndRecruitStatus(keyword, recruitStatus, page);
    }

    @GetMapping("/search-by-content-in-recruited-studies")     // [R] 키워드(내용)로 스터디 게시글 검색
    public Page<Study> getRecruitedStudiesByContent(@RequestParam("keyword") String keyword, @RequestParam(value = "page", defaultValue = "1", required = false) int page) {
        RecruitStatus recruitStatus = RecruitStatus.valueOf("RECRUITMENT_COMPLETE");
        return studyService.findByContentContainingAndRecruitStatus(keyword, recruitStatus, page);
    }

    @GetMapping("/search-by-recruiter-in-recruited-studies")     // [R] 키워드(작성자)로 스터디 게시글 검색
    public Page<Study> getRecruitedStudiesByRecruiter(@RequestParam("keyword") String keyword, @RequestParam(value = "page", defaultValue = "1", required = false) int page) {
        RecruitStatus recruitStatus = RecruitStatus.valueOf("RECRUITMENT_COMPLETE");
        return studyService.findByRecruiterContainingAndRecruitStatus(keyword, recruitStatus, page);
    }

    // [R] 모집 중인 게시글 조회
    @GetMapping("/search-recruiting-studies")
    public Page<Study> getRecruitingStudies(@RequestParam(value = "page", defaultValue = "1", required = false) int page) {
        RecruitStatus recruitStatus = RecruitStatus.valueOf("RECRUITING");
        return studyService.findByRecruitStatus(recruitStatus, page);
    }

    // [R] 모집 완료된 게시글 조회
    @GetMapping("/search-recruited-studies")
    public Page<Study> getRecruitedStudies(@RequestParam(value = "page", defaultValue = "1", required = false) int page) {
        RecruitStatus recruitStatus = RecruitStatus.valueOf("RECRUITMENT_COMPLETE");
        return studyService.findByRecruitStatus(recruitStatus, page);
    }

    @PostMapping       // [C] 스터디 게시글 생성
    public Study createStudy(@RequestBody StudyDto studyDto) {
        System.out.println(studyDto);
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return studyService.createStudy(studyDto, authentication);
    }


    @DeleteMapping("/{id}")      // [D] 스터디 게시글 삭제
    public void deleteStudy(@PathVariable long id, Authentication authentication){
        studyService.deleteStudy(id, authentication);
    }

    @PutMapping("/{id}")     // [U] 스터디 게시글 수정
    public Study updateStudy(@PathVariable long id, @RequestBody StudyDto studyDto, Authentication authentication){
        return studyService.updateStudy(id, studyDto, authentication);
    }

    @PostMapping("/{id}/apply")       // [C] 스터디 지원 신청
    public Study createApplicant(@PathVariable long id, @RequestParam String apply_reason) {
        System.out.println("스터디 지원 : " + id + "지원 동기 : " + apply_reason );
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return studyService.createApplicant(id, apply_reason, authentication);
    }

    @GetMapping("/{id}/apply")       // [C] 스터디 지원 신청 확인 여부
    public boolean isApplicant(@PathVariable long id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return studyService.isApplicant(id, authentication);
    }

    @GetMapping("/{id}/apply-reason")       // [C] 스터디 지원 신청 확인 여부 및 applicant return
    public Applicant findApplicant(@PathVariable long id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return studyService.findByMemberAndStudy(id, authentication);
    }

    @PostMapping("/{id}/select")       // [C] 스터디 참여자 선택
    public Study createParticipant(@PathVariable long id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return studyService.createParticipant(id, authentication);
    }



}
