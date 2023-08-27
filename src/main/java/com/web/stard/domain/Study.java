package com.web.stard.domain;

import com.sun.istack.NotNull;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor(force = true)
@Builder
public class Study extends BaseEntity {

    @Id
    @GeneratedValue
    private Long id;

    @NotNull
    private String title;

    @NotNull
    private String content;

    @NotNull
    private int capacity;

    @NotNull
    private String recruiter;

    private String city;    // 시

    private String district;    // 구

    private String tags;    // 태그 들

    @NotNull
    private String on_off;      // 온/오프/무관

    @NotNull
    @DateTimeFormat(pattern = "yyyy-MM-dd kk:mm:ss")
    private LocalDateTime activity_start;        // 활동 시작 기간

    @NotNull
    @DateTimeFormat(pattern = "yyyy-MM-dd kk:mm:ss")
    private LocalDateTime activity_deadline;     // 활동 마감 기간

    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime recruitment_start;

    @NotNull
    @DateTimeFormat(pattern = "yyyy-MM-dd kk:mm:ss")
    private LocalDateTime recruitment_deadline;

//    @NotNull
//    @Enumerated(EnumType.STRING)
//    private StudyType status;  // 스터디 진행 상황 (진행 중, 진행 완료, 중단 등)

    @NotNull
    @Enumerated(EnumType.STRING)
    private RecruitStatus recruitStatus;  // 스터디 모집 현황 (모집 중, 모집 완료)

    @Enumerated(EnumType.STRING)
    private ProgressStatus progressStatus;  // 스터디 진행 상황 (진행 중, 진행 완료, 중단 등)

    @NotNull
    private int view_count;


}
