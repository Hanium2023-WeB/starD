package com.web.stard.domain;

import com.sun.istack.NotNull;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
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

    @NotNull @Column(name = "on_off")
    private String onOff;      // 온/오프/무관

    @NotNull @Column(name = "activity_start")
    @DateTimeFormat(pattern = "yyyy-MM-dd kk:mm:ss")
    private LocalDateTime activityStart;        // 활동 시작 기간

    @NotNull @Column(name = "activity_deadline")
    @DateTimeFormat(pattern = "yyyy-MM-dd kk:mm:ss")
    private LocalDateTime activityDeadline;     // 활동 마감 기간

    @NotNull @Column(name = "recruitment_start")
    @DateTimeFormat(pattern = "yyyy-MM-dd kk:mm:ss")
    private LocalDateTime recruitmentStart;

    @NotNull @Column(name = "recruitment_deadline")
    @DateTimeFormat(pattern = "yyyy-MM-dd kk:mm:ss")
    private LocalDateTime recruitmentDeadline;

    @NotNull
    private String status;  // 스터디 진행 상황 (진행 중, 진행 완료, 중단 등)

    @NotNull @Column(name = "view_count")
    private int viewCount;


}
