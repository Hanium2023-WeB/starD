package com.web.stard.service;

import com.web.stard.domain.*;
import com.web.stard.repository.ScheduleRepository;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.List;
import java.util.Optional;

@Getter @Setter
@AllArgsConstructor
@Service
public class ScheduleService {

    StudyService studyService;
    MemberService memberService;

    ScheduleRepository scheduleRepository;

    /* 일정 조회 (하나) */
    public Schedule getSchedule(Long id) {
        Optional<Schedule> result = scheduleRepository.findById(id);
        if (result.isPresent()) {
            return result.get();
        }
        return null;
    }

    /* 사용자 일정 조회 (전체) */
    public List<Schedule> getAllScheduleListByMember(int year, int month, Authentication authentication) {
        Member member = memberService.find(authentication.getName());

        // 월 단위로 검색
        LocalDateTime start = LocalDateTime.of(year, month, 1, 0, 0, 0);
        LocalDateTime end = LocalDateTime.of(year, month, YearMonth.of(year, month).lengthOfMonth(),
                23, 59, 59);

        // TODO : 사용자가 참여중인 스터디의 모든 일정 가져오기
        // 아직 스터디 참여자 개발 전이라 추후 수정


        return null;
    }

    /* 사용자 일정 조회 (스터디별 : 필요할진 모르겠는데 혹시 몰라서) */
    public List<Schedule> getScheduleListByStudy(Long studyId, int year, int month) {
        Study study = studyService.findById(studyId);

        LocalDateTime start = LocalDateTime.of(year, month, 1, 0, 0, 0);
        LocalDateTime end = LocalDateTime.of(year, month, YearMonth.of(year, month).lengthOfMonth(),
                23, 59, 59);

        // 스터디의 모든 일정 가져오기
        List<Schedule> schedules = scheduleRepository.findAllByStudyAndStartDateBetween(study, start, end);

        return schedules;
    }

    /* 일정 등록 */
    public Schedule registerSchedule(Long studyId, Schedule schedule) {
        Study study = studyService.findById(studyId);
        schedule.setStudy(study);

        scheduleRepository.save(schedule);

        return schedule;
    }

    /* 일정 수정 (title만 변경) */
    public Schedule updateSchedule(Long scheduleId, String title) {
        Schedule schedule = getSchedule(scheduleId);
        schedule.setTitle(title);

        scheduleRepository.save(schedule);

        return schedule;
    }

    /* 일정 삭제 */
    public boolean deleteSchedule(Long scheduleId) {
        Schedule schedule = getSchedule(scheduleId);
        scheduleRepository.delete(schedule);

        if (getSchedule(scheduleId) == null) { // 삭제됨
            return true;
        } return false;
    }
}
