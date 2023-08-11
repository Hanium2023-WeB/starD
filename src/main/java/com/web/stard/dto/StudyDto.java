package com.web.stard.dto;

import com.sun.istack.NotNull;
import com.web.stard.domain.Study;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.validation.annotation.Validated;

import javax.validation.Valid;
import java.io.Serializable;
import java.time.LocalDateTime;

@SuppressWarnings("serial")
@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor(force = true)
public class StudyDto implements Serializable {

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

    @NotNull
    @DateTimeFormat(pattern = "yyyy-MM-dd kk:mm:ss")
    private LocalDateTime recruitment_start;

    @NotNull
    @DateTimeFormat(pattern = "yyyy-MM-dd kk:mm:ss")
    private LocalDateTime recruitment_deadline;

    @NotNull
    private String status;  // 스터디 진행 상황 (진행 중, 진행 완료, 중단 등)

    @NotNull
    private int view_count;


}
