package com.web.stard.service;


import com.web.stard.domain.Applicant;
import com.web.stard.domain.Member;
import com.web.stard.domain.RecruitStatus;
import com.web.stard.domain.Study;
import com.web.stard.dto.StudyDto;
import com.web.stard.repository.ApplicantRepository;
import com.web.stard.repository.StudyRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@AllArgsConstructor
public class StudyService {

    private StudyRepository studyRepository;
    private MemberService memberService;
    private ApplicantRepository applicantRepository;

    public Study findById(Long id) {
        Optional<Study> result = studyRepository.findById(id);

        if (result.isEmpty())
            return null;
        return result.get();

    }

    @Transactional
    public Page<Study> findAll(int page) {

        Sort sort = Sort.by(new Sort.Order(Sort.Direction.DESC, "createdAt"));
        Pageable pageable = PageRequest.of(page - 1, 10, sort);

        Page<Study> studies = studyRepository.findAll(pageable);

        return studies;
    }

    public Page<Study> findAllByOrderByRecruitStatus(int page) {

        Sort sort = Sort.by(new Sort.Order(Sort.Direction.DESC, "createdAt"));
        Pageable pageable = PageRequest.of(page - 1, 9, sort);

        Page<Study> studies = studyRepository.findAllByOrderByRecruitStatus(pageable);

        return studies;
    }

    public Page<Study> findByTitleContainingOrderByRecruitStatus(String keyword, int page) {

        Sort sort = Sort.by(new Sort.Order(Sort.Direction.DESC, "createdAt"));
        Pageable pageable = PageRequest.of(page - 1, 10, sort);

        Page<Study> studies = studyRepository.findByTitleContainingOrderByRecruitStatus(keyword, pageable);

        return studies;
    }

    public Page<Study> findByRecruiterContainingOrderByRecruitStatus(String keyword, int page) {

        Sort sort = Sort.by(new Sort.Order(Sort.Direction.DESC, "createdAt"));
        Pageable pageable = PageRequest.of(page - 1, 10, sort);

        Page<Study> studies = studyRepository.findByRecruiterContainingOrderByRecruitStatus(keyword, pageable);

        return studies;
    }

    public Page<Study> findByContentContainingOrderByRecruitStatus(String keyword, int page) {

        Sort sort = Sort.by(new Sort.Order(Sort.Direction.DESC, "createdAt"));
        Pageable pageable = PageRequest.of(page - 1, 10, sort);

        Page<Study> studies = studyRepository.findByContentContainingOrderByRecruitStatus(keyword, pageable);

        return studies;
    }

    public Page<Study> findByTitleContainingAndRecruitStatus(String keyword, RecruitStatus recruitStatus, int page) {

        Sort sort = Sort.by(new Sort.Order(Sort.Direction.DESC, "createdAt"));
        Pageable pageable = PageRequest.of(page - 1, 10, sort);

        Page<Study> studies = studyRepository.findByTitleContainingAndRecruitStatus(keyword, recruitStatus, pageable);

        return studies;
    }

    public Page<Study> findByContentContainingAndRecruitStatus(String keyword, RecruitStatus recruitStatus, int page) {

        Sort sort = Sort.by(new Sort.Order(Sort.Direction.DESC, "createdAt"));
        Pageable pageable = PageRequest.of(page - 1, 10, sort);

        Page<Study> studies = studyRepository.findByContentContainingAndRecruitStatus(keyword, recruitStatus, pageable);

        return studies;
    }

    public Page<Study> findByRecruiterContainingAndRecruitStatus(String keyword, RecruitStatus recruitStatus, int page) {

        Sort sort = Sort.by(new Sort.Order(Sort.Direction.DESC, "createdAt"));
        Pageable pageable = PageRequest.of(page - 1, 10, sort);

        Page<Study> studies = studyRepository.findByRecruiterContainingAndRecruitStatus(keyword, recruitStatus, pageable);

        return studies;
    }

    public Page<Study> findByRecruitStatus(RecruitStatus recruitStatus, int page) {

        Sort sort = Sort.by(new Sort.Order(Sort.Direction.DESC, "createdAt"));
        Pageable pageable = PageRequest.of(page - 1, 10, sort);

        Page<Study> studies = studyRepository.findByRecruitStatus(recruitStatus, pageable);

        return studies;
    }

    @Transactional
    public void deleteStudy(long id, Authentication authentication) {

        Study study = findById(id);

        // TODO 삭제할 스터디 게시글이 개설 전, 후 상태 확인하기
        // 삭제할 스터디 게시글이 개설 후라면 삭제 불가
        if (!study.getProgressStatus().toString().equals(null))
            return;

        // TODO 삭제할 스터디 게시글의 작성자가 로그인된 사용자의 아이디와 같은지 체크
        // String userId = authentication.getName();

        // 로그인된 사용자가 아니거나, 로그인된 사용자와 게시글 작성자가 다르거나
        // 해당 id를 가진 게시글이 없을 경우 null 반환
//        if(userId == null || study == null || !study.getRecruiter().equals(memberRepository.findNicknameById(userId)))     // TODO 추후에 주석 제거 필요
//            return;

        studyRepository.delete(study);
    }

    @Transactional
    public Study createStudy(StudyDto studyDto, Authentication authentication) {

        String userId = authentication.getName();

        Member member = memberService.find(userId);

        Study result = Study.builder()
                .title(studyDto.getTitle())
                .content(studyDto.getContent())
                .capacity(studyDto.getCapacity())
                .recruiter(member)
                .city(studyDto.getCity())
                .district(studyDto.getDistrict())
                .tags(studyDto.getTags())
                .onOff(studyDto.getOnOff())
                .activityStart(studyDto.getActivityStart())
                .activityDeadline(studyDto.getActivityDeadline())
                .recruitmentDeadline(studyDto.getRecruitmentDeadline())
                .viewCount(0)
                .progressStatus(null)
                .field(studyDto.getField())
                .recruitStatus(RecruitStatus.valueOf("RECRUITING"))
                .build();

        studyRepository.save(result);

        return result;
    }

    @Transactional
    public Study updateStudy(long id, StudyDto studyDto, Authentication authentication) {

//        String userId = authentication.getName();     // TODO 추후에 주석 제거 필요
//        if(userId == null)
//            return null;
        Study result = findById(id);

        // 로그인된 사용자가 아니거나, 로그인된 사용자와 게시글 작성자가 다르거나
        // 해당 id를 가진 게시글이 없을 경우 null 반환
//        if(userId == null || result == null || !result.getRecruiter().equals(memberRepository.findNicknameById(userId)))     // TODO 추후에 주석 제거 필요
//            return null;

        RecruitStatus recruitStatus = result.getRecruitStatus();

        if (!recruitStatus.toString().equals("RECRUITING")) {     // TODO 스터디 모집 상태가 모집 중일 때만 수정 가능
            return null;
        }

        result.setTitle(studyDto.getTitle());
        result.setContent(studyDto.getContent());
        result.setCity(studyDto.getCity());
        result.setDistrict(studyDto.getDistrict());
        result.setTags(studyDto.getTags());
        result.setOnOff(studyDto.getOnOff());
        result.setActivityStart(studyDto.getActivityStart());
        result.setActivityDeadline(studyDto.getActivityDeadline());
        result.setRecruitmentDeadline(studyDto.getRecruitmentDeadline());
//        result.setRecruitStatus(studyDto.getRecruitStatus());

        return result;
    }

    public Long count() {
        return studyRepository.count();
    }


    @Transactional
    public Study createApplicant(long id, String apply_reason, Authentication authentication) {

        // TODO 스터디 개설자는 자동으로 신청자 테이블에 저장?

        String userId = authentication.getName();
        Member member = memberService.find(userId);

        Study study = findById(id);

        Applicant applicant = Applicant.builder()
                .study(study)
                .member(member)
                .applyReason(apply_reason)
                .participationState(false)
                .build();

        applicantRepository.save(applicant);

        return null;
    }

    @Transactional
    public Study createParticipant(long id, Authentication authentication) {
        // TODO 스터디 참여자 생성 코드 작성
        String userId = authentication.getName();
        Member member = memberService.find(userId);

        Study study = findById(id);

        // TODO Applicant의 참여 상태를 true로 변경
        // TODO Study_Member 테이블에 저장
        // TODO 스터디 개설자 같은 경우 study_membmer 테이블에 자동 저장?

        return null;
    }
}
